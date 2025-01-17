# Node.js Dev Container with Next.js and Postgres Connection

> This repo is based on the plain Node.js Dev Container with Next.js

This repo is the basis for Next.js projects that connect to a Postgres database (using [Drizzle ORM](https://orm.drizzle.team/)) in a Docker container. Copy this repo when you start a new project and enhance the project from there.

## Prerequisites

- Docker Desktop
- Visual Studio Code
- VS Code Remote - Containers extension

## Getting Started

1. Copy the environment file:

   ```bash
   $ cp .env.example .env
   ```

1. Open the project in VS Code
1. When prompted, click "Reopen in Container". This will:

   - Build the development container
   - Install all dependencies
   - Set up the PostgreSQL database

You can notice that everything worked when you can see the dev container name on the bottom left and the change of the VS Code color theme to September Steel.

1. Run the development server:

   ```bash
   npm run dev
   ```

## Repo Structure

Although the Docker and Dev container structure could be more minimal, this repo aims to have the files ready that you might enhance in the future:

1. `docker-compose.yml`: Contains the instructions to automate the creation of Docker images, the environment and application dependencies for a container.
1. `.devontainer/devcontainer.json`: Describes the settings, extensions, and environment for a development container in your code editor.
1. `.devontainer/Dockerfile`: Defines the steps required to build the Docker image, specifying the base image, environment variables, dependencies, commands, and configurations.

## TODO

- [ ] Add relevant VS Code extensions 
- [ ] Research how to prevent adding environment variables in `.env` for the database connection AND the `DATABASE_URL` -- ideally I don't want to change information on e.g. `PGUSER` and `DATABASE_URL` -- ideally, the `DATABASE_URL` gets constructed by the other variables
