import type { DockerTool } from "@/lib/docker-tools"

export const monitoring: DockerTool[] = [
  {
    id: "homarr",
    name: "Homarr",
    description:
      "一个现代化、功能丰富的服务器仪表板。集成 Docker 进行容器管理，支持具有高级权限的多用户，并为管理您的自托管服务提供流畅的界面。",
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
    id: "grafana",
    name: "Grafana",
    description:
      "开放且可组合的可观察性和数据可视化平台。可视化来自多个来源的指标、日志和跟踪数据。",
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
      "一个强大的监控和告警工具包，专为可靠性而设计。特点包括多维数据模型、灵活的查询语言（PromQL）、高效的时序数据库和现代化的告警方式。",
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
    id: "watchtower",
    name: "Watchtower",
    description:
      "一个用于保持 Docker 容器更新的自动化解决方案。监控运行中的容器，并在检测到相关镜像已更新时自动拉取和重新部署容器。",
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
    id: "heimdall",
    name: "Heimdall",
    description:
      "一个现代、优雅的应用程序仪表板和启动器，帮助您组织所有的网络应用程序。具有清晰的界面、可自定义的类别和对各种认证方法的支持。",
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
    id: "uptime-kuma",
    name: "Uptime Kuma",
    description:
      "一个现代化的、自托管的、易于使用的监控工具，具有漂亮的用户界面。可监控网站、API 等，并提供实时告警。",
    category: "Monitoring",
    tags: ["Uptime", "Status", "Alerts"],
    githubUrl: "https://github.com/louislam/uptime-kuma",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/uptime-kuma.svg",
    composeContent: `services:
  uptime-kuma:
    image: louislam/uptime-kuma:latest
    container_name: \${CONTAINER_PREFIX}uptime-kuma
    environment:
      - TZ=\${TZ}
    volumes:
      - \${CONFIG_PATH}/uptime-kuma:/app/data
    ports:
      - 3001:3001
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "scrutiny",
    name: "Scrutiny",
    description:
      "硬盘 S.M.A.R.T 监控、历史趋势和磁盘故障预测，带有现代网页界面。",
    category: "Monitoring",
    tags: ["S.M.A.R.T", "Storage", "Disk Health"],
    githubUrl: "https://github.com/AnalogJ/scrutiny",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/scrutiny.svg",
    composeContent: `services:
  scrutiny:
    image: ghcr.io/analogj/scrutiny:latest
    container_name: \${CONTAINER_PREFIX}scrutiny
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
    volumes:
      - \${CONFIG_PATH}/scrutiny:/opt/scrutiny/config
      - /run/udev:/run/udev:ro
      - /dev/disk:/dev/disk
    ports:
      - 8080:8080
    restart: \${RESTART_POLICY}
    privileged: true`,
  },
  {
    id: "speedtest-tracker",
    name: "Speedtest Tracker",
    description:
      "通过自动测试持续跟踪您的互联网速度，并提供仪表板来可视化长期结果。",
    category: "Monitoring",
    tags: ["Internet", "Speed", "Tracking"],
    githubUrl: "https://github.com/alexjustesen/speedtest-tracker",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/speedtest.svg",
    composeContent: `services:
  speedtest-tracker:
    image: ghcr.io/alexjustesen/speedtest-tracker:latest
    container_name: \${CONTAINER_PREFIX}speedtest-tracker
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
      - DB_CONNECTION=sqlite
    volumes:
      - \${CONFIG_PATH}/speedtest-tracker:/config
    ports:
      - 8080:80
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "statping-ng",
    name: "Statping-NG",
    description:
      "一个易于使用的网站和应用程序状态页面。提供精美的指标、分析和健康检查。",
    category: "Monitoring",
    tags: ["Status", "Uptime", "Metrics"],
    githubUrl: "https://github.com/statping-ng/statping-ng",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/statping.svg",
    composeContent: `services:
  statping-ng:
    image: adamboutcher/statping-ng:latest
    container_name: \${CONTAINER_PREFIX}statping-ng
    environment:
      - TZ=\${TZ}
      - DB_CONN=sqlite
    volumes:
      - \${CONFIG_PATH}/statping-ng:/app
    ports:
      - 8080:8080
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "glances",
    name: "Glances",
    description:
      "一个用 Python 编写的跨平台系统监控工具。提供系统资源的全面概览。",
    category: "Monitoring",
    tags: ["System", "Resources", "Metrics"],
    githubUrl: "https://github.com/nicolargo/glances",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/glances.svg",
    composeContent: `services:
  glances:
    image: nicolargo/glances:latest
    container_name: \${CONTAINER_PREFIX}glances
    environment:
      - TZ=\${TZ}
      - GLANCES_OPT=-w
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /run/user:/run/user:ro
    ports:
      - 61208:61208
    restart: \${RESTART_POLICY}
    pid: host`,
  },
  {
    id: "netdata",
    name: "Netdata",
    description:
      "系统和应用程序的实时性能和健康监控。具有精美的、交互式的网页仪表板。",
    category: "Monitoring",
    tags: ["System", "Performance", "Real-time"],
    githubUrl: "https://github.com/netdata/netdata",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/netdata.svg",
    composeContent: `services:
  netdata:
    image: netdata/netdata:latest
    container_name: \${CONTAINER_PREFIX}netdata
    environment:
      - TZ=\${TZ}
    volumes:
      - \${CONFIG_PATH}/netdata:/etc/netdata
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - 19999:19999
    restart: \${RESTART_POLICY}
    cap_add:
      - SYS_PTRACE
    security_opt:
      - apparmor:unconfined`,
  },
  {
    id: "librenms",
    name: "LibreNMS",
    description:
      "一个功能齐全的网络监控系统，它使用SNMP提供了丰富的功能和设备支持。",
    category: "Monitoring",
    tags: ["Network", "SNMP", "Metrics"],
    githubUrl: "https://github.com/librenms/librenms",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/librenms.svg",
    composeContent: `services:
  librenms:
    image: librenms/librenms:latest
    container_name: \${CONTAINER_PREFIX}librenms
    environment:
      - TZ=\${TZ}
      - DB_HOST=librenms-db
      - DB_NAME=librenms
      - DB_USER=librenms
      - DB_PASSWORD=librenms
      - BASE_URL=http://localhost
    volumes:
      - \${CONFIG_PATH}/librenms/config:/config
      - \${CONFIG_PATH}/librenms/logs:/logs
      - \${CONFIG_PATH}/librenms/rrd:/rrd
    ports:
      - 8000:8000
    restart: \${RESTART_POLICY}`,
  },
]
