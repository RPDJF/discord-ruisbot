// Imports
const {
  Client,
  Rest,
  GatewayIntentBits,
  Collection,
  Events,
} = require("discord.js");
const { DEFAULT_PREFIX, DEFAULT_LANG } = require("../../config/bot-conf");
const { DISCORD_BOT_TOKEN } = require("../../config/discordjs-conf");
const dynamicActivity = require("../modules/dynamicActivity");
const embedUtility = require("../modules/embedUtility");
const db = require("../modules/db");
const fs = require("fs");
const gpt = require("../modules/gpt");

/// app init
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./src/discord-client/commands")
  .filter((file) => file.endsWith(".js"));
// Load all commands from the commands folder
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // If the command has multiple commands, load them all
  if (command.hasMultipleCommands) {
    const subCommands = command.getSubCommands();
    for (const subCommand of Object.keys(subCommands)) {
      client.commands.set(
        subCommands[subCommand].name,
        subCommands[subCommand],
      );
    }
    continue;
  }
  // Add the command to the collection
  client.commands.set(command.name, command);
}

// Client login
client.login(DISCORD_BOT_TOKEN);

// events
client.on(Events.ClientReady, () => {
  console.info(`Successfully logged in as ${client.user.tag}.`);
  dynamicActivity(client);
});

client.on(Events.MessageCreate, async (msg) => {
  // Fetch guild data
  let guild = await db.getData("guilds", msg.guildId).catch((err) => {
    console.error(err);
    return;
  });
  if (guild) {
    // Use fault values when missing data
    if (!guild.prefix) guild.prefix = DEFAULT_PREFIX;
    if (!guild.lang) guild.lang = DEFAULT_LANG;
  } else {
    guild = {
      prefix: DEFAULT_PREFIX,
      lang: DEFAULT_LANG,
    };
    // WriteData to save in-memory
    await db.writeData("guilds", msg.guildId, guild).catch((err) => {
      console.error(err);
      return;
    });
  }

  try {
    // format args and commandName
    const args = msg.content.slice(guild.prefix.length).trim().split(" ");
    const commandName = args[0];
    // Check if author is a bot
    if (msg.author.bot) return;
    // Check if message is a command
    if (!msg.content.startsWith(guild.prefix)) {
      // Check if message is a prefix command
      if (msg.content.startsWith(`${DEFAULT_PREFIX}prefix`)) {
        // Execute prefix command (in case of forgotten prefix)
        const command = client.commands.get("prefix");
        if (command)
          if (await command.execute(msg, args))
            embedUtility.genericErrorMessage(msg, guild);
        return;
      } else if (msg.mentions.users.has(client.user.id)) {
        if (await gpt.execute(msg, client)) {
          const author = {
            name: "OpenAI",
            iconURL: "https://game-tournaments.com/media/logo/t25349.png",
            url: "https://openai.com/api/",
          };
          switch (guild.prefix) {
            case "fr":
              msg.channel.send({
                embeds: embedUtility.errorMessage(
                  "Oh non...",
                  "Un problème est survenu, réessayez dans un petit moment.",
                  author,
                ),
              });
              break;
            default:
              msg.channel.send({
                embeds: embedUtility.errorMessage(
                  "Oh nooo...",
                  "Something went wrong, please retry later.",
                  author,
                ),
              });
              break;
          }
        }
      }
      return;
    }
    // Check if command exists
    const command = client.commands.get(commandName);
    if (!command) {
      let embedReply;
      switch (guild.lang) {
        case "fr":
          embedReply = embedUtility.errorMessage(
            `${guild.prefix}${args[0]} ?`,
            `Je ne connais pas cette commande.\nTu peux les consulter en tapant : \`\`${guild.prefix}help\`\``,
          );
          break;
        default:
          embedReply = embedUtility.errorMessage(
            `${guild.prefix}${args[0]} ?`,
            `I don't know this command.\nPlease consult them by typing: \`\`${guild.prefix}help\`\`.`,
          );
          break;
      }
      msg.channel.send({ embeds: embedReply });
      return;
    }

    // Command execution
    try {
      if (await command.execute(msg, args))
        // if returns an integer, it's an error
        embedUtility.genericErrorMessage(msg, guild);
    } catch (err) {
      console.error(err);
      embedUtility.genericErrorMessage(msg, guild);
    }
  } catch (err) {
    console.error(err);
    embedUtility.genericErrorMessage(msg, guild);
  }
});
