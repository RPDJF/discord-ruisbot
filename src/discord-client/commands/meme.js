// imports
const { Message } = require("discord.js");
const messages = require("../../modules/messages");
const embedUtility = require("../../modules/embedUtility");
const { DiscordEmbedsPaginator } = require("../../modules/paginator");
const { default: axios } = require("axios");

module.exports = {
  name: "meme",
  description: messages.data.commands.meme.description,
  usage: messages.data.commands.meme.usage,
  category: "fun",
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  async execute(msg, args) {
    // Initialize variables
    const memeBank = [
      "dankmemes",
      "memes",
      "funny",
      "wholesomememes",
      "comedymemes",
    ]; // subreddits
    // max meme to fetch
    const maxMeme = 5;
    // embeds array
    const embeds = [];

    // fetch memes
    const query = await axios.get(
      `https://www.reddit.com/r/${
        memeBank[Math.floor(Math.random() * memeBank.length)]
      }.json?sort=top&t=week/`,
    );

    // for each meme
    let i = 0;
    for (const meme in query.data.data.children) {
      // get meme data
      const memeData = query.data.data.children[meme].data;
      // break if max meme reached
      if (i++ >= maxMeme) break;
      // skip if meme is video
      if (memeData.is_video) continue;

      // create embed
      const embed = embedUtility.message(
        memeData.title,
        `Reddit r/${memeData.subreddit}`,
        {
          name: `u/${memeData.author}`,
          url: `https://www.reddit.com/user/${memeData.author}`,
          iconURL: (
            await axios.get(
              `https://www.reddit.com/user/${memeData.author}/about.json`,
            )
          ).data.data.icon_img.split("?")[0],
        },
      );
      // edit embed
      embed.data.image = { url: memeData.url };
      embed.data.url = `https://www.reddit.com${memeData.permalink}`.replace(
        "\\",
        "/",
      );
      embed.data.footer.text = `👍 ${memeData.ups} - 💭 ${memeData.num_comments}\n${embed.data.footer.text}`;
      embed.data.thumbnail = {
        url: "https://www.redditinc.com/assets/images/site/reddit-logo.png",
      };

      // push embed to embeds array
      embeds.push(embed);
    }

    // create paginator
    const paginator = new DiscordEmbedsPaginator([], {
      customEmbeds: embeds,
    });

    // send paginator message
    await paginator.createPaginatorMessage(msg.channel).catch((err) => {
      console.error(err);
      return 1;
    });
  },
};
