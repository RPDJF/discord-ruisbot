// imports
const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase-adminsdk-credential.json");

// db setup
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// cache setup
const inMemoryCache = {};

/**
 * Génère une clé de cache basée sur la hiérarchie de la collection et du document.
 * @param {string} collectionName - Le nom de la Firestore collection (peut inclure des sous-collections).
 * @param {string} documentId - L'ID du document Firestore.
 * @returns {string} - La clé de cache générée.
 */
function generateCacheKey(collectionName, documentId) {
    return `${collectionName}/${documentId}`;
}

/**
 * Retrieve data from Firestore or in-memory cache
 * @param {string} collectionName - Le nom de la Firestore collection.
 * @param {string} documentId - L'ID du Firestore document.
 * @returns {Promise<admin.firestore.DocumentData|null>} - Retourne les données si elles sont trouvées, sinon null.
 */
async function getData(collectionName, documentId) {
    const cacheKey = generateCacheKey(collectionName, documentId);

    if (inMemoryCache[cacheKey]) {
        return inMemoryCache[cacheKey];
    } else {
        // Si les données ne sont pas en cache en mémoire, les récupérer depuis Firestore
        const docRef = db.collection(collectionName).doc(documentId);
        const snapshot = await docRef.get();

        if (snapshot.exists) {
            const data = snapshot.data();

            // Mettre en cache les données en mémoire
            inMemoryCache[cacheKey] = data;
            console.log(`Données récupérées depuis Firestore avec ${cacheKey}`);
            return data;
        } else {
            console.log(`Aucun document trouvé dans Firestore avec ${cacheKey}.`);
            return null;
        }
    }
}

/**
 * Writes data to Firestore and updates the in-memory cache.
 * @param {string} collectionName - Le nom de la Firestore collection.
 * @param {string} documentId - L'ID du Firestore document.
 * @param {Object} newData - Les nouvelles données à écrire dans Firestore.
 * @param {Boolean} merge - Fusionner les données (par défaut, oui).
 */
async function writeData(collectionName, documentId, newData, merge) {
    if (!merge) {
        merge = true;
    }
    
    const cacheKey = generateCacheKey(collectionName, documentId);

    // Mettre à jour les données Firestore
    await db
        .collection(collectionName)
        .doc(documentId)
        .set(newData, { merge: merge });

    // Mettre à jour le cache en mémoire
    inMemoryCache[cacheKey] = newData;

    console.log("Données mises à jour dans Firestore et en cache en mémoire :", newData);
}

module.exports = { getData, writeData };
