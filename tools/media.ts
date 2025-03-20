import type { DockerTool } from "@/lib/docker-tools"

export const media: DockerTool[] = [
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
      "A powerful media server that organizes video, music, and photos from personal libraries and streams them to smart TVs, streaming boxes, and mobile devices. Features a polished interface and advanced features for media management.",
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
    id: "tautulli",
    name: "Tautulli",
    description:
      "A monitoring application for Plex Media Server that provides statistics and analytics for your media library.",
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
      "A request management and media discovery tool for Jellyfin. Fork of Overseerr with native Jellyfin support.",
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
      "A request management and media discovery tool for Plex. Integrates with Sonarr and Radarr.",
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
      "An organizer for your adult media. Collects and organizes your adult media collection.",
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
]
