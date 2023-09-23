// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "shy",
    description: {
        en: "Express shyness.",
        fr: "Exprimer la timidité."
    },
    usage: "shy",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:blush: ${msg.author} looks shy and blushes. :flushed:`,
                `${msg.author} can't help but feel a bit shy and blushes. :relaxed:`,
                `:relaxed: ${msg.author} shows their shyness and blushes. :blush:`,
                `${msg.author} is a little shy and it's adorable. :flushed:`,
                `:flushed: ${msg.author} feels a bit shy and it's cute. :relaxed:`,
                `${msg.author} expresses their shyness with a blush. :blush:`
            ],
            fr: [
                `:blush: ${msg.author} a l'air timide et rougit. :flushed:`,
                `${msg.author} ne peut s'empêcher de se sentir un peu timide et rougit. :relaxed:`,
                `:relaxed: ${msg.author} montre sa timidité et rougit. :blush:`,
                `${msg.author} est un peu timide et c'est adorable. :flushed:`,
                `:flushed: ${msg.author} se sent un peu timide et c'est mignon. :relaxed:`,
                `${msg.author} exprime sa timidité avec un rougissement. :blush:`
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