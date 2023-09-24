// imports
const embedUtility = require("../features/embedUtility");
const db = require("../../modules/db");
const { BOT_AUTHOR } = require("../../../config/bot-conf");
const messages = require("../../modules/messages");

module.exports = {
  name: "help",
  description: messages.data.commands.help.description,
  usage: messages.data.commands.help.usage,
  category: undefined,
  /**
   * @param {Message} msg
   * @param {Array} args
   * @returns {Int32Array}
   */
  async execute(msg, args) {
    const fields = [];
    const guild = await db.getData("guilds", msg.guildId).catch((err) => {
      console.error(err);
      return 1;
    });
    if (args.length <= 1) {
      switch (guild.lang) {
        case "fr":
          fields.push({
            name: "Chatbot",
            value: "```Mentionnez moi pour discuter !```",
            inline: false,
          });
          fields.push({
            name: "all",
            value: "```Affiche toutes les commands du bot```",
            inline: true,
          });
          fields.push({
            name: "fun",
            value: "```Sélection de commandes sympathiques !```",
            inline: true,
          });
          fields.push({
            name: "interactions",
            value: "```Besoin de cogner quelqu'un ?```",
            inline: true,
          });
          fields.push({
            name: "configurations",
            value: "```Réservé aux modo discord avérés !```",
            inline: true,
          });
          msg.reply({
            embeds: embedUtility.fieldsMessage(
              "Liste des commandes",
              `Utilisez \`\`${guild.prefix}help <catégorie>\`\` pour avoir plus d'infos !`,
              fields,
            ),
          });
          break;
        default:
          fields.push({
            name: "Chatbot",
            value: "```Mention me to chat!```",
            inline: false,
          });
          fields.push({
            name: "all",
            value: "```Show all of the bot's commands```",
            inline: true,
          });
          fields.push({
            name: "fun",
            value: "```Selection of fun commands!```",
            inline: true,
          });
          fields.push({
            name: "interactions",
            value: "```Need to interact with someone?```",
            inline: true,
          });
          fields.push({
            name: "configurations",
            value: "```Reserved for verified Discord mods!```",
            inline: true,
          });
          msg.reply({
            embeds: embedUtility.fieldsMessage(
              "List of commands",
              `Use \`\`${guild.prefix}help <category>\`\` for more details!`,
              fields,
            ),
          });
          break;
      }
    } else {
      switch (guild.lang) {
        case "fr":
          switch (args[1]) {
            case "all":
              msg.client.commands.forEach((command) => {
                fields.push({
                  name: command.name,
                  value: command.description[guild.lang],
                });
              });
              msg.reply({
                embeds: embedUtility.fieldsMessage(
                  "Liste de toutes les commandes",
                  "bonne lecture !",
                  fields,
                  BOT_AUTHOR,
                  args[2],
                ),
              });
              break;
            case "chatbot":
              fields.push({
                name: "Suivi du contexte",
                value:
                  "Rui's bot est en mesure de saisir le contexte de la discussion!",
                inline: true,
              });
              fields.push({
                name: "Votre pote AI",
                value:
                  "L'AI a été entraînée spécifiquement pour avoir un compagnon super cool!",
                inline: true,
              });
              fields.push({
                name: "Interactions",
                value:
                  "*Bientôt*\nGPT4 fait partie intégrante du bot ! Plus besoin de taper des commandes, demandez-lui de le faire!",
                inline: true,
              });
              fields.push({
                name: "Confidentialité",
                value:
                  "Aucune trace de discussions n'est gardée ou redistribuée par le bot, l'historique de conversations ne devient actif que lorsque le bot est mentionné.\nIl est toutefois possible de désactiver la fonctionnalité (administrateurs) si vous ne souhaitez pas que OpenAI puisse avoir accès à ces conversations durant la génération de texte.",
                inline: false,
              });
              fields.push({
                name: "Termes d'utilisation",
                value:
                  "Termes de OpenAI [Lien vers les termes d'utilisation](https://openai.com/policies/terms-of-use)",
                inline: false,
              });
              const embeds = embedUtility.fieldsMessage(
                "Chatbot propulsé avec GPT4 !",
                `Grâce à OpenAI, le bot est capable d'intéragir avec lui tant que vous le **mentionnez** ou lui **répondez directement** !`,
                fields,
              );
              embeds[0].data.thumbnail = {
                url: "https://tmpfiles.nohat.cc/visualhunter-41c751e3c7.png",
              };
              msg.reply({ embeds: embeds });
              break;
            case "fun":
              msg.client.commands.forEach((command) => {
                if (command.category == "fun") {
                  fields.push({
                    name: command.name,
                    value: command.description[guild.lang],
                  });
                }
              });
              msg.reply({
                embeds: embedUtility.fieldsMessage(
                  "List des commandes fun",
                  "Amuse-toi bien !",
                  fields,
                  BOT_AUTHOR,
                  args[2],
                ),
              });
              break;
            case "configurations":
            case "configuration":
              msg.client.commands.forEach((command) => {
                if (command.category == "configurations") {
                  fields.push({
                    name: command.name,
                    value: command.description[guild.lang],
                  });
                }
              });
              msg.reply({
                embeds: embedUtility.fieldsMessage(
                  "List des commandes de configuration",
                  "Amuse-toi bien !",
                  fields,
                  BOT_AUTHOR,
                  args[2],
                ),
              });
              break;
            case "interactions":
            case "interaction":
              msg.client.commands.forEach((command) => {
                if (command.category == "interaction")
                  fields.push({
                    name: command.name,
                    value: command.description[guild.lang],
                  });
              });
              msg.reply({
                embeds: embedUtility.fieldsMessage(
                  "List of interaction commands",
                  "enjoy !",
                  fields,
                  BOT_AUTHOR,
                  args[2],
                ),
              });
              break;
            default:
              const command = msg.client.commands.get(args[1]);
              if (command)
                msg.reply({
                  embeds: embedUtility.message(
                    args[1],
                    `**description** : ${
                      command.description[guild.lang]
                    }\n**usage** : \`\`${guild.prefix}${command.usage}\`\``,
                  ),
                });
              else
                msg.reply({
                  embeds: embedUtility.errorMessage(
                    `${args[1]} ?`,
                    `Il n'y a pas ${args[1]} dans la liste des commandes.`,
                  ),
                });
              break;
          }
          break;
        default:
          switch (args[1]) {
            case "all":
              msg.client.commands.forEach((command) => {
                fields.push({
                  name: command.name,
                  value: command.description[guild.lang],
                });
              });
              msg.reply({
                embeds: embedUtility.fieldsMessage(
                  "List of all the commands",
                  "enjoy !",
                  fields,
                  BOT_AUTHOR,
                  args[2],
                ),
              });
              break;
            case "chatbot":
              fields.push({
                name: "Context Tracking",
                value:
                  "Rui's bot is capable of understanding the discussion context!",
                inline: true,
              });
              fields.push({
                name: "Your AI Buddy",
                value:
                  "The AI has been specifically trained to be a super cool companion!",
                inline: true,
              });
              fields.push({
                name: "Interactions",
                value:
                  "*Coming Soon*\nGPT4 is an integral part of the bot! No need to type commands, just ask it to do it!",
                inline: true,
              });
              fields.push({
                name: "Privacy",
                value:
                  "No conversation data is stored or redistributed by the bot. Conversation history only becomes active when the bot is mentioned.\nHowever, it is possible to disable this feature (configurations) if you do not want OpenAI to have access to these conversations during text generation.",
                inline: false,
              });
              fields.push({
                name: "Terms of Use",
                value:
                  "OpenAI's Terms [Link to Terms of Use](https://openai.com/policies/terms-of-use)",
                inline: true,
              });
              const embeds = embedUtility.fieldsMessage(
                "Chatbot powered by GPT4!",
                `Thanks to OpenAI, Rui's Bot is able to interact with you as long as you **mention him** or directly **reply to him**!`,
                fields,
              );
              embeds[0].data.thumbnail = {
                url: "https://tmpfiles.nohat.cc/visualhunter-41c751e3c7.png",
              };
              msg.reply({ embeds: embeds });
              break;
            case "fun":
              msg.client.commands.forEach((command) => {
                if (command.category == "fun")
                  fields.push({
                    name: command.name,
                    value: command.description[guild.lang],
                  });
              });
              msg.reply({
                embeds: embedUtility.fieldsMessage(
                  "List of fun commands",
                  "enjoy !",
                  fields,
                  BOT_AUTHOR,
                  args[2],
                ),
              });
              break;
            case "configurations":
            case "configuration":
              msg.client.commands.forEach((command) => {
                if (command.category == "configurations") {
                  fields.push({
                    name: command.name,
                    value: command.description[guild.lang],
                  });
                }
              });
              msg.reply({
                embeds: embedUtility.fieldsMessage(
                  "List of configuration commands",
                  "enjoy !",
                  fields,
                  BOT_AUTHOR,
                  args[2],
                ),
              });
              break;
            case "interactions":
            case "interaction":
              msg.client.commands.forEach((command) => {
                if (command.category == "interaction")
                  fields.push({
                    name: command.name,
                    value: command.description[guild.lang],
                  });
              });
              msg.reply({
                embeds: embedUtility.fieldsMessage(
                  "List of interaction commands",
                  "enjoy !",
                  fields,
                  BOT_AUTHOR,
                  args[2],
                ),
              });
              break;
            default:
              const command = msg.client.commands.get(args[1]);
              if (command)
                msg.reply({
                  embeds: embedUtility.message(
                    args[1],
                    `**description** : ${
                      command.description[guild.lang]
                    }\n**usage** : \`\`${guild.prefix}${command.usage}\`\``,
                  ),
                });
              else
                msg.reply({
                  embeds: embedUtility.errorMessage(
                    `${args[1]} ?`,
                    `There is no reference of ${args[1]} in list of commands.`,
                  ),
                });
              break;
          }
          break;
      }
    }
  },
};
