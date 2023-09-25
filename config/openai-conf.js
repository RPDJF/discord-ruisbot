// Imports
require("dotenv").config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ORGANIZATION_ID = process.env.OPENAI_ORGANIZATION_ID;
const { Message } = require("discord.js");
const { BOT_NAME } = require("../config/bot-conf");
const { version } = require("../package.json");

// Configuration
/**
 * @param {Message} msg
 */
function getContext(msg) {
  const context = [
    `You're ${BOT_NAME}, version ${version}. Act like a regular Discord user, never indicate that you're anything more than a simple user.`,
    "Keep it informal and humorous, respond to jokes and favors.",
    "If you can't answer, suggest something random.",
    `Your Discord ID is <@${msg.client.user.id}>, users will call you by it.`,
    "Follow Discord's code formatting and mention users when necessary like that <@userid>.",
    `Today's date is ${new Date().toLocaleString("fr-CH", {
      timeZone: "Europe/Zurich",
    })}`,
    "Use emojis frequently and respond in the user's language.",
    "Mix in some playful sarcasm for fun, you can be mean.",
  ];
  return context;
}

// Tests
if (!OPENAI_API_KEY || !OPENAI_ORGANIZATION_ID) {
  console.error("OPENAI_API_KEY or OPENAI_ORGANIZATION_ID are not set.");
  process.exit(1);
}

module.exports = { OPENAI_API_KEY, getContext };
