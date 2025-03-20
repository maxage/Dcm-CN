"use client"

import Editor from "@monaco-editor/react"
import { memo } from "react"

export const configureMonacoThemes = (
  monaco: typeof import("monaco-editor"),
) => {
  monaco.editor.defineTheme("tailwind-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#1e293b",
      "editor.foreground": "#e2e8f0",
      "editorCursor.foreground": "#38bdf8",
      "editor.lineHighlightBackground": "#334155",
      "editorLineNumber.foreground": "#94a3b8",
      "editor.selectionBackground": "#475569",
      "editor.inactiveSelectionBackground": "#334155",
    },
  })

  monaco.editor.defineTheme("tailwind-light", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#f8fafc",
      "editor.foreground": "#334155",
      "editorCursor.foreground": "#0284c7",
      "editor.lineHighlightBackground": "#e2e8f0",
      "editorLineNumber.foreground": "#64748b",
      "editor.selectionBackground": "#cbd5e1",
      "editor.inactiveSelectionBackground": "#e2e8f0",
    },
  })
}

interface BaseEditorProps {
  content: string
  onMount: (editor: editor.IStandaloneCodeEditor) => void
  theme: string
  beforeMount?: (monaco: typeof import("monaco-editor")) => void
}

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
