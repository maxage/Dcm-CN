"use client"

import { DockerSettings } from "@/components/settings-panel"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { DockerTool } from "@/lib/docker-tools"
import posthog from "posthog-js"
import { useEffect, useState } from "react"

interface CopyComposeModalProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	selectedTools: DockerTool[]
}

export function CopyComposeModal({
	isOpen,
	onOpenChange,
	selectedTools,
}: CopyComposeModalProps) {
	const [showInterpolated, setShowInterpolated] = useState(false)
	const [composeContent, setComposeContent] = useState<string>("")
	const { value: settings } = useLocalStorage<DockerSettings>("docker-settings", {
		configPath: "/config",
		dataPath: "/data",
		timezone: "UTC",
		puid: "1000",
		pgid: "1000",
		umask: "022",
		restartPolicy: "unless-stopped",
		networkMode: "bridge",
		useTraefik: false,
		containerNamePrefix: "docker-",
	})

	// Generate the docker-compose content
	useEffect(() => {
		if (!isOpen) return
		
		// Create variables section
		let variablesSection = `# Docker Compose Environment Variables
version: '3.8'

# Environment Variables
x-environment: &default-tz
  TZ: \${TZ:-${settings.timezone}}

x-user: &default-user
  PUID: \${PUID:-${settings.puid}}
  PGID: \${PGID:-${settings.pgid}}
  UMASK: \${UMASK:-${settings.umask}}

# Common settings
x-common: &common-settings
  restart: \${RESTART_POLICY:-${settings.restartPolicy}}
  
`

		// Generate services section
		let servicesSection = `
services:
`

		// Add each selected tool
		selectedTools.forEach((tool) => {
			if (!tool.composeContent) return

			// Add a comment with the tool description
			servicesSection += `
  # ${tool.name}: ${tool.description}
`
			// Process the compose content
			let toolContent = tool.composeContent
				.replace(/services:\s+/g, "") // Remove the services: line
				.replace(/^\s{2}/gm, "  ") // Adjust indentation

			// Replace variables with their values if showInterpolated is true
			if (showInterpolated) {
				toolContent = toolContent
					.replace(/\$\{CONFIG_PATH\}/g, settings.configPath)
					.replace(/\$\{DATA_PATH\}/g, settings.dataPath)
					.replace(/\$\{TZ\}/g, settings.timezone)
					.replace(/\$\{PUID\}/g, settings.puid)
					.replace(/\$\{PGID\}/g, settings.pgid)
					.replace(/\$\{UMASK\}/g, settings.umask)
					.replace(/\$\{RESTART_POLICY\}/g, settings.restartPolicy)
					.replace(/\$\{NETWORK_MODE\}/g, settings.networkMode)
					.replace(/\$\{CONTAINER_PREFIX\}/g, settings.containerNamePrefix)
			}

			servicesSection += toolContent + "\n"
		})

		const completeCompose = variablesSection + servicesSection
		setComposeContent(completeCompose)
	}, [isOpen, selectedTools, settings, showInterpolated])

	const handleCopy = () => {
		// Copy the compose content to clipboard
		navigator.clipboard.writeText(composeContent)
			.then(() => {
				console.log("Docker compose copied to clipboard")
				posthog.capture("copy_compose_success", {
					selected_tools: selectedTools.map(t => t.id),
					settings: settings,
				})
				onOpenChange(false)
			})
			.catch(err => {
				console.error("Failed to copy: ", err)
			})
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
				<AlertDialogHeader>
					<AlertDialogTitle>Docker Compose Configuration</AlertDialogTitle>
					<AlertDialogDescription>
						Generated docker-compose.yaml for {selectedTools.length}{" "}
						selected service{selectedTools.length !== 1 ? "s" : ""}.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="flex items-center space-x-2 mb-2">
					<Switch
						id="interpolate-values"
						checked={showInterpolated}
						onCheckedChange={setShowInterpolated}
					/>
					<Label htmlFor="interpolate-values">Show interpolated values</Label>
				</div>

				<div className="flex-1 overflow-auto">
					<div className="relative">
						<pre
							className="p-4 border rounded bg-muted overflow-auto text-sm font-mono syntax-highlighted"
							style={{ maxHeight: "60vh" }}
						>
							{composeContent}
						</pre>
					</div>
				</div>

				<AlertDialogFooter className="mt-4">
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleCopy}
					>
						Copy to Clipboard
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
} 