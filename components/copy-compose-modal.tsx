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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { DEFAULT_SETTINGS, STORAGE_KEYS } from "@/lib/constants"
import type { DockerTool } from "@/lib/docker-tools"
import { cn, getTailwindHsl } from "@/lib/utils"
import Editor from "@monaco-editor/react"
import { Check, Copy, Download, Settings as SettingsIcon } from "lucide-react"
import type { editor } from "monaco-editor"
import { useTheme } from "next-themes"
import posthog from "posthog-js"
import { useEffect, useRef, useState } from "react"

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
	const [showSettings, setShowSettings] = useState(false)
	const [composeContent, setComposeContent] = useState<string>("")
	const [envFileContent, setEnvFileContent] = useState<string>("")
	const [activeTab, setActiveTab] = useState<string>("compose")
	const [copied, setCopied] = useState(false)
	const [mounted, setMounted] = useState(false)
	const composeEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
	const envEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
	const { theme, resolvedTheme } = useTheme()
	
	// After mounting, we can safely access the theme
	useEffect(() => {
		setMounted(true)
	}, [])
	
	const { value: settings, setValue: setSettings } = useLocalStorage<DockerSettings>(
		STORAGE_KEYS.SETTINGS, 
		DEFAULT_SETTINGS
	)

	// Function to configure Monaco with custom themes
	const handleEditorWillMount = (monaco: typeof import("monaco-editor")) => {
		// Define a theme based on Tailwind CSS
		monaco.editor.defineTheme('tailwind-dark', {
			base: 'vs-dark',
			inherit: true,
			rules: [],
			colors: {
				'editor.background': getTailwindHsl('background'),
				'editor.foreground': getTailwindHsl('foreground'),
				'editorCursor.foreground': getTailwindHsl('primary'),
				'editor.lineHighlightBackground': getTailwindHsl('muted'),
				'editorLineNumber.foreground': getTailwindHsl('muted-foreground'),
				'editor.selectionBackground': getTailwindHsl('secondary'),
				'editor.inactiveSelectionBackground': getTailwindHsl('accent'),
			},
		});
		
		monaco.editor.defineTheme('tailwind-light', {
			base: 'vs',
			inherit: true,
			rules: [],
			colors: {
				'editor.background': getTailwindHsl('background'),
				'editor.foreground': getTailwindHsl('foreground'),
				'editorCursor.foreground': getTailwindHsl('primary'),
				'editor.lineHighlightBackground': getTailwindHsl('muted'),
				'editorLineNumber.foreground': getTailwindHsl('muted-foreground'),
				'editor.selectionBackground': getTailwindHsl('secondary'),
				'editor.inactiveSelectionBackground': getTailwindHsl('accent'),
			},
		});
	}

	// Generate the docker-compose and env file content
	useEffect(() => {
		if (!isOpen) return
		
		// Create environment variables file
		const envFileContent = `# Docker Compose Environment Variables
# These can be overridden by setting them in your shell or in a .env file

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
`;
		setEnvFileContent(envFileContent);
		
		// Create docker-compose without environment variables section and YAML anchors
		const composeHeader = `# Docker Compose Configuration
version: '3.8'

`;

		// Generate services section
		let servicesSection = `services:
`;

		// Add each selected tool
		selectedTools.forEach((tool) => {
			if (!tool.composeContent) return;

			// Add a comment with the tool description
			servicesSection += `  # ${tool.name}: ${tool.description}
`;
			// Process the compose content - properly indent everything
			let toolContent = tool.composeContent
				.replace(/^services:\s*/gm, "") // Remove the services: line
				.replace(/^\s{2}(\S)/gm, "  $1"); // Ensure consistent indentation for first level
				
			// Make sure indentation is consistent throughout with service content indented 
			// one more level than service names
			const lines = toolContent.split('\n');
			const processedLines = lines.map(line => {
				// Skip empty lines
				if (line.trim() === '') return line;
				// If line starts with a service name or other first-level key
				if (line.match(/^\s*[a-zA-Z0-9_-]+:/) || line.startsWith('volumes:')) {
					return `  ${line.trim()}`;
				} 
				// Otherwise it's a nested property, add more indentation
				return `    ${line.trim()}`; // Use 4 spaces for properties (2 spaces more than service name)
			});
			toolContent = processedLines.join('\n');

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
					.replace(/\$\{CONTAINER_PREFIX\}/g, settings.containerNamePrefix);
			}

			servicesSection += `${toolContent}\n`;
		});

		const completeCompose = composeHeader + servicesSection;
		setComposeContent(completeCompose);
	}, [isOpen, selectedTools, settings, showInterpolated]);

	// Reset copied state when changing tabs
	useEffect(() => {
		setCopied(false);
	}, [activeTab]);
	
	// Update editor theme when theme changes
	useEffect(() => {
		if (!mounted) return;
		
		// Update the existing editors when theme changes
		if (composeEditorRef.current) {
			const currentTheme = resolvedTheme === 'dark' ? 'tailwind-dark' : 'tailwind-light';
			composeEditorRef.current.updateOptions({ theme: currentTheme });
		}
		
		if (envEditorRef.current) {
			const currentTheme = resolvedTheme === 'dark' ? 'tailwind-dark' : 'tailwind-light';
			envEditorRef.current.updateOptions({ theme: currentTheme });
		}
	}, [resolvedTheme, mounted]);

	// Handle copy to clipboard
	const handleCopy = () => {
		// Get content based on active tab
		const content = activeTab === "compose" 
			? composeEditorRef.current?.getValue() || composeContent
			: envEditorRef.current?.getValue() || envFileContent;
		
		// Copy the content to clipboard
		navigator.clipboard.writeText(content)
			.then(() => {
				console.log(`${activeTab === "compose" ? "Docker compose" : "Environment file"} copied to clipboard`);
				// Set copied state to show animation
				setCopied(true);
				
				// Add confetti animation class to the button
				const button = document.getElementById("copy-button");
				if (button) {
					button.classList.add("hover:motion-preset-confetti");
					// Remove the class after animation completes
					setTimeout(() => {
						button.classList.remove("hover:motion-preset-confetti");
					}, 1000);
				}
				
				// Log analytics
				posthog.capture("copy_compose_success", {
					selected_tools: selectedTools.map(t => t.id),
					settings: settings,
					file_type: activeTab,
				});
				
				// Reset copied state after 2 seconds
				setTimeout(() => {
					setCopied(false);
				}, 2000);
				
				// Note: We don't close the modal now
			})
			.catch(err => {
				console.error("Failed to copy: ", err);
			});
	};

	// Handle file download
	const handleDownload = () => {
		// Get content and filename based on active tab
		const content = activeTab === "compose" 
			? composeEditorRef.current?.getValue() || composeContent
			: envEditorRef.current?.getValue() || envFileContent;
		
		const filename = activeTab === "compose" ? "docker-compose.yaml" : ".env";
		
		// Create a blob and download link
		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		
		// Clean up
		setTimeout(() => {
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}, 100);
		
		// Log analytics
		posthog.capture("download_compose_file", {
			selected_tools: selectedTools.map(t => t.id),
			settings: settings,
			file_type: activeTab,
		});
	};

	// Function to handle editor mounting
	const handleComposeEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
		composeEditorRef.current = editor;
		
		// Set the theme after mount to ensure it's correct
		if (mounted) {
			const currentTheme = resolvedTheme === 'dark' ? 'tailwind-dark' : 'tailwind-light';
			editor.updateOptions({ theme: currentTheme });
		}
	};

	const handleEnvEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
		envEditorRef.current = editor;
		
		// Set the theme after mount to ensure it's correct
		if (mounted) {
			const currentTheme = resolvedTheme === 'dark' ? 'tailwind-dark' : 'tailwind-light';
			editor.updateOptions({ theme: currentTheme });
		}
	};
	
	// Get the current theme for editors
	const currentTheme = !mounted ? 'vs' : resolvedTheme === 'dark' ? 'tailwind-dark' : 'tailwind-light';

	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent className="flex max-h-[90vh] max-w-[95vw] flex-col">
				<AlertDialogHeader className="flex items-center justify-between flex-row">
					<div>
						<AlertDialogTitle>Docker Compose Configuration</AlertDialogTitle>
						<AlertDialogDescription>
							Generated docker-compose files for {selectedTools.length}{" "}
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
							className="flex items-center gap-2"
							onClick={() => setShowSettings(!showSettings)}
							size="sm"
							variant="outline" 
						>
							<SettingsIcon className="h-4 w-4" />
							{showSettings ? "Hide Settings" : "Show Settings"}
						</Button>
					</div>
				</AlertDialogHeader>

				<div className={cn("grid gap-4", showSettings ? "grid-cols-[1fr_350px]" : "grid-cols-1")}>
					<div className="flex-1 h-[60vh]">
						<div className="flex items-center justify-between mb-2">
							<Tabs className="w-full" defaultValue="compose" onValueChange={setActiveTab} value={activeTab}>
								<TabsList>
									<TabsTrigger value="compose">docker-compose.yaml</TabsTrigger>
									<TabsTrigger value="env">.env</TabsTrigger>
								</TabsList>
							</Tabs>
							
							<div className="flex gap-2">
								<Button
									aria-label="Download file"
									className="ml-2 rounded-md"
									onClick={handleDownload}
									size="icon"
									variant="outline"
								>
									<span className="sr-only">Download</span>
									<Download className="h-4 w-4" />
								</Button>
								
								<Button
									aria-label={copied ? "Copied" : "Copy to clipboard"}
									className="relative ml-2 rounded-md"
									id="copy-button"
									onClick={handleCopy}
									size="icon"
									variant="outline"
								>
									<span className="sr-only">{copied ? "Copied" : "Copy"}</span>
									<Copy
										className={`h-4 w-4 transition-all duration-300 ${
											copied ? "scale-0" : "scale-100"
										}`}
									/>
									<Check
										className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
											copied ? "scale-100" : "scale-0"
										}`}
									/>
								</Button>
							</div>
						</div>
						
						<div className="border flex-1 h-[calc(60vh-40px)] overflow-hidden rounded">
							{activeTab === "compose" ? (
								<Editor
									beforeMount={handleEditorWillMount}
									defaultLanguage="yaml"
									defaultValue={composeContent}
									height="100%"
									onMount={handleComposeEditorDidMount}
									options={{
										automaticLayout: true,
										fontSize: 13,
										minimap: { enabled: false },
										readOnly: false,
										scrollBeyondLastLine: false,
										wordWrap: "on",
									}}
									theme={currentTheme}
									value={composeContent}
								/>
							) : (
								<Editor
									defaultLanguage="ini"
									defaultValue={envFileContent}
									height="100%"
									onMount={handleEnvEditorDidMount}
									options={{
										automaticLayout: true,
										fontSize: 13,
										minimap: { enabled: false },
										readOnly: false,
										scrollBeyondLastLine: false,
										wordWrap: "on",
									}}
									theme={currentTheme}
									value={envFileContent}
								/>
							)}
						</div>
					</div>

					{showSettings && (
						<div className="border overflow-auto rounded p-2" style={{ maxHeight: "60vh" }}>
							<SettingsPanel 
								onSettingsChange={(newSettings) => setSettings(newSettings)} 
								settings={settings}
							/>
						</div>
					)}
				</div>

				<AlertDialogFooter className="mt-4">
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={onOpenChange.bind(null, false)}
					>
						Done
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
} 