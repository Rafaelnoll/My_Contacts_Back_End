/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'root',
  port: 5432,
  password: '12345',
  database: 'mycontacts',
});

client.connect()
  .then(() => console.log('Connect to Database'))
  .catch((error) => console.log(error));

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
