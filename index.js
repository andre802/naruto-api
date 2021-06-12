const {app} = require('./lib/routes/server');

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);
})

