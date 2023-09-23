// imports
const axios = require("axios");
const { Message } = require("discord.js");
const embedUtility = require("../features/embedUtility");
const db = require("../../db");

module.exports = {
    name: "sneeze",
    description: {
        en: "Sneeze suddenly.",
        fr: "Éternuer soudainement."
    },
    usage: "sneeze",
    category: "interaction",
    /**
     * @param {Message} msg
     * @param {Array} args
     */
    async execute(msg, args) {
        const guild = await db.getData("guilds", msg.guildId);
        const phrases = {
            en: [
                `${msg.author} sneezes suddenly! :sneeze:`,
                `:sneeze: ${msg.author} can't control their sneeze. :flushed:`,
                `${msg.author} lets out a sudden and unexpected sneeze! :astonished:`,
                `${msg.author} sneezes out of nowhere! :sneeze:`,
                `:flushed: ${msg.author} sneezes unexpectedly! :astonished:`,
                `${msg.author} surprises everyone with a sudden sneeze! :sneeze:`
            ],
            fr: [
                `${msg.author} éternue soudainement ! :sneeze:`,
                `:sneeze: ${msg.author} ne peut pas contrôler son éternuement. :flushed:`,
                `${msg.author} laisse échapper un éternuement soudain et inattendu ! :astonished:`,
                `${msg.author} éternue de nulle part ! :sneeze:`,
                `:flushed: ${msg.author} éternue de manière inattendue ! :astonished:`,
                `${msg.author} surprend tout le monde avec un éternuement soudain ! :sneeze:`
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