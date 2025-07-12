// config/Config.js

const local_api_url = 'http://localhost:5000';
const production_api_url = 'https://smriti-s-echo-admin.onrender.com';

// Automatically switch based on environment (Vercel sets NODE_ENV=production)
const base_api_url =
    process.env.NODE_ENV === 'production' ? production_api_url : local_api_url;

export { base_api_url };
