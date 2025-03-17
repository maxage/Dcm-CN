export interface DockerTool {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  githubUrl?: string
}

export const dockerTools: DockerTool[] = [
  {
    id: "sonarr",
    name: "Sonarr",
    description: "Smart PVR for newsgroup and bittorrent users to monitor TV shows.",
    category: "Media",
    tags: ["TV", "PVR", "Monitoring"],
    githubUrl: "https://github.com/Sonarr/Sonarr"
  },
  {
    id: "radarr",
    name: "Radarr",
    description: "A fork of Sonarr to work with movies à la Couchpotato.",
    category: "Media",
    tags: ["Movies", "PVR", "Monitoring"],
    githubUrl: "https://github.com/Radarr/Radarr"
  },
  {
    id: "lidarr",
    name: "Lidarr",
    description: "Looks and smells like Sonarr but made for music.",
    category: "Media",
    tags: ["Music", "PVR", "Monitoring"],
    githubUrl: "https://github.com/lidarr/Lidarr"
  },
  {
    id: "readarr",
    name: "Readarr",
    description: "Book, Magazine, Comics eBook and Audiobook Manager and Automation.",
    category: "Media",
    tags: ["Books", "PVR", "Monitoring"],
    githubUrl: "https://github.com/Readarr/Readarr"
  },
  {
    id: "prowlarr",
    name: "Prowlarr",
    description: "Indexer manager/proxy for Sonarr, Radarr, Lidarr, etc.",
    category: "Media",
    tags: ["Indexer", "Proxy"],
    githubUrl: "https://github.com/Prowlarr/Prowlarr"
  },
  {
    id: "jellyfin",
    name: "Jellyfin",
    description: "The Free Software Media System that puts you in control of your media.",
    category: "Media",
    tags: ["Streaming", "Media Server"],
    githubUrl: "https://github.com/jellyfin/jellyfin"
  },
  {
    id: "plex",
    name: "Plex",
    description: "Organize, stream, and share your personal collection of movies, TV, music, and photos.",
    category: "Media",
    tags: ["Streaming", "Media Server"],
    githubUrl: "https://github.com/plexinc"
  },
  {
    id: "emby",
    name: "Emby",
    description: "Bring all of your home videos, music, and photos together into one place.",
    category: "Media",
    tags: ["Streaming", "Media Server"],
    githubUrl: "https://github.com/MediaBrowser/Emby"
  },
  {
    id: "portainer",
    name: "Portainer",
    description: "Making Docker and Kubernetes management easy.",
    category: "Management",
    tags: ["Docker", "Management", "UI"],
    githubUrl: "https://github.com/portainer/portainer"
  },
  {
    id: "heimdall",
    name: "Heimdall",
    description: "An Application dashboard and launcher for your webapps.",
    category: "Management",
    tags: ["Dashboard", "Launcher"],
    githubUrl: "https://github.com/linuxserver/Heimdall"
  },
  {
    id: "traefik",
    name: "Traefik",
    description: "The Cloud Native Application Proxy.",
    category: "Networking",
    tags: ["Proxy", "Load Balancer", "SSL"],
  },
  {
    id: "nginx",
    name: "Nginx",
    description: "High Performance Load Balancer, Web Server, & Reverse Proxy.",
    category: "Networking",
    tags: ["Web Server", "Proxy", "Load Balancer"],
  },
  {
    id: "pihole",
    name: "Pi-hole",
    description: "Network-wide Ad Blocking.",
    category: "Networking",
    tags: ["Ad Blocking", "DNS", "Privacy"],
  },
  {
    id: "adguardhome",
    name: "AdGuard Home",
    description: "Network-wide ads & trackers blocking DNS server.",
    category: "Networking",
    tags: ["Ad Blocking", "DNS", "Privacy"],
  },
  {
    id: "nextcloud",
    name: "Nextcloud",
    description: "A safe home for all your data.",
    category: "Storage",
    tags: ["Cloud Storage", "Collaboration", "File Sharing"],
  },
  {
    id: "mariadb",
    name: "MariaDB",
    description: "One of the most popular database servers.",
    category: "Database",
    tags: ["SQL", "Database", "MySQL"],
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    description: "The world's most advanced open source database.",
    category: "Database",
    tags: ["SQL", "Database"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    description: "The most popular database for modern apps.",
    category: "Database",
    tags: ["NoSQL", "Database"],
  },
  {
    id: "redis",
    name: "Redis",
    description: "Open source in-memory data structure store.",
    category: "Database",
    tags: ["Cache", "NoSQL", "Database"],
  },
  {
    id: "grafana",
    name: "Grafana",
    description: "The open observability platform.",
    category: "Monitoring",
    tags: ["Monitoring", "Visualization", "Metrics"],
  },
  {
    id: "prometheus",
    name: "Prometheus",
    description: "Power your metrics and alerting with a leading open-source monitoring solution.",
    category: "Monitoring",
    tags: ["Monitoring", "Metrics", "Alerting"],
  },
  {
    id: "homeassistant",
    name: "Home Assistant",
    description: "Open source home automation that puts local control and privacy first.",
    category: "Home Automation",
    tags: ["Smart Home", "Automation", "IoT"],
  },
  {
    id: "vaultwarden",
    name: "Vaultwarden",
    description: "Unofficial Bitwarden compatible server written in Rust.",
    category: "Security",
    tags: ["Password Manager", "Security"],
  },
  {
    id: "gitea",
    name: "Gitea",
    description: "A painless self-hosted Git service.",
    category: "Development",
    tags: ["Git", "Version Control", "CI/CD"],
    githubUrl: "https://github.com/go-gitea/gitea"
  },
  {
    id: "code-server",
    name: "Code Server",
    description: "Run VS Code on any machine anywhere and access it in the browser.",
    category: "Development",
    tags: ["IDE", "Development", "VS Code"],
    githubUrl: "https://github.com/coder/code-server"
  },
]

