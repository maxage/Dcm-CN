import type { DockerSettings } from "@/components/settings-panel"
import type { DockerTool } from "@/lib/docker-tools"
import { detectAndFixPortConflicts } from "./port-conflicts"

export function generateEnvFileContent(settings: DockerSettings): string {
  return `# Docker Compose 环境变量
# 这些变量可以通过 shell 环境或 .env 文件进行覆盖

# 用户/组标识符
# 这些有助于避免主机和容器之间的权限问题
PUID=${settings.puid}
PGID=${settings.pgid}
UMASK=${settings.umask}

# 容器名称前缀
CONTAINER_PREFIX=${settings.containerNamePrefix}

# 持久化数据路径
CONFIG_PATH=${settings.configPath}
DATA_PATH=${settings.dataPath}

# 容器设置
TZ=${settings.timezone}
RESTART_POLICY=${settings.restartPolicy}
NETWORK_MODE=${settings.networkMode}
`
}

export function generateEnvFile(
  selectedTools: DockerTool[],
  settings: DockerSettings,
): string {
  // Start with the base environment variables
  let envContent = generateEnvFileContent(settings)

  // Extract any custom environment variables from the tools
  selectedTools.forEach((tool) => {
    if (!tool.composeContent) return

    // Look for environment variables in the compose content
    const envMatches = tool.composeContent.match(
      /environment:(?:\s*-\s*([A-Z0-9_]+)=.+)+/gms,
    )

    if (envMatches && envMatches.length > 0) {
      envContent += `\n# ${tool.name} 专用环境变量\n`

      // Extract each variable
      const varMatches = tool.composeContent.match(
        /\s*-\s*([A-Z0-9_]+)=([^\n]+)/g,
      )
      if (varMatches) {
        varMatches.forEach((match) => {
          const parts = match.match(/\s*-\s*([A-Z0-9_]+)=([^\n]+)/)
          if (parts && parts.length >= 3) {
            const varName = parts[1]
            let varValue = parts[2].trim()

            // Remove any quotes from the value
            if (
              (varValue.startsWith('"') && varValue.endsWith('"')) ||
              (varValue.startsWith("'") && varValue.endsWith("'"))
            ) {
              varValue = varValue.substring(1, varValue.length - 1)
            }

            // Only add if it's not already a system variable we provide
            if (!envContent.includes(`${varName}=`)) {
              envContent += `${varName}=${varValue}\n`
            }
          }
        })
      }
    }
  })

  return envContent
}

export function generateComposeContent(
  selectedTools: DockerTool[],
  settings: DockerSettings,
  showInterpolated: boolean,
): {
  content: string
  portConflicts: { fixed: number; conflicts: string[] } | null
} {
  const composeHeader = `#  ____   ____ __  __ 
# |  _ \\ / ___|  \\/  |
# | | | | |   | |\\/| | 此 Compose 文件由 DCM 生成：https://github.com/ajnart/dcm
# | |_| | |___| |  | |
# |____/ \\____|_|  |_|
#
`

  let servicesSection = `services:
`

  selectedTools.forEach((tool) => {
    if (!tool.composeContent) return
    servicesSection += `
`
    servicesSection += `  # ${tool.name}: ${tool.description}
`
    let toolContent = tool.composeContent.replace(/^services:\s*/gm, "")

    const lines = toolContent.split("\n")
    let currentIndentLevel = 0

    const processedLines = lines.map((line, index) => {
      if (line.trim() === "") return line

      const trimmedLine = line.trim()
      const isServiceLine = index === 0 || lines[index - 1].trim() === ""

      if (isServiceLine) {
        currentIndentLevel = 0
        return `  ${trimmedLine}`
      }

      const definesBlock =
        trimmedLine.endsWith(":") && !trimmedLine.includes(": ")

      const prevLine = index > 0 ? lines[index - 1].trim() : ""
      const prevDefinesBlock =
        prevLine.endsWith(":") && !prevLine.includes(": ")

      if (prevDefinesBlock) {
        currentIndentLevel++
      } else if (!isServiceLine && index > 0) {
        const originalIndent = line.match(/^\s*/)?.[0].length || 0
        const prevOriginalIndent =
          lines[index - 1].match(/^\s*/)?.[0].length || 0

        if (originalIndent < prevOriginalIndent) {
          const levels = Math.floor((prevOriginalIndent - originalIndent) / 2)
          currentIndentLevel = Math.max(0, currentIndentLevel - levels)
        }
      }

      const spaces = 2 + currentIndentLevel * 2
      return `${" ".repeat(spaces)}${trimmedLine}`
    })

    toolContent = processedLines.join("\n")

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

  const { fixedContent, conflicts } = detectAndFixPortConflicts(completeCompose)

  return {
    content: fixedContent,
    portConflicts: conflicts,
  }
}
