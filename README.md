# Node.js Dev Container

This repo is the basis for Node.js projects in a Docker container. Copy this repo when you start a new project and enhance the project from there.

## Structure

Although the Docker and Dev container structure could be more minimal, this repo aims to have the files ready that you might enhance in the future:

1. `docker-compose.yml`: Contains the instructions to automate the creation of Docker images, the environment and application dependencies for a container.
1. `.devontainer/devcontainer.json`: Describes the settings, extensions, and environment for a development container in your code editor.
1. `.devontainer/Dockerfile`: Defines the steps required to build the Docker image, specifying the base image, environment variables, dependencies, commands, and configurations.
