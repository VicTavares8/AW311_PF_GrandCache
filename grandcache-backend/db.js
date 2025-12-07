const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Eltorito_88',
  database: 'grandcache_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();
console.log('Configuración de BD cargada.');

module.exports = promisePool;

