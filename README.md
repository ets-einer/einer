<h1 align="center">
  <!-- <br> -->
  <!-- [Project's Logo] -->
  <br>
  Einer
  <br>
</h1>

<h3 align="center">Main app's Monorepository.</h3>

<h4 align="center">
  <a href="https://docs-einer.vercel.app/pt/bem-vindo">Project's Documentation</a>
</h4>

<!-- <p align="center">
  [Project's badges]
  Add badges of CI/CD or something idk
</p> -->

<p align="center">
  <a href="#about">About</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#faq">FAQ</a> •
  <a href="#roadmap">Roadmap</a> •
  <a href="#license">License</a>
</p>

<!-- ![screenshot](screenshots/1.jpg) any screenshot of each plataform is welcome here -->

## About

// todo

## Key Features

- Borum: A knowledge focused website where users and instructors collaborate together to accumulate information and data throgh questions, guides and lessons.
- Planner: Manage, visualize and collaborate on all your projects using only one tool for everyone.
- VsDiA Web: Easily develop and build a VsDiA together with your co-workers in one place by using a realtime collaborative tool for mapping processes.

## Development

### Roadmap

All progress tracking will be made in [ClickUp](https://clickup.com/)

### Docs

<a href="https://docs-einer.vercel.app/pt/bem-vindo">Project's Documentation</a>

### Aplications Ports

We decided to define our convetion in the following way:

- Web Apps (vite): 3000
- Web App services: 4000
- Common Services: 5000
- Databases: 6000
- Others: 7000

So for all our applications the port mapping is:

| App         | Port |
| ----------- | ---- |
| Web Common  | 3000 |
| Web Borum   | 3001 |
| Web Planner | 3002 |
| Web VSDIA   | 3003 |

| Services                  | Port |
| ------------------------- | ---- |
| Service Borum             | 4001 |
| Service Planner           | 4002 |
| Service VSDIA             | 4003 |
| Service Authentication    | 5000 |
| Service S3 (File Storage) | 5001 |

| Databases            | Port |
| -------------------- | ---- |
| Authentication Redis | 6000 |

## Getting Started

All important features and requisites are defined [in the documentation website](https://docs-einer.vercel.app/pt/bem-vindo).

### Prerequisites

Since this is an monorepo app using Turbo, these two dependencies is required to download all JavaScript and TypeScript packages.

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)

  Or

- [Docker](https://www.docker.com/) installed on your machine

### Installing and Running

#### Bare metal

If you want to run in bare metal, make sure you have the prerequisites and then you can just execute the following steps:

```bash
# Clone this repository
$ git clone https://github.com/ets-einer/einer

# Go into the repository
$ cd einer

# Copy the .env.dev file into .dev
$ cp .env.dev .env

# Install all necessary deps
$ pnpm install

# Push all database migrations
$ pnpm db-push

# Setup prisma orm client
$ pnpm generate

# Run the dev script
$ pnpm run dev
```

#### Docker

One of the benefits of docker is that you can run anywhere.

Make sure you have docker and docker-compose installed on your machine, then you can follow these steps:

```sh
# Clone this repository
$ git clone https://github.com/ets-einer/einer

# Go into the repository
$ cd einer

# Build the images using the docker-compose.dev.yml file
$ docker compose -f docker-compose.dev.yml up -d

# Make sure einer-einer-dev-1 is running
$ docker ps # list all running containers, see if you find einer-einer-dev-1

# Enter inside your docker using bash
$ docker exec -it einer-einer-dev-1 bash

# Copy the .env.dev file into .dev
$ cp .env.dev .env

# Install all necessary deps
$ pnpm install

# Push all database migrations
$ pnpm db-push

# Setup prisma orm client
$ pnpm generate

# Run the dev script
$ pnpm run dev
```

## FAQ

### Is it any good?

[yes.](https://news.ycombinator.com/item?id=3067434)

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute, you can [open an issue on this repository](https://github.com/ets-einer/einer/issues), partipate on [existing pull requests](https://github.com/ets-einer/einer/pulls) or create your own pull request by forking this repository, commiting and opening a new pull request.

For conventions, it's recommended to name your commits and pull requests using the convention of [commitizen tool](http://commitizen.github.io/cz-cli/) which helps defining good naming for repository changes.

You can commit using [commitizen](http://commitizen.github.io/cz-cli/) you can stage your files using `$ git add` and just run:

```sh
$ git cz c
```

So to contribute to us you can:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git cz c`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Your license here.

## Acknowledgments

Inspiration, code snippets, etc.

---

> [docs-einer](https://docs-einer.vercel.app/) &nbsp;&middot;&nbsp;
> GitHub [@ets-einer](https://github.com/ets-einer)
