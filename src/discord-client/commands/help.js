// imports
const { Message, Collection, Client } = require("discord.js");
const messages = require("../../modules/messages");
const db = require("../../modules/db");
const { DiscordEmbedsPaginator } = require("../../modules/paginator");
const embedUtility = require("../../modules/embedUtility");
const { BOT_AUTHOR, BOT_NAME } = require("../../../config/bot-conf");
const commandMessage = messages.data.commands.help;

/**
 *
 * Returns an array of embeds for the help command
 *
 * @param {Array<String>} args command arguments
 * @param {Guild} guild guild data
 * @returns {Array<Discord.MessageEmbed>} an array of Discord.js message embeds
 */
function getHelp(args, guild, msg) {
  // embeds initialisation
  let embeds = [];
  // Check if args is empty
  if (args.length < 2) {
    // fields initialisation
    const fields = [];
    // fill fields
    // chatbot
    fields.push({
      name: commandMessage.replies.default.chatbot.name[guild.lang],
      value: commandMessage.replies.default.chatbot.value[guild.lang],
      inline: false,
    });
    // categories
    const categories = commandMessage.replies.categories;
    for (const category of Object.keys(categories)) {
      fields.push({
        name: category,
        value: `\`\`\`${categories[category].description[guild.lang]}\`\`\``,
        inline: true,
      });
    }

    // generate embeds
    embeds.push(
      embedUtility.fieldsMessage(
        commandMessage.replies.default.title[guild.lang],
        commandMessage.replies.default.description[guild.lang]
          .toString()
          .replace("{prefix}", guild.prefix),
        fields,
      ),
    );

    // return embeds
    return embeds;
  } else {
    // Get allowed commands for user
    const allowedCommands = getAllowedCommands(msg.client.commands, msg.member);
    // Check if args[1] is a category, then if it is a command
    switch (args[1]) {
      // Get all commands
      case "all":
        return getEmbedsFromCommandCollection(guild, allowedCommands, 9);
      case "chatbot":
        const fields = [];
        for (const feature in commandMessage.replies.chatBot.features) {
          const _feature = commandMessage.replies.chatBot.features[feature];
          fields.push({
            name: _feature.title[guild.lang],
            value: _feature.description[guild.lang]
              .toString()
              .replace("{botName}", BOT_NAME),
            inline: true,
          });
        }
        fields.push({
          name: commandMessage.replies.chatBot.privacy.title[guild.lang],
          value: commandMessage.replies.chatBot.privacy.description[guild.lang],
          inline: false,
        });
        embeds = [
          embedUtility.fieldsMessage(
            commandMessage.replies.chatBot.title[guild.lang],
            commandMessage.replies.chatBot.description[guild.lang]
              .toString()
              .replace("{botName}", BOT_NAME),
            fields,
          ),
        ];
        return embeds;
      default:
        // Get allowed commands from category
        const allowedCommandsFiltered = getCommandCollectionFromCategory(
          args[1],
          allowedCommands,
        );
        // Get all commands from category (used to check if user has permission to use category later)
        const commandsFiltered = getCommandCollectionFromCategory(
          args[1],
          msg.client.commands,
        );
        // Check if args[1] is a category, else if it is a command
        if (allowedCommandsFiltered.size) {
          return getEmbedsFromCommandCollection(
            guild,
            allowedCommandsFiltered,
            9,
          );
        } else if (commandsFiltered.size) {
          embedUtility.genericPermissionMessage(msg, guild);
          return;
        } else {
          msg.client.commands.has(args[1])
            ? (embeds = [
                embedUtility.message(
                  args[1],
                  `${messages.data.commands[args[1]].description[guild.lang]}
                  \`\`\`${guild.prefix}${messages.data.commands[
                    args[1]
                  ].usage.join(`\`\`\`\`\`\`${guild.prefix}`)}\`\`\``,
                ),
              ])
            : (embeds = [
                embedUtility.errorMessage(
                  commandMessage.replies.notFound.title[guild.lang],
                  commandMessage.replies.notFound.description[guild.lang]
                    .toString()
                    .replace("{prefix}", guild.prefix)
                    .replace("{command}", args[1]),
                ),
              ]);
        }
    }
  }
  // return embeds
  return embeds;
}

function getAllowedCommands(commands, member) {
  const output = new Collection();
  commands.forEach((command) => {
    if (command.permission && !member.permissions.has(command.permission))
      return;
    output.set(command.name, command);
  });
  return output;
}

/**
 * @param {String} category the category to get commands from
 * @returns {Collection} a collection of commands
 */
function getCommandCollectionFromCategory(category, commands) {
  // Var initialisation
  const output = new Collection();
  // Loop through commands
  commands.forEach((command) => {
    // Check if command is in category
    if (command.category == category) {
      // push command to commands
      output.set(command.name, command);
    }
  });
  return output;
}

/**
 * Returns an array of embeds from a collection of commands
 *
 * @param {Guild} guild guild data
 * @param {Collection} commands a collection of commands
 * @param {Number} maxFields max fields per embed
 * @returns {Array} an array of embeds
 */
function getEmbedsFromCommandCollection(guild, commands, maxFields) {
  // Var initialisation
  const embeds = [];
  var fields = [];
  const totalPage = Math.ceil(commands.size / maxFields);
  // For each command
  for (let i = 1; i < commands.size + 1; i++) {
    // Push command to fields
    fields.push({
      name: commands.at(i - 1).name,
      // if description longer than 25 carracters, cut and add ...
      value:
        commands.at(i - 1).description[guild.lang].length > 28 &&
        !commands.at(i - 1).description[guild.lang].includes("<a:" | "<:")
          ? commands.at(i - 1).description[guild.lang].substring(0, 28) + "..."
          : commands.at(i - 1).description[guild.lang],

      inline: true,
    });
    // When fields is full or when it is the last command
    if (i % maxFields == 0 || i == commands.size) {
      // Push fields to embeds
      embeds.push(
        embedUtility.fieldsMessage(
          commandMessage.replies.default.title[guild.lang],
          `Page **${embeds.length + 1}** sur **${totalPage}**`,
          fields,
        ),
      );
      // Reset fields
      fields = [];
    }
  }
  return embeds;
}

module.exports = {
  name: "help",
  description: messages.data.commands.help.description,
  usage: messages.data.commands.help.usage,
  category: undefined,
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  async execute(msg, args) {
    // Code to execute when command is run
    // Get guild data
    const guild = await db.getData("guilds", msg.guild.id).catch((err) => {
      console.error(err);
      return 1;
    });
    // Generate embeds
    const embeds = getHelp(args, guild, msg);
    // Check if embeds is null, îf so return
    if (embeds == null) return;
    // Check emebds size
    if (embeds.length < 2) {
      msg.channel.send({ embeds });
    } else {
      // Create a new paginator
      const paginator = new DiscordEmbedsPaginator([], {
        customEmbeds: embeds,
      });
      // Send paginator message
      await paginator.createPaginatorMessage(msg.channel).catch((err) => {
        console.error(err);
        return 1;
      });
    }
  },
};
