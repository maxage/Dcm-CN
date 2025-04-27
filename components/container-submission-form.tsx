"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  composeContentSchema,
  validateComposeContent,
} from "@/lib/docker-tools"
import { tools } from "@/tools"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogDescription } from "@radix-ui/react-dialog"
import {
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Github,
  Info,
  PlusCircle,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { GradientButton } from "./ui/gradient-button"

const CATEGORIES = [
  "媒体",
  "管理",
  "网络",
  "存储",
  "数据库",
  "监控",
  "家庭自动化",
  "安全",
  "开发",
]

// Collect all unique tags from existing tools
const ALL_TAGS = Array.from(new Set(tools.flatMap((tool) => tool.tags))).sort()

const formSchema = z.object({
  id: z
    .string()
    .min(1, "容器 ID 不能为空")
    .regex(
      /^[a-z0-9-]+$/,
      "ID 只能包含小写字母、数字和连字符",
    ),
  name: z.string().min(1, "名称不能为空"),
  description: z.string().min(1, "描述不能为空"),
  category: z.string().min(1, "类别不能为空"),
  tags: z.array(z.string()).min(1, "至少需要一个标签"),
  githubUrl: z.string().url("必须是有效的 URL").or(z.literal("")),
  icon: z.string().url("必须是有效的 URL").or(z.literal("")),
  containerData: composeContentSchema,
})

type FormValues = z.infer<typeof formSchema>

export function ContainerSubmissionForm() {
  const [open, setOpen] = useState(false)
  const [tagInput, setTagInput] = useState("")
  const [validationResult, setValidationResult] = useState<ReturnType<
    typeof validateComposeContent
  > | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "sonarr",
      name: "Sonarr",
      description: "",
      category: "Media",
      tags: ["TV", "PVR", "Monitoring"],
      githubUrl: "https://github.com/sonarr",
      icon: "",
      containerData: `services:
  sonarr:
    container_name: \${CONTAINER_PREFIX}sonarr
    image: ghcr.io/hotio/sonarr:latest
    ports:
      - "8989:8989"
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - UMASK=\${UMASK}
      - TZ=\${TZ}
    volumes:
      - \${CONFIG_PATH}/sonarr:/config
      - \${DATA_PATH}/tv:/data/tv
      - \${DATA_PATH}/downloads:/data/downloads
    restart: \${RESTART_POLICY}`,
    },
  })

  // Update validation result when containerData changes
  useEffect(() => {
    const containerData = form.watch("containerData")
    if (containerData) {
      const result = validateComposeContent(containerData)
      setValidationResult(result)
    }
  }, [form.watch("containerData")])

  function onSubmit(values: FormValues) {
    // Redirect directly to the new form-based issue template
    const repoUrl = "https://github.com/ajnart/dcm"
    const issueUrl = `${repoUrl}/issues/new?template=container-submission.yml&title=container: ${encodeURIComponent(values.name)}&id=${encodeURIComponent(values.id)}&name=${encodeURIComponent(values.name)}&description=${encodeURIComponent(values.description)}&category=${encodeURIComponent(values.category)}&tags=${encodeURIComponent(values.tags.join(", "))}&githubUrl=${encodeURIComponent(values.githubUrl || "")}&icon=${encodeURIComponent(values.icon || "")}&containerData=${encodeURIComponent(values.containerData)}`

    // Open the GitHub issue form in a new tab
    window.open(issueUrl, "_blank")
    setOpen(false)
  }

  // Function to open GitHub issue template directly
  const openGitHubIssue = () => {
    const issueUrl =
      "https://github.com/ajnart/dcm/issues/new?template=container-submission.yml"
    window.open(issueUrl, "_blank")
  }

  // Generate unique keys for list items
  const generateUniqueKey = (prefix: string, value: string) =>
    `${prefix}-${value.replace(/\s+/g, "-").toLowerCase()}`

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <GradientButton
          gradientFrom="from-green-500/20"
          gradientTo="to-green-400/20"
          className="[animation-delay:300ms] motion-safe:animate-slide-in-right"
        >
          <PlusCircle size={18} />
          <span>建议容器</span>
        </GradientButton>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>建议新容器</DialogTitle>
          <DialogDescription>
            提交表单将会跳转到 GitHub 创建一个预填充了此表单内容的 Issue。
            维护者将会审核提交的内容，如果通过，将会被添加到容器列表中。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>容器 ID</FormLabel>
                    <FormControl>
                      <Input placeholder="例如：sonarr, postgres" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>名称</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="显示名称 (例如：Sonarr, PostgreSQL)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="容器用途的简要描述"
                      className="min-h-[50px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>类别</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="选择类别" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>GitHub URL (可选)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username/repo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>图标 URL (可选)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/example.svg"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-muted-foreground text-xs">
                    我们推荐使用来自{" "}
                    <a 
                      href="https://github.com/homarr-labs/dashboard-icons" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-primary underline underline-offset-4"
                    >
                      homarr-labs/dashboard-icons
                    </a>
                    . 格式：https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/[name].svg
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>标签</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput
                          placeholder="添加标签并按 Enter"
                          value={tagInput}
                          onValueChange={setTagInput}
                        />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {tagInput.length > 0 &&
                            !ALL_TAGS.includes(tagInput) && (
                              <MultiSelectorItem value={tagInput}>
                                Create tag "{tagInput}"
                              </MultiSelectorItem>
                            )}
                          {ALL_TAGS.filter((tag) =>
                            tag.toLowerCase().includes(tagInput.toLowerCase()),
                          ).map((tag) => (
                            <MultiSelectorItem key={tag} value={tag}>
                              {tag}
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="containerData"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Docker Compose 服务定义</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="请输入 YAML 格式的服务定义"
                      className="min-h-[280px] resize-none font-mono"
                      {...field}
                    />
                  </FormControl>

                  {/* Validation feedback section */}
                  {validationResult && (
                    <div className="space-y-2">
                      {validationResult.errors.length > 0 && (
                        <Alert variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>验证错误</AlertTitle>
                          <AlertDescription>
                            <ul className="list-inside list-disc">
                              {validationResult.errors.map((error) => (
                                <li key={generateUniqueKey("error", error)}>
                                  {error}
                                </li>
                              ))}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      )}

                      {validationResult.warnings.length > 0 && (
                        <Alert variant="warning">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>警告</AlertTitle>
                          <AlertDescription>
                            <ul className="list-inside list-disc">
                              {validationResult.warnings.map((warning) => (
                                <li key={generateUniqueKey("warning", warning)}>
                                  {warning}
                                </li>
                              ))}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      )}

                      {validationResult.errors.length === 0 &&
                        validationResult.warnings.length === 0 && (
                          <Alert variant="success">
                            <CheckCircle className="h-4 w-4" />
                            <AlertTitle>验证通过</AlertTitle>
                            <AlertDescription>
                              Docker Compose 配置有效
                            </AlertDescription>
                          </Alert>
                        )}

                      <Alert variant="info">
                        <Info className="h-4 w-4" />
                        <AlertTitle>提示</AlertTitle>
                        <AlertDescription>
                          请确保您的 Docker Compose 配置使用了环境变量，这样其他用户可以根据自己的需求进行调整。
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={openGitHubIssue}
                className="flex items-center gap-2"
              >
                <Github size={18} />
                <span>直接打开 GitHub Issue 模板</span>
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  取消
                </Button>
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  className="flex items-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <span>提交容器</span>
                  <ExternalLink size={16} />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
