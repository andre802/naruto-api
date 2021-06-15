const {app} = require('./lib/routes/server');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})
