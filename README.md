<div align="center">
  <img src="./public/favicon.png" height="80" alt="DCM Logo" />
  <h3>DCM - Docker Compose 生成器</h3>
</div>

<p align="center">
<img src="https://img.shields.io/github/stars/ajnart/dcm?label=%E2%AD%90%20Stars&style=flat-square?branch=main&kill_cache=1%22">
<a href="https://github.com/ajnart/dcm/actions">
  <img title="CI 状态" src="https://github.com/ajnart/dcm/actions/workflows/build_image.yml/badge.svg" alt="CI 状态">
</a>
<a href="https://github.com/ajnart/dcm/pkgs/container/dcm">
  <img alt="Docker 镜像" src="https://img.shields.io/badge/🐳_Docker_镜像-ghcr.io/ajnart/dcm-blue">
</a>
</p>

<!-- 链接 -->
<p align="center">
  <a href="https://compose.ajnart.dev">
    <strong>在线演示 🚀</strong>
  </a>
  •
  <a href="#-快速开始">
    <strong>安装 💻</strong>
  </a>
  •
  <a href="#-贡献">
    <strong>贡献 🤝</strong>
  </a>
  •
  <a href="#-支持的工具">
    <strong>支持的工具 📦</strong>
  </a>
  •
  <a href="#-截图">
    <strong>截图 📸</strong>
  </a>
</p>

## ⬇️下载安装方式
### 拉取镜像
（国内加速）：docker pull ghcr.nju.edu.cn/maxage/dcm-cn:latest

（直接拉取）：docker pull ghcr.io/maxage/dcm-cn:latest

## 🖥️部署方式
1、使用单个命令运行：
```bash
docker run -p 7576:7576 --name dcm --rm ghcr.nju.edu.cn/maxage/dcm-cn
```
2、📦 使用 Docker Compose
创建 docker-compose.yaml 文件：
```bash
services:
  dcm:
    image: ghcr.nju.edu.cn/maxage/dcm-cn
    container_name: dcm
    ports:
      - "7576:7576"
    restart: unless-stopped
```
然后运行：
```bash
docker-compose up -d
```

然后在浏览器中访问   http://localhost:7576

## 📋 关于

> [!NOTE]
> 🌟 **社区驱动项目**: DCM 最初是一个简单的工具，但目标是成为 Docker Compose 配置的首选资源，由社区驱动。我们相信每个人都有自己喜欢的自托管工具，我们希望您能分享您的工具！无论您使用的是流行应用还是小众软件，您的贡献都能帮助他人发现并轻松部署优秀的软件。

DCM (Docker Compose 生成器) 是一个简单但功能强大的工具，可帮助您为自托管应用创建 `docker-compose.yaml` 文件。从精选的流行容器列表中选择，只需点击几下即可生成可用的配置文件。

不再需要从文档中复制粘贴或试图记住正确的配置选项 - 这个工具让您轻松设置 Docker 环境。

> [!TIP]
> 大多数容器都预先配置了最佳实践和合理的默认值，为您节省了阅读文档和调整配置的时间。

> 💡 **分享您的方案**: 使用了一个很棒但尚未列出的工具？我们很乐意收录它！查看我们的[贡献指南](CONTRIBUTING.md)，帮助他人发现和使用您喜欢的容器。

## 🔧 如何使用 DCM

使用 Docker Compose 生成器简单直观：

1. **选择容器** - 浏览精选的自托管应用列表，点击选择您想要包含的应用
2. **使用模板** - 从模板库中选择预定义的模板，如媒体服务器等常见方案
3. **配置设置** - 调整环境变量、路径和其他常见设置
4. **生成配置** - 点击"复制 Compose"查看和自定义您的 docker-compose.yaml
5. **部署方案** - 使用以下方法之一部署您的容器：

> [!IMPORTANT]
> 所有容器都配置为使用环境变量，如 `${PUID}`、`${PGID}` 和 `${TZ}`。确保在部署时设置这些变量以避免权限问题。

### 部署选项

获得 docker-compose 配置后，您有几种部署方式：

#### 复制粘贴
只需复制生成的 docker-compose.yaml 和 .env 内容，本地保存，然后运行 `docker-compose up -d` 启动容器。

#### 下载文件
直接从界面下载生成的 docker-compose.yaml 和 .env 文件，然后使用您喜欢的 Docker 管理工具。

> [!NOTE]
> 下载的 .env 文件包含 docker-compose.yaml 中引用的所有环境变量。部署时请将两个文件放在同一目录。

#### Portainer 堆栈
如果您已经在使用 [Portainer](https://github.com/portainer/portainer) 管理 Docker 环境，您可以轻松将配置部署为堆栈：

1. 导航到 Portainer 仪表板并从侧边栏选择 **堆栈**
2. 点击 **添加堆栈**
3. 为堆栈命名
4. 选择 **Web 编辑器** 并粘贴生成的 docker-compose 内容
5. (可选) 添加 .env 文件中的环境变量
6. 点击 **部署堆栈**

> [!CAUTION]
> 使用 Portainer 堆栈时，您需要手动添加环境变量或上传 .env 文件，因为 Portainer 不会在所有配置中自动读取 .env 文件。

使用 Portainer 提供了用户友好的 Web 界面来管理、更新和监控容器，无需命令行工具。

#### 其他 Docker 管理工具
生成的 compose 文件适用于任何支持 docker-compose 语法的工具，如 Docker Desktop、Rancher、Yacht 或命令行工具。

## 🚀 快速开始

如果您想亲自尝试 DCM，有几种方式可以开始：

### 🌐 使用在线版本

访问 [compose.ajnart.dev](https://compose.ajnart.dev) 立即使用，无需安装。

> [!NOTE]
> 在线版本包含用于使用跟踪的分析功能，而自托管版本则没有。

### 🐳 使用 Docker 运行

使用单个命令运行：

```bash
docker run -p 7576:7576 --name dcm --rm ghcr.io/ajnart/dcm
```

然后在浏览器中访问 `http://localhost:7576`。

Docker 镜像支持多个平台：
- linux/amd64
- linux/arm64
- linux/arm/v7

### 📦 使用 Docker Compose

创建 `docker-compose.yaml` 文件：

```yaml
services:
  dcm:
    image: ghcr.io/ajnart/dcm
    container_name: dcm
    ports:
      - "7576:7576"
    restart: unless-stopped
```

然后运行：

```bash
docker-compose up -d
```

### 🛠️ 从源码构建

1. 克隆仓库：
```bash
git clone https://github.com/ajnart/dcm.git
cd dcm
```

2. 安装依赖：

如果还没有安装 [Bun](https://bun.sh/)，请先安装，然后运行：
```bash
bun install
```

> [!WARNING]
> 使用 npm 而不是 Bun 可能会导致安装时间更长和潜在的兼容性问题。我们强烈建议使用 Bun 进行开发。

3. 构建并启动：
```bash
bun run build
bun start
```

## 🧰 支持的工具

DCM 包含许多流行的自托管应用配置，包括：

📺 **媒体管理**: 
  - **媒体服务器**: [Jellyfin](https://github.com/jellyfin/jellyfin), [Plex](https://github.com/plexinc/pms-docker), [Emby](https://github.com/MediaBrowser/Emby)
  - **媒体自动化**: [Sonarr](https://github.com/Sonarr/Sonarr), [Radarr](https://github.com/Radarr/Radarr), [Lidarr](https://github.com/lidarr/Lidarr), [Readarr](https://github.com/Readarr/Readarr), [Prowlarr](https://github.com/Prowlarr/Prowlarr), [Bazarr](https://github.com/morpheus65535/bazarr), [Whisparr](https://github.com/whisparr/whisparr)
  - **媒体请求**: [Jellyseerr](https://github.com/Fallenbagel/jellyseerr), [Overseerr](https://github.com/sct/overseerr), [Doplarr](https://github.com/kiranshila/Doplarr), [Requestrr](https://github.com/darkalfx/requestrr)

🔍 **仪表板和管理**: 
  - **仪表板**: [Homarr](https://github.com/homarr-labs/homarr), [Heimdall](https://github.com/linuxserver/Heimdall)
  - **容器管理**: [Portainer](https://github.com/portainer/portainer)
  - **媒体分析**: [Tautulli](https://github.com/Tautulli/Tautulli)

📥 **下载管理**:
  - **种子**: [qBittorrent](https://github.com/qbittorrent/qBittorrent)
  - **Usenet**: [NZBGet](https://github.com/nzbget/nzbget), [NZBHydra 2](https://github.com/theotherp/nzbhydra2)
  - **索引器**: [Jackett](https://github.com/Jackett/Jackett), [Prowlarr](https://github.com/Prowlarr/Prowlarr)

🗄️ **数据库**: 
  - **SQL**: [MariaDB](https://github.com/MariaDB/server), [MySQL](https://github.com/mysql/mysql-server), [PostgreSQL](https://github.com/postgres/postgres)
  - **NoSQL**: [MongoDB](https://github.com/mongodb/mongo), [Redis](https://github.com/redis/redis)

📊 **监控和自动化**: 
  - **监控**: [Grafana](https://github.com/grafana/grafana), [Prometheus](https://github.com/prometheus/prometheus)
  - **更新**: [Watchtower](https://github.com/containrrr/watchtower)
  - **家庭自动化**: [Home Assistant](https://github.com/home-assistant/core)

🔐 **安全**: [Vaultwarden](https://github.com/dani-garcia/vaultwarden)

💾 **存储和文件**: [Nextcloud](https://github.com/nextcloud/server)

每个工具都包含详细描述、GitHub 星标数和预配置的 docker-compose 设置。

## 🧪 Testing

DCM uses [Bun](https://bun.sh/) for testing. To run the tests:

```bash
# Run all tests
bun test

# Run Docker Compose validation tests
bun test:compose

# Run container schema validation tests
bun test:containers
```

## 🔄 Template Gallery

DCM includes a Template Gallery that allows you to quickly add predefined stacks of containers based on common use cases:

- **Media Server Stacks**: Complete media server setups with Jellyfin/Plex and related tools
- **Development Environments**: Web development stacks with databases and web servers
- **Monitoring Solutions**: Grafana, Prometheus, and other monitoring tools
- **Database Clusters**: Various database engines with management tools
- **Security Tools**: Password managers and security-related containers
- **And more!**: Smart home hubs, personal cloud solutions, and other useful templates

To use the Template Gallery:
1. Click the "Template Gallery" button at the top of the main page
2. Browse or search for templates that match your needs
3. Click "Use Template" to add all containers from that template to your selection
4. Return to the main page to customize your selected containers

You can combine multiple templates to create your perfect self-hosted environment!

## 🖼️ Screenshots

### User Interface
![UI Screenshot](/public/ui-demo.png)

### Generated docker compose file
![Generated docker-compose file](/public/compose-output.png)

## 🤝 Contributing

We welcome contributions to DCM! Whether you want to add new container definitions, improve documentation, or fix bugs, your help is appreciated.

Please check our [CONTRIBUTING.md](CONTRIBUTING.md) guide for detailed instructions on:
- How to add new container definitions
- Code style guidelines
- Testing requirements
- Pull request process

The easiest way to contribute is by adding new container definitions to our growing collection!

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💖 Support

If you find this tool useful, consider supporting the project by:

- ⭐ Starring the repository on GitHub
- 🐦 Sharing it on social media
- ☕ [Buying me a coffee](https://ko-fi.com/ajnart)

## 📞 Contact

- GitHub: [@ajnart](https://github.com/ajnart)

---

Made with ❤️ by [ajnart](https://github.com/ajnart) 
