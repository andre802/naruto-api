const app = require('./lib/routes/server')

app.listen(process.env.port || 3000, () => {
    console.log(`Listening at http://localhost:${process.env.port || 3000}`);
})

