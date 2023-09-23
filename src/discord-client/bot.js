// Imports
const { Client, Rest, GatewayIntentBits, Collection, Events} = require("discord.js");
const { DEFAULT_PREFIX, DEFAULT_LANG } = require("../../config/bot-conf");
const { DISCORD_BOT_TOKEN } = require("../../config/discordjs-conf");
const dynamicActivity = require("./features/dynamicActivity");
const embedUtility = require("./features/embedUtility");
const db = require("../db");
const fs = require('fs');
const gpt = require("./features/gpt");

/// app init
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent] });

client.commands = new Collection;

const commandFiles = fs.readdirSync("./discord-client/commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Associez la commande au nom de la commande dans client.commands
  client.commands.set(command.name, command);
}
  
client.login(DISCORD_BOT_TOKEN);

// events
client.on(Events.ClientReady, () => {
    console.info(`Successfully logged in as ${client.user.tag}.`);
    dynamicActivity(client);
});

client.on(Events.MessageCreate, async (msg) => {
    // Init guild configuration
    let guild = await db.getData("guilds", msg.guildId).catch((err) => { console.error(err); return; });
    if (guild) {
        // Use fault values when missing data
        if (!guild.prefix)
            guild.prefix = DEFAULT_PREFIX;
        if (!guild.lang)
            guild.lang = DEFAULT_LANG;
    } else {
        guild = {
            prefix: DEFAULT_PREFIX,
            lang: DEFAULT_LANG
        };
        // WriteData to save in-memory
        await db.writeData("guilds", msg.guildId, guild).catch((err) => { console.error(err); return; });
    }
    
    try{
        // format args and commandName
        const args = msg.content.slice(guild.prefix.length).trim().split(' ');
        const commandName = args[0];
        // Check if it was a command or gpt usage, skips otherwise
        if (!msg.content.startsWith(guild.prefix) || msg.author.bot){
            if(msg.content.startsWith(`${DEFAULT_PREFIX}prefix`)){
                const command = client.commands.get(commandName);
                if(command)
                    if(await command.execute(msg, args))
                        embedUtility.genericErrorMessage(msg, guild);
                return;
            }
                else if(msg.mentions.users.has(client.user.id)){
                if(await gpt.execute(msg, client)){
                    const author = {
                        name:"OpenAI",
                        iconURL:"https://game-tournaments.com/media/logo/t25349.png",
                        url:"https://openai.com/api/"
                    }
                    switch(guild.prefix){
                        case "fr":
                            msg.reply({embeds: embedUtility.errorMessage("Oh non...", "Un problème est survenu, réessayez dans un petit moment.", author)});
                            break;
                        default:
                            msg.reply({embeds: embedUtility.errorMessage("Oh nooo...", "Something went wrong, please retry later.", author)});
                            break;
                    }
                }
            }
            return;
        }
        // Check if command exists
        const command = client.commands.get(commandName);
        if (!command){
            let embedReply;
            switch(guild.lang){
                case "fr":
                    embedReply = embedUtility.errorMessage(`${guild.prefix}${args[0]} ?`, `Je ne connais pas cette commande.\nTu peux les consulter en tapant : \`\`${guild.prefix}help\`\``);
                    break;
                default:
                    embedReply = embedUtility.errorMessage(`${guild.prefix}${args[0]} ?`, `I don't know this command.\nPlease consult them by typing: \`\`${guild.prefix}help\`\`.`);
                    break;
            }
            msg.reply({embeds: embedReply});
            return;
        }

        // Command execution
        try{
            if(args[0] == "help"){
                if(await command.execute(msg, args, client)) // if returns an integer, it's an error
                    embedUtility.genericErrorMessage(msg, guild);
            }
            else if(await command.execute(msg, args)) // if returns an integer, it's an error
                embedUtility.genericErrorMessage(msg, guild);
        } catch(err){
            console.error(err);
            embedUtility.genericErrorMessage(msg, guild);
        }
    } catch(err){
        console.error(err);
        embedUtility.genericErrorMessage(msg, guild);
    }
});