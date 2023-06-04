// imports
require("dotenv").config();

// data
const prefix = process.env.DEFAULT_PREFIX;
const lang = "en";
const bot_invite = process.env.BOT_INVITE;
const client_token = process.env.CLIENT_TOKEN;
const client_id = process.env.CLIENT_ID;
const color = "#0099ff";
const bot_icon = "https://i.ibb.co/t260PYk/ruisbot.gif";

module.exports = {prefix, lang, bot_invite, client_token, client_id, color, bot_icon};