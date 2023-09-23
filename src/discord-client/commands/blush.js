// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "blush",
    description: {
        en: "Blush with shyness or embarrassment.",
        fr: "Rougeur de timidité ou d'embarras."
    },
    usage: "blush",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:blush: ${msg.author} blushes with shyness or embarrassment. :flushed:`,
                `${msg.author} has a cute blush on their face. :relaxed:`,
                `:relaxed: ${msg.author} shows a lovely blush. :heart_eyes:`,
                `${msg.author} blushes and it's adorable. :stuck_out_tongue_closed_eyes:`,
                `:blush: ${msg.author} radiates a warm blush. :relaxed:`,
                `${msg.author} displays a sweet blush, making everyone smile. :heart_eyes:`
            ],
            fr: [
                `:blush: ${msg.author} rougit de timidité ou d'embarras. :flushed:`,
                `${msg.author} a un joli rougissement sur le visage. :relaxed:`,
                `:relaxed: ${msg.author} montre un rougissement charmant. :heart_eyes:`,
                `${msg.author} rougit et c'est adorable. :stuck_out_tongue_closed_eyes:`,
                `:blush: ${msg.author} dégage un rougissement chaleureux. :relaxed:`,
                `${msg.author} affiche un doux rougissement, faisant sourire tout le monde. :heart_eyes:`
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