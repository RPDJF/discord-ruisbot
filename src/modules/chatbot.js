// imports
const { Message, Client } = require("discord.js");
const { OpenAI } = require("openai");
const embedUtility = require("./embedUtility");
const {
  OPENAI_API_KEY,
  DAILY_FREE_TOKENS,
  OPENAI_AUTHOR,
  MESSAGE_HISTORY_LIMIT,
  getContext,
} = require("../../config/openai-conf");
const db = require("./db");

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

  // check if user has enough tokens
  let user = await db.getData("users", msg.author.id);
  // if no tokens defined, get free daily tokens
  if (!user || !user.openai || user.openai.dailytokens == undefined)
    // undefined case it's 0
    await db.writeData("users", msg.author.id, {
      openai: { dailytokens: DAILY_FREE_TOKENS, lastclaim: new Date() },
    });
  // update user variable
  user = await db.getData("users", msg.author.id);
  // get daily tokens, if last claim day is not today, reset tokens to DAILY_FREE_TOKENS;
  const lastclaim = user.openai.lastclaim.toDate();
  const lastclaimDateStr = `${lastclaim.getFullYear()}-${lastclaim.getMonth()}-${lastclaim.getDate()}`;
  const newDateStr = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
  if (lastclaimDateStr != newDateStr) {
    await db.writeData("users", msg.author.id, {
      openai: {
        dailytokens: DAILY_FREE_TOKENS,
        lastclaim: new Date(),
      },
    });
    // update user variable
    user = await db.getData("users", msg.author.id);
  }

  // decrement tokens in newData variable
  let newData;
  if (user.openai.dailytokens) {
    // decrement free daily tokens
    newData = {
      openai: { dailytokens: user.openai.dailytokens - 1 },
    };
  } else if (user.openai.tokens) {
    // decrement tokens
    newData = {
      openai: { tokens: user.openai.tokens - 1 },
    };
  } else {
    // not enough tokens
    const embeds = [
      embedUtility.errorMessage(
        "Not enough tokens",
        "You don't have enough tokens to use GPT today.\n\nExchange **1x <a:stars:1156021313471787058>** to get 10 more tokens `$help stars`.\n\nYou can also wait until tomorrow to get free daily tokens.",
        OPENAI_AUTHOR,
      ),
    ];
    msg.channel.send({ embeds });
    return 0;
  }

  // load context
  const context = require("../../config/openai-conf")
    .getContext(msg)
    .map((entry) => ({
      role: "system",
      content: entry.replace("{botid}", client.user.id),
    }));

  // get last message
  const lastMessages = await msg.channel.messages.fetch({
    limit: MESSAGE_HISTORY_LIMIT,
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
    // if success, write data and send message
    await db.writeData("users", msg.author.id, newData).then(() => {
      msg.channel.send(response.choices[0].message.content);
    });
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
