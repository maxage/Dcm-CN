"use client"

import Editor from "@monaco-editor/react"
import type { editor } from "monaco-editor"
import { memo } from "react"

// Function to configure Monaco with custom themes
export const configureMonacoThemes = (monaco: typeof import("monaco-editor")) => {
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

// Base editor component properties
interface BaseEditorProps {
  content: string
  onMount: (editor: editor.IStandaloneCodeEditor) => void
  theme: string
  beforeMount?: (monaco: typeof import("monaco-editor")) => void
}

// Memoized YAML Editor component for docker-compose
export const ComposeEditor = memo(
  ({ content, onMount, beforeMount, theme }: BaseEditorProps) => (
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

// Memoized INI Editor component for .env files
export const EnvEditor = memo(
  ({ content, onMount, theme }: BaseEditorProps) => (
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