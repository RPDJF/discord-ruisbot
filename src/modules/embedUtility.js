// Imports
const { EmbedBuilder, Embed } = require("discord.js");
const { name, version } = require("../../package.json");
const {
  BOT_ICON,
  PRIMARY_COLOR,
  BOT_AUTHOR,
} = require("../../config/bot-conf");
const db = require("./db");

// Message type
/**
 * Build a standard embed message
 * @param {String} title
 * @param {String} description
 * @returns {Embed[]}
 */

function short(description, author) {
  if (!author) author = BOT_AUTHOR;
  const embed = new EmbedBuilder()
    .setColor(PRIMARY_COLOR)
    .setDescription(description)
    .setFooter({
      text: `${name} ${version}`,
      iconURL:
        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    })
    .setAuthor(author)
    .setThumbnail(BOT_ICON)
    .setTimestamp();
  return [embed];
}

function message(title, description, author) {
  if (!author) author = BOT_AUTHOR;
  const embed = short(description, author)[0];
  embed.data.title = title;
  return [embed];
}

function imageMessage(title, description, image, author) {
  if (!author) author = BOT_AUTHOR;
  const embed = message(title, description, author)[0];
  embed.data.image = { url: image };
  return [embed];
}
/**
 * Build an error style embed
 * @param {String} title
 * @param {String} description
 * @param {Object} author
 * @returns {Embed[]}
 */
function errorMessage(title, description, author) {
  if (!author) author = BOT_AUTHOR;
  const embed = message(title, description, author)[0];
  embed.setColor(16080449);
  return [embed];
}
/**
 * Build an message with fields and pagination
 * @param {String} title
 * @param {String} description
 * @param {import("discord.js").MessageEmbedField[]} fields
 * @param {Int32Array} page
 * @returns {Embed[]}
 */
function fieldsMessage(title, description, fields, author, page = 1) {
  if (!author) author = BOT_AUTHOR;
  const fieldsPerPage = 8;
  const startIndex = (page - 1) * fieldsPerPage;
  const endIndex = startIndex + fieldsPerPage;
  const paginatedFields = fields.slice(startIndex, endIndex);
  const embed = message(title, description, author)[0];
  embed.setFields(paginatedFields);
  const totalPages = Math.ceil(fields.length / fieldsPerPage);

  if (page < 1 || page > totalPages)
    return errorMessage(
      "Erreur de pagination",
      "La page demandée est invalide.",
      author,
    );
  embed.data.footer.text = `Page ${page}/${totalPages}\n${embed.data.footer.text}`;

  return [embed];
}

function genericErrorMessage(msg, guild) {
  switch (guild.lang) {
    case "fr":
      msg.reply({
        embeds: errorMessage(
          "oh non...",
          "Un problème est survenu, réessayez dans un petit moment.",
        ),
      });
      break;
    default:
      msg.reply({
        embeds: errorMessage(
          "oh nooo...",
          "Something went wrong, please retry later.",
        ),
      });
      break;
  }
}

function genericPermissionMessage(msg, guild) {
  switch (guild.lang) {
    case "fr":
      msg.reply({
        embeds: errorMessage(
          "rh petit margoulin !",
          "Seuls les administrateurs du serveur sont en mesure de lancer cette commande ! ",
        ),
      });
      break;
    default:
      msg.reply({
        embeds: errorMessage(
          "I saw ya !",
          "You can't use this command, it's only for administrators.",
        ),
      });
      break;
  }
}

async function genericWrongUsageMessage(msg, args, command) {
  const guild = await db.getData("guilds", msg.guildId);
  switch (guild.lang) {
    case "fr":
      msg.reply({
        embeds: errorMessage(
          "mauvaise utilisation",
          `**${args[0]}**\n${
            command.description[guild.lang]
          }\n\nUsage : \`\`\`${guild.prefix}${command.usage}\`\`\``,
        ),
      });
      break;
    default:
      msg.reply({
        embeds: errorMessage(
          "wrong usage",
          `**${args[0]}**\n${
            command.description[guild.lang]
          }\n\nUsage : \`\`\`${guild.prefix}${command.usage}\`\`\``,
        ),
      });
      break;
  }
}

function genericDisabledOpenAIMessage(msg, guild) {
  switch (guild.lang) {
    case "fr":
      msg
        .reply({
          embeds: errorMessage(
            "GPT4 est désactivé sur ce serveur",
            "Les services OpenAI ont été désactivés par les administrateurs du serveur.",
          ),
        })
        .catch((err) => {
          console.error(err);
          return 1;
        });
      break;
    default:
      msg
        .reply({
          embeds: errorMessage(
            "GPT4 is disabled on this server",
            "OpenAI services have been turned of by this server's administrators.",
          ),
        })
        .catch((err) => {
          console.error(err);
          return 1;
        });
      break;
  }
}

module.exports = {
  message,
  imageMessage,
  errorMessage,
  fieldsMessage,
  genericErrorMessage,
  genericPermissionMessage,
  genericWrongUsageMessage,
  genericDisabledOpenAIMessage,
  short,
};
