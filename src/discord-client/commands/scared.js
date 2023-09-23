// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "scared",
    description: {
        en: "Express fear and being scared.",
        fr: "Exprimer la peur et l'effroi."
    },
    usage: "scared",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} looks terrified and scared! :fearful:`,
                `:fearful: ${msg.author} can't hide their fear and panic. :cold_sweat:`,
                `${msg.author} shows their fear and fright. :scream:`,
                `${msg.author} is really scared and it's obvious. :fearful:`,
                `:cold_sweat: ${msg.author} is in a state of fear and can't control it. :scream:`,
                `${msg.author} expresses their fear and terror. :fearful:`
            ],
            fr: [
                `${msg.author} a l'air terrifié et effrayé ! :fearful:`,
                `:fearful: ${msg.author} ne peut cacher sa peur et sa panique. :cold_sweat:`,
                `${msg.author} montre sa peur et son effroi. :scream:`,
                `${msg.author} a vraiment peur et cela se voit. :fearful:`,
                `:cold_sweat: ${msg.author} est dans un état de peur et ne peut le contrôler. :scream:`,
                `${msg.author} exprime sa peur et sa terreur. :fearful:`
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