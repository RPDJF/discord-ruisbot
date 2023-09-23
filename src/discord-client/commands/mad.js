// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "mad",
    description: {
        en: "Express anger and frustration.",
        fr: "Exprimer la colère et la frustration."
    },
    usage: "mad",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:angry: ${msg.author} is mad and frustrated! :rage:`,
                `${msg.author} can't contain their anger and shows it! :triumph:`,
                `:triumph: ${msg.author} expresses their frustration with anger! :angry:`,
                `${msg.author} is really mad and it shows! :rage:`,
                `:rage: ${msg.author} is furious and can't hide it! :triumph:`,
                `${msg.author} lets their anger out for all to see! :angry:`
            ],
            fr: [
                `:angry: ${msg.author} est en colère et frustré ! :rage:`,
                `${msg.author} ne peut contenir sa colère et la montre ! :triumph:`,
                `:triumph: ${msg.author} exprime sa frustration avec de la colère ! :angry:`,
                `${msg.author} est vraiment en colère et ça se voit ! :rage:`,
                `:rage: ${msg.author} est furieux et ne peut le cacher ! :triumph:`,
                `${msg.author} laisse sa colère éclater pour que tout le monde le voie ! :angry:`
            ]
        };

        const randomIndex = Math.floor(Math.random() * phrases[guild.lang].length);
        const randomPhrase = phrases[guild.lang][randomIndex];

        const image = (await axios.get(`https://api.otakugifs.xyz/gif?reaction=${args[0]}`)).data;
        const embeds = embedUtility.short(randomPhrase);
        embeds[0].data.image = { url: image.url };

        msg.reply({ embeds }).catch((err) => {
            console.error(err);
            return (1);
        });
    },
};