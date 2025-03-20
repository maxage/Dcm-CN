import { TemplateCategory } from "./template-categories";
import type { Template } from "./templates";

// Predefined templates
export const templateDefinitions: Template[] = [
  {
    id: "media-server",
    name: "Media Server Stack",
    description: "Complete media server with Jellyfin, Sonarr, Radarr, and more",
    category: TemplateCategory.MEDIA,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/jellyfin.png",
    tools: [
      "jellyfin",
      "sonarr",
      "radarr",
      "prowlarr",
      "qbittorrent",
      "bazarr"
    ]
  },
  {
    id: "plex-alternative",
    name: "Plex Media Server",
    description: "Plex-based media server with automation tools",
    category: TemplateCategory.MEDIA,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/plex.png",
    tools: [
      "plex",
      "sonarr",
      "radarr",
      "prowlarr",
      "overseerr",
      "qbittorrent"
    ]
  },
  {
    id: "media-requesters",
    name: "Media Request System",
    description: "Tools for users to request new media content",
    category: TemplateCategory.MEDIA,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/overseerr.png",
    tools: [
      "overseerr",
      "jellyseerr",
      "doplarr",
      "requestrr",
    ]
  },
  {
    id: "web-development",
    name: "Web Development Stack",
    description: "NGINX, MySQL, and Redis for web development",
    category: TemplateCategory.DEVELOPMENT,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/nginx.png",
    tools: [
      "nginx",
      "mysql",
      "redis",
      "phpmyadmin"
    ]
  },
  {
    id: "php-dev",
    name: "PHP Development Stack",
    description: "NGINX, PHP, MySQL for PHP development",
    category: TemplateCategory.DEVELOPMENT,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/php.png",
    tools: [
      "nginx",
      "php",
      "mysql",
      "phpmyadmin"
    ]
  },
  {
    id: "monitoring",
    name: "Monitoring Stack",
    description: "Grafana, Prometheus, and more for system monitoring",
    category: TemplateCategory.MONITORING,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/grafana.png",
    tools: [
      "grafana",
      "prometheus",
      "cadvisor"
    ]
  },
  {
    id: "database-cluster",
    name: "Database Cluster",
    description: "Multiple database engines with management tools",
    category: TemplateCategory.DATABASE,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/database.png",
    tools: [
      "mysql",
      "mariadb",
      "postgres",
      "mongodb",
      "redis",
      "phpmyadmin",
      "pgadmin"
    ]
  },
  {
    id: "smart-home",
    name: "Smart Home Hub",
    description: "Home Assistant with support services",
    category: TemplateCategory.OTHER,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/home-assistant.png",
    tools: [
      "homeassistant",
      "mosquitto",
      "node-red",
      "zigbee2mqtt"
    ]
  },
  {
    id: "personal-cloud",
    name: "Personal Cloud",
    description: "Self-hosted cloud storage and productivity tools",
    category: TemplateCategory.PRODUCTIVITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/nextcloud.png",
    tools: [
      "nextcloud",
      "mariadb",
      "redis",
      "collabora"
    ]
  },
  {
    id: "security-stack",
    name: "Security Stack",
    description: "Password management and security tools",
    category: TemplateCategory.SECURITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/vaultwarden.png",
    tools: [
      "vaultwarden",
      "traefik",
      "authelia",
      "crowdsec"
    ]
  },
  {
    id: "smart-home-advanced",
    name: "Advanced Smart Home Hub",
    description: "Complete home automation setup with Home Assistant, Node-RED, MQTT, and Zigbee integration",
    category: TemplateCategory.HOME_AUTOMATION,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/home-assistant.png",
    tools: [
      "homeassistant",
      "node-red",
      "mosquitto",
      "zigbee2mqtt",
      "grafana",
      "influxdb"
    ]
  },
  {
    id: "network-management",
    name: "Network Management Stack",
    description: "Complete network management with ad blocking, monitoring, and controller software",
    category: TemplateCategory.NETWORK,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/pi-hole.png",
    tools: [
      "pihole",
      "unifi",
      "uptime-kuma",
      "speedtest-tracker",
      "traefik"
    ]
  },
  {
    id: "home-security",
    name: "Home Security Stack",
    description: "Security-focused tools for privacy, password management, and secure access",
    category: TemplateCategory.SECURITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/vaultwarden.png",
    tools: [
      "vaultwarden",
      "adguardhome",
      "traefik",
      "authelia",
      "crowdsec"
    ]
  },
  {
    id: "personal-productivity",
    name: "Personal Productivity Suite",
    description: "Self-hosted tools for productivity, notes, tasks, and reading",
    category: TemplateCategory.PRODUCTIVITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/nextcloud.png",
    tools: [
      "nextcloud",
      "freshrss",
      "wallabag",
      "filebrowser",
      "mariadb",
      "redis"
    ]
  },
  {
    id: "home-finance",
    name: "Personal Finance Management",
    description: "Track expenses, income, budgets and investments with a complete financial suite",
    category: TemplateCategory.FINANCE,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/firefly-iii.png",
    tools: [
      "firefly",
      "mariadb",
      "homepage"
    ]
  },
  {
    id: "cooking-recipes",
    name: "Recipe Management Stack",
    description: "Organize and manage your digital recipes with these specialized tools",
    category: TemplateCategory.PRODUCTIVITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/tandoor.png",
    tools: [
      "tandoorrecipes",
      "mealie",
      "postgres"
    ]
  },
  {
    id: "advanced-monitoring",
    name: "Advanced Monitoring Stack",
    description: "Comprehensive system and service monitoring with beautiful dashboards",
    category: TemplateCategory.MONITORING,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/grafana.png",
    tools: [
      "grafana",
      "prometheus",
      "loki",
      "netdata",
      "glances",
      "uptime-kuma",
      "scrutiny"
    ]
  },
  {
    id: "media-download",
    name: "Media Download Stack",
    description: "Complete suite for downloading movies, TV shows, music, and more",
    category: TemplateCategory.DOWNLOAD,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/qbittorrent.png",
    tools: [
      "qbittorrent",
      "sabnzbd",
      "jackett",
      "prowlarr",
      "flaresolverr",
      "transmission"
    ]
  },
  {
    id: "e-book-stack",
    name: "E-Book & Comics Server",
    description: "Complete solution for managing and reading e-books, comics, and manga",
    category: TemplateCategory.MEDIA,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/calibre-web.png",
    tools: [
      "calibreweb",
      "kavita",
      "readarr",
      "audiobookshelf"
    ]
  },
  {
    id: "photo-management",
    name: "Photo Management Stack",
    description: "Manage and browse your photo collection with AI features and organization tools",
    category: TemplateCategory.MEDIA,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/photoprism.png",
    tools: [
      "photoprism",
      "immich",
      "mariadb",
      "redis"
    ]
  },
  {
    id: "music-streaming",
    name: "Music Streaming Server",
    description: "Self-hosted music streaming with multiple options for different needs",
    category: TemplateCategory.MEDIA,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/navidrome.png",
    tools: [
      "navidrome",
      "airsonic-advanced",
      "lidarr"
    ]
  },
  {
    id: "media-request",
    name: "Enhanced Media Request System",
    description: "Multiple options for managing user requests for your media server",
    category: TemplateCategory.MEDIA,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/overseerr.png",
    tools: [
      "overseerr",
      "jellyseerr",
      "ombi",
      "requestrr",
      "doplarr"
    ]
  },
  {
    id: "server-dashboard",
    name: "Server Dashboard & Management",
    description: "Tools to manage and monitor your server with beautiful dashboards",
    category: TemplateCategory.PRODUCTIVITY,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/homepage.png",
    tools: [
      "homepage",
      "portainer",
      "uptime-kuma",
      "scrutiny",
      "dozzle"
    ]
  },
  {
    id: "dev-environment",
    name: "Remote Development Environment",
    description: "Self-hosted development tools for coding from anywhere",
    category: TemplateCategory.DEVELOPMENT,
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/vscode.png",
    tools: [
      "openvscode",
      "filebrowser",
      "postgres",
      "mysql",
      "redis"
    ]
  }
]; 