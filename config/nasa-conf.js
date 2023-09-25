// Imports
require("dotenv").config();

// Configuration file for NASA API
const NASA_API_KEY = process.env.NASA_API_KEY;

// Check if the API key is set
if (!NASA_API_KEY) {
  console.error("OPENAI_API_KEY or OPENAI_ORGANIZATION_ID are not set.");
  process.exit(1);
}

// Export the API key
module.exports = { NASA_API_KEY };
