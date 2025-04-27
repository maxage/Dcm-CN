import type { DockerTool } from "@/lib/docker-tools"

export const other: DockerTool[] = [
  {
    id: "nextcloud",
    name: "Nextcloud",
    description: "为您的所有数据提供一个安全的家。",
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
    description: "用 Rust 编写的非官方 Bitwarden 兼容服务器。",
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
    description: "一个无痛的自托管 Git 服务。",
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
      "在任何地方的任何机器上运行 VS Code，并在浏览器中访问它。",
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
      "一个分布式的 RESTful 搜索和分析引擎，能够满足越来越多的用例需求。",
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
  {
    id: "duplicacy",
    name: "Duplicacy",
    description: "一个无锁的重复数据删除云备份工具。",
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
    description: "一个功能丰富的基于 FUSE 的联合文件系统。",
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
  {
    id: "homeassistant",
    name: "Home Assistant",
    description:
      "开源家庭自动化平台，将本地控制和隐私放在首位。得到全球 DIY 爱好者、修补匠和创客社区的支持。",
    category: "Home Automation",
    tags: ["IoT", "Smart Home", "Automation"],
    githubUrl: "https://github.com/home-assistant/core",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/home-assistant.svg",
    composeContent: `services:
  homeassistant:
    image: ghcr.io/home-assistant/home-assistant:stable
    container_name: \${CONTAINER_PREFIX}homeassistant
    environment:
      - TZ=\${TZ}
    volumes:
      - \${CONFIG_PATH}/homeassistant:/config
      - /etc/localtime:/etc/localtime:ro
      - /run/dbus:/run/dbus:ro
    ports:
      - 8123:8123
    restart: \${RESTART_POLICY}
    privileged: true`,
  },
  {
    id: "node-red",
    name: "Node-RED",
    description:
      "基于流的编程工具，用于连接硬件设备、API 和在线服务。是 Home Assistant 自动化的完美伴侣。",
    category: "Home Automation",
    tags: ["IoT", "Automation", "Flow Programming"],
    githubUrl: "https://github.com/node-red/node-red",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/node-red.svg",
    composeContent: `services:
  nodered:
    image: nodered/node-red:latest
    container_name: \${CONTAINER_PREFIX}nodered
    environment:
      - TZ=\${TZ}
    volumes:
      - \${CONFIG_PATH}/nodered:/data
    ports:
      - 1880:1880
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "mosquitto",
    name: "Mosquitto",
    description:
      "一个开源的 MQTT 代理，实现了 MQTT 协议的 3.1 和 3.1.1 版本。",
    category: "Home Automation",
    tags: ["IoT", "MQTT", "Messaging"],
    githubUrl: "https://github.com/eclipse/mosquitto",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/mosquitto.svg",
    composeContent: `services:
  mosquitto:
    image: eclipse-mosquitto:latest
    container_name: \${CONTAINER_PREFIX}mosquitto
    environment:
      - TZ=\${TZ}
    volumes:
      - \${CONFIG_PATH}/mosquitto/config:/mosquitto/config
      - \${CONFIG_PATH}/mosquitto/data:/mosquitto/data
      - \${CONFIG_PATH}/mosquitto/log:/mosquitto/log
    ports:
      - 1883:1883
      - 9001:9001
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "zigbee2mqtt",
    name: "Zigbee2MQTT",
    description:
      "使您无需使用供应商的网桥或网关即可使用 Zigbee 设备。可直接连接到各种 Zigbee 适配器。",
    category: "Home Automation",
    tags: ["IoT", "Zigbee", "Smart Home"],
    githubUrl: "https://github.com/Koenkk/zigbee2mqtt",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/zigbee2mqtt.svg",
    composeContent: `services:
  zigbee2mqtt:
    image: koenkk/zigbee2mqtt:latest
    container_name: \${CONTAINER_PREFIX}zigbee2mqtt
    environment:
      - TZ=\${TZ}
    volumes:
      - \${CONFIG_PATH}/zigbee2mqtt:/app/data
      - /run/udev:/run/udev:ro
    ports:
      - 8080:8080
    restart: \${RESTART_POLICY}
    privileged: true`,
  },
  {
    id: "freshrss",
    name: "FreshRSS",
    description:
      "一个自托管的 RSS 聚合器，类似于 Google Reader，具有现代 UI 和定制选项。",
    category: "Productivity",
    tags: ["RSS", "News", "Reading"],
    githubUrl: "https://github.com/FreshRSS/FreshRSS",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/freshrss.svg",
    composeContent: `services:
  freshrss:
    image: freshrss/freshrss:latest
    container_name: \${CONTAINER_PREFIX}freshrss
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
    volumes:
      - \${CONFIG_PATH}/freshrss:/var/www/FreshRSS/data
    ports:
      - 8080:80
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "wallabag",
    name: "Wallabag",
    description:
      "一个自托管的阅读后保存应用程序。保存网页以离线阅读并分类文章。",
    category: "Productivity",
    tags: ["Reading", "Bookmark", "Archive"],
    githubUrl: "https://github.com/wallabag/wallabag",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wallabag.svg",
    composeContent: `services:
  wallabag:
    image: wallabag/wallabag:latest
    container_name: \${CONTAINER_PREFIX}wallabag
    environment:
      - TZ=\${TZ}
      - POPULATE_DATABASE=false
    volumes:
      - \${CONFIG_PATH}/wallabag/data:/var/www/wallabag/data
      - \${CONFIG_PATH}/wallabag/images:/var/www/wallabag/web/assets/images
    ports:
      - 8080:80
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "tandoorrecipes",
    name: "Tandoor Recipes",
    description:
      "一个允许您管理不断增长的数字食谱收藏的食谱管理器。",
    category: "Productivity",
    tags: ["Cooking", "Recipes", "Food"],
    githubUrl: "https://github.com/vabene1111/recipes",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/tandoor-recipes.svg",
    composeContent: `services:
  tandoor:
    image: vabene1111/recipes:latest
    container_name: \${CONTAINER_PREFIX}tandoor
    environment:
      - TZ=\${TZ}
      - SECRET_KEY=changeme
      - POSTGRES_PASSWORD=changeme
      - POSTGRES_USER=tandoor
      - POSTGRES_DB=tandoor
    volumes:
      - \${CONFIG_PATH}/tandoor/staticfiles:/opt/recipes/staticfiles
      - \${CONFIG_PATH}/tandoor/mediafiles:/opt/recipes/mediafiles
    ports:
      - 8080:8080
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "filebrowser",
    name: "File Browser",
    description:
      "基于 Web 的文件管理器，具有干净的 UI，用于浏览、管理和共享来自您服务器的文件。",
    category: "Productivity",
    tags: ["Files", "Manager", "Sharing"],
    githubUrl: "https://github.com/filebrowser/filebrowser",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/filebrowser.svg",
    composeContent: `services:
  filebrowser:
    image: filebrowser/filebrowser:latest
    container_name: \${CONTAINER_PREFIX}filebrowser
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
    volumes:
      - \${CONFIG_PATH}/filebrowser/database.db:/database.db
      - \${CONFIG_PATH}/filebrowser/config.json:/.filebrowser.json
      - \${DATA_PATH}:/srv
    ports:
      - 8080:80
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "openvscode",
    name: "OpenVSCode Server",
    description:
      "在浏览器中运行 VS Code 与服务器端计算。非常适合远程开发。",
    category: "Development",
    tags: ["IDE", "Editor", "Development"],
    githubUrl: "https://github.com/gitpod-io/openvscode-server",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/vscode.svg",
    composeContent: `services:
  openvscode:
    image: gitpod/openvscode-server:latest
    container_name: \${CONTAINER_PREFIX}openvscode
    environment:
      - TZ=\${TZ}
    volumes:
      - \${CONFIG_PATH}/openvscode:/home/workspace
    ports:
      - 3000:3000
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "actualbudget",
    name: "Actual Budget",
    description:
      "一个超级快速且注重隐私的财务管理应用程序。",
    category: "Finance",
    tags: ["Money", "Budgeting", "Finance"],
    githubUrl: "https://github.com/actualbudget/actual",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/actual-budget.svg",
    composeContent: `services:
  actualbudget:
    image: docker.io/actualbudget/actual-server:latest
    container_name: \${CONTAINER_PREFIX}actualbudget
    environment:
      # Uncomment any of the lines below to set configuration options.
      # - ACTUAL_HTTPS_KEY=/data/selfhost.key
      # - ACTUAL_HTTPS_CERT=/data/selfhost.crt
      - ACTUAL_PORT=5006
      - ACTUAL_UPLOAD_FILE_SYNC_SIZE_LIMIT_MB=20
      - ACTUAL_UPLOAD_SYNC_ENCRYPTED_FILE_SYNC_SIZE_LIMIT_MB=50
      # - ACTUAL_UPLOAD_FILE_SIZE_LIMIT_MB=20
      # See all options and more details at https://actualbudget.github.io/docs/Installing/Configuration
      # !! If you are not using any of these options, you can comment them out.
    volumes:
      - \${CONFIG_PATH}/actualbudget:/data
    ports:
      - 5006:5006
    healthcheck:
      # Enable health check for the instance
      test: ['CMD-SHELL', 'node src/scripts/health-check.js']
      interval: 60s
      timeout: 10s
      retries: 3
      start_period: 20s
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "firefly",
    name: "Firefly III",
    description:
      "个人财务经理，帮助跟踪支出、收入、预算等。",
    category: "Finance",
    tags: ["Money", "Budgeting", "Finance"],
    githubUrl: "https://github.com/firefly-iii/firefly-iii",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/firefly-iii.svg",
    composeContent: `services:
  firefly:
    image: fireflyiii/core:latest
    container_name: \${CONTAINER_PREFIX}firefly
    environment:
      - TZ=\${TZ}
      - DB_CONNECTION=mysql
      - DB_HOST=firefly_db
      - DB_PORT=3306
      - DB_DATABASE=firefly
      - DB_USERNAME=firefly
      - DB_PASSWORD=changeme
      - APP_KEY=changeme
    volumes:
      - \${CONFIG_PATH}/firefly/upload:/var/www/html/storage/upload
    ports:
      - 8080:8080
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "homepage",
    name: "Homepage",
    description:
      "一个现代化、全静态、快速、安全的公共/私有服务仪表板。非常适合您的服务器。",
    category: "Productivity",
    tags: ["Dashboard", "Homepage", "UI"],
    githubUrl: "https://github.com/benphelps/homepage",
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/homepage.png",
    composeContent: `services:
  homepage:
    image: ghcr.io/benphelps/homepage:latest
    container_name: \${CONTAINER_PREFIX}homepage
    environment:
      - TZ=\${TZ}
    volumes:
      - \${CONFIG_PATH}/homepage:/app/config
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - 3000:3000
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "calibreweb",
    name: "Calibre-Web",
    description:
      "一个用于浏览、阅读和下载存储在 Calibre 数据库中的电子书的 Web 应用程序。",
    category: "Media",
    tags: ["eBooks", "Reading", "Library"],
    githubUrl: "https://github.com/janeczku/calibre-web",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/calibre-web.svg",
    composeContent: `services:
  calibreweb:
    image: linuxserver/calibre-web:latest
    container_name: \${CONTAINER_PREFIX}calibreweb
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
    volumes:
      - \${CONFIG_PATH}/calibreweb:/config
      - \${DATA_PATH}/books:/books
    ports:
      - 8083:8083
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "unifi",
    name: "Unifi Controller",
    description:
      "用于 Ubiquiti UniFi 设备的网络管理控制器，实现集中管理。",
    category: "Network",
    tags: ["Network", "Management", "Ubiquiti"],
    githubUrl: "https://github.com/jacobalberty/unifi-docker",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/unifi.svg",
    composeContent: `services:
  unifi:
    image: jacobalberty/unifi:latest
    container_name: \${CONTAINER_PREFIX}unifi
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
    volumes:
      - \${CONFIG_PATH}/unifi:/unifi
    ports:
      - 8080:8080
      - 8443:8443
      - 3478:3478/udp
      - 10001:10001/udp
    restart: \${RESTART_POLICY}`,
  },
  {
    id: "mealie",
    name: "Mealie",
    description:
      "一个自托管的食谱管理器和膳食计划器，具有时尚的界面和强大的功能。",
    category: "Productivity",
    tags: ["Recipes", "Cooking", "Meal Planning"],
    githubUrl: "https://github.com/hay-kot/mealie",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/mealie.svg",
    composeContent: `services:
  mealie:
    image: hkotel/mealie:latest
    container_name: \${CONTAINER_PREFIX}mealie
    environment:
      - TZ=\${TZ}
      - PUID=\${PUID}
      - PGID=\${PGID}
      - SECRET_KEY=changeme
      - DB_ENGINE=sqlite
    volumes:
      - \${CONFIG_PATH}/mealie:/app/data
    ports:
      - 9925:9000
    restart: \${RESTART_POLICY}`,
  },
]
