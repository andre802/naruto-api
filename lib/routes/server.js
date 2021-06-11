const express = require('express');
const { getCharacters, getCharacterInfo } = require('../services/characterInfo');
const { getJutsuInfo, getJutsus } = require("../services/jutsuInfo");
const { getClans, getClanInfo } = require('../services/clanInfo');
const { Character, Jutsu, Clan } = require('../../seed');
const app = express();

app.get('/clans', async (req, res) => {
    Clan.find({}, 'name', (err, docs) => {
        if (err) console.error(err);
        res.status(200).json({
            "length": docs.length,
            "names": docs.map(doc => doc["name"])
        })
    })
})

app.get('/clans/:name', async (req, res) => {
    Clan.find({ name: req.params.name }, (err, docs) => {
        if (docs.length != 0) {
            return (res.status(200).json(docs[0]));
        }
         else {
            Clan.find({ name: { $regex: new RegExp(`^${req.params.name[0]}.*`), $options: 'i' } }, (err, doc) => {
                return (res.status(200).json(doc));
            })

        }
    })
})
app.get('/characters', async (req, res) => {
    let chars = await getCharacters();
    res.status(200).send(chars)

})
app.get('/characters/:name', async (req, res) => {
    let info = await getCharacterInfo(req.params.name);
    res.status(200).send(info);
})

app.get('/jutsus', async (req, res) => {
    let jutsus = await getJutsus();
    res.status(200).send(jutsus);
})
app.get('/jutsus/:name', async (req, res) => {
    let info = await getJutsuInfo(req.params.name)
    res.status(200).send(info)
})


module.exports = app