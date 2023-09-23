// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "no",
    description: {
        en: "Express disagreement with a firm 'No.'",
        fr: "Exprimer son désaccord avec un ferme 'Non.'"
    },
    usage: "no",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:x: ${msg.author} firmly says 'No.' :no_entry_sign:`,
                `${msg.author} disagrees emphatically with a resounding 'No.' :x:`,
                `:x: ${msg.author} shakes their head in disagreement, saying 'No.' :no_entry_sign:`,
                `${msg.author} makes it clear with a firm 'No.' :x:`,
                `:no_entry_sign: ${msg.author} firmly opposes with a resolute 'No.' :x:`,
                `${msg.author} expresses disagreement with a definite 'No.' :no_entry_sign:`
            ],
            fr: [
                `:x: ${msg.author} dit fermement 'Non.' :no_entry_sign:`,
                `${msg.author} désapprouve catégoriquement avec un retentissant 'Non.' :x:`,
                `:x: ${msg.author} secoue la tête en signe de désaccord, disant 'Non.' :no_entry_sign:`,
                `${msg.author} le dit clairement avec un ferme 'Non.' :x:`,
                `:no_entry_sign: ${msg.author} s'oppose fermement avec un 'Non' résolu. :x:`,
                `${msg.author} exprime son désaccord avec un 'Non' définitif. :no_entry_sign:`
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