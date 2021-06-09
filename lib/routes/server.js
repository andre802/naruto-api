const express = require('express');
const {getCharacters, getCharacterInfo} = require('../services/characterInfo');
const  {getJutsuInfo} = require("../services/jutsuInfo");
const {getClans, getClanInfo} = require('../services/clanInfo');

const app = express();

app.get('/clans', async (req, res) => {
    let clans = await getClans();
    res.status(200).send(clans);
})

app.get('/clans/:name',async (req, res) => {
    let clanInfo = await getClanInfo(req.params.name);
    res.send(clanInfo);
})
app.get('/characters', async (req, res) => {
    let chars = await getCharacters();
    res.status(200).send(chars)

})
app.get('/characters/:name', async (req, res) => {
    let info = await getCharacterInfo(req.params.name);
    res.status(200).send(info);
})
app.get('/jutsus/:name', async (req, res) => {
    let info = await getJutsuInfo(req.params.name)
    res.status(200).send(info)
})


module.exports = app