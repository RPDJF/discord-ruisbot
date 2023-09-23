const gameName = "Rui's Mine";
const gameLogo = "https://i.ibb.co/L84rGdT/ruismine-logo.png";
const gameThumbnail = "https://cdn-icons-png.flaticon.com/512/1213/1213235.png?w=360";
const gameCoolDownInMinute = 30;
const minimumRounds = 2;
const items = [
    {
        "value": 3,
        "occurence": 1000,
        "name": {
            "fr": "pierre",
            "en": "stone"
        },
        "emoji": ":rock:"
    },
    {
        "value":7,
        "occurence": 600,
        "name": {
            "fr": "charbon",
            "en": "coal"
        },
        "emoji": "<:coal_dust:1155122780166160394>"
    },
    {
        "value": 45,
        "occurence": 200,
        "name": {
            "fr": "lingot de fer",
            "en": "iron"
        },
        "emoji": "<:Iron_ingot:1155120062286536724>"
    },
    {
        "value": 200,
        "occurence": 70,
        "name": {
            "fr": "lingot d'or",
            "en": "gold"
        },
        "emoji": "<a:gold:1155121920119934976>"
    },
    {
        "value": 1200,
        "occurence": 10,
        "name": {
            "fr": "diamant",
            "en": "diamond"
        },
        "emoji": "<a:diamond:1155119834045087774>"
    },
    {
        "value": 8000,
        "occurence": 1,
        "name": {
            "fr": "émeraude",
            "en": "emerald"
        },
        "emoji": "<a:emerauld:1155119016474574898>"
    }
];

module.exports = {gameName, items, minimumRounds, gameLogo, gameThumbnail}