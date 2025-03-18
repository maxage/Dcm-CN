export interface DockerTool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  githubUrl?: string;
  /** We recommend following this schema for common icons: https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/<Format>/<Name>.<Format> */
  icon?: string;
  stars?: number;
}

export const dockerTools: DockerTool[] = [
  {
    id: "sonarr",
    name: "Sonarr",
    description:
      "Smart PVR for newsgroup and bittorrent users to monitor TV shows.",
    category: "Media",
    tags: ["TV", "PVR", "Monitoring"],
    githubUrl: "https://github.com/Sonarr/Sonarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/sonarr.svg",
  },
  {
    id: "radarr",
    name: "Radarr",
    description: "A fork of Sonarr to work with movies à la Couchpotato.",
    category: "Media",
    tags: ["Movies", "PVR", "Monitoring"],
    githubUrl: "https://github.com/Radarr/Radarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/radarr.svg",
  },
  {
    id: "lidarr",
    name: "Lidarr",
    description: "Looks and smells like Sonarr but made for music.",
    category: "Media",
    tags: ["Music", "PVR", "Monitoring"],
    githubUrl: "https://github.com/lidarr/Lidarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/lidarr.svg",
  },
  {
    id: "readarr",
    name: "Readarr",
    description:
      "Book, Magazine, Comics eBook and Audiobook Manager and Automation.",
    category: "Media",
    tags: ["Books", "PVR", "Monitoring"],
    githubUrl: "https://github.com/Readarr/Readarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/readarr.svg",
  },
  {
    id: "prowlarr",
    name: "Prowlarr",
    description: "Indexer manager/proxy for Sonarr, Radarr, Lidarr, etc.",
    category: "Media",
    tags: ["Indexer", "Proxy"],
    githubUrl: "https://github.com/Prowlarr/Prowlarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/prowlarr.svg",
  },
  // Homarr
  {
    id: "homarr",
    name: "Homarr",
    description: "A simple, elegant, and easy-to-use home dashboard and launcher.",
    category: "Management",
    tags: ["Dashboard", "Launcher"],
    githubUrl: "https://github.com/homarr-labs/homarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/homarr.svg",
  },
  {
    id: "jellyfin",
    name: "Jellyfin",
    description:
      "The Free Software Media System that puts you in control of your media.",
    category: "Media",
    tags: ["Streaming", "Media Server"],
    githubUrl: "https://github.com/jellyfin/jellyfin",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/jellyfin.svg",
  },
  {
    id: "plex",
    name: "Plex",
    description:
      "Organize, stream, and share your personal collection of movies, TV, music, and photos.",
    category: "Media",
    tags: ["Streaming", "Media Server"],
    githubUrl: "https://github.com/plexinc/pms-docker",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/plex.svg",
  },
  {
    id: "emby",
    name: "Emby",
    description:
      "Bring all of your home videos, music, and photos together into one place.",
    category: "Media",
    tags: ["Streaming", "Media Server"],
    githubUrl: "https://github.com/MediaBrowser/Emby",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/emby.svg",
  },
  {
    id: "portainer",
    name: "Portainer",
    description: "Making Docker and Kubernetes management easy.",
    category: "Management",
    tags: ["Docker", "Management", "UI"],
    githubUrl: "https://github.com/portainer/portainer",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/portainer.svg",
  },
  {
    id: "heimdall",
    name: "Heimdall",
    description: "An Application dashboard and launcher for your webapps.",
    category: "Management",
    tags: ["Dashboard", "Launcher"],
    githubUrl: "https://github.com/linuxserver/Heimdall",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/heimdall.svg",
  },
  {
    id: "traefik",
    name: "Traefik",
    description: "The Cloud Native Application Proxy.",
    category: "Networking",
    tags: ["Proxy", "Load Balancer", "SSL"],
    githubUrl: "https://github.com/traefik/traefik",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/traefik.svg",
  },
  {
    id: "nginx",
    name: "Nginx",
    description: "High Performance Load Balancer, Web Server, & Reverse Proxy.",
    category: "Networking",
    tags: ["Web Server", "Proxy", "Load Balancer"],
    githubUrl: "https://github.com/nginx/nginx",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nginx.svg",
  },
  {
    id: "pihole",
    name: "Pi-hole",
    description: "Network-wide Ad Blocking.",
    category: "Networking",
    tags: ["Ad Blocking", "DNS", "Privacy"],
    githubUrl: "https://github.com/pi-hole/pi-hole",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/pi-hole.svg",
  },
  {
    id: "adguardhome",
    name: "AdGuard Home",
    description: "Network-wide ads & trackers blocking DNS server.",
    category: "Networking",
    tags: ["Ad Blocking", "DNS", "Privacy"],
    githubUrl: "https://github.com/AdguardTeam/AdGuardHome",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/adguard-home.svg",
  },
  {
    id: "nextcloud",
    name: "Nextcloud",
    description: "A safe home for all your data.",
    category: "Storage",
    tags: ["Cloud Storage", "Collaboration", "File Sharing"],
    githubUrl: "https://github.com/nextcloud/server",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nextcloud.svg",
  },
  {
    id: "mariadb",
    name: "MariaDB",
    description: "One of the most popular database servers.",
    category: "Database",
    tags: ["SQL", "Database", "MySQL"],
    githubUrl: "https://github.com/MariaDB/server",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/mariadb.svg",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    description: "The world's most advanced open source database.",
    category: "Database",
    tags: ["SQL", "Database"],
    githubUrl: "https://github.com/postgres/postgres",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/postgres.svg",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    description: "The most popular database for modern apps.",
    category: "Database",
    tags: ["NoSQL", "Database"],
    githubUrl: "https://github.com/mongodb/mongo",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/mongodb.svg",
  },
  {
    id: "redis",
    name: "Redis",
    description: "Open source in-memory data structure store.",
    category: "Database",
    tags: ["Cache", "NoSQL", "Database"],
    githubUrl: "https://github.com/redis/redis",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/redis.svg",
  },
  {
    id: "grafana",
    name: "Grafana",
    description: "The open observability platform.",
    category: "Monitoring",
    tags: ["Monitoring", "Visualization", "Metrics"],
    githubUrl: "https://github.com/grafana/grafana",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/grafana.svg",
  },
  {
    id: "prometheus",
    name: "Prometheus",
    description:
      "Power your metrics and alerting with a leading open-source monitoring solution.",
    category: "Monitoring",
    tags: ["Monitoring", "Metrics", "Alerting"],
    githubUrl: "https://github.com/prometheus/prometheus",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/prometheus.svg",
  },
  {
    id: "homeassistant",
    name: "Home Assistant",
    description:
      "Open source home automation that puts local control and privacy first.",
    category: "Home Automation",
    tags: ["Smart Home", "Automation", "IoT"],
    githubUrl: "https://github.com/home-assistant/core",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/home-assistant.svg",
  },
  {
    id: "vaultwarden",
    name: "Vaultwarden",
    description: "Unofficial Bitwarden compatible server written in Rust.",
    category: "Security",
    tags: ["Password Manager", "Security"],
    githubUrl: "https://github.com/dani-garcia/vaultwarden",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/vaultwarden.svg",
  },
  {
    id: "gitea",
    name: "Gitea",
    description: "A painless self-hosted Git service.",
    category: "Development",
    tags: ["Git", "Version Control", "CI/CD"],
    githubUrl: "https://github.com/go-gitea/gitea",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/gitea.svg",
  },
  {
    id: "code-server",
    name: "Code Server",
    description:
      "Run VS Code on any machine anywhere and access it in the browser.",
    category: "Development",
    tags: ["IDE", "Development", "VS Code"],
    githubUrl: "https://github.com/coder/code-server",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/code-server.png",
  },
];

// Cache for GitHub stars data
let cachedTools: DockerTool[] | null = null;

/**
 * Extracts the owner and repo from a GitHub URL
 * @param url GitHub URL in format https://github.com/owner/repo
 */
function extractGitHubInfo(url: string): { owner: string; repo: string } | null {
  try {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return null;
    return { owner: match[1], repo: match[2] };
  } catch {
    return null;
  }
}

/**
 * Helper function to add delay between requests
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches GitHub stars for all tools that have a GitHub URL
 * This function should be called at build time to populate the stars field
 */
export async function fetchGitHubStars(): Promise<DockerTool[]> {
  // Return cached data if available
  if (cachedTools) {
    return cachedTools;
  }

  const toolsWithGitHub = dockerTools.filter(tool => tool.githubUrl);
  
  const updatedTools = [];
  
  // Process tools sequentially with delay
  for (const tool of dockerTools) {
    if (!tool.githubUrl) {
      updatedTools.push(tool);
      continue;
    }

    const githubInfo = extractGitHubInfo(tool.githubUrl);
    if (!githubInfo) {
      updatedTools.push(tool);
      continue;
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${githubInfo.owner}/${githubInfo.repo}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            ...(process.env.GITHUB_TOKEN && {
              'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
            })
          }
        }
      );

      if (!response.ok) {
        console.warn(`Failed to fetch stars for ${tool.name}: ${response.statusText}`);
        updatedTools.push(tool);
      } else {
        const data = await response.json();
        updatedTools.push({
          ...tool,
          stars: data.stargazers_count
        });
      }

      // Add delay between requests
      await delay(250);
    } catch (error) {
      console.warn(`Error fetching stars for ${tool.name}:`, error);
      updatedTools.push(tool);
    }
  }

  // Cache the results
  cachedTools = updatedTools;
  return updatedTools;
}
