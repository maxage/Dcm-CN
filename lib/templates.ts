import type { DockerTool } from "./docker-tools";

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  tools: string[]; // Array of tool IDs
}

// Template categories
export enum TemplateCategory {
  MEDIA = "Media",
  DEVELOPMENT = "Development",
  MONITORING = "Monitoring",
  DATABASE = "Database",
  PRODUCTIVITY = "Productivity",
  SECURITY = "Security",
  OTHER = "Other",
}

// Helper function to find tools by their IDs
export function getToolsFromTemplate(template: Template, allTools: DockerTool[]): DockerTool[] {
  return template.tools
    .map(toolId => allTools.find(tool => tool.id === toolId))
    .filter((tool): tool is DockerTool => tool !== undefined);
}

// Predefined templates
export const templates: Template[] = [
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
  }
]; 