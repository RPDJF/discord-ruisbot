// imports
const { Message, Collection } = require("discord.js");
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
    // Check if args[1] is a category, then if it is a command
    switch (args[1]) {
      // Get all commands
      case "all":
        return getEmbedsFromCommandCollection(guild, msg.client.commands, 9);
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
        const commands = getCommandCollectionFromCategory(
          args[1],
          msg.client.commands,
        );
        // Check if args[1] is a category, else if it is a command
        if (commands.size) {
          return getEmbedsFromCommandCollection(guild, commands, 9);
        } else {
          msg.client.commands.has(args[1])
            ? (embeds = [
                embedUtility.message(
                  args[1],
                  messages.data.commands[args[1]].usage[guild.lang],
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
 * @param {Collection} commands a collection of commands to get embeds from
 * @param {Number} maxFields max fields per embed
 * @returns {Array} an array of embeds
 */
function getEmbedsFromCommandCollection(guild, commands, maxFields) {
  // Var initialisation
  const embeds = []; // output
  let maxPages; // max pages
  let fields = [];
  // Get max pages (for some stupid reason, msg.client.commands.length just doesn't work)
  maxPages = Math.floor(commands.size / maxFields);
  let i = 0; // fields index
  // Loop through commands
  commands.forEach((command) => {
    // Check if current embed reached max fields or if it is the last command
    if (
      (i ? (i % maxFields ? false : true) : false) ||
      i >= commands.size - 1
    ) {
      // reset index because max fields is reached
      i = 0;
      // generate new embed
      let embed = embedUtility.fieldsMessage(
        commandMessage.replies.categories.all.title[guild.lang],
        `total: ${commands.size}`,
        fields,
        BOT_AUTHOR,
        maxPages ? (embeds.length ? embeds.length + 1 : 1) : 0,
        maxPages ? maxPages : undefined,
      );
      // push embed to embeds
      embeds.push(embed);
      // reset fields
      fields = [];
    }
    // push command to current embed
    fields.push({
      name: command.name,
      value: command.description[guild.lang],
      inline: true,
    });
    i++; // increment index of fields
  });
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
    // Check if embeds is null, îf so, send wrong usage message
    if (embeds == null) {
      embedUtility.genericWrongUsageMessage(msg, args, this);
      return 0;
    }
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
