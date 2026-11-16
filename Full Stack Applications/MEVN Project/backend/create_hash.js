/* eslint-disable prettier/prettier */
// example script for hash generation
const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = process.env.DEMO_PASSWORD;
if (!password) {
  console.error('Set DEMO_PASSWORD before running this script.');
  process.exit(1);
}

bcrypt
  .hash(password, saltRounds)
  .then((hash) => {
    console.log('Hash: ', hash);
  })
  .catch((err) => console.error(err.message));
