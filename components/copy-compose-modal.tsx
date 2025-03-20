"use client"
import EmbeddedSettings from "@/components/settings/EmbeddedSettings"
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
import type { DockerTool } from "@/lib/docker-tools"
import { useSettings } from "@/lib/settings-context"
import Editor from "@monaco-editor/react"
import { Check, Copy, Download, File } from "lucide-react"
import type { editor } from "monaco-editor"
import { useTheme } from "next-themes"
import posthog from "posthog-js"
import { memo, useEffect, useRef, useState } from "react"
import { siDocker } from "simple-icons"
import { toast } from "sonner"

interface CopyComposeModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  selectedTools: DockerTool[]
}

// Memoized Editor components to prevent unnecessary re-renders
const ComposeEditor = memo(
  ({
    content,
    onMount,
    beforeMount,
    theme,
  }: {
    content: string
    onMount: (editor: editor.IStandaloneCodeEditor) => void
    beforeMount?: (monaco: typeof import("monaco-editor")) => void
    theme: string
  }) => (
    <Editor
      defaultLanguage="yaml"
      defaultValue={content}
      height="100%"
      onMount={onMount}
      beforeMount={beforeMount}
      options={{
        automaticLayout: true,
        fontSize: 13,
        minimap: { enabled: false },
        readOnly: false,
        scrollBeyondLastLine: false,
        wordWrap: "on",
      }}
      theme={theme}
      value={content}
    />
  ),
)

const EnvEditor = memo(
  ({
    content,
    onMount,
    theme,
  }: {
    content: string
    onMount: (editor: editor.IStandaloneCodeEditor) => void
    theme: string
  }) => (
    <Editor
      defaultLanguage="ini"
      defaultValue={content}
      height="100%"
      onMount={onMount}
      options={{
        automaticLayout: true,
        fontSize: 13,
        minimap: { enabled: false },
        readOnly: false,
        scrollBeyondLastLine: false,
        wordWrap: "on",
      }}
      theme={theme}
      value={content}
    />
  ),
)

export function CopyComposeModal({
  isOpen,
  onOpenChange,
  selectedTools,
}: CopyComposeModalProps) {
  const [showInterpolated, setShowInterpolated] = useState(false)
  const [composeContent, setComposeContent] = useState<string>("")
  const [envFileContent, setEnvFileContent] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("compose")
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const composeEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const envEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const { theme, resolvedTheme } = useTheme()
  const { settings } = useSettings()

  // After mounting, we can safely access the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Function to configure Monaco with custom themes
  const handleEditorWillMount = (monaco: typeof import("monaco-editor")) => {
    // Define a theme based on Tailwind CSS
    monaco.editor.defineTheme("tailwind-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1e293b", // slate-800
        "editor.foreground": "#e2e8f0", // slate-200
        "editorCursor.foreground": "#38bdf8", // sky-400
        "editor.lineHighlightBackground": "#334155", // slate-700
        "editorLineNumber.foreground": "#94a3b8", // slate-400
        "editor.selectionBackground": "#475569", // slate-600
        "editor.inactiveSelectionBackground": "#334155", // slate-700
      },
    })

    monaco.editor.defineTheme("tailwind-light", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#f8fafc", // slate-50
        "editor.foreground": "#334155", // slate-700
        "editorCursor.foreground": "#0284c7", // sky-600
        "editor.lineHighlightBackground": "#e2e8f0", // slate-200
        "editorLineNumber.foreground": "#64748b", // slate-500
        "editor.selectionBackground": "#cbd5e1", // slate-300
        "editor.inactiveSelectionBackground": "#e2e8f0", // slate-200
      },
    })
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
`
    setEnvFileContent(envFileContent)

    // Create docker-compose without environment variables section and YAML anchors
    const composeHeader = `#  ____   ____ __  __ 
# |  _ \\ / ___|  \\/  |
# | | | | |   | |\\/| | This compose file was generated by DCM: https://github.com/ajnart/docker-compose-maker
# | |_| | |___| |  | |
# |____/ \\____|_|  |_|
#
`

    // Generate services section
    let servicesSection = `services:
`

    // Add each selected tool
    selectedTools.forEach((tool) => {
      if (!tool.composeContent) return
      // Add a blank line before each service
      servicesSection += `
`
      // Add a comment with the tool description
      servicesSection += `  # ${tool.name}: ${tool.description}
`
      // Process the compose content - properly indent everything
      let toolContent = tool.composeContent.replace(/^services:\s*/gm, "") // Remove the services: line

      // Create a more robust indentation system for nested YAML
      const lines = toolContent.split("\n")
      let currentIndentLevel = 0

      const processedLines = lines.map((line, index) => {
        // Skip empty lines
        if (line.trim() === "") return line

        const trimmedLine = line.trim()
        const isServiceLine = index === 0 || lines[index - 1].trim() === ""

        // Reset indent level for service lines
        if (isServiceLine) {
          currentIndentLevel = 0
          return `  ${trimmedLine}` // 2 spaces for service name
        }

        // Determine if this line defines a new block (ends with colon)
        const definesBlock =
          trimmedLine.endsWith(":") && !trimmedLine.includes(": ")

        // Check if previous line defined a block (which would make this line deeper)
        const prevLine = index > 0 ? lines[index - 1].trim() : ""
        const prevDefinesBlock =
          prevLine.endsWith(":") && !prevLine.includes(": ")

        // Increase indent level if previous line defined a block
        if (prevDefinesBlock) {
          currentIndentLevel++
        }
        // Detect decrease in indentation by checking original indentation
        else if (!isServiceLine && index > 0) {
          const originalIndent = line.match(/^\s*/)?.[0].length || 0
          const prevOriginalIndent =
            lines[index - 1].match(/^\s*/)?.[0].length || 0

          // If current line has less original indentation than previous line,
          // we need to decrease our indentation level
          if (originalIndent < prevOriginalIndent) {
            // Calculate how many levels to go back based on the difference
            const levels = Math.floor((prevOriginalIndent - originalIndent) / 2)
            currentIndentLevel = Math.max(0, currentIndentLevel - levels)
          }
        }

        // Calculate spaces for the current indent level (base of 2 + 2 per level)
        const spaces = 2 + currentIndentLevel * 2
        return `${" ".repeat(spaces)}${trimmedLine}`
      })

      toolContent = processedLines.join("\n")

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

    const completeCompose = composeHeader + servicesSection
    setComposeContent(completeCompose)
  }, [isOpen, selectedTools, settings, showInterpolated])

  // Reset copied state when changing tabs
  useEffect(() => {
    setCopied(false)
  }, [activeTab])

  // Update editor theme when theme changes
  useEffect(() => {
    if (!mounted) return

    // Update the existing editors when theme changes
    if (composeEditorRef.current) {
      const currentTheme =
        resolvedTheme === "dark" ? "tailwind-dark" : "tailwind-light"
      composeEditorRef.current.updateOptions({ theme: currentTheme })
    }

    if (envEditorRef.current) {
      const currentTheme =
        resolvedTheme === "dark" ? "tailwind-dark" : "tailwind-light"
      envEditorRef.current.updateOptions({ theme: currentTheme })
    }
  }, [resolvedTheme, mounted])

  // Handle copy to clipboard
  const handleCopy = () => {
    // Get content based on active tab
    const content =
      activeTab === "compose"
        ? composeEditorRef.current?.getValue() || composeContent
        : envEditorRef.current?.getValue() || envFileContent

    // Copy the content to clipboard
    navigator.clipboard
      .writeText(content)
      .then(() => {
        console.log(
          `${activeTab === "compose" ? "Docker compose" : "Environment file"} copied to clipboard`,
        )
        // Set copied state to show animation
        setCopied(true)

        // Show toast notification
        toast.success(
          `${activeTab === "compose" ? "Docker Compose" : ".env"} file copied to clipboard`,
          {
            description: `${selectedTools.length} service${selectedTools.length !== 1 ? "s" : ""} configuration copied.`,
            duration: 3000,
          },
        )

        // Add confetti animation class to the button
        const button = document.getElementById("copy-button")
        if (button) {
          button.classList.add("hover:motion-preset-confetti")
          // Remove the class after animation completes
          setTimeout(() => {
            button.classList.remove("hover:motion-preset-confetti")
          }, 1000)
        }

        // Log analytics
        posthog.capture("copy_compose_success", {
          selected_tools: selectedTools.map((t) => t.id),
          settings: settings,
          file_type: activeTab,
        })

        // Reset copied state after 2 seconds
        setTimeout(() => {
          setCopied(false)
        }, 2000)

        // Note: We don't close the modal now
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        toast.error("Failed to copy to clipboard", {
          description: err.message || "An error occurred while copying",
          duration: 5000,
        })
      })
  }

  // Handle file download
  const handleDownload = () => {
    // Get content and filename based on active tab
    const content =
      activeTab === "compose"
        ? composeEditorRef.current?.getValue() || composeContent
        : envEditorRef.current?.getValue() || envFileContent

    const filename = activeTab === "compose" ? "docker-compose.yaml" : ".env"

    try {
      // Create a blob and download link
      const blob = new Blob([content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()

      // Show toast notification
      toast.success(`${filename} downloaded`, {
        description: "File has been downloaded to your computer.",
        duration: 3000,
      })

      // Clean up
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 100)

      // Log analytics
      posthog.capture("download_compose_file", {
        selected_tools: selectedTools.map((t) => t.id),
        settings: settings,
        file_type: activeTab,
      })
    } catch (err) {
      console.error("Failed to download file: ", err)
      toast.error("Failed to download file", {
        description:
          err instanceof Error
            ? err.message
            : "An error occurred while downloading",
        duration: 5000,
      })
    }
  }

  // Function to handle editor mounting
  const handleComposeEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
  ) => {
    composeEditorRef.current = editor

    // Set the theme after mount to ensure it's correct
    if (mounted) {
      const currentTheme =
        resolvedTheme === "dark" ? "tailwind-dark" : "tailwind-light"
      editor.updateOptions({ theme: currentTheme })
    }
  }

  const handleEnvEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    envEditorRef.current = editor

    // Set the theme after mount to ensure it's correct
    if (mounted) {
      const currentTheme =
        resolvedTheme === "dark" ? "tailwind-dark" : "tailwind-light"
      editor.updateOptions({ theme: currentTheme })
    }
  }

  // Get the current theme for editors
  const currentTheme = !mounted
    ? "vs"
    : resolvedTheme === "dark"
      ? "tailwind-dark"
      : "tailwind-light"

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="flex h-[90vh] max-w-[95vw] flex-col overflow-y-auto">
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <div>
            <AlertDialogTitle>Docker Compose Configuration</AlertDialogTitle>
            <AlertDialogDescription>
              Generated docker-compose files for {selectedTools.length} selected
              service{selectedTools.length !== 1 ? "s" : ""}.
            </AlertDialogDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="interpolate-values"
                checked={showInterpolated}
                onCheckedChange={setShowInterpolated}
              />
              <Label htmlFor="interpolate-values">
                Show interpolated values
              </Label>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="flex-1">
          <EmbeddedSettings />

          <div className="mb-2 flex items-center justify-between">
            <Tabs
              className="w-full"
              defaultValue="compose"
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <TabsList>
                <TabsTrigger value="compose">
                  <svg
                    aria-label="GitHub"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4 fill-current"
                  >
                    <path d={siDocker.path} />
                  </svg>
                  docker-compose.yaml
                </TabsTrigger>
                <TabsTrigger value="env">
                  <File className="mr-2 h-4 w-4" />
                  .env
                </TabsTrigger>
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

          <div className="h-[calc(65vh-40px)] flex-1 overflow-hidden rounded border">
            {activeTab === "compose" && (
              <ComposeEditor
                content={composeContent}
                onMount={handleComposeEditorDidMount}
                beforeMount={handleEditorWillMount}
                theme={currentTheme}
              />
            )}
            {activeTab === "env" && (
              <EnvEditor
                content={envFileContent}
                onMount={handleEnvEditorDidMount}
                theme={currentTheme}
              />
            )}
          </div>
        </div>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onOpenChange.bind(null, false)}>
            Done
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
