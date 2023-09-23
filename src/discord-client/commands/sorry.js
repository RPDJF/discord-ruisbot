// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "sorry",
    description: {
        en: "Apologize.",
        fr: "S'excuser."
    },
    usage: "sorry",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} apologizes sincerely. :pray:`,
                `:pray: ${msg.author} says sorry with a sincere heart. :pleading_face:`,
                `${msg.author} expresses their apologies. :apologetic:`,
                `${msg.author} is truly sorry for something. :confounded:`,
                `:confounded: ${msg.author} apologizes sincerely. :pleading_face:`,
                `${msg.author} offers a heartfelt apology. :apologetic:`
            ],
            fr: [
                `${msg.author} s'excuse sincèrement. :pray:`,
                `:pray: ${msg.author} présente ses excuses avec un cœur sincère. :pleading_face:`,
                `${msg.author} exprime ses excuses. :apologetic:`,
                `${msg.author} est vraiment désolé pour quelque chose. :confounded:`,
                `:confounded: ${msg.author} s'excuse sincèrement. :pleading_face:`,
                `${msg.author} offre des excuses sincères. :apologetic:`
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