import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: "postgres://avnadmin:AVNS_i3nOVylnoFFzbf2Wguk@pg-3d26ad4d-tanvir-120c.l.aivencloud.com:12028/defaultdb",
  ssl: {
    rejectUnauthorized: false
  }
});

async function checkUsers() {
  try {
    await client.connect();
    console.log("Connected successfully.");
    
    const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log("Tables:", tables.rows.map(r => r.table_name));

    const res = await client.query('SELECT * FROM users');
    if (res.rows.length > 0) {
      console.log('Users found:', res.rows);
    } else {
      console.log('No users found.');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

checkUsers();
