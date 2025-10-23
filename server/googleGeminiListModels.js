require('dotenv').config(); // load .env variables
const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');

// Path to your service account JSON
const SERVICE_ACCOUNT_FILE = './service-account.json';

async function listModels() {
  try {
    // Authenticate using service account
    const auth = new GoogleAuth({
      keyFile: SERVICE_ACCOUNT_FILE,
      scopes: 'https://www.googleapis.com/auth/cloud-platform',
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    // Call Gemini API to list models
    const response = await axios.get(
      'https://generativelanguage.googleapis.com/v1/models',
      {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
        },
      }
    );

    console.log('Available models:', response.data);
  } catch (error) {
    console.error('Error fetching models:', error.response ? error.response.data : error.message);
  }
}

listModels();
