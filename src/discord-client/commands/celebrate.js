// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "celebrate",
    description: {
        en: "Celebrate with joy and excitement.",
        fr: "Célébrer avec joie et enthousiasme."
    },
    usage: "celebrate",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:tada: ${msg.author} celebrates with joy and excitement! :confetti_ball:`,
                `${msg.author} joins in the celebration with great enthusiasm! :partying_face:`,
                `:partying_face: ${msg.author} is filled with excitement and celebrates! :tada:`,
                `${msg.author} expresses pure happiness and celebrates the moment! :confetti_ball:`,
                `:tada: ${msg.author} marks the occasion with a joyful celebration! :partying_face:`,
                `${msg.author} dances and celebrates with pure joy! :confetti_ball:`
            ],
            fr: [
                `:tada: ${msg.author} célèbre avec joie et enthousiasme ! :confetti_ball:`,
                `${msg.author} se joint à la célébration avec beaucoup d'enthousiasme ! :partying_face:`,
                `:partying_face: ${msg.author} est rempli d'excitation et célèbre ! :tada:`,
                `${msg.author} exprime une pure joie et célèbre le moment ! :confetti_ball:`,
                `:tada: ${msg.author} marque l'occasion avec une célébration joyeuse ! :partying_face:`,
                `${msg.author} danse et célèbre avec une joie pure ! :confetti_ball:`
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
