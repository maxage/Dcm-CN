import { TemplateCategory } from "./template-categories"
import type { Template } from "./templates"

// Predefined templates with personality-based themes
export const templateDefinitions: Template[] = [
  {
    id: "the-self-promo",
    name: "The Self Promoter",
    description:
      "推广你的其他自托管服务？这真是有点尴尬...",
    category: TemplateCategory.MEDIA,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/homarr.png",
    tools: ["homarr"],
  },
  {
    id: "the-privacy-schizo",
    name: "The Privacy Schizo",
    description:
      "如果他们真的在监视你，那就不是偏执了。锡箔帽需要另外购买。",
    category: TemplateCategory.SECURITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/pi-hole.png",
    tools: [
      "pihole",
      "wireguard",
      "vaultwarden",
      "traefik",
      "authelia",
      "crowdsec",
    ],
  },
  {
    id: "the-dad",
    name: "The Dad",
    description:
      "基础的家庭服务器设置，让所有人都开心，并将 Wi-Fi 投诉降到最低",
    category: TemplateCategory.MEDIA,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/jellyfin.png",
    tools: ["jellyfin", "nextcloud", "pihole", "homarr", "homeassistant"],
  },
  {
    id: "the-media-server-starter",
    name: "The Media Server Starter",
    description:
      "一个简单的媒体服务器设置，适合那些'Netflix又涨价了？'的人群",
    category: TemplateCategory.MEDIA,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/jellyfin.png",
    tools: ["jellyfin", "sonarr", "radarr", "prowlarr", "qbittorrent"],
  },
  {
    id: "the-media-hoarder",
    name: "The Media Hoarder",
    description:
      "适合那些从不删除任何东西，总是需要'再买一个硬盘'的数字囤积者",
    category: TemplateCategory.MEDIA,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/jellyfin.png",
    tools: [
      "jellyfin",
      "sonarr",
      "radarr",
      "lidarr",
      "prowlarr",
      "qbittorrent",
      "bazarr",
      "jellyseerr",
      "calibreweb",
      "readarr",
    ],
  },
  {
    id: "the-automator",
    name: "The Automator",
    description:
      "花10小时自动化一个2分钟的任务，因为'这是原则问题'",
    category: TemplateCategory.HOME_AUTOMATION,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/home-assistant.png",
    tools: [
      "homeassistant",
      "node-red",
      "mosquitto",
      "zigbee2mqtt",
      "grafana",
      "influxdb",
    ],
  },
  {
    id: "the-home-office",
    name: "The Home Office",
    description:
      "在家工作所需的一切，让你的文件不会成为云服务的人质",
    category: TemplateCategory.PRODUCTIVITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/nextcloud.png",
    tools: [
      "nextcloud",
      "mariadb",
      "code-server",
      "vaultwarden",
      "filebrowser",
    ],
  },
  {
    id: "the-coomer",
    name: "The Collector",
    description:
      "让你的'作业文件夹'井井有条并自动化。我们不作评判。",
    category: TemplateCategory.MEDIA,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/stash.png",
    tools: ["whisparr", "prowlarr", "transmission", "flaresolverr"],
  },
  {
    id: "the-dashboard-enjoyer",
    name: "The Dashboard Enjoyer",
    description:
      "花在自定义仪表板上的时间比实际使用服务的时间还多",
    category: TemplateCategory.MONITORING,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/homepage.png",
    tools: [
      "homepage",
      "grafana",
      "prometheus",
      "uptime-kuma",
      "portainer",
      "heimdall",
    ],
  },
  {
    id: "the-security-essentials",
    name: "The Security Essentials",
    description:
      "基础的安全设置，适合那些想要保护数字生活又不想把钥匙弄丢的人",
    category: TemplateCategory.SECURITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/vaultwarden.png",
    tools: ["vaultwarden", "wireguard", "pihole", "traefik", "authelia"],
  },
  {
    id: "the-backup-basics",
    name: "The Backup Basics",
    description:
      "因为即使是数字囤积者也需要确保他们的收藏能在灾难中幸存",
    category: TemplateCategory.OTHER,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/duplicacy.png",
    tools: ["nextcloud", "syncthing", "mariadb"],
  },
  {
    id: "the-homarr-enjoyer",
    name: "The Homarr Enjoyer",
    description:
      "仪表板小部件比实际服务还多，每天都要重新排列'以优化工作流程'",
    category: TemplateCategory.MONITORING,
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/homarr.svg",
    tools: ["homarr", "uptime-kuma", "portainer", "watchtower", "statping-ng"],
  },
  {
    id: "the-docker-novice",
    name: "The Docker Novice",
    description:
      "看了一个 YouTube 教程后就自豪地宣布'已经掌握容器化了'",
    category: TemplateCategory.MONITORING,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/portainer.png",
    tools: ["portainer", "watchtower", "homarr", "nginx"],
  },
  {
    id: "the-just-the-basics",
    name: "The Just The Basics",
    description:
      "自托管的可靠入门套件，不会让你整个周末都在读文档",
    category: TemplateCategory.OTHER,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/portainer.png",
    tools: ["portainer", "nextcloud", "jellyfin", "pihole"],
  },
  {
    id: "the-raspberry-pi-warrior",
    name: "The Raspberry Pi Warrior",
    description:
      "在一个35美元的电脑上运行17个关键服务，配上一个随时可能坏掉的 microSD 卡",
    category: TemplateCategory.OTHER,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/pi-hole.png",
    tools: ["pihole", "portainer", "nextcloud", "traefik"],
  },
  {
    id: "the-data-scientist",
    name: "The Data Scientist",
    description:
      "分析厨房电器使用模式以确定最佳咖啡冲泡时间表",
    category: TemplateCategory.DATABASE,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/grafana.png",
    tools: [
      "grafana",
      "prometheus",
      "influxdb",
      "postgres",
      "elasticsearch",
      "kibana",
    ],
  },
  {
    id: "the-digital-librarian",
    name: "The Digital Librarian",
    description:
      "拥有比十辈子都读不完的书还要多的藏书，但收藏必须继续增长",
    category: TemplateCategory.MEDIA,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/calibre-web.png",
    tools: [
      "calibreweb",
      "readarr",
      "kavita",
      "komga",
      "audiobookshelf",
      "mariadb",
    ],
  },
  {
    id: "the-small-office",
    name: "小型办公室",
    description:
      "适合想要将数据保持在本地并节省一些费用的小型企业或家庭办公室",
    category: TemplateCategory.PRODUCTIVITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/nextcloud.png",
    tools: [
      "nextcloud",
      "wikijs",
      "mariadb",
      "portainer",
      "vaultwarden",
      "traefik",
    ],
  },
  {
    id: "the-recipe-collector",
    name: "食谱收藏家",
    description:
      "保存了永远不会做的每一道菜谱，但食物照片看起来很棒",
    category: TemplateCategory.PRODUCTIVITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/tandoor.png",
    tools: ["tandoorrecipes", "mealie", "postgres"],
  },
  {
    id: "the-budget-hawk",
    name: "预算守护者",
    description:
      "花500美元托管服务来节省每月5美元的费用，同时追踪每一分钱",
    category: TemplateCategory.FINANCE,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/firefly-iii.png",
    tools: ["firefly", "mariadb", "scrutiny"],
  },
  {
    id: "the-homelab-newbie",
    name: "家庭实验室新手",
    description:
      "即将发现为什么大家总是用不祥的语气提到'备份'",
    category: TemplateCategory.OTHER,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/nextcloud.png",
    tools: ["nextcloud", "jellyfin", "portainer", "pihole", "homarr"],
  },
  {
    id: "the-perpetual-student",
    name: "永恒学习者",
    description:
      "把家庭服务器变成一个永远不会真正使用的个人知识管理系统",
    category: TemplateCategory.PRODUCTIVITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/nextcloud.png",
    tools: [
      "nextcloud",
      "bookstack",
      "wikijs",
      "wallabag",
      "freshrss",
      "mysql",
    ],
  },
  {
    id: "the-dev-environment",
    name: "开发环境",
    description:
      "说服自己需要企业级的 CI/CD 来做个人项目",
    category: TemplateCategory.DEVELOPMENT,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/vscode.png",
    tools: ["code-server", "gitea", "jenkins", "postgres", "redis", "nginx"],
  },
  {
    id: "the-family-tech-support",
    name: "家庭技术支持",
    description:
      "搭建了完美的系统，这样家人就可以问'网络是不是坏了？'而不是自己去谷歌",
    category: TemplateCategory.OTHER,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/adguard-home.png",
    tools: ["pihole", "uptime-kuma", "nextcloud", "jellyfin", "homeassistant"],
  },
  {
    id: "the-note-taking-addict",
    name: "笔记收集狂",
    description:
      "尝试过每一个笔记应用，却还是无法决定用哪一个",
    category: TemplateCategory.PRODUCTIVITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/joplin.png",
    tools: ["joplin-server", "wikijs", "bookstack", "logseq", "mariadb"],
  },
  {
    id: "the-uptime-obsessor",
    name: "在线率执着者",
    description:
      "查看状态仪表板的频率比社交媒体还高，为0.1%的宕机时间而恐慌",
    category: TemplateCategory.MONITORING,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/uptime-kuma.png",
    tools: ["uptime-kuma", "statping-ng", "prometheus", "grafana", "netdata"],
  },
  {
    id: "the-compose-enthusiast",
    name: "Compose 发烧友",
    description:
      "有一个精心制作的 YAML 文件 Git 仓库，'绝对不是从随机 GitHub 仓库复制的'",
    category: TemplateCategory.DEVELOPMENT,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/portainer.png",
    tools: ["portainer", "nginx", "traefik", "watchtower", "homarr"],
  },
  {
    id: "the-paperless-dreamer",
    name: "无纸化梦想家",
    description:
      "扫描每一张收据和文档，同时桌上堆满了真实的纸张",
    category: TemplateCategory.PRODUCTIVITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/paperless-ngx.png",
    tools: ["nextcloud", "mariadb", "redis"],
  },
  {
    id: "the-wiki-hoarder",
    name: "Wiki 收藏家",
    description:
      "记录每一个系统配置直到最后一个 SSH 密钥，却从未翻阅过",
    category: TemplateCategory.PRODUCTIVITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/wikijs.png",
    tools: ["wikijs", "bookstack", "postgres", "nginx"],
  },
  {
    id: "the-vpn-tunneler",
    name: "VPN 隧道专家",
    description:
      "通过如此多层加密路由流量，以至于忘记了自己想要访问什么网站",
    category: TemplateCategory.SECURITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/wireguard.png",
    tools: ["wireguard", "traefik", "pihole", "adguardhome"],
  },
  {
    id: "the-reverse-proxy-master",
    name: "反向代理大师",
    description:
      "可以向任何与之眼神接触的人详细解释 Traefik、Nginx 和 Caddy 之间的区别",
    category: TemplateCategory.NETWORK,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/traefik.png",
    tools: ["traefik", "nginx", "caddy", "portainer"],
  },
  {
    id: "the-minimalist",
    name: "极简主义者",
    description:
      "只运行'必要的' 25 个容器，并称之为'轻量级设置'",
    category: TemplateCategory.OTHER,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/alpine.png",
    tools: ["nginx", "pihole", "portainer", "nextcloud"],
  },
  {
    id: "the-file-synchronizer",
    name: "文件同步控",
    description:
      "'为了安全起见'在7个不同的服务上复制了相同的文件",
    category: TemplateCategory.OTHER,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/syncthing.png",
    tools: ["syncthing", "nextcloud", "filebrowser", "mariadb"],
  },
]
