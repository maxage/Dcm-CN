import type { DockerTool } from "@/lib/docker-tools"

export const management: DockerTool[] = [
  {
    id: "portainer",
    name: "Portainer",
    description:
      "一个强大的容器管理界面，为管理 Docker 环境提供用户友好的 Web UI。功能包括容器部署、支持 Docker Compose 的堆栈管理、卷管理、网络配置和实时容器监控。",
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
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "traefik",
    name: "Traefik",
    description:
      "一个现代的、云原生的应用程序代理和负载均衡器，使部署微服务变得容易。具有自动服务发现、Let's Encrypt 支持和动态配置等功能。",
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
      "一个强大的、高性能的 Web 服务器和反向代理服务器。功能包括负载均衡、HTTP 缓存、静态文件服务、SSL/TLS 终端和作为其他服务的反向代理。",
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
    description: "全网广告拦截。",
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
    description: "全网广告和跟踪器拦截 DNS 服务器。",
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
    id: "caddy",
    name: "Caddy",
    description:
      "强大的、企业级的开源 Web 服务器，具有自动 HTTPS 功能。",
    category: "Networking",
    tags: ["Web Server", "Reverse Proxy", "HTTPS"],
    githubUrl: "https://github.com/caddyserver/caddy",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/caddy.svg",
    composeContent: `services:
  caddy:
    image: ghcr.io/hotio/caddy:latest
    container_name: \${CONTAINER_PREFIX}caddy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - \${CONFIG_PATH}/caddy:/config
      - \${CONFIG_PATH}/caddy/Caddyfile:/config/Caddyfile
      - \${CONFIG_PATH}/caddy/www:/config/www
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    restart: \${RESTART_POLICY}`,
  },
]
