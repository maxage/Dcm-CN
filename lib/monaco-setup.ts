import type Monaco from 'monaco-editor';
import { configureMonacoYaml } from 'monaco-yaml';

// Compose schema URL
const COMPOSE_SCHEMA_URL = "https://raw.githubusercontent.com/compose-spec/compose-spec/master/schema/compose-spec.json";

export function setupMonaco(monaco: typeof Monaco): void {
  // Define Tailwind dark theme
  monaco.editor.defineTheme('tailwind-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#1e293b', // slate-800
      'editor.foreground': '#e2e8f0', // slate-200
      'editorCursor.foreground': '#38bdf8', // sky-400
      'editor.lineHighlightBackground': '#334155', // slate-700
      'editorLineNumber.foreground': '#94a3b8', // slate-400
      'editor.selectionBackground': '#475569', // slate-600
      'editor.inactiveSelectionBackground': '#334155', // slate-700
    },
  });

  // Define Tailwind light theme
  monaco.editor.defineTheme('tailwind-light', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#f8fafc', // slate-50
      'editor.foreground': '#334155', // slate-700
      'editorCursor.foreground': '#0284c7', // sky-600
      'editor.lineHighlightBackground': '#e2e8f0', // slate-200
      'editorLineNumber.foreground': '#64748b', // slate-500
      'editor.selectionBackground': '#cbd5e1', // slate-300
      'editor.inactiveSelectionBackground': '#e2e8f0', // slate-200
    },
  });

  // Configure monaco-yaml
  try {
    const modelUri = monaco.Uri.parse('file:///docker-compose.yaml');
    
    // Set up YAML language support
    configureMonacoYaml(monaco, {
      enableSchemaRequest: true,
      completion: true,
      validate: true,
      format: true,
      hover: true,
      schemas: [
        {
          // The schema applies to docker-compose files
          fileMatch: ['*docker-compose*', '*.yml', '*.yaml', modelUri.toString()],
          // Use the compose schema URL
          uri: COMPOSE_SCHEMA_URL
        }
      ]
    });
    
    console.log('Monaco YAML configured successfully');
  } catch (error) {
    console.error("Error configuring Monaco YAML:", error);
  }
} 