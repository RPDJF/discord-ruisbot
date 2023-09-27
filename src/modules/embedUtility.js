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
 * @returns {Embed}
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
  return embed;
}

/**
 * Build a standard embed message
 * @param {String} title
 * @param {String} description
 * @returns {Embed}
 */
function message(title, description, author) {
  if (!author) author = BOT_AUTHOR;
  const embed = short(description, author);
  embed.data.title = title;
  return embed;
}

function image(image, author) {
  if (!author) author = BOT_AUTHOR;
  const embed = new EmbedBuilder()
    .setColor(PRIMARY_COLOR)
    .setImage(image)
    .setFooter({
      text: `${name} ${version}`,
      iconURL:
        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    })
    .setAuthor(author)
    .setTimestamp();
  return embed;
}

function imageMessage(title, description, image, author) {
  if (!author) author = BOT_AUTHOR;
  const embed = message(title, description, author);
  embed.data.image = { url: image };
  return embed;
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
  const embed = message(title, description, author);
  embed.setThumbnail("https://i.ibb.co/2kwXNDH/ezgif-3-0a9b75dfda.gif");
  embed.setColor(16080449);
  return embed;
}
/**
 * Build an message with fields and pagination
 * @param {String} title
 * @param {String} description
 * @param {import("discord.js").MessageEmbedField[]} fields
 * @param {Int32Array} page
 * @returns {Embed}
 */
function fieldsMessage(title, description, fields, author, page, pageMax) {
  if (!author) author = BOT_AUTHOR;
  const embed = message(title, description, author);
  embed.setFields(fields);

  if (page && pageMax)
    embed.data.footer.text = `Page ${page}/${pageMax}\n${embed.data.footer.text}`;

  return embed;
}

function genericErrorMessage(msg, guild) {
  switch (guild.lang) {
    case "fr":
      msg.channel.send({
        embeds: [
          errorMessage(
            "oh non...",
            "Un problème est survenu, réessayez dans un petit moment.",
          ),
        ],
      });
      break;
    default:
      msg.channel.send({
        embeds: [
          errorMessage(
            "oh nooo...",
            "Something went wrong, please retry later.",
          ),
        ],
      });
      break;
  }
}

function genericPermissionMessage(msg, guild) {
  switch (guild.lang) {
    case "fr":
      msg.channel.send({
        embeds: [
          errorMessage(
            "rh petit margoulin !",
            "Seuls les administrateurs du serveur sont en mesure de lancer cette commande ! ",
          ),
        ],
      });
      break;
    default:
      msg.channel.send({
        embeds: [
          errorMessage(
            "I saw ya !",
            "You can't use this command, it's only for administrators.",
          ),
        ],
      });
      break;
  }
}

async function genericWrongUsageMessage(msg, args, command) {
  const guild = await db.getData("guilds", msg.guildId);
  switch (guild.lang) {
    case "fr":
      msg.channel.send({
        embeds: [
          errorMessage(
            "mauvaise utilisation",
            `**${args[0]}**\n${
              command.description[guild.lang]
            }\n\nUsage : \`\`\`${guild.prefix}${command.usage}\`\`\``,
          ),
        ],
      });
      break;
    default:
      msg.channel.send({
        embeds: [
          errorMessage(
            "wrong usage",
            `**${args[0]}**\n${
              command.description[guild.lang]
            }\n\nUsage : \`\`\`${guild.prefix}${command.usage}\`\`\``,
          ),
        ],
      });
      break;
  }
}

function genericDisabledOpenAIMessage(msg, guild) {
  switch (guild.lang) {
    case "fr":
      msg.channel
        .send({
          embeds: [
            errorMessage(
              "GPT4 est désactivé sur ce serveur",
              "Les services OpenAI ont été désactivés par les administrateurs du serveur.",
            ),
          ],
        })
        .catch((err) => {
          console.error(err);
          return 1;
        });
      break;
    default:
      msg.channel
        .send({
          embeds: [
            errorMessage(
              "GPT4 is disabled on this server",
              "OpenAI services have been turned of by this server's administrators.",
            ),
          ],
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
  image,
  imageMessage,
  errorMessage,
  fieldsMessage,
  genericErrorMessage,
  genericPermissionMessage,
  genericWrongUsageMessage,
  genericDisabledOpenAIMessage,
  short,
};
