// imports
const discord = require("discord.js");
const functions = require("./functions");
const jsnLangPack = require("../jsnLangPack.json");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
/**
 * 
 * @param {discord.Message} msg 
 * @param {discord.Client} client
 * @param {String} lang
 * @param {Boolean} isDepracted
 */
async function start(msg, client, lang, isDepracted){
  // try catch, just in case
  try{
    // default author object
    const author ={
      name:"OpenAI",
      iconURL:"https://game-tournaments.com/media/logo/t25349.png",
      url:"https://openai.com/api/"
    }
    // check if depracted usage, bot only should be mentionned @
    if(!isDepracted){
      // load context
      const context = require("./settings/chat.json").context.map(entry => ({ role: "system", content: entry.replace("{date}",(new Date).toISOString()).replace("{botId}",client.user.id) }));
      // get 10 last message
      const lastMessages = await msg.channel.messages.fetch({ limit: 10 });
      // create message array for openai
      const chatMessages = lastMessages.reverse().map(message => {
        const role = message.author.id === client.user.id ? "assistant":"user";
        const content = `${message.author.id === client.user.id ? "":`User '${message.author.username}' with user id <@${message.author.id}> asks :`} ${message.content}`;
        return {role, content};
      });
      // create openai completion
      const response = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: context.concat(chatMessages),
      },{
        validateStatus: function (status){
          return status < 500; // Resolve only if the status code is less than 500
        }
      });
      // execute after getting response
      response.then(async res => {
        // check http status
        switch(res.status){
          case 200: // 200 means ok
            await msg.reply((await res.data.choices[0].message.content).trim());
            break;
          default: // if not 200, means error
            await functions.embedReplyError(msg, await res.statusText, res.data.error.message, author);
            break;
        }
      });
      // catch error
      response.catch(async e =>{
        await functions.embedReplyError(msg, "Oh no !", jsnLangPack[lang].chat.error, author);
        console.log(await e);
      });
    } else{
      // in depracted usage
      await functions.embedReplyError(msg, "Deprecated command usage",jsnLangPack[lang].chat.deprecated,author);
    }
  } catch(e){
    console.log(e);
  }
}
module.exports = {start};
