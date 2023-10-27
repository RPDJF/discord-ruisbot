# discord-ruisbot

[![License](https://img.shields.io/badge/License-CC%20BY-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

## Table of Contents
- [Description](#description)
- [Contact](#contact)
- [License](#license)
- [Project Disclaimer](#project-disclaimer)
- [Requirements](#requirements)
- [Environment Variables](#environment-variables)
- [Configuration Files](#configuration-files)
- [Getting Started](#getting-started)
- [Step-by-Step Guide: Adding a New Docker Stack with Portainer](#docker-stack-guide)
- [Docker Compose File](#docker-compose-file)

## Description<a id="description"></a>
discord-ruisbot is a Discord bot developed by RPDJF (also known as Banatawa) from ruinformatique. The bot utilizes various features and APIs to enhance your Discord server experience.

- [Official bot](https://discord.com/oauth2/authorize?client_id=956303957439955007&permissions=8&scope=bot)
- [Support server](https://discord.gg/ApcGtB3M6M)

## Contact<a id="contact"></a>
- Creator: RPDJF (Banatawa)
- Discord: [Support server](https://discord.gg/ApcGtB3M6M)
- Email: contact@ruinformatique.ch

## License<a id="license"></a>
This project is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit [https://creativecommons.org/licenses/by/4.0/](https://creativecommons.org/licenses/by/4.0/).

It means that you can do pretty much everything with this project, as long as I get credited.

## Project Disclaimer<a id="project-disclaimer"></a>
**Important: This project is developed by a passionate individual who learns development in his spare time. The project may not be well-structured, and updates may not be frequent. Long periods of inactivity are to be expected.**

## Requirements<a id="requirements"></a>
- A nodejs server is required.
- This project uses APIs from Discord, OpenAI, and Firestore, make sure to get your own API keys.
- You need to set up environment variables, or at least, create an .env file in the src folder of the project.
- You need to import the firebase configuration file (more details in the `Configuration Files` section).
- You also need to create a webhook from TOP.GG to get the server voting system working (`/config/top.gg.js`).
  - On the webhook settings from TOP.GG, you need to specify the port you are using on the URL, if not using standard port 80 (HTTP) or 443 (HTTPS).
  - You also need to specify the `/vote` endpoint in the webhook URL setting from TOP.GG.
  - For the webhook instance to work, you need to have a public IP address with port forwarding on the port you specified in the webhook settings from TOP.GG.

## Environment Variables<a id="environment-variables"></a>
The project utilizes environment variables, and you can create a `.env` file at the root to configure them. Make sure to fill the variable values.

- `DISCORD_BOT_TOKEN`: [Bot's token from discord developer portal]
- `DISCORD_BOT_ID`: [Bot's id from discord developer portal]
- `OPENAI_API_KEY`: [Openai API Key which you can get from their portal]
- `OPENAI_ORGANIZATION_ID`: [OpenAI ID which you can get from their portal]
- `TENOR_API_KEY`: [Tenor API Key which you can get from their portal]
- `NASA_API_KEY`: [NASA API Key which you can get from their portal]
- `TOP_GG_WEBHOOK_AUTH`: [Top.gg webhook authentication key which you can **create** in their portal]
- `TOP_GG_WEBHOOK_PORT`: [Top.gg webhook port to listen to] (you want it to be 80 or 443)

## Configuration Files<a id="configuration-files"></a>
Don't forget to import `firebase-adminsdk-credential` into the `/config` folder, named as `firebase-adminsdk-credential.json`, you can get that from the Firestore portal.

The rest of the configuration files are mostly default settings that you can change.

## Getting Started<a id="getting-started"></a>
### Global
**Make sure you have already seen the requirements above. [Link to Requirements](#requirements)**
To run the project, simply use the following command:

```bash
npm i
npm start
```

## Step-by-Step Guide: Adding a New Docker Stack with Portainer
> You can also use [Watch Tower](https://github.com/containrrr/watchtower) to keep Rui's Bot up to date

1. **Access Portainer**: Open Portainer and log in to your Docker instance.

2. **Choose Stacks**: Navigate to the "Stacks" option in the menu.

3. **Add Stack**: Click on "Add Stack."

4. **Name Your Stack**: In the "Name" field, provide a meaningful name for your stack, e.g., "discord-ruisbot."

5. **Select Repository Build Method**: Under the "Repository" section, choose "Repository" as the build method.

6. **Repository URL**: Enter the GitHub project's URL: [https://github.com/RPDJF/discord-ruisbot](https://github.com/RPDJF/discord-ruisbot)

7. **Deploy the Stack**: Click "Deploy the stack" to initiate the deployment process.

8. **Download Project**: The stack will create a directory in `/data/compose/`. Access this directory to download the entire project.

9. **Create .env File**: Inside `/data/compose/{id}/opt/discord-ruisbot/`, create a `.env` file with the necessary environment variables matching the titles. [Link to Environment Variables](#Environment-Variables)

10. **Move Firestore Admin SDK**: Move your Firestore Admin SDK to `/data/compose/{id}/opt/discord-ruisbot/config`, aligning with the Configuration Files title. [Link to Configuration Files](#Configuration-Files)

11. **Restart the Bot**: You can now restart the bot to apply the new configurations.


## Docker compose file
It pulls node latest image, clones the repo and starts it
Don't forget to check the requirements
`com.centurylinklabs.watchtower.stop-signal` allows Watchtower to update the container. Not needed if you don't have Watchtower.
