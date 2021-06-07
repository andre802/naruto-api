const express = require('express');
const app = express();
const mongodb = require('mongodb');
const {getCharacters, getCharacterInfo} = require('./app');
const port = 3000;
// const uri = "mongodb+srv://dbUser:vmmHalDCKPquAgcp@cluster0.epmuk.mongodb.net/test?retryWrites=true&w=majority";
// mongodb.MongoClient.connect(uri,).then( async el => {
//     console.log(el.isConnected());
//     let dbs = await el.db().admin().listDatabases();
//     console.log(dbs)

// })

app.get('/', async (req, res) => {
    let chars = await getCharacters();
    res.send(chars)

})
app.get('/:name', async (req, res) => {
    let info = await getCharacterInfo(req.params.name);
    res.send(info);
})
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})