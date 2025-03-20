<!-- Project Title -->
# <img src="./public/favicon.png" width="30" height="30" alt="DCM Logo"> DCM - Docker Compose Maker

<p align="center">
<img src="https://img.shields.io/github/stars/ajnart/docker-compose-maker?label=%E2%AD%90%20Stars&style=flat-square?branch=master&kill_cache=1%22">
<a href="https://docker-compose-maker.vercel.app">
  <img alt="Live Demo" src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-blue">
</a>
<a href="https://github.com/ajnart/docker-compose-maker/actions">
  <img title="CI Status" src="https://github.com/ajnart/docker-compose-maker/actions/workflows/build_image.yml/badge.svg" alt="CI Status">
</a>
<a href="https://github.com/ajnart/docker-compose-maker/pkgs/container/dcm">
  <img alt="Docker Image" src="https://img.shields.io/badge/🐳_Docker_Image-ghcr.io/ajnart/dcm-blue">
</a>
</p>

<!-- Links -->
<p align="center">
  <a href="https://compose.ajnart.dev">
    <strong>Live Demo 🚀</strong>
  </a>
  •
  <a href="#-quick-start">
    <strong>Install 💻</strong>
  </a>
  •
  <a href="#-features">
    <strong>Features ✨</strong>
  </a>
  •
  <a href="#-contributing">
    <strong>Contribute 🤝</strong>
  </a>
</p>

## 📋 About

> 🌟 **Community-Driven Project**: DCM started as a simple tool but aims to become the go-to resource for Docker Compose configurations, powered by the community. We believe everyone has their favorite self-hosted tools, and we'd love for you to share yours! Whether you're using a popular application or a hidden gem, your contribution helps others discover and easily deploy great software.

DCM (Docker Compose Maker) is a simple yet powerful tool that helps you create `docker-compose.yaml` files for your self-hosted applications. Select from a curated list of popular containers and generate a ready-to-use configuration file with just a few clicks.

No more copy-pasting from documentation or trying to remember the correct configuration options - this tool makes it easy to set up your Docker environment.

> 💡 **Share Your Stack**: Using a great tool that's not listed here? We'd love to include it! Check out our [contribution guide](CONTRIBUTING.md) to help others discover and use your favorite containers.

## ✨ Features

- 🧩 **Simple selection interface** - Pick the tools you want to include with a simple click
- 🔍 **Search functionality** - Find containers quickly with powerful search (Cmd/Ctrl+K)
- 📊 **GitHub stars** - See popularity metrics for each container
- 📱 **Responsive design** - Works on desktop, tablet and mobile devices
- 🌙 **Dark mode support** - Easy on the eyes with automatic theme detection
- ⚙️ **Configuration variables** - Set common environment variables for all containers
- 📋 **Copy to clipboard** - One-click to copy your generated docker-compose.yaml
- 🔒 **Privacy focused** - No tracking in self-hosted version
- 🚀 **Fast and lightweight** - Built with Next.js for optimal performance

## 🚀 Quick Start

### 🌐 Use the Online Version

Visit [compose.ajnart.dev](https://compose.ajnart.dev) to use the tool immediately without installation.

> **Note**: The online version includes analytics for usage tracking, while the self-hosted version does not.

### 🐳 Run with Docker

Run with a single command:

```bash
docker run -p 3000:3000 ghcr.io/ajnart/dcm
```

Then visit `http://localhost:3000` in your browser.

The Docker image is available for multiple platforms:
- linux/amd64
- linux/arm64
- linux/arm/v7

### 📦 Using Docker Compose

Create a `docker-compose.yaml` file:

```yaml
version: '3'
services:
  dcm:
    image: ghcr.io/ajnart/dcm
    container_name: dcm
    ports:
      - "3000:3000"
    restart: unless-stopped
```

Then run:

```bash
docker-compose up -d
```

### 🛠️ Build from Source

1. Clone the repository:
```bash
git clone https://github.com/ajnart/docker-compose-maker.git
cd docker-compose-maker
```

2. Install dependencies:

First install [Bun](https://bun.sh/) if you haven't already, then run:
```bash
bun install
```

3. Build and start:
```bash
bun run build
bun start
```

## 🧰 Supported Tools

DCM includes configuration for many popular self-hosted applications, including:

- 📺 **Media Management**: 
  - **Media Servers**: [Jellyfin](https://github.com/jellyfin/jellyfin), [Plex](https://github.com/plexinc/pms-docker), [Emby](https://github.com/MediaBrowser/Emby)
  - **Media Automation**: [Sonarr](https://github.com/Sonarr/Sonarr), [Radarr](https://github.com/Radarr/Radarr), [Lidarr](https://github.com/lidarr/Lidarr), [Readarr](https://github.com/Readarr/Readarr), [Prowlarr](https://github.com/Prowlarr/Prowlarr), [Bazarr](https://github.com/morpheus65535/bazarr), [Whisparr](https://github.com/whisparr/whisparr)
  - **Media Requests**: [Jellyseerr](https://github.com/Fallenbagel/jellyseerr), [Overseerr](https://github.com/sct/overseerr), [Doplarr](https://github.com/kiranshila/Doplarr), [Requestrr](https://github.com/darkalfx/requestrr)

- 🔍 **Dashboards & Management**: 
  - **Dashboards**: [Homarr](https://github.com/homarr-labs/homarr), [Heimdall](https://github.com/linuxserver/Heimdall)
  - **Container Management**: [Portainer](https://github.com/portainer/portainer)
  - **Media Analytics**: [Tautulli](https://github.com/Tautulli/Tautulli)

- 📥 **Download Management**:
  - **Torrent**: [qBittorrent](https://github.com/qbittorrent/qBittorrent)
  - **Usenet**: [NZBGet](https://github.com/nzbget/nzbget), [NZBHydra 2](https://github.com/theotherp/nzbhydra2)
  - **Indexers**: [Jackett](https://github.com/Jackett/Jackett), [Prowlarr](https://github.com/Prowlarr/Prowlarr)

- 🗄️ **Databases**: 
  - **SQL**: [MariaDB](https://github.com/MariaDB/server), [MySQL](https://github.com/mysql/mysql-server), [PostgreSQL](https://github.com/postgres/postgres)
  - **NoSQL**: [MongoDB](https://github.com/mongodb/mongo), [Redis](https://github.com/redis/redis)

- 📊 **Monitoring & Automation**: 
  - **Monitoring**: [Grafana](https://github.com/grafana/grafana), [Prometheus](https://github.com/prometheus/prometheus)
  - **Updates**: [Watchtower](https://github.com/containrrr/watchtower)
  - **Home Automation**: [Home Assistant](https://github.com/home-assistant/core)

- 🔐 **Security**: [Vaultwarden](https://github.com/dani-garcia/vaultwarden)

- 💾 **Storage & Files**: [Nextcloud](https://github.com/nextcloud/server)

Each tool includes a detailed description, GitHub star count, and pre-configured docker-compose settings.

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