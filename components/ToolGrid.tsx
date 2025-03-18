import type { DockerTool } from "@/lib/docker-tools"
import DockerCard from "./docker-card"

type ToolGridProps = {
  tools: DockerTool[]
  selectedTools: string[]
  onToggleSelection: (toolId: string) => void
}

const ToolGrid = ({
  tools,
  selectedTools,
  onToggleSelection,
}: ToolGridProps) => {
  const gridClasses =
    "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-7"

  return (
    <div className="before:-inset-4 before:-z-10 relative rounded-lg p-4 before:absolute before:rounded-lg before:bg-gradient-to-r before:from-primary/20 before:via-primary/5 before:to-primary/20 before:blur-3xl">
      <div className={gridClasses}>
        {tools.map((tool) => (
          <div key={tool.id} className="h-full">
            <DockerCard
              tool={tool}
              isSelected={selectedTools.includes(tool.id)}
              onSelect={() => onToggleSelection(tool.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ToolGrid
