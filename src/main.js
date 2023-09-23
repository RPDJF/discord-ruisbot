// Imports
const {fork} = require("child_process");

// Start discord bot client
const botProcess = fork("./discord-client/bot.js");