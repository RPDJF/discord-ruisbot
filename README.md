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
    - **Run the docker compose file (below)**: `docker compose up -d`
3. **Build Your Own Image** (if desired):
    - **Clone the Repository**: `git clone https://github.com/RPDJF/discord-ruisbot`
    - **Run the docker compose file (below)**: `docker compose -f docker-compose-build.yml up -d`
4. **Running without Docker (needs nodejs)**:
    - **Clone the Repository**: `git clone https://github.com/RPDJF/discord-ruisbot`
    - **Install Dependencies**: `npm install`
    - **Be sure to set up the `.env` file as mentioned above in the root directory**
    - **Be sure to set up the `firebase-adminsdk-credential.json` file in the `config` directory**
    - **Run the Bot**: `npm start`

## Docker Compose File
### Using the Official Image:
Using the `docker-compose.yml` file:
```yaml
services:
  nodejs:
    container_name: discord-ruisbot
    image: rpdjf/discord-ruisbot:latest
    volumes:
      - ./.env:/usr/src/app/.env # create your own .env file using env.example
      - ./firebase-adminsdk-credential.json:/usr/src/app/config/firebase-adminsdk-credential.json # download it from your firebase console
    environment:
      - TZ=Europe/Zurich
    ports:
      - "8083:80"
    restart: always
```
Run the image with `docker compose up -d`.

### Building Your Own Image:
Using the `docker-compose-build.yml` file:
```yaml
services:
  nodejs:
    container_name: discord-ruisbot
    build: .
    volumes:
      - ./.env:/usr/src/app/.env # create your own .env file using env.example
      - ./firebase-adminsdk-credential.json:/usr/src/app/config/firebase-adminsdk-credential.json # download it from your firebase console
    environment:
      - TZ=Europe/Zurich
    ports:
      - "8083:80"
    restart: always
```
Build and run the image with `docker compose -f docker-compose-build.yml up -d`.


That's it! You're all set to enjoy the wonders of Rui's Bot in your Discord server. Happy botting! 🎉
