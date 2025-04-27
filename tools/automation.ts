import type { DockerTool } from "@/lib/docker-tools"

export const automation: DockerTool[] = [
  {
    id: "sonarr",
    name: "Sonarr",
    description:
      "适用于 Usenet 和 BitTorrent 用户的智能 PVR。监控多个 RSS 源以获取新的电视剧集，自动抓取、分类和重命名。",
    category: "Media",
    tags: ["TV", "PVR", "Automation"],
    githubUrl: "https://github.com/Sonarr/Sonarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/sonarr.svg",
    composeContent: `services:
  sonarr:
    image: ghcr.io/hotio/sonarr:latest
    container_name: \${CONTAINER_PREFIX}sonarr
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/sonarr:/config
      - \${DATA_PATH}/tv:/data/tv
      - \${DATA_PATH}/downloads:/data/downloads
    ports:
      - 8989:8989
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "radarr",
    name: "Radarr",
    description:
      "Sonarr 的一个分支，专门用于电影。自动监控和下载电影，处理质量升级，并通过优雅的网页界面管理您的电影收藏。",
    category: "Media",
    tags: ["Movies", "PVR", "Automation"],
    githubUrl: "https://github.com/Radarr/Radarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/radarr.svg",
    composeContent: `services:
  radarr:
    image: ghcr.io/hotio/radarr:latest
    container_name: \${CONTAINER_PREFIX}radarr
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/radarr:/config
      - \${DATA_PATH}/movies:/data/movies
      - \${DATA_PATH}/downloads:/data/downloads
    ports:
      - 7878:7878
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "lidarr",
    name: "Lidarr",
    description:
      "适用于 Usenet 和 BitTorrent 用户的音乐收藏管理器。可以监控多个 RSS 源以获取您喜爱艺术家的新专辑，并与下载客户端和索引器对接进行抓取、分类和重命名。",
    category: "Media",
    tags: ["Music", "PVR", "Automation"],
    githubUrl: "https://github.com/Lidarr/Lidarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/lidarr.svg",
    composeContent: `services:
  lidarr:
    image: ghcr.io/hotio/lidarr:latest
    container_name: \${CONTAINER_PREFIX}lidarr
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/lidarr:/config
      - \${DATA_PATH}/music:/data/music
      - \${DATA_PATH}/downloads:/data/downloads
    ports:
      - 8686:8686
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "readarr",
    name: "Readarr",
    description:
      "适用于 Usenet 和 BitTorrent 用户的图书收藏管理器。可与 SABnzbd、NZBGet、QBittorrent 和 Deluge 等客户端集成。",
    category: "Media",
    tags: ["Books", "PVR", "Automation"],
    githubUrl: "https://github.com/Readarr/Readarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/readarr.svg",
    composeContent: `services:
  readarr:
    image: ghcr.io/hotio/readarr:latest
    container_name: \${CONTAINER_PREFIX}readarr
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/readarr:/config
      - \${DATA_PATH}/books:/data/books
      - \${DATA_PATH}/downloads:/data/downloads
    ports:
      - 8787:8787
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "prowlarr",
    name: "Prowlarr",
    description:
      "基于 arr 技术栈构建的强大索引器管理器/代理。与 Sonarr、Radarr、Lidarr 和 Readarr 无缝集成，支持 Torrent 追踪器和 Usenet 索引器的集中管理。",
    category: "Media",
    tags: ["Indexer", "Proxy", "Integration"],
    githubUrl: "https://github.com/Prowlarr/Prowlarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/prowlarr.svg",
    composeContent: `services:
  prowlarr:
    image: ghcr.io/hotio/prowlarr:latest
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
    id: "whisparr",
    name: "Whisparr",
    description:
      "适用于 Usenet 和 BitTorrent 用户的成人电影收藏管理器。",
    category: "Media",
    tags: ["Adult", "Movies", "Automation"],
    githubUrl: "https://github.com/whisparr/whisparr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/whisparr.svg",
    composeContent: `services:
  whisparr:
    image: ghcr.io/hotio/whisparr:latest
    container_name: \${CONTAINER_PREFIX}whisparr
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/whisparr:/config
      - \${DATA_PATH}/adult:/data/adult
      - \${DATA_PATH}/downloads:/data/downloads
    ports:
      - 6969:6969
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "nzbget",
    name: "NZBGet",
    description:
      "高效的 Usenet 下载器，针对可靠性、完整性和速度进行了优化。",
    category: "Download",
    tags: ["Usenet", "Download", "NZB"],
    githubUrl: "https://github.com/nzbget/nzbget",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nzbget.svg",
    composeContent: `services:
  nzbget:
    image: ghcr.io/hotio/nzbget:latest
    container_name: \${CONTAINER_PREFIX}nzbget
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/nzbget:/config
      - \${DATA_PATH}/downloads:/data/downloads
    ports:
      - 6789:6789
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "bazarr",
    name: "Bazarr",
    description:
      "Sonarr 和 Radarr 的配套应用程序，用于管理和下载字幕。",
    category: "Media",
    tags: ["Subtitles", "Media", "Automation"],
    githubUrl: "https://github.com/morpheus65535/bazarr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/bazarr.svg",
    composeContent: `services:
  bazarr:
    image: ghcr.io/hotio/bazarr:latest
    container_name: \${CONTAINER_PREFIX}bazarr
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/bazarr:/config
      - \${DATA_PATH}/tv:/data/tv
      - \${DATA_PATH}/movies:/data/movies
    ports:
      - 6767:6767
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "jackett",
    name: "Jackett",
    description:
      "为您喜爱的 torrent 追踪器提供 API 支持，将搜索转换为追踪器站点特定的查询。",
    category: "Download",
    tags: ["Indexer", "Proxy", "Torrent"],
    githubUrl: "https://github.com/Jackett/Jackett",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/jackett.svg",
    composeContent: `services:
  jackett:
    image: ghcr.io/hotio/jackett:latest
    container_name: \${CONTAINER_PREFIX}jackett
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/jackett:/config
      - \${DATA_PATH}/downloads:/data/downloads
    ports:
      - 9117:9117
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "qbittorrent",
    name: "qBittorrent",
    description:
      "一个跨平台的 BitTorrent 客户端，带有集成的网页界面。",
    category: "Download",
    tags: ["BitTorrent", "Download", "P2P"],
    githubUrl: "https://github.com/qbittorrent/qBittorrent",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/qbittorrent.svg",
    composeContent: `services:
  qbittorrent:
    image: ghcr.io/hotio/qbittorrent:latest
    container_name: \${CONTAINER_PREFIX}qbittorrent
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
      - WEBUI_PORT=8080
    volumes:
      - \${CONFIG_PATH}/qbittorrent:/config
      - \${DATA_PATH}/downloads:/data/downloads
    ports:
      - 8080:8080
      - 6881:6881
      - 6881:6881/udp
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "nzbhydra2",
    name: "NZBHydra 2",
    description:
      "NZBHydra 2 是一个用于 newznab 索引器和 torznab 追踪器的元搜索工具。",
    category: "Download",
    tags: ["Usenet", "Indexer", "Aggregator"],
    githubUrl: "https://github.com/theotherp/nzbhydra2",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/nzbhydra.png",
    composeContent: `services:
  nzbhydra2:
    image: ghcr.io/hotio/nzbhydra2:latest
    container_name: \${CONTAINER_PREFIX}nzbhydra2
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/nzbhydra2:/config
      - \${DATA_PATH}/downloads:/data/downloads
    ports:
      - 5076:5076
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "qbitmanage",
    name: "qBitManage",
    description: "一个用于管理 qBittorrent 和自动化交叉做种的工具。",
    category: "Download",
    tags: ["BitTorrent", "Management", "Automation"],
    githubUrl: "https://github.com/StuffAnThings/qbit_manage",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/qbittorrent.svg",
    composeContent: `services:
  qbitmanage:
    image: ghcr.io/hotio/qbitmanage:latest
    container_name: \${CONTAINER_PREFIX}qbitmanage
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/qbitmanage:/config
      - \${DATA_PATH}/downloads:/data/downloads
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "rflood",
    name: "rFlood",
    description:
      "一个自定义版本的 Flood，具有额外的类 ruTorrent 功能。",
    category: "Download",
    tags: ["BitTorrent", "Web Interface", "Download"],
    githubUrl: "https://github.com/jesec/flood",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/flood.svg",
    composeContent: `services:
  rflood:
    image: ghcr.io/hotio/rflood:latest
    container_name: \${CONTAINER_PREFIX}rflood
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/rflood:/config
      - \${DATA_PATH}/downloads:/data/downloads
    ports:
      - 3000:3000
      - 50000:50000
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "unpackerr",
    name: "Unpackerr",
    description:
      "为各种媒体服务器软件（如 Sonarr、Radarr、Lidarr 等）提供解压缩功能。",
    category: "Media",
    tags: ["Extraction", "Automation", "Archive"],
    githubUrl: "https://github.com/davidnewhall/unpackerr",
    icon: "https://unpackerr.zip/img/logo.png",
    composeContent: `services:
  unpackerr:
    image: ghcr.io/hotio/unpackerr:latest
    container_name: \${CONTAINER_PREFIX}unpackerr
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/unpackerr:/config
      - \${DATA_PATH}/downloads:/data/downloads
    restart: \${RESTART_POLICY}`,
  },
]
