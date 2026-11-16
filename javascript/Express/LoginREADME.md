Set these environment variables before starting the API. Do not commit them.

- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `ADMIN_PASSWORD_HASH` (bcrypt hash for the `admin` user)

To get to the login page, open the link printed after `node app.js`.

```
npm install bcryptjs
npm install axios mysql
npm install express ejs
``` 