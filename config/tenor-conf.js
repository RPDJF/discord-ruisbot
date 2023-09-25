// Imports
require("dotenv").config();

// Tenor configuration
const TENOR_API_KEY = process.env.TENOR_API_KEY;
const TENOR_API_URL = "https://api.tenor.com/v2/search";
const TENOR_RESULT_LIMIT = 10; // Number of results before randomizing

// Tests
if (!TENOR_API_KEY) {
  console.error("TENOR_API_KEY is not set!");
  process.exit(1);
}

module.exports = { TENOR_API_KEY, TENOR_API_URL, TENOR_RESULT_LIMIT };
