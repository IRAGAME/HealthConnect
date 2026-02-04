// config/db.js
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// TEST DE CONNEXION AU DÉMARRAGE
(async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connecté à PostgreSQL');
    client.release();
  } catch (err) {
    console.error('❌ Erreur connexion PostgreSQL :', err.message);
  }
})();

module.exports = pool;
