/**
 * Detects and fixes port conflicts in docker-compose files
 * @param content The docker-compose YAML content
 * @returns Object containing fixed content and conflict details
 */
export function detectAndFixPortConflicts(
  content: string,
): {
  fixedContent: string
  conflicts: { fixed: number; conflicts: string[] } | null
} {
  // Regular expressions to find port mappings in docker-compose file
  const portMappingRegex = /- ["']?(\d+):(\d+)["']?/g

  // Track external ports and conflicts
  const externalPorts: Record<string, Set<string>> = {}
  const conflicts: string[] = []
  let fixedCount = 0

  // Create a working copy we can modify
  let result = content.slice()

  // Used to track all allocated ports to avoid new conflicts
  const allocatedPorts = new Set<string>()

  // First pass: collect all mapped ports
  const portMatches = content.matchAll(portMappingRegex)
  for (const portMatch of portMatches) {
    const externalPort = portMatch[1]
    allocatedPorts.add(externalPort)

    // Determine which service this port belongs to
    // Find the service name by analyzing the context
    let serviceContext = content.substring(0, portMatch.index!)
    const lastServicesSectionIndex = serviceContext.lastIndexOf("services:")
    if (lastServicesSectionIndex >= 0) {
      serviceContext = serviceContext.substring(lastServicesSectionIndex)
    }

    // Find the service name using a more reliable approach
    const serviceLines = serviceContext.split("\n")
    let serviceName = "unknown"

    // Scan backward through lines to find the service definition
    for (let i = serviceLines.length - 1; i >= 0; i--) {
      const line = serviceLines[i].trim()
      // Look for lines with a pattern like "servicename:" at the start of a line with indent level 2
      const serviceNameMatch = serviceLines[i].match(
        /^\s{2}([a-zA-Z0-9_-]+):\s*(?:#.*)?$/,
      )
      if (serviceNameMatch) {
        serviceName = serviceNameMatch[1]
        break
      }
    }

    // Initialize with a Set to avoid duplicates
    if (!externalPorts[externalPort]) {
      externalPorts[externalPort] = new Set<string>()
    }
    externalPorts[externalPort].add(serviceName)
  }

  // Second pass: fix conflicts
  Object.entries(externalPorts).forEach(([port, servicesSet]) => {
    const services = Array.from(servicesSet)
    if (services.length > 1) {
      // We have a conflict to fix
      // Keep the first service unchanged, fix others
      const keptService = services[0]

      // Generate conflict description with services
      conflicts.push(`Port ${port} was used by: ${services.join(", ")}`)

      // Fix the conflicts for all but the first service
      for (let i = 1; i < services.length; i++) {
        const serviceToFix = services[i]

        // Find all occurrences of port mappings for this service with this port
        const servicePortRegex = new RegExp(
          `(\\s{2}${serviceToFix}:[\\s\\S]*?ports:[\\s\\S]*?- ["']?)(${port})(:(?:\\d+)["']?)`,
          "gm",
        )

        // Find and process each match
        let match: RegExpExecArray | null
        while ((match = servicePortRegex.exec(result)) !== null) {
          // Find a new port that's not already allocated
          let newPort = Number(port) + 1
          while (allocatedPorts.has(String(newPort))) {
            newPort++
          }

          // Mark this port as allocated now
          allocatedPorts.add(String(newPort))

          // Replace just this occurrence with the new port
          const replacement = `${match[1]}${newPort}${match[3]}`

          // Add the port change to the conflict message if it's our first fix for this service
          if (match === servicePortRegex.exec(result)) {
            conflicts[conflicts.length - 1] +=
              `\n  → Changed ${serviceToFix}: ${port} → ${newPort}`
          }

          // Apply the replacement
          result =
            result.substring(0, match.index) +
            replacement +
            result.substring(match.index + match[0].length)

          fixedCount++

          // Reset regex after modification
          servicePortRegex.lastIndex = 0
        }
      }
    }
  })

  return {
    fixedContent: result,
    conflicts: conflicts.length > 0 ? { fixed: fixedCount, conflicts } : null,
  }
} 