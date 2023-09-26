// Imports
require("dotenv").config();

// Discord bot top.gg configuration
const TOP_GG_WEBHOOK_AUTH = process.env.TOP_GG_WEBHOOK_AUTH; // Authorization token for top.gg webhook
const TOP_GG_WEBHOOK_PORT = process.env.TOP_GG_TOP_GG_WEBHOOK_PORT;
const CHANNEL_ID = "1156238856128045156"; // Channel ID to send vote messages to

// Tests
if ((!TOP_GG_WEBHOOK_PORT, !CHANNEL_ID)) {
  console.error("TOP_GG_WEBHOOK_PORT or CHANNEL_ID are missing.");
  process.exit(1);
}

module.exports = { TOP_GG_WEBHOOK_AUTH, TOP_GG_WEBHOOK_PORT, CHANNEL_ID };
