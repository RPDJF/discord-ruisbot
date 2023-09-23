// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "woah",
    description: {
        en: "Express amazement with a 'woah'.",
        fr: "Exprimer l'étonnement avec un 'woah'."
    },
    usage: "woah",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:open_mouth: ${msg.author} reacts with a 'woah'!`,
                `${msg.author} can't believe their eyes and exclaims 'woah'! :astonished:`,
                `${msg.author} expresses amazement with a loud 'woah'! :open_mouth:`,
                `${msg.author} is clearly amazed and says 'woah'! :open_mouth:`,
                `:astonished: ${msg.author} reacts with a big 'woah'!`,
                `${msg.author} is in awe and utters 'woah'! :open_mouth:`
            ],
            fr: [
                `:open_mouth: ${msg.author} réagit avec un 'woah' !`,
                `${msg.author} n'en croit pas ses yeux et s'exclame 'woah' ! :astonished:`,
                `${msg.author} exprime son étonnement avec un fort 'woah' ! :open_mouth:`,
                `${msg.author} est clairement émerveillé et dit 'woah' ! :open_mouth:`,
                `:astonished: ${msg.author} réagit avec un grand 'woah' !`,
                `${msg.author} est béat d'admiration et prononce 'woah' ! :open_mouth:`
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