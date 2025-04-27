import type { DockerTool } from "@/lib/docker-tools"

export const media: DockerTool[] = [
  {
    id: "jellyfin",
    name: "Jellyfin",
    description:
      "一个免费的媒体系统，让您完全掌控媒体的管理和流媒体播放。这是专有软件 Emby 和 Plex 的替代品，没有任何付费墙后的高级功能。",
    category: "Media",
    tags: ["Streaming", "Media Server", "Transcoding"],
    githubUrl: "https://github.com/jellyfin/jellyfin",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/jellyfin.svg",
    composeContent: `services:
  jellyfin:
    image: ghcr.io/hotio/jellyfin:latest
    container_name: \${CONTAINER_PREFIX}jellyfin
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/jellyfin:/config
      - \${DATA_PATH}/media:/data
    ports:
      - 8096:8096
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "plex",
    name: "Plex",
    description:
      "一个强大的媒体服务器，可以组织来自个人媒体库的视频、音乐和照片，并将其流式传输到智能电视、流媒体盒子和移动设备。具有精美的界面和先进的媒体管理功能。",
    category: "Media",
    tags: ["Streaming", "Media Server", "Transcoding"],
    githubUrl: "https://github.com/plexinc/pms-docker",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/plex.svg",
    composeContent: `services:
  plex:
    image: ghcr.io/hotio/plex:latest
    container_name: \${CONTAINER_PREFIX}plex
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
      - PLEX_CLAIM_TOKEN=
      - PLEX_ADVERTISE_URL=
      - PLEX_NO_AUTH_NETWORKS=
    volumes:
      - \${CONFIG_PATH}/plex:/config
      - \${DATA_PATH}/transcode:/transcode
      - \${DATA_PATH}/media:/data
    ports:
      - 32400:32400
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "emby",
    name: "Emby",
    description:
      "一个强大的媒体服务器，可以组织并流式传输您的视频、音乐、直播电视和照片，从个人媒体库传输到智能电视、流媒体盒子和移动设备。具有独立的服务器和全面的媒体管理功能。",
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
    id: "tautulli",
    name: "Tautulli",
    description:
      "一个 Plex 媒体服务器的监控应用程序，为您的媒体库提供统计和分析数据。",
    category: "Monitoring",
    tags: ["Plex", "Monitoring", "Statistics"],
    githubUrl: "https://github.com/Tautulli/Tautulli",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/tautulli.svg",
    composeContent: `services:
  tautulli:
    image: ghcr.io/hotio/tautulli:latest
    container_name: \${CONTAINER_PREFIX}tautulli
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/tautulli:/config
    ports:
      - 8181:8181
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "jellyseerr",
    name: "Jellyseerr",
    description:
      "一个用于 Jellyfin 的请求管理和媒体发现工具。这是 Overseerr 的一个分支，具有原生 Jellyfin 支持。",
    category: "Media",
    tags: ["Requests", "Media Management", "Jellyfin"],
    githubUrl: "https://github.com/Fallenbagel/jellyseerr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/jellyseerr.svg",
    composeContent: `services:
  jellyseerr:
    image: ghcr.io/hotio/jellyseerr:latest
    container_name: \${CONTAINER_PREFIX}jellyseerr
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/jellyseerr:/config
    ports:
      - 5055:5055
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "overseerr",
    name: "Overseerr",
    description:
      "一个用于 Plex 的请求管理和媒体发现工具。可与 Sonarr 和 Radarr 集成。",
    category: "Media",
    tags: ["Requests", "Media Management", "Plex"],
    githubUrl: "https://github.com/sct/overseerr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/overseerr.svg",
    composeContent: `services:
  overseerr:
    image: ghcr.io/hotio/overseerr:latest
    container_name: \${CONTAINER_PREFIX}overseerr
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/overseerr:/config
    ports:
      - 5055:5055
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "stash",
    name: "Stash",
    description:
      "一个成人媒体管理器。收集和组织您的成人媒体收藏。",
    category: "Media",
    tags: ["Adult", "Media Management", "Organization"],
    githubUrl: "https://github.com/stashapp/stash",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/stash.svg",
    composeContent: `services:
  stash:
    image: ghcr.io/hotio/stash:latest
    container_name: \${CONTAINER_PREFIX}stash
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/stash:/config
      - \${DATA_PATH}/adult:/data/adult
    ports:
      - 9999:9999
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "doplarr",
    name: "Doplarr",
    description:
      "一个自动化工具，集成了 Sonarr/Radarr 和 Discord，可以通过 Discord 机器人自动处理请求。",
    category: "Media",
    tags: ["Discord", "Requests", "Bot"],
    githubUrl: "https://github.com/kiranshila/Doplarr",
    composeContent: `services:
  doplarr:
    image: ghcr.io/kiranshila/doplarr:latest
    container_name: \${CONTAINER_PREFIX}doplarr
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
      - DISCORD_TOKEN=changeme
      - DISCORD_SERVER_ID=changeme
      - RADARR_URL=http://radarr:7878
      - RADARR_API_KEY=changeme
      - SONARR_URL=http://sonarr:8989
      - SONARR_API_KEY=changeme
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "requestrr",
    name: "Requestrr",
    description:
      "一个 Discord 聊天机器人，允许用户通过简单的聊天命令在您的媒体服务器上请求内容。",
    category: "Media",
    tags: ["Discord", "Requests", "Bot"],
    githubUrl: "https://github.com/darkalfx/requestrr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/requestrr.svg",
    composeContent: `services:
  requestrr:
    image: linuxserver/requestrr:latest
    container_name: \${CONTAINER_PREFIX}requestrr
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
    volumes:
      - \${CONFIG_PATH}/requestrr:/config
    ports:
      - 4545:4545
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "ombi",
    name: "Ombi",
    description:
      "一个自托管的网络应用程序，可以自动将您的媒体请求发送到 Sonarr、Radarr 和 Lidarr。",
    category: "Media",
    tags: ["Requests", "Media Management", "Integration"],
    githubUrl: "https://github.com/Ombi-app/Ombi",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/ombi.svg",
    composeContent: `services:
  ombi:
    image: ghcr.io/hotio/ombi:latest
    container_name: \${CONTAINER_PREFIX}ombi
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
    volumes:
      - \${CONFIG_PATH}/ombi:/config
    ports:
      - 3579:3579
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "sabnzbd",
    name: "SABnzbd",
    description:
      "免费且易用的二进制新闻阅读器，通过自动化流程使从 Usenet 下载变得简单。",
    category: "Download",
    tags: ["Usenet", "Download", "NZB"],
    githubUrl: "https://github.com/sabnzbd/sabnzbd",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/sabnzbd.svg",
    composeContent: `services:
  sabnzbd:
    image: ghcr.io/hotio/sabnzbd:latest
    container_name: \${CONTAINER_PREFIX}sabnzbd
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/sabnzbd:/config
      - \${DATA_PATH}/downloads:/data/downloads
    ports:
      - 8080:8080
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "transmission",
    name: "Transmission",
    description: "快速、简单且免费的 BitTorrent 客户端，带有网页界面。",
    category: "Download",
    tags: ["BitTorrent", "Download", "P2P"],
    githubUrl: "https://github.com/transmission/transmission",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/transmission.svg",
    composeContent: `services:
  transmission:
    image: linuxserver/transmission:latest
    container_name: \${CONTAINER_PREFIX}transmission
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
      - UMASK=002
      - USER=username
      - PASS=password
    volumes:
      - \${CONFIG_PATH}/transmission:/config
      - \${DATA_PATH}/downloads:/data/downloads
      - \${DATA_PATH}/watch:/watch
    ports:
      - 9091:9091
      - 51413:51413
      - 51413:51413/udp
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "metube",
    name: "MeTube",
    description:
      "一个支持播放列表的 youtube-dl 网页界面。允许您从 YouTube 和其他数十个网站下载视频。",
    category: "Media",
    tags: ["YouTube", "Download", "Video"],
    githubUrl: "https://github.com/alexta69/metube",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/metube.svg",
    composeContent: `services:
  metube:
    image: alexta69/metube:latest
    container_name: \${CONTAINER_PREFIX}metube
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
    volumes:
      - \${DATA_PATH}/downloads:/downloads
    ports:
      - 8081:8081
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "navidrome",
    name: "Navidrome",
    description:
      "现代音乐服务器和流媒体播放器，兼容 Subsonic/Airsonic API。从您自己的服务器流式传输您的音乐收藏。",
    category: "Media",
    tags: ["Music", "Streaming", "Audio"],
    githubUrl: "https://github.com/navidrome/navidrome",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/navidrome.svg",
    composeContent: `services:
  navidrome:
    image: deluan/navidrome:latest
    container_name: \${CONTAINER_PREFIX}navidrome
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
      - ND_SCANSCHEDULE=1h
    volumes:
      - \${CONFIG_PATH}/navidrome:/data
      - \${DATA_PATH}/music:/music:ro
    ports:
      - 4533:4533
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "airsonic-advanced",
    name: "Airsonic Advanced",
    description:
      "Airsonic 分支的更现代实现，具有播客、有声书和 last.fm 记录等功能。",
    category: "Media",
    tags: ["Music", "Streaming", "Audio"],
    githubUrl: "https://github.com/airsonic-advanced/airsonic-advanced",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/airsonic.svg",
    composeContent: `services:
  airsonic:
    image: airsonicadvanced/airsonic-advanced:latest
    container_name: \${CONTAINER_PREFIX}airsonic
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
      - JAVA_OPTS=-Xmx700m
    volumes:
      - \${CONFIG_PATH}/airsonic:/airsonic/data
      - \${DATA_PATH}/music:/airsonic/music:ro
      - \${DATA_PATH}/playlists:/airsonic/playlists
      - \${DATA_PATH}/podcasts:/airsonic/podcasts
    ports:
      - 4040:4040
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "audiobookshelf",
    name: "Audiobookshelf",
    description:
      "自托管的有声书和播客服务器，具有现代界面，用于管理和收听您的音频收藏。",
    category: "Media",
    tags: ["Audiobooks", "Podcasts", "Library"],
    githubUrl: "https://github.com/advplyr/audiobookshelf",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/audiobookshelf.svg",
    composeContent: `services:
  audiobookshelf:
    image: ghcr.io/advplyr/audiobookshelf:latest
    container_name: \${CONTAINER_PREFIX}audiobookshelf
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
    volumes:
      - \${CONFIG_PATH}/audiobookshelf:/config
      - \${DATA_PATH}/audiobooks:/audiobooks
      - \${DATA_PATH}/podcasts:/podcasts
    ports:
      - 13378:80
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "flaresolverr",
    name: "FlareSolverr",
    description: "代理服务器，用于绕过 Cloudflare 和 DDoS-GUARD 保护，索引器用它来抓取受保护站点的内容。",
    category: "Download",
    tags: ["Proxy", "Cloudflare", "Bypass"],
    githubUrl: "https://github.com/FlareSolverr/FlareSolverr",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/flaresolverr.svg",
    composeContent: `services:
  flaresolverr:
    image: ghcr.io/flaresolverr/flaresolverr:latest
    container_name: \${CONTAINER_PREFIX}flaresolverr
    environment:
      - TZ=\${TZ}
      - LOG_LEVEL=info
    ports:
      - 8191:8191
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "immich",
    name: "Immich",
    isUnsupported: true,
    description:
      "自托管的照片和视频备份解决方案，可直接从您的手机备份。类似 Google Photos 的替代品，具有相似的用户体验。",
    category: "Media",
    tags: ["Photos", "Videos", "Backup"],
    githubUrl: "https://github.com/immich-app/immich",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/immich.svg",
    composeContent: `services:
  immich:
    image: ghcr.io/immich-app/immich-server:latest
    container_name: \${CONTAINER_PREFIX}immich
    environment:
      - TZ=\${TZ}
      - DB_HOSTNAME=immich-postgres
      - DB_USERNAME=postgres
      - DB_PASSWORD=postgres
      - DB_DATABASE_NAME=immich
      - REDIS_HOSTNAME=immich-redis
    volumes:
      - \${CONFIG_PATH}/immich/library:/usr/src/app/library
      - \${DATA_PATH}/photos:/usr/src/app/upload
    ports:
      - 2283:3001
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "photoprism",
    name: "PhotoPrism",
    description:
      "AI 驱动的照片应用程序，用于浏览、组织和分享您的照片收藏。具有人脸识别、物体检测和地理位置功能。",
    category: "Media",
    tags: ["Photos", "AI", "Gallery"],
    githubUrl: "https://github.com/photoprism/photoprism",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/photoprism.svg",
    composeContent: `services:
  photoprism:
    image: photoprism/photoprism:latest
    container_name: \${CONTAINER_PREFIX}photoprism
    environment:
      - TZ=\${TZ}
      - PHOTOPRISM_ADMIN_PASSWORD=insecure
      - PHOTOPRISM_SITE_URL=http://localhost:2342/
      - PHOTOPRISM_ORIGINALS_LIMIT=5000
      - PHOTOPRISM_HTTP_COMPRESSION=gzip
    volumes:
      - \${CONFIG_PATH}/photoprism:/photoprism/storage
      - \${DATA_PATH}/photos:/photoprism/originals
    ports:
      - 2342:2342
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "kavita",
    name: "Kavita",
    description:
      "快速、功能丰富的跨平台阅读服务器，支持漫画、日本漫画、杂志和电子书。响应式网页界面，专注于漫画阅读体验。",
    category: "Media",
    tags: ["Comics", "Manga", "eBooks"],
    githubUrl: "https://github.com/Kareadita/Kavita",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/kavita.svg",
    composeContent: `services:
  kavita:
    image: kizaing/kavita:latest
    container_name: \${CONTAINER_PREFIX}kavita
    environment:
      - TZ=\${TZ}
    volumes:
      - \${CONFIG_PATH}/kavita:/kavita/config
      - \${DATA_PATH}/manga:/manga
      - \${DATA_PATH}/comics:/comics
      - \${DATA_PATH}/books:/books
    ports:
      - 5000:5000
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "pairdrop",
    name: "PairDrop",
    description:
      "在本地网络上进行文件共享，适用于所有平台。",
    category: "Media",
    tags: ["Cloud", "Sharing"],
    githubUrl: "https://github.com/schlagmichdoch/PairDrop",
    composeContent: `services:
  pairdrop:
    image: lscr.io/linuxserver/pairdrop:latest
    container_name: \${CONTAINER_PREFIX}pairdrop
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - WS_SERVER=false
      - WS_FALLBACK=false
      - RTC_CONFIG=false
      - RATE_LIMIT=false
      - DEBUG_MODE=false
    ports:
      - 3000:3000
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "pinchflat",
    name: "Pinchflat",
    description:
      "一个使用 yt-dlp 构建的自托管 YouTube 内容下载应用。",
    category: "Media",
    tags: ["TV", "PVR", "Monitoring"],
    githubUrl: "https://github.com/kieraneglin/pinchflat",
    composeContent: `services:
  pinchflat:
    image: ghcr.io/kieraneglin/pinchflat:latest
    container_name: \${CONTAINER_PREFIX}pinchflat
    environment:
      - TZ=\${TZ}
    ports:
      - "8945:8945"
    volumes:
      - \${CONFIG_PATH}/pinchflat:/config
      - \${DATA_PATH}/downloads:/downloads
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "netalertx",
    name: "NetAlertX",
    description:
      "网络入侵者和存在检测器。扫描连接到您网络的设备，并在发现新的和未知设备时提醒您。",
    category: "Media",
    tags: ["Monitoring", "Security", "Network"],
    githubUrl: "https://github.com/jokob-sk/NetAlertX",
    composeContent: `services:
  netalertx:
    image: ghcr.io/jokob-sk/netalertx:latest
    container_name: \${CONTAINER_PREFIX}netalertx
    network_mode: "host"
    environment:
      - TZ=\${TZ}
      - PORT=20211
    volumes:
      - \${CONFIG_PATH}/netalertx:/app/config
      - \${DATA_PATH}/netalertx/db:/app/db
      - \${DATA_PATH}/netalertx/logs:/app/log
      - /tmp/api:/app/api
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "jackett",
    name: "Jackett",
    description: "为您喜爱的 torrent 追踪器提供 API 支持，将搜索转换为追踪器站点特定的查询。",
    category: "Download",
    tags: ["Indexer", "Proxy", "Torrent"],
    githubUrl: "https://github.com/Jackett/Jackett",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/jackett.svg",
    composeContent: `services:
  jackett:
    image: ghcr.io/hotio/jackett:latest
    container_name: \${CONTAINER_PREFIX}jackett
    environment:
      - TZ=\${TZ}
    volumes:
      - \${CONFIG_PATH}/jackett:/config
    ports:
      - 9117:9117
    restart: \${RESTART_POLICY}`,
  },
]
