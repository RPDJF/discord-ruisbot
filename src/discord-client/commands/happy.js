// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "happy",
    description: {
        en: "Express happiness and joy.",
        fr: "Exprimer la joie et le bonheur."
    },
    usage: "happy",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:smile: ${msg.author} is filled with happiness and joy! :tada:`,
                `${msg.author} can't help but smile from ear to ear! :grinning:`,
                `:grinning: ${msg.author} radiates pure happiness! :smile:`,
                `${msg.author} is overjoyed and can't stop smiling! :tada:`,
                `:tada: ${msg.author} celebrates with a big smile! :grinning:`,
                `${msg.author} shares their happiness with a bright smile! :smile:`
            ],
            fr: [
                `:smile: ${msg.author} est rempli de bonheur et de joie ! :tada:`,
                `${msg.author} ne peut s'empêcher de sourire de toutes ses dents ! :grinning:`,
                `:grinning: ${msg.author} rayonne de bonheur pur ! :smile:`,
                `${msg.author} est aux anges et ne peut pas arrêter de sourire ! :tada:`,
                `:tada: ${msg.author} célèbre avec un grand sourire ! :grinning:`,
                `${msg.author} partage son bonheur avec un sourire lumineux ! :smile:`
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