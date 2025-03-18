export interface DockerTool {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  githubUrl?: string
  /** We recommend following this schema for common icons: https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/<Format>/<Name>.<Format> */
  icon?: string
  stars?: number
  composeContent?: string
  isUnsupported?: boolean
}

export const dockerTools: DockerTool[] = [
  {
    id: "sonarr",
    name: "Sonarr",
    description:
      "Smart PVR for usenet and bittorrent users. Monitors multiple RSS feeds for new TV show episodes, automatically grabbing, sorting, and renaming them.",
    category: "Media",
    tags: ["TV", "PVR", "Automation"],
    githubUrl: "https://github.com/Sonarr/Sonarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/sonarr.svg",
    composeContent: `services:
  sonarr:
    image: lscr.io/linuxserver/sonarr:latest
    container_name: \${CONTAINER_PREFIX}sonarr
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/sonarr:/config
      - \${DATA_PATH}/tv:/tv
      - \${DATA_PATH}/downloads:/downloads
    ports:
      - 8989:8989
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "radarr",
    name: "Radarr",
    description:
      "A fork of Sonarr to work with movies. Automatically monitors and downloads movies, handles quality upgrades, and manages your movie collection with an elegant web interface.",
    category: "Media",
    tags: ["Movies", "PVR", "Automation"],
    githubUrl: "https://github.com/Radarr/Radarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/radarr.svg",
    composeContent: `services:
  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: \${CONTAINER_PREFIX}radarr
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/radarr:/config
      - \${DATA_PATH}/movies:/movies
      - \${DATA_PATH}/downloads:/downloads
    ports:
      - 7878:7878
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "lidarr",
    name: "Lidarr",
    description:
      "A music collection manager for Usenet and BitTorrent users. Monitors multiple RSS feeds for new tracks from your favorite artists, automatically grabbing, sorting, and renaming them.",
    category: "Media",
    tags: ["Music", "PVR", "Automation"],
    githubUrl: "https://github.com/lidarr/Lidarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/lidarr.svg",
    composeContent: `services:
  lidarr:
    image: lscr.io/linuxserver/lidarr:latest
    container_name: \${CONTAINER_PREFIX}lidarr
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/lidarr:/config
      - \${DATA_PATH}/music:/music
      - \${DATA_PATH}/downloads:/downloads
    ports:
      - 8686:8686
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "readarr",
    name: "Readarr",
    description:
      "A book, magazine, comics eBook and audiobook collection manager. Automatically monitors and downloads your favorite literature, handles quality upgrades, and manages your digital library.",
    category: "Media",
    tags: ["Books", "eBooks", "Automation"],
    githubUrl: "https://github.com/Readarr/Readarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/readarr.svg",
    composeContent: `services:
  readarr:
    image: lscr.io/linuxserver/readarr:develop
    container_name: \${CONTAINER_PREFIX}readarr
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/readarr:/config
      - \${DATA_PATH}/books:/books
      - \${DATA_PATH}/downloads:/downloads
    ports:
      - 8787:8787
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "prowlarr",
    name: "Prowlarr",
    description:
      "A powerful indexer manager/proxy built on the arr stack. Seamlessly integrates with Sonarr, Radarr, Lidarr, and Readarr, supporting both Torrent Trackers and Usenet Indexers with centralized management.",
    category: "Media",
    tags: ["Indexer", "Proxy", "Integration"],
    githubUrl: "https://github.com/Prowlarr/Prowlarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/prowlarr.svg",
    composeContent: `services:
  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: \${CONTAINER_PREFIX}prowlarr
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/prowlarr:/config
    ports:
      - 9696:9696
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "homarr",
    name: "Homarr",
    description:
      "A modern, feature-rich dashboard for your server. Integrates with Docker for container management, supports multiple users with advanced permissions, and provides a sleek interface for managing your self-hosted services.",
    category: "Management",
    tags: ["Dashboard", "Management", "Monitoring"],
    githubUrl: "https://github.com/homarr-labs/homarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/homarr.svg",
    composeContent: `services:
  homarr:
    container_name: \${CONTAINER_PREFIX}homarr
    image: ghcr.io/homarr-labs/homarr:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - \${CONFIG_PATH}/homarr:/appdata
    environment:
      - TZ=\${TZ}
      - SECRET_ENCRYPTION_KEY=your_64_character_hex_string
    ports:
      - '7575:7575'
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "jellyfin",
    name: "Jellyfin",
    description:
      "A free software media system that puts you in control of managing and streaming your media. It is an alternative to the proprietary Emby and Plex, with no premium features behind a paywall.",
    category: "Media",
    tags: ["Streaming", "Media Server", "Transcoding"],
    githubUrl: "https://github.com/jellyfin/jellyfin",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/jellyfin.svg",
    composeContent: `services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: \${CONTAINER_PREFIX}jellyfin
    user: \${PUID}:\${PGID}
    network_mode: \${NETWORK_MODE}
    volumes:
      - \${CONFIG_PATH}/jellyfin:/config
      - \${CONFIG_PATH}/jellyfin/cache:/cache
      - \${DATA_PATH}/media:/media
    environment:
      - TZ=\${TZ}
      - JELLYFIN_PublishedServerUrl=http://example.com
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "plex",
    name: "Plex",
    description:
      "A powerful media server that organizes video, music, and photos from personal libraries and streams them to smart TVs, streaming boxes, and mobile devices. Features a polished interface and advanced features for media management.",
    category: "Media",
    tags: ["Streaming", "Media Server", "Transcoding"],
    githubUrl: "https://github.com/plexinc/pms-docker",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/plex.svg",
    composeContent: `services:
  plex:
    image: lscr.io/linuxserver/plex:latest
    container_name: \${CONTAINER_PREFIX}plex
    network_mode: \${NETWORK_MODE}
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - VERSION=docker
      - PLEX_CLAIM= #optional
    volumes:
      - \${CONFIG_PATH}/plex:/config
      - \${DATA_PATH}/tv:/tv
      - \${DATA_PATH}/movies:/movies
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "emby",
    name: "Emby",
    description:
      "A powerful media server that organizes and streams your video, music, live TV, and photos from personal media libraries to smart TVs, streaming boxes, and mobile devices. Features a standalone server with comprehensive media management capabilities.",
    category: "Media",
    tags: ["Streaming", "Media Server", "Live TV"],
    githubUrl: "https://github.com/MediaBrowser/Emby",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/emby.svg",
    composeContent: `services:
  emby:
    image: lscr.io/linuxserver/emby:latest
    container_name: \${CONTAINER_PREFIX}emby
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
    volumes:
      - \${CONFIG_PATH}/emby:/config
      - \${DATA_PATH}/tv:/data/tvshows
      - \${DATA_PATH}/movies:/data/movies
    ports:
      - 8096:8096
      - 8920:8920 #optional
    devices:
      - /dev/dri:/dev/dri #optional
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "portainer",
    name: "Portainer",
    description:
      "A powerful container management interface that provides a user-friendly web UI for managing Docker environments. Features include container deployment, stack management with Docker Compose support, volume management, network configuration, and real-time container monitoring.",
    category: "Management",
    tags: ["Management", "UI", "Monitoring"],
    githubUrl: "https://github.com/portainer/portainer",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/portainer.svg",
    composeContent: `services:
  portainer:
    image: portainer/portainer-ce:latest
    container_name: \${CONTAINER_PREFIX}portainer
    ports:
      - "9443:9443"
      - "8000:8000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - \${DATA_PATH}/portainer:/data
    environment:
      - TZ=\${TZ}
    restart: \${RESTART_POLICY}
volumes:
  portainer_data:`,
  },
  {
    id: "heimdall",
    name: "Heimdall",
    description:
      "A modern, elegant application dashboard and launcher that helps you organize all your web applications. Features a clean interface, customizable categories, and support for various authentication methods.",
    category: "Dashboard",
    tags: ["Dashboard", "Launcher", "Organization"],
    githubUrl: "https://github.com/linuxserver/Heimdall",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/heimdall.svg",
    composeContent: `services:
  heimdall:
    image: lscr.io/linuxserver/heimdall:latest
    container_name: \${CONTAINER_PREFIX}heimdall
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
    volumes:
      - \${CONFIG_PATH}/heimdall:/config
    ports:
      - "80:80"
      - "443:443"
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "traefik",
    name: "Traefik",
    description:
      "A modern, cloud-native application proxy and load balancer that makes deploying microservices easy. Features automatic service discovery, Let's Encrypt support, and dynamic configuration.",
    category: "Networking",
    tags: ["Proxy", "Load Balancer", "SSL"],
    githubUrl: "https://github.com/traefik/traefik",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/traefik.svg",
    composeContent: `services:
  traefik:
    image: traefik:v3.3
    container_name: \${CONTAINER_PREFIX}traefik
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entryPoints.web.address=:80"
      - "--entryPoints.websecure.address=:443"
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - \${CONFIG_PATH}/traefik:/etc/traefik
    environment:
      - TZ=\${TZ}
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "nginx",
    name: "Nginx",
    description:
      "A powerful, high-performance web server and reverse proxy server. Features include load balancing, HTTP caching, serving static files, SSL/TLS termination, and acting as a reverse proxy for other services.",
    category: "Networking",
    tags: ["Web Server", "Reverse Proxy", "Load Balancer"],
    githubUrl: "https://github.com/nginx/nginx",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nginx.svg",
    composeContent: `services:
  nginx:
    image: nginx:1-alpine
    container_name: \${CONTAINER_PREFIX}nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - \${CONFIG_PATH}/nginx/html:/usr/share/nginx/html
      - \${CONFIG_PATH}/nginx/conf.d:/etc/nginx/conf.d
      - \${CONFIG_PATH}/nginx/ssl:/etc/nginx/ssl
    environment:
      - TZ=\${TZ}
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "pihole",
    name: "Pi-hole",
    description: "Network-wide Ad Blocking.",
    category: "Networking",
    tags: ["Ad Blocking", "DNS", "Privacy"],
    githubUrl: "https://github.com/pi-hole/pi-hole",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/pi-hole.svg",
    composeContent: `services:
  pihole:
    container_name: \${CONTAINER_PREFIX}pihole
    image: pihole/pihole:latest
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "80:80/tcp"
      - "443:443/tcp"
    environment:
      - TZ=\${TZ}
      - FTLCONF_dns_listeningMode=all
    volumes:
      - \${CONFIG_PATH}/pihole:/etc/pihole
    cap_add:
      - NET_ADMIN
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "adguardhome",
    name: "AdGuard Home",
    description: "Network-wide ads & trackers blocking DNS server.",
    category: "Networking",
    tags: ["Ad Blocking", "DNS", "Privacy"],
    githubUrl: "https://github.com/AdguardTeam/AdGuardHome",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/adguard-home.svg",
    composeContent: `services:
  adguardhome:
    container_name: \${CONTAINER_PREFIX}adguardhome
    image: adguard/adguardhome:latest
    ports:
      - "53:53/udp"
      - "53:53/tcp"
      - "80:80/tcp"
      - "443:443/tcp"
      - "3000:3000/tcp"
    volumes:
      - \${CONFIG_PATH}/adguardhome/conf:/opt/adguardhome/conf
      - \${CONFIG_PATH}/adguardhome/work:/opt/adguardhome/work
    environment:
      - TZ=\${TZ}
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "nextcloud",
    name: "Nextcloud",
    description: "A safe home for all your data.",
    category: "Storage",
    tags: ["Cloud Storage", "File Sharing", "Collaboration"],
    githubUrl: "https://github.com/nextcloud/server",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nextcloud.svg",
    composeContent: `services:
  nextcloud:
    image: nextcloud:latest
    container_name: \${CONTAINER_PREFIX}nextcloud
    ports:
      - "8080:80"
    volumes:
      - \${CONFIG_PATH}/nextcloud/html:/var/www/html
      - \${CONFIG_PATH}/nextcloud/apps:/var/www/html/custom_apps
      - \${CONFIG_PATH}/nextcloud/config:/var/www/html/config
      - \${DATA_PATH}/nextcloud:/var/www/html/data
    environment:
      - MYSQL_HOST=nextclouddb
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_PASSWORD=nextcloud_db_password
      - NEXTCLOUD_ADMIN_USER=admin
      - NEXTCLOUD_ADMIN_PASSWORD=admin_password
      - NEXTCLOUD_TRUSTED_DOMAINS=localhost
      - TZ=\${TZ}
    restart: \${RESTART_POLICY}
  
  nextclouddb:
    image: mariadb:latest
    container_name: \${CONTAINER_PREFIX}nextcloud-db
    command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW
    volumes:
      - \${DATA_PATH}/nextcloud-db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=root_password
      - MYSQL_PASSWORD=nextcloud_db_password
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - TZ=\${TZ}
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "mariadb",
    name: "MariaDB",
    description: "One of the most popular database servers.",
    category: "Database",
    tags: ["SQL", "Database", "MySQL"],
    githubUrl: "https://github.com/MariaDB/server",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/mariadb.svg",
    composeContent: `services:
  mariadb:
    image: mariadb:latest
    container_name: \${CONTAINER_PREFIX}mariadb
    ports:
      - "3306:3306"
    volumes:
      - \${DATA_PATH}/mariadb:/var/lib/mysql
      - \${CONFIG_PATH}/mariadb:/etc/mysql/conf.d
    environment:
      - MYSQL_ROOT_PASSWORD=your_root_password
      - MYSQL_DATABASE=default_database
      - MYSQL_USER=default_user
      - MYSQL_PASSWORD=your_password
      - TZ=\${TZ}
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "mysql",
    name: "MySQL",
    description:
      "The world's most popular open source database. Features high performance, reliability, and ease of use.",
    category: "Database",
    tags: ["SQL", "Database", "Relational"],
    githubUrl: "https://github.com/mysql/mysql-server",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/mysql.svg",
    composeContent: `services:
  mysql:
    image: mysql:8.0
    container_name: \${CONTAINER_PREFIX}mysql
    cap_add:
      - SYS_NICE
    ports:
      - "3306:3306"
    volumes:
      - \${DATA_PATH}/mysql:/var/lib/mysql
      - \${CONFIG_PATH}/mysql/conf.d:/etc/mysql/conf.d
      - \${CONFIG_PATH}/mysql/init:/docker-entrypoint-initdb.d
    environment:
      - MYSQL_ROOT_PASSWORD=your_root_password
      - MYSQL_DATABASE=your_database
      - MYSQL_USER=your_user
      - MYSQL_PASSWORD=your_password
      - TZ=\${TZ}
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    description: "The world's most advanced open source database.",
    category: "Database",
    tags: ["SQL", "Database", "Relational"],
    githubUrl: "https://github.com/postgres/postgres",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/postgres.svg",
    composeContent: `services:
  postgres:
    image: postgres:latest
    container_name: \${CONTAINER_PREFIX}postgres
    ports:
      - "5432:5432"
    volumes:
      - \${DATA_PATH}/postgres:/var/lib/postgresql/data
      - \${CONFIG_PATH}/postgres:/etc/postgresql/conf.d
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=your_password
      - POSTGRES_DB=postgres
      - TZ=\${TZ}
    shm_size: 128mb
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    description:
      "A document-oriented NoSQL database that provides high performance, high availability, and easy scalability.",
    category: "Database",
    tags: ["NoSQL", "Database", "Document"],
    githubUrl: "https://github.com/mongodb/mongo",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/mongodb.svg",
    composeContent: `services:
  mongodb:
    image: mongo:latest
    container_name: \${CONTAINER_PREFIX}mongodb
    ports:
      - "27017:27017"
    volumes:
      - \${DATA_PATH}/mongodb:/data/db
      - \${CONFIG_PATH}/mongodb:/etc/mongo
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=your_password
      - MONGO_INITDB_DATABASE=admin
      - TZ=\${TZ}
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "redis",
    name: "Redis",
    description:
      "An open-source, in-memory data structure store used as a database, cache, message broker, and queue.",
    category: "Database",
    tags: ["Cache", "Database", "In-Memory"],
    githubUrl: "https://github.com/redis/redis",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/redis.svg",
    composeContent: `services:
  redis:
    image: redis:alpine
    container_name: \${CONTAINER_PREFIX}redis
    ports:
      - "6379:6379"
    command: redis-server --save 20 1 --loglevel warning --requirepass your_password
    volumes:
      - \${DATA_PATH}/redis:/data
      - \${CONFIG_PATH}/redis:/usr/local/etc/redis
    environment:
      - TZ=\${TZ}
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "grafana",
    name: "Grafana",
    description:
      "The open and composable observability and data visualization platform. Visualize metrics, logs, and traces from multiple sources.",
    category: "Monitoring",
    tags: ["Monitoring", "Visualization", "Analytics"],
    githubUrl: "https://github.com/grafana/grafana",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/grafana.svg",
    composeContent: `services:
  grafana:
    image: grafana/grafana-enterprise
    container_name: \${CONTAINER_PREFIX}grafana
    ports:
      - "3000:3000"
    volumes:
      - \${DATA_PATH}/grafana:/var/lib/grafana
      - \${CONFIG_PATH}/grafana/provisioning:/etc/grafana/provisioning
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=your_password
      - GF_USERS_ALLOW_SIGN_UP=false
      - TZ=\${TZ}
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "prometheus",
    name: "Prometheus",
    description:
      "A powerful monitoring and alerting toolkit designed for reliability. Features include a multi-dimensional data model, flexible query language (PromQL), efficient time series database, and modern alerting approach.",
    category: "Monitoring",
    tags: ["Monitoring", "Metrics", "Alerting"],
    githubUrl: "https://github.com/prometheus/prometheus",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/prometheus.svg",
    composeContent: `services:
  prometheus:
    image: prom/prometheus:latest
    container_name: \${CONTAINER_PREFIX}prometheus
    volumes:
      - \${CONFIG_PATH}/prometheus:/etc/prometheus
      - \${DATA_PATH}/prometheus:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/usr/share/prometheus/console_libraries'
      - '--web.console.templates=/usr/share/prometheus/consoles'
    ports:
      - "9090:9090"
    environment:
      - TZ=\${TZ}
    restart: \${RESTART_POLICY}`,
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
    composeContent: `services:
  homeassistant:
    image: homeassistant/home-assistant:latest
    container_name: \${CONTAINER_PREFIX}homeassistant
    ports:
      - "8123:8123"
    volumes:
      - \${CONFIG_PATH}/homeassistant:/config
    environment:
      - TZ=\${TZ}
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "vaultwarden",
    name: "Vaultwarden",
    description: "Unofficial Bitwarden compatible server written in Rust.",
    category: "Security",
    tags: ["Password Manager", "Security", "Bitwarden"],
    githubUrl: "https://github.com/dani-garcia/vaultwarden",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/vaultwarden.svg",
    composeContent: `services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: \${CONTAINER_PREFIX}vaultwarden
    ports:
      - "8080:8080"
    volumes:
      - \${DATA_PATH}/vaultwarden:/data
    environment:
      - WEBSOCKET_ENABLED=true
      - WEBSOCKET_PORT=8080
      - TZ=\${TZ}
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "gitea",
    name: "Gitea",
    description: "A painless self-hosted Git service.",
    category: "Development",
    tags: ["Git", "Version Control", "CI/CD"],
    githubUrl: "https://github.com/go-gitea/gitea",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/gitea.svg",
    composeContent: `services:
  gitea:
    image: gitea/gitea:latest
    container_name: \${CONTAINER_PREFIX}gitea
    ports:
      - "3000:3000"
    volumes:
      - \${DATA_PATH}/gitea:/data
    environment:
      - MYSQL_HOST=giteadb
      - MYSQL_DATABASE=gitea
      - MYSQL_USER=gitea
      - MYSQL_PASSWORD=gitea_db_password
      - TZ=\${TZ}
    command: --custom-path /data/custom --app-url http://localhost:3000
    restart: \${RESTART_POLICY}`,
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
    composeContent: `services:
  code-server:
    image: codercom/code-server:latest
    container_name: \${CONTAINER_PREFIX}code-server
    ports:
      - "8080:8080"
    volumes:
      - \${CONFIG_PATH}/code-server:/config
    environment:
      - PASSWORD=your_password
      - TZ=\${TZ}
    command: code-server --bind-addr 0.0.0.0:8080 --auth password --disable-telemetry
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "watchtower",
    name: "Watchtower",
    description:
      "An automated solution for keeping Docker containers up to date. Monitors running containers and automatically pulls and redeploys containers when it detects that a relevant image has been updated.",
    category: "Maintenance",
    tags: ["Automation", "Updates", "Monitoring"],
    githubUrl: "https://github.com/containrrr/watchtower",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/watchtower.svg",
    composeContent: `services:
  watchtower:
    image: containrrr/watchtower
    container_name: \${CONTAINER_PREFIX}watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - $HOME/.docker/config.json:/config.json
    environment:
      - TZ=\${TZ}
      - WATCHTOWER_SCHEDULE=0 0 4 * * * # Update at 4 AM daily
      - WATCHTOWER_CLEANUP=true
      - WATCHTOWER_INCLUDE_STOPPED=false
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "elasticsearch",
    name: "Elasticsearch",
    description:
      "A distributed, RESTful search and analytics engine capable of addressing a growing number of use cases.",
    category: "Database",
    tags: ["Search", "Analytics", "Full-Text"],
    githubUrl: "https://github.com/elastic/elasticsearch",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/elasticsearch.svg",
    composeContent: `services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.12.2
    container_name: \${CONTAINER_PREFIX}elasticsearch
    environment:
      - node.name=es01
      - cluster.name=es-docker-cluster
      - discovery.type=single-node
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.security.enabled=false
      - TZ=\${TZ}
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - \${DATA_PATH}/elasticsearch:/usr/share/elasticsearch/data
      - \${CONFIG_PATH}/elasticsearch:/usr/share/elasticsearch/config
    ports:
      - "9200:9200"
      - "9300:9300"
    restart: \${RESTART_POLICY}`,
  },
  // Unsupported Immich
  {
    id: "immich",
    name: "Immich",
    description:
      "High performance self-hosted photo and video backup solution.",
    category: "Media",
    tags: ["Photos", "Videos", "Backup"],
    githubUrl: "https://github.com/immich-app/immich",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/immich.svg",
    isUnsupported: true,
  },
]

// Cache for GitHub stars data
let cachedTools: DockerTool[] | null = null

/**
 * Extracts the owner and repo from a GitHub URL
 * @param url GitHub URL in format https://github.com/owner/repo
 */
function extractGitHubInfo(
  url: string,
): { owner: string; repo: string } | null {
  try {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (!match) return null
    return { owner: match[1], repo: match[2] }
  } catch {
    return null
  }
}

/**
 * Helper function to add delay between requests
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Fetches GitHub stars for all tools that have a GitHub URL
 * This function should be called at build time to populate the stars field
 */
export async function fetchGitHubStars(): Promise<DockerTool[]> {
  // Return cached data if available
  if (cachedTools) {
    return cachedTools
  }

  const toolsWithoutGitHub = dockerTools.filter((tool) => !tool.githubUrl)
  const toolsWithGitHub = dockerTools.filter((tool) => tool.githubUrl)

  // Create an array of promises for all GitHub requests
  const fetchPromises = toolsWithGitHub.map(async (tool) => {
    if (!tool.githubUrl) {
      return tool
    }

    const githubInfo = extractGitHubInfo(tool.githubUrl)
    if (!githubInfo) {
      return tool
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${githubInfo.owner}/${githubInfo.repo}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            ...(process.env.GITHUB_TOKEN && {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            }),
          },
        },
      )

      if (!response.ok) {
        console.warn(
          `Failed to fetch stars for ${tool.name}: ${response.statusText}`,
        )
        return tool
      }

      const data = await response.json()
      console.log(`Fetched stars for ${tool.name}`)
      return {
        ...tool,
        stars: data.stargazers_count,
      }
    } catch (error) {
      console.warn(`Error fetching stars for ${tool.name}:`, error)
      return tool
    }
  })

  // Execute all promises concurrently
  const updatedGitHubTools = await Promise.all(fetchPromises)

  // Combine tools with and without GitHub URLs
  const updatedTools = [...toolsWithoutGitHub, ...updatedGitHubTools]

  // Cache the results
  cachedTools = updatedTools
  return updatedTools
}
