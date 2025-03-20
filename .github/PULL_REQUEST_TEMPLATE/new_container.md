<div align="center">
  <img src="https://raw.githubusercontent.com/ajnart/docker-compose-maker/main/public/favicon.png" height="80" alt="DCM Logo" />
  <h3>Docker Compose Maker - New Container</h3>
</div>

### New Container Submission

**Container Information:**
- **ID**: <!-- e.g. portainer -->
- **Name**: <!-- e.g. Portainer -->
- **Category**: <!-- e.g. Management -->
- **GitHub URL**: <!-- e.g. https://github.com/portainer/portainer -->

### Container Description

<!-- Provide a brief, clear description of what this container does -->

### Tags

<!-- List the tags for this container (e.g., Management, Docker, UI) -->

### Checklist

**Thank you for contributing a new container. Please ensure it meets the following requirements:**

- [ ] PR targets the `main` branch
- [ ] Container image is actively maintained
- [ ] Docker Compose definition uses provided environment variables (e.g., `${PUID}`, `${CONFIG_PATH}`)
- [ ] Docker Compose definition has been tested
- [ ] Container has been added to the appropriate category file
- [ ] The category is imported and included in `tools/index.ts` (if it's a new category)
- [ ] Commits follow the [conventional commits guideline](https://www.conventionalcommits.org/en/v1.0.0/)

### Added Code

```typescript
// This is the container definition I've added (remove this comment)
{
  id: "container-id",
  name: "Container Name",
  description: "Description of what the container does and why it's useful.",
  category: "Category",
  tags: ["Tag1", "Tag2", "Tag3"],
  githubUrl: "https://github.com/user/repo",
  icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/icon-name.svg",
  composeContent: `services:
  container-name:
    container_name: \${CONTAINER_PREFIX}container-name
    image: image/name:tag
    environment:
      - PUID=\${PUID}
      - PGID=\${PGID}
      - TZ=\${TZ}
    volumes:
      - \${CONFIG_PATH}/container-name:/config
      - \${DATA_PATH}/data:/data
    ports:
      - "8080:8080"
    restart: \${RESTART_POLICY}`
}
```

This PR is in accordance with the [CONTRIBUTING.md](https://github.com/ajnart/docker-compose-maker/blob/main/CONTRIBUTING.md) guidelines. 