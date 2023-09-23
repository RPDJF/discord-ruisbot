// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "angrystare",
    description: {
        en: "Give someone an angry stare.",
        fr: "Lancer un regard en colère à quelqu'un."
    },
    usage: "angrystare <user|random>",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const target = args[1] || msg.guild.members.cache.random().user;
        const phrases = {
            en: [
                `With fiery eyes, ${msg.author} shoots an intense glare at ${target}! :anger:`,
                `${msg.author} can't contain their frustration as they fix an angry gaze upon ${target}! :triumph:`,
                `:face_with_symbols_over_mouth: ${msg.author} gives ${target} a fiery, angry look, leaving them speechless!`,
                `:rage: ${msg.author} clenches their fists and directs a seething stare towards ${target}!`,
                `${msg.author} stares daggers at ${target} with a disapproving frown! :unamused:`,
                `${msg.author} narrows their eyes and sends a chilling glare ${target}'s way! :angry_face:`
            ],
            fr: [
                `Avec des yeux enflammés, ${msg.author} lance un regard intense à ${target} ! :anger:`,
                `${msg.author} ne peut contenir sa frustration en fixant un regard en colère sur ${target} ! :triumph:`,
                `:face_with_symbols_over_mouth: ${msg.author} donne à ${target} un regard enflammé et en colère, les laissant sans voix !`,
                `:rage: ${msg.author} serre les poings et dirige un regard bouillonnant vers ${target} !`,
                `${msg.author} lance un regard glacial à ${target} avec un froncement de sourcils désapprobateur ! :unamused:`,
                `${msg.author} plisse les yeux et envoie un regard glacial à ${target} ! :angry_face:`
            ]
        };        

        const randomIndex = Math.floor(Math.random() * phrases[guild.lang].length);
        const randomPhrase = phrases[guild.lang][randomIndex];

        const image = (await axios.get(`https://api.otakugifs.xyz/gif?reaction=${args[0]}`)).data;
        const embeds = embedUtility.short(randomPhrase);
        embeds[0].data.image = { url: image.url };

        msg.reply({ embeds }).catch((err) => {
            console.error(err);
            return(1);
        });
    },
};