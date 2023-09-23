// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "yay",
    description: {
        en: "Express excitement with a 'yay'.",
        fr: "Exprimer l'excitation avec un 'yay'."
    },
    usage: "yay",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:tada: ${msg.author} celebrates with a 'yay'!`,
                `${msg.author} can't contain their excitement and exclaims 'yay'! :partying_face:`,
                `${msg.author} expresses their joy with a loud 'yay'! :confetti_ball:`,
                `${msg.author} is thrilled and says 'yay'! :tada:`,
                `:tada: ${msg.author} reacts with a big 'yay'!`,
                `${msg.author} is over the moon and shouts 'yay'! :partying_face:`
            ],
            fr: [
                `:tada: ${msg.author} célèbre avec un 'yay' !`,
                `${msg.author} ne peut contenir son excitation et s'écrie 'yay' ! :partying_face:`,
                `${msg.author} exprime sa joie avec un fort 'yay' ! :confetti_ball:`,
                `${msg.author} est ravi et dit 'yay' ! :tada:`,
                `:tada: ${msg.author} réagit avec un grand 'yay' !`,
                `${msg.author} est aux anges et crie 'yay' ! :partying_face:`
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