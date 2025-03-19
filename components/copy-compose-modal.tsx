"use client"

import type { DockerSettings } from "@/components/settings-panel"
import SettingsPanel from "@/components/settings-panel"
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
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import type { DockerTool } from "@/lib/docker-tools"
import { cn } from "@/lib/utils"
import Editor from "@monaco-editor/react"
import { Settings as SettingsIcon } from "lucide-react"
import type { editor } from "monaco-editor"
import posthog from "posthog-js"
import { useEffect, useRef, useState } from "react"

interface CopyComposeModalProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	selectedTools: DockerTool[]
}

// Compose schema URL
const COMPOSE_SCHEMA_URL = "https://raw.githubusercontent.com/compose-spec/compose-spec/master/schema/compose-spec.json"

export function CopyComposeModal({
	isOpen,
	onOpenChange,
	selectedTools,
}: CopyComposeModalProps) {
	const [showInterpolated, setShowInterpolated] = useState(false)
	const [showSettings, setShowSettings] = useState(false)
	const [composeContent, setComposeContent] = useState<string>("")
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
	
	const { value: settings, setValue: setSettings } = useLocalStorage<DockerSettings>("docker-settings", {
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

	// Function to configure Monaco with YAML schema
	const handleEditorWillMount = (monaco: typeof import("monaco-editor")) => {
		// Make sure yaml schema validation is set up
		try {
			// Register the schema
			monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
				validate: true,
				schemas: [
					{
						uri: COMPOSE_SCHEMA_URL,
						fileMatch: ["*docker-compose*", "*.yml", "*.yaml"],
						schema: {
							type: "object",
							required: ["services"],
							properties: {
								version: { type: "string" },
								services: {
									type: "object",
									additionalProperties: true
								}
							}
						}
					}
				]
			});
		} catch (error) {
			console.error("Error configuring Monaco YAML schema:", error);
		}
	}

	// Generate the docker-compose content
	useEffect(() => {
		if (!isOpen) return
		
		// Create variables section
		const variablesSection = `# Docker Compose Environment Variables
version: '3.8'

# Environment Variables
# These can be overridden by creating a .env file with the same variables

# User/Group Identifiers
# These help avoid permission issues between host and container
PUID=${settings.puid}
PGID=${settings.pgid}
UMASK=${settings.umask}

# Container name prefix
CONTAINER_PREFIX=${settings.containerNamePrefix}

# Paths for persistent data
CONFIG_PATH=${settings.configPath}
DATA_PATH=${settings.dataPath}

# Container settings
TZ=${settings.timezone}
RESTART_POLICY=${settings.restartPolicy}
NETWORK_MODE=${settings.networkMode}

# Docker Compose definitions
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
		let servicesSection = `services:
`

		// Add each selected tool
		selectedTools.forEach((tool) => {
			if (!tool.composeContent) return

			// Add a comment with the tool description
			servicesSection += `  # ${tool.name}: ${tool.description}
`
			// Process the compose content - properly indent everything
			let toolContent = tool.composeContent
				.replace(/^services:\s*/gm, "") // Remove the services: line
				.replace(/^\s{2}(\S)/gm, "  $1") // Ensure consistent indentation for first level
				
			// Make sure indentation is consistent throughout
			const lines = toolContent.split('\n')
			const processedLines = lines.map(line => {
				// Skip empty lines
				if (line.trim() === '') return line
				// If line starts with a service name or other first-level key
				if (line.match(/^\s*[a-zA-Z0-9_-]+:/) || line.startsWith('volumes:')) {
					return `  ${line.trim()}`
				} 
				// Otherwise it's a nested property, add more indentation
				return `    ${line.trim()}`
			})
			toolContent = processedLines.join('\n')

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

			servicesSection += `${toolContent}\n`
		})

		const completeCompose = variablesSection + servicesSection
		setComposeContent(completeCompose)
	}, [isOpen, selectedTools, settings, showInterpolated])

	const handleCopy = () => {
		// Get the current value from the editor
		const editorContent = editorRef.current?.getValue() || composeContent
		
		// Copy the compose content to clipboard
		navigator.clipboard.writeText(editorContent)
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

	// Function to handle editor mounting
	const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
		editorRef.current = editor
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent className="flex max-h-[90vh] max-w-[95vw] flex-col">
				<AlertDialogHeader className="flex flex-row items-center justify-between">
					<div>
						<AlertDialogTitle>Docker Compose Configuration</AlertDialogTitle>
						<AlertDialogDescription>
							Generated docker-compose.yaml for {selectedTools.length}{" "}
							selected service{selectedTools.length !== 1 ? "s" : ""}.
						</AlertDialogDescription>
					</div>
					<div className="flex items-center gap-4">
						<div className="flex items-center space-x-2">
							<Switch
								id="interpolate-values"
								checked={showInterpolated}
								onCheckedChange={setShowInterpolated}
							/>
							<Label htmlFor="interpolate-values">Show interpolated values</Label>
						</div>
						
						<Button 
							variant="outline" 
							size="sm"
							onClick={() => setShowSettings(!showSettings)}
							className="flex items-center gap-2"
						>
							<SettingsIcon className="h-4 w-4" />
							{showSettings ? "Hide Settings" : "Show Settings"}
						</Button>
					</div>
				</AlertDialogHeader>

				<div className={cn("grid gap-4", showSettings ? "grid-cols-[1fr_350px]" : "grid-cols-1")}>
					<div className="border flex-1 h-[60vh] overflow-hidden rounded">
						<Editor
							height="100%"
							defaultLanguage="yaml"
							defaultValue={composeContent}
							value={composeContent}
							theme="vs-dark"
							beforeMount={handleEditorWillMount}
							onMount={handleEditorDidMount}
							options={{
								automaticLayout: true,
								fontSize: 13,
								minimap: { enabled: false },
								readOnly: false,
								scrollBeyondLastLine: false,
								wordWrap: "on",
							}}
						/>
					</div>

					{showSettings && (
						<div className="border overflow-auto p-2 rounded" style={{ maxHeight: "60vh" }}>
							<SettingsPanel 
								settings={settings}
								onSettingsChange={(newSettings) => setSettings(newSettings)} 
							/>
						</div>
					)}
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