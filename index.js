const app = require('./lib/routes/server')

app.listen(3000, () => {
    console.log(`Listening at http://localhost:${3000}`);
})