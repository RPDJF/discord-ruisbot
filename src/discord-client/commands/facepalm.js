// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "facepalm",
    description: {
        en: "Express facepalm and frustration.",
        fr: "Exprimer un geste de désespoir et de frustration."
    },
    usage: "facepalm",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:facepalm: ${msg.author} facepalms in frustration. :man_facepalming:`,
                `${msg.author} can't believe what they just saw, facepalming. :woman_facepalming:`,
                `:man_facepalming: ${msg.author} expresses frustration with a facepalm. :facepalm:`,
                `${msg.author} facepalms, unable to comprehend. :woman_facepalming:`,
                `:facepalm: ${msg.author} can't handle it anymore and facepalms. :man_facepalming:`,
                `${msg.author} reacts with a facepalm to the situation. :woman_facepalming:`
            ],
            fr: [
                `:facepalm: ${msg.author} fait un geste de désespoir en se frappant le front. :man_facepalming:`,
                `${msg.author} n'en croit pas ses yeux, se frappant le front en désespoir. :woman_facepalming:`,
                `:man_facepalming: ${msg.author} exprime sa frustration avec un geste de désespoir. :facepalm:`,
                `${msg.author} se frappe le front, incapable de comprendre. :woman_facepalming:`,
                `:facepalm: ${msg.author} n'en peut plus et se frappe le front. :man_facepalming:`,
                `${msg.author} réagit avec un geste de désespoir à la situation. :woman_facepalming:`
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
