const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:PzfTZlJErtksNnUxnINloRNFsRfgaDbI@junction.proxy.rlwy.net:40994/railway',
  ssl: {
    rejectUnauthorized: false, // Добавляем это для Railway
  },
});

module.exports = pool;
