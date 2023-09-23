// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "sad",
    description: {
        en: "Express sadness.",
        fr: "Exprimer la tristesse."
    },
    usage: "sad",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:cry: ${msg.author} looks sad and upset. :disappointed:`,
                `${msg.author} can't help but feel down and expresses it. :slight_frown:`,
                `:slight_frown: ${msg.author} shows their sadness and disappointment. :cry:`,
                `${msg.author} is really sad and it shows. :disappointed:`,
                `:disappointed: ${msg.author} feels down and can't hide it. :slight_frown:`,
                `${msg.author} expresses their sadness for all to see. :cry:`
            ],
            fr: [
                `:cry: ${msg.author} a l'air triste et contrarié. :disappointed:`,
                `${msg.author} ne peut s'empêcher de se sentir abattu et l'exprime. :slight_frown:`,
                `:slight_frown: ${msg.author} montre sa tristesse et sa déception. :cry:`,
                `${msg.author} est vraiment triste et ça se voit. :disappointed:`,
                `:disappointed: ${msg.author} se sent abattu et ne peut le cacher. :slight_frown:`,
                `${msg.author} exprime sa tristesse pour que tout le monde le voie. :cry:`
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