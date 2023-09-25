// imports
const { Message, Client } = require("discord.js");
const { OpenAI } = require("openai");
const embedUtility = require("./embedUtility");
const { OPENAI_API_KEY, context } = require("../../config/openai-conf");
const db = require("../modules/db");

// init
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

/**
 * Generate ai text completion
 * @param {Message} msg
 * @param {Client} client
 * @param {Boolean} isDepracted
 */
async function execute(msg, client) {
  // check if GPT4 si enabled
  const guild = await db.getData("guilds", msg.guildId);
  if (!(guild == undefined || guild.gpt == undefined || guild.gpt.status)) {
    embedUtility.genericDisabledOpenAIMessage(msg, guild);
    return 0;
  }
  // load context
  const context = require("../../config/openai-conf").getContext(msg).map((entry) => ({
    role: "system",
    content: entry.replace("{botid}", client.user.id),
  }));
  // get 10 last message
  const lastMessages = await msg.channel.messages.fetch({
    limit: 10,
  });
  // format last messages for openai
  const chatMessages = lastMessages.reverse().map((message) => {
    const role = message.author.id === client.user.id ? "assistant" : "user";
    const content = `${
      message.author.id === client.user.id
        ? ""
        : `${message.author.username} <@${message.author.id}> :`
    } ${message.content}`;
    return { role, content };
  });
  try {
    const response = await openai.chat.completions.create(
      {
        model: "gpt-4",
        messages: context.concat(chatMessages),
      },
      {
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        },
      },
    );
    msg.channel.send(response.choices[0].message.content);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status); // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code); // e.g. 'invalid_api_key'
      console.error(error.type); // e.g. 'invalid_request_error'
    } else {
      // Non-API error
      console.error(error);
    }
    return 1;
  }
}
module.exports = { execute };
