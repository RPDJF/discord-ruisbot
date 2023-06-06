// imports
const axios = require("axios");
const xml2js = require("xml2js");

// data
const rssUrlsFile = require("./rss_urls.json")

// guid cache
var existingGuids = [];

// send feeds
async function sendFeed(feeds) {
    try {
        // ad thumbnail to feeds with tenor api
        const requests = feeds.map(async (item) => {
            const response = await axios.get("https://tenor.googleapis.com/v2/search", {
                params: {
                    key: "KEY",
                    client_key: "ID",
                    q: `${item.title.match(/Episode \d+ of (.*) is out!/i)?.[1] || item.title}`,
                    limit: 10
                }
            });
            item.thumbnail = response.data.results[Math.floor(Math.random() * response.data.results.length)].media_formats["gif"].url;
        });
        // wait for promises
        await Promise.all(requests);
    } catch (e) {
        console.log(e);
    }
}

//sendFeed([{title: "Episode 55 of tokyo ghoul is out!"}, {title: "Episode 5 of mashle is out!"}]);



// Fonction pour vérifier les nouveaux éléments dans le flux RSS
async function checkNewItems(rssUrl) {
    try {
        console.log(`Checking RSS ${rssUrl}`);
        const response = await axios.get(rssUrl);
        const xml = response.data;
  
        // Convertit le XML en objet JavaScript
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(xml);
  
        // Vérifie chaque élément dans le flux RSS
        const newItems = [];
        const items = result.rss.channel[0].item;
        for (const item of items) {
            const guid = item.guid[0];
    
            // Vérifie si l'élément est nouveau en comparant son GUID avec les éléments existants
            if (!existingGuids.includes(guid)) {
            newItems.push({
                title: item.title[0],
                link: item.link[0],
                description: item.description[0],
                pubDate: item.pubDate[0]
            });
            existingGuids.push(guid);
            }
        }
  
        // Lance la fonction "sendFeed" si de nouveaux éléments ont été détectés
        if (newItems.length > 0) {
            sendFeed(newItems);
        }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error.message);
    }
}  
  
// Fonction pour vérifier les nouveaux éléments dans tous les flux RSS
async function checkAllNewItems() {
    try {
        // Vérifie les nouveaux éléments pour chaque lien RSS
        for (const category in rssUrlsFile) {
            for(const rssUrl of rssUrlsFile[category]){
                await checkNewItems(rssUrl);
            }
        }
    } catch (e) {
            console.log(e);
    }
}
  
  // Démarre la vérification des nouveaux éléments toutes les 5 secondes
  setInterval(checkAllNewItems, 5000);