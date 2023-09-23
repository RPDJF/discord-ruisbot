// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "confused",
    description: {
        en: "Express confusion or bewilderment.",
        fr: "Exprimer la confusion ou le désarroi."
    },
    usage: "confused",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:thinking: ${msg.author} looks confused and bewildered. :question:`,
                `${msg.author} is in a state of confusion. :confused:`,
                `:confused: ${msg.author} can't seem to figure things out. :thinking:`,
                `${msg.author} wears a puzzled expression. :question:`,
                `:thinking: ${msg.author} is lost in thought, feeling confused. :confused:`,
                `${msg.author} expresses their confusion with a thoughtful look. :question:`
            ],
            fr: [
                `:thinking: ${msg.author} a l'air confus et désorienté. :question:`,
                `${msg.author} est dans un état de confusion. :confused:`,
                `:confused: ${msg.author} n'arrive pas à comprendre les choses. :thinking:`,
                `${msg.author} arbore une expression perplexe. :question:`,
                `:thinking: ${msg.author} est perdu dans ses pensées, se sentant confus. :confused:`,
                `${msg.author} exprime sa confusion avec un regard pensif. :question:`
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