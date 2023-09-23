// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "dance",
    description: {
        en: "Dance with joy and enthusiasm.",
        fr: "Danser avec joie et enthousiasme."
    },
    usage: "dance",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `:dancer: ${msg.author} dances with joy and enthusiasm! :tada:`,
                `${msg.author} hits the dance floor with style! :man_dancing:`,
                `:man_dancing: ${msg.author} shows off some dance moves with enthusiasm! :dancer:`,
                `${msg.author} grooves to the music, dancing with energy! :tada:`,
                `:dancer: ${msg.author} has some impressive dance moves! :man_dancing:`,
                `${msg.author} dances gracefully and spreads the joy! :tada:`
            ],
            fr: [
                `:dancer: ${msg.author} danse avec joie et enthousiasme ! :tada:`,
                `${msg.author} prend la piste de danse avec style ! :man_dancing:`,
                `:man_dancing: ${msg.author} montre quelques mouvements de danse avec enthousiasme ! :dancer:`,
                `${msg.author} se déhanche au rythme de la musique, dansant avec énergie ! :tada:`,
                `:dancer: ${msg.author} a des mouvements de danse impressionnants ! :man_dancing:`,
                `${msg.author} danse avec grâce et répand la joie ! :tada:`
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