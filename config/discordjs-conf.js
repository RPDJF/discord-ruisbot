// Imports
require("dotenv").config();

// Discord bot configuration
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_BOT_ID = process.env.DISCORD_BOT_ID;

// Tests
if (!DISCORD_BOT_TOKEN || !DISCORD_BOT_ID) {
  console.error(
    "DISCORD_BOT_TOKEN and DISCORD_BOT_ID environment variables are required.",
  );
  process.exit(1);
}

module.exports = { DISCORD_BOT_TOKEN, DISCORD_BOT_ID };
