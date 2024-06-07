# discord-ruisbot 🤖

[![License](https://img.shields.io/badge/License-CC%20BY-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

## Description
discord-ruisbot is your fun companion in Discord! Developed by RPDJF, it's loaded with features to spice up your server experience.

- [Official bot](https://discord.com/oauth2/authorize?client_id=956303957439955007&permissions=8&scope=bot)
- [Support server](https://discord.gg/ApcGtB3M6M)

## Contact
- Creator: RPDJF (Banatawa)
- Discord: [Support server](https://discord.gg/ApcGtB3M6M)
- Email: contact@ruinformatique.ch

## License
This project is under the Creative Commons Attribution 4.0 International License. [Learn more](https://creativecommons.org/licenses/by/4.0/).

## Project Disclaimer
🚨 Important: This project is a labor of love by a self-taught developer. Expect occasional updates and periods of inactivity. 🚨

## Getting Started
1. **Set Environment Variables**: Fill in your API keys and configurations in the `.env` file. [Example](https://github.com/RPDJF/discord-ruisbot/blob/main/env.example)
2. **Use Official Image**:
    - **Pull the Official Image**: `docker pull rpdjf/discord-ruisbot:latest`
    - **Run the docker compose file (below)**: `docker-compose up -d`
3. **Build Your Own Image** (if desired):
    - **Clone the Repository**: `git clone https://github.com/RPDJF/discord-ruisbot`
    - **Build the Docker Image**: Use `docker build -t discord-ruisbot .` inside the project directory.
    - **Run the docker compose file (below)**: `docker-compose up -d`

## Docker Compose File
### Using the Official Image:
```yaml
version: "3"
services:
  bot:
    container_name: discord-ruisbot
    image: rpdjf/discord-ruisbot:latest
    volumes:
      - ./.env:/usr/src/app.env
      - ./firebase-adminsdk-credential.json:/usr/src/app/config/firebase-adminsdk-credential.json # download it from your firebase console
    environment:
      - TZ=Europe/Zurich
    restart: always
```

### Building Your Own Image:
```yaml
version: "3"
services:
  nodejs:
    container_name: discord-ruisbot
    build: .
    image: rpdjf/discord-ruisbot
    volumes:
      - ./.env:/usr/src/app.env # create your own .env file using env.example
      - ./firebase-adminsdk-credential.json:/usr/src/app/config/firebase-adminsdk-credential.json # download it from your firebase console
    environment:
      - TZ=Europe/Zurich
    restart: always
```
That's it! You're all set to enjoy the wonders of Rui's Bot in your Discord server. Happy botting! 🎉

## Docker Compose File
### Using the Official Image:
```yaml
version: "3"
services:
  bot:
    container_name: discord-ruisbot
    image: rpdjf/discord-ruisbot:latest
    volumes:
      - ./.env:/usr/src/app.env
      - ./firebase-adminsdk-credential.json:/usr/src/app/config/firebase-adminsdk-credential.json # download it from your firebase console
    environment:
      - TZ=Europe/Zurich
    restart: always
```

### Building Your Own Image:
```yaml
version: "3"
services:
  nodejs:
    container_name: discord-ruisbot
    build: .
    image: rpdjf/discord-ruisbot
    volumes:
      - ./.env:/usr/src/app.env # create your own .env file using env.example
      - ./firebase-adminsdk-credential.json:/usr/src/app/config/firebase-adminsdk-credential.json # download it from your firebase console
    environment:
      - TZ=Europe/Zurich
    restart: always
```
That's it! You're all set to enjoy the wonders of Rui's Bot in your Discord server. Happy botting! 🎉