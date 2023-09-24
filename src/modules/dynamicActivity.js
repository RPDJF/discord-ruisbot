// imports
const { Client } = require("discord.js");
const { DEFAULT_PREFIX } = require("../../config/bot-conf");

/**
 * Updates bot's activity with custom content
 * @param {Client} client
 */
function dynamicActivity(client) {
  // Fetch guilds metadata
  const guildsMetadata = {
    userCount: client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0,
    ),
    channelCount: client.channels.cache.size,
    guildCount: client.guilds.cache.size,
  };

  // Activities init
  const activities = [
    `${guildsMetadata.userCount} Users`,
    `${guildsMetadata.channelCount} Channels`,
    `${guildsMetadata.guildCount} Servers`,
  ];

  let index = 0;
  // Update activity by 5000ms intervals
  setInterval(() => {
    // On met à jour l'activité
    client.user.setActivity(`${DEFAULT_PREFIX}help | ${activities[index]}`);
    // On passe à l'activité suivante
    index++;
    if (index >= activities.length) index = 0;
  }, 5000);
}

module.exports = dynamicActivity;
