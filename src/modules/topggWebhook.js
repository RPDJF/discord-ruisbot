// imports
const express = require("express");
const { Webhook } = require("@top-gg/sdk");
const {
  TOP_GG_WEBHOOK_AUTH,
  TOP_GG_WEBHOOK_PORT,
  CHANNEL_ID,
} = require("../../config/top.gg");
const client = require("../discord-client/bot");
const embedUtility = require("../modules/embedUtility");
const db = require("../modules/db");

// Create express app
const app = express();

// Create an http server using express app
const server = require("http").createServer(app);

// Create webhook
const dbl = new Webhook(TOP_GG_WEBHOOK_AUTH);

// Middleware to parse request body
app.use(express.json());

// Endpoint for vote tracking
app.post(
  "/vote",
  dbl.listener(async ({ user: id }) => {
    const channel = client.channels.cache.get(CHANNEL_ID); // Get the channel to send the vote message
    const user = await client.users.fetch(id); // Fetch the user who voted
    try {
      await db.writeData("users", user.id, {
        vote: {
          claim: true,
          date: Date.now(),
        },
      }); // Write the user data to the database
      // Create an embed for the vote message
      const embed = embedUtility.message(
        "Vote top.gg",
        `User: **${user.username}** \`(${user.id})\` just voted!\nYou can vote on top.gg [**here**](https://top.gg/bot/${client.user.id}/vote) every 12 hours!`,
      );
      await channel.send({ embeds: embed }); // Send the vote message to the channel
    } catch (e) {
      console.error(e); // Log any errors that occur during vote processing
    }
  }),
);

// Start the server and listen on the specified port
server.listen(TOP_GG_WEBHOOK_PORT, () => {
  console.info(`Vote tracker listening on port ${TOP_GG_WEBHOOK_PORT}`);
});
