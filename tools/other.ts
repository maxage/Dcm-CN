import type { DockerTool } from "@/lib/docker-tools"

export const other: DockerTool[] = [
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
  {
    id: "duplicacy",
    name: "Duplicacy",
    description: "A lock-free deduplication cloud backup tool.",
    category: "Backup",
    tags: ["Backup", "Deduplication", "Cloud"],
    githubUrl: "https://github.com/gilbertchen/duplicacy",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/duplicacy.png",
    composeContent: `services:
  duplicacy:
    image: ghcr.io/hotio/duplicacy:latest
    container_name: \${CONTAINER_PREFIX}duplicacy
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
    volumes:
      - \${CONFIG_PATH}/duplicacy:/config
      - \${DATA_PATH}/backups:/data/backups
    ports:
      - 3875:3875
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "mergerfs",
    name: "MergerFS",
    description: "A featureful FUSE-based union filesystem.",
    category: "Storage",
    tags: ["Filesystem", "Storage", "Union FS"],
    githubUrl: "https://github.com/trapexit/mergerfs",
    composeContent: `services:
  mergerfs:
    image: ghcr.io/hotio/mergerfs:latest
    container_name: \${CONTAINER_PREFIX}mergerfs
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
      - UMASK=\${UMASK}
      - DISK_PATH=/disk
      - DISK_MOUNTPOINTS=/disk1,/disk2,/disk3
      - MOUNT_OPTS=defaults,allow_other,direct_io,use_ino,category.create=mfs
    volumes:
      - \${DATA_PATH}/disk1:/disk1
      - \${DATA_PATH}/disk2:/disk2
      - \${DATA_PATH}/disk3:/disk3
    privileged: true
    restart: \${RESTART_POLICY}`,
  },
]
