// imports
const axios = require("axios");
const discord = require("discord.js");
const functions = require("./functions");
/**
 * 
 * @param {discord.Message} msg 
 */
async function start(msg){
    try{
        const memeBank = ["dankmemes","memes","funny","wholesomememes","comedymemes"];
        const query = await axios.get(`https://www.reddit.com/r/${memeBank[Math.floor(Math.random() * memeBank.length)]}.json?sort=top&t=week/`);
        const qMeme = query.data.data.children[Math.floor(Math.random() * query.data.data.children.length)].data;
        let meme = {
            title: qMeme.title,
            postLink: `https://www.reddit.com${qMeme.permalink}`,
            url: qMeme.url,
            ups: qMeme.ups,
            comments: qMeme.num_comments,
            author: qMeme.author,
            subreddit: qMeme.subreddit
        };
        let user = {
            image_url: (await axios.get(`https://www.reddit.com/user/${meme.author}/about.json`)).data.data.icon_img.split("?")[0]
        };
        await functions.embedReply(msg, meme.title, undefined, "Reddit r/" + meme.subreddit, meme.url, `👍 ${meme.ups}  -  💭 ${meme.comments}`, meme.postLink, undefined, "user/" + meme.author, "https://www.reddit.com/user/" + meme.author, user.image_url);
    } catch(e){
        console.log(e);
    }
}

module.exports = {data: new discord.SlashCommandBuilder()
    .setName("meme")
    .setDescription("Get memes from Reddit"),
    start
};
