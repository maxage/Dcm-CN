---
name: Container Submission
about: Suggest a new container to add to the collection
title: '[CONTAINER] '
labels: container-suggestion
assignees: ''
---

## Checklist

- [ ] I have searched the issues and confirmed this container has not been suggested before
- [ ] I have verified the container image is actively maintained
- [ ] I have tested this container configuration

## Container Information

**Container ID:**
<!-- A unique ID for the container (e.g., sonarr, postgres) -->

**Name:**
<!-- The display name of the container (e.g., Sonarr, PostgreSQL) -->

**Description:**
<!-- A brief description of the container's purpose -->

**Category:**
<!-- Select one: Media, Management, Networking, Storage, Database, Monitoring, Home Automation, Security, Development -->

**Tags:**
<!-- Comma-separated list of tags relevant to this container (e.g., TV, PVR, Monitoring) -->

**GitHub URL (Optional):**
<!-- Link to the GitHub repository for this container or its documentation -->

## Docker Compose Service Definition

```yaml
# Paste your service definition in YAML format here
services:
  container-name:
    container_name: container-name
    image: image/name:tag
    ports:
      - "port:port"
    environment:
      - VAR=value
    volumes:
      - volume:path
```

## Additional Information

<!-- Any additional information that could be helpful for the maintainers --> 