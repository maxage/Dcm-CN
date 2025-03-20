import type { DockerTool } from "@/lib/docker-tools"

export const monitoring: DockerTool[] = [
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
]
