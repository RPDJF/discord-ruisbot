// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");

module.exports = {
  name: "meme",
  description: {
    en: "random memes from reddit",
    fr: "memes de reddit",
  },
  usage: "meme",
  category: "fun",
  /**
   * @param {Message} msg
   * @param {Array} args
   */
  async execute(msg, args) {
    // quick ugly fix media not loading if is ivdeo (no preview on api)
    let qMeme;
    do {
      const memeBank = [
        "dankmemes",
        "memes",
        "funny",
        "wholesomememes",
        "comedymemes",
      ];
      const query = await axios.get(
        `https://www.reddit.com/r/${
          memeBank[Math.floor(Math.random() * memeBank.length)]
        }.json?sort=top&t=week/`,
      );
      qMeme =
        query.data.data.children[
          Math.floor(Math.random() * query.data.data.children.length)
        ].data;
    } while (qMeme.is_video);

    // new meme object
    let meme = {
      title: qMeme.title,
      postLink: `https://www.reddit.com${qMeme.permalink}`,
      url: qMeme.url,
      ups: qMeme.ups,
      comments: qMeme.num_comments,
      author: qMeme.author,
      subreddit: `Reddit /r${qMeme.subreddit}`,
    };
    const embeds = embedUtility.message(meme.title, meme.subreddit, {
      name: meme.author,
      url: `https://www.reddit.com/user/${meme.author}`,
      iconURL: (
        await axios.get(`https://www.reddit.com/user/${meme.author}/about.json`)
      ).data.data.icon_img.split("?")[0],
    });
    embeds[0].data.image = { url: meme.url };
    embeds[0].data.url = meme.postLink;
    embeds[0].data.footer.text = `👍 ${meme.ups} - 💭 ${meme.comments}\n${embeds[0].data.footer.text}`;
    embeds[0].data.thumbnail = {
      url: "https://www.redditinc.com/assets/images/site/reddit-logo.png",
    };
    msg.reply({ embeds: embeds });
  },
};
