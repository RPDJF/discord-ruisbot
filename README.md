
# discord-ruisbot

[![License](https://img.shields.io/badge/License-CC%20BY-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

## Description
discord-ruisbot is a Discord bot developed by RPDJF (also known as Banatawa) from ruinformatique. The bot utilizes various features and APIs to enhance your Discord server experience.
Official bot : https://discord.com/oauth2/authorize?client_id=956303957439955007&permissions=8&scope=bot.

## Contact
- Creator: RPDJF (Banatawa)
- Discord: Banatawa#0069
- Email: contact@ruinformatique.ch

## License
This project is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit [https://creativecommons.org/licenses/by/4.0/](https://creativecommons.org/licenses/by/4.0/).

## Project Disclaimer

**Important: This project is developed by a passionate individual who learns development in his spare time. The project may not be well-structured, and updates may not be frequent. Long periods of inactivity are to be expected.**

## Requirements
A nodejs server is requiered.
This project uses APIs from Google firebase, Tenor, OpenIA and more, make sure to get your own API keys for each of them.
You need to setup environment variables, or at least, create an .env file to the root folder.

## Environment Variables
The project utilizes environment variables, and you can create a `.env` file at the root to configure them. Make sure to fill the variable values.

- `BOT_INVITE`: [Bot Invite Link]
- `CLIENT_TOKEN`: [Discord Bot Token]
- `CLIENT_ID`: [Discord Client ID]
- `DEFAULT_PREFIX`: [Bot Default Prefix]
- `FS_AUTH_PROVIDER_X509_CERT_URL`: [Firebase Auth Provider X509 Cert URL]
- `FS_AUTH_URI`: [Firebase Auth URI]
- `FS_CLIENT_EMAIL`: [Firebase Client Email]
- `FS_CLIENT_ID`: [Firebase Client ID]
- `FS_CLIENT_X509_CERT_URL`: [Firebase Client X509 Cert URL]
- `FS_PRIVATE_KEY`: [Firebase Private Key]
- `FS_PROJECT_ID`: [Firebase Project ID]
- `FS_TOKEN_URI`: [Firebase Token URI]
- `FS_TYPE`: [Firebase Type]
- `TENOR_API_KEY`: [Tenor API Key]
- `OPENAI_API_KEY`: [OpenAI API Key]
- `WAIFU-IT_API_KEY`: [Waifu.it API Key]

## Getting Started
**Make sure you have already seen the requirements above.**
To run the project, simply use the following command:
```bash
npm i
npm start
```

## Docker compose file
It pulls node latest image, clones the repo and starts it
Don't forget to check the requirements
`com.centurylinklabs.watchtower.stop-signal` allows Watchtower to update the container. Not needed if you don't have Watchtower.
```
version: '3'
services:
  nodejs:
    container_name: ruisbot
    image: node:latest
    labels:
        com.centurylinklabs.watchtower.stop-signal: "SIGHUP"
    command: bash -c "cd /opt;[ ! -d 'discord-ruisbot' ] && git clone https://github.com/RPDJF/discord-ruisbot.git || (cd discord-ruisbot && git checkout main && git pull); cd discord-ruisbot;npm i; npm start"
    volumes:
      - ./opt:/opt/ # don't forget to  upload .env file into /opt/ruisbot/
    environment:
      - TZ=Europe/Zurich
    restart: always
```
