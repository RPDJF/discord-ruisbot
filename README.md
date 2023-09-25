
# discord-ruisbot

[![License](https://img.shields.io/badge/License-CC%20BY-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

## Description
discord-ruisbot is a Discord bot developed by RPDJF (also known as Banatawa) from ruinformatique. The bot utilizes various features and APIs to enhance your Discord server experience.
Official bot : https://discord.com/oauth2/authorize?client_id=956303957439955007&permissions=8&scope=bot.
Support server : https://discord.gg/ApcGtB3M6M

## Contact
- Creator: RPDJF (Banatawa)
- Discord: Banatawa
- Email: contact@ruinformatique.ch

## License
This project is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit [https://creativecommons.org/licenses/by/4.0/](https://creativecommons.org/licenses/by/4.0/).

It means that you can do pretty much everything with this project, as long as I get credited.

## Project Disclaimer

**Important: This project is developed by a passionate individual who learns development in his spare time. The project may not be well-structured, and updates may not be frequent. Long periods of inactivity are to be expected.**

## Requirements
A nodejs server is requiered.
This project uses APIs from Discord, OpenAI and Firestore, make sure to get your own API keys.
You need to setup environment variables, or at least, create an .env file to the src folder of the project.
You need to import the firebase configuration file (more details on `Configuration Files` section).

## Environment Variables
The project utilizes environment variables, and you can create a `.env` file at the root to configure them. Make sure to fill the variable values. 

- `DISCORD_BOT_TOKEN`: [Bot's token from discord developer portal]
- `DISCORD_BOT_ID`: [Bot's id from discord developer portal]
- `OPENAI_API_KEY`: [Openai API Key which you can get from their portal]
- `OPENAI_ORGANIZATION_ID`: [OpenAI ID which you can get from their portal]

## Configuration Files
Don't forget to import firebase-adminsdk-credential into the `/config` folder, named as `firebase-adminsdk-credential.json`, you can get that from firestore portal

The rest of the configuration files are mostly default settings that you can change

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