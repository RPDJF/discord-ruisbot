// imports
const admin = require("firebase-admin");
const serviceAccount = require("../../config/firebase-adminsdk-credential.json");

// db setup
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// cache setup
const inMemoryCache = {};

/**
 * Generates a cache key based on the hierarchy of the collection and document.
 * @param {string} collectionName - The name of the Firestore collection (may include subcollections).
 * @param {string} documentId - The ID of the Firestore document.
 * @returns {string} - The generated cache key.
 */
function generateCacheKey(collectionName, documentId) {
  return `${collectionName}/${documentId}`;
}

/**
 * Retrieve data from Firestore or in-memory cache.
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {string} documentId - The ID of the Firestore document.
 * @returns {Promise<admin.firestore.DocumentData|null>} - Returns the data if found, otherwise null.
 */
async function getData(collectionName, documentId) {
  const cacheKey = generateCacheKey(collectionName, documentId);

  if (inMemoryCache[cacheKey]) {
    return inMemoryCache[cacheKey];
  } else {
    // If no data is found, fetch them from firestore
    const docRef = db.collection(collectionName).doc(documentId);
    const snapshot = await docRef.get();

    if (snapshot.exists) {
      const data = snapshot.data();

      // Write data in the cache
      inMemoryCache[cacheKey] = data;
      console.log(`Fetched data from Firestore ${cacheKey}`);
      return data;
    } else {
      console.log(`No data was found in Firestore for ${cacheKey}.`);
      return null;
    }
  }
}

/**
 * Writes data to Firestore and updates the in-memory cache by merging with existing data.
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {string} documentId - The ID of the Firestore document.
 * @param {Object} newData - The new data to write to Firestore.
 * @param {boolean} merge - Whether to merge the data (default: true).
 */
async function writeData(collectionName, documentId, newData, merge = true) {
  const cacheKey = generateCacheKey(collectionName, documentId);

  // Get existing data from cache if available
  const existingData = inMemoryCache[cacheKey] || {};

  // Merge existing data with new data
  const mergedData = { ...existingData, ...newData };

  // Update Firestore data
  await db
    .collection(collectionName)
    .doc(documentId)
    .set(mergedData, { merge });

  // Update the in-memory cache with merged data
  inMemoryCache[cacheKey] = mergedData;

  console.log(
    "Data updated in Firestore and merged in-memory cache:",
    mergedData,
  );
}

module.exports = { getData, writeData };
