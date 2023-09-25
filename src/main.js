// Imports
const { fork } = require("child_process");

// Start discord bot client
const botProcess = fork("./src/discord-client/bot.js");
