require('dotenv').config()
const express = require('express');
const { CharacterModel } = require('../models/Character');
const { ClanModel } = require('../models/Clan');
const { JutsuModel } = require('../models/Jutsu');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.mongoURL, { useUnifiedTopology: true, useNewUrlParser: true, socketTimeoutMS: 60000, reconnectTries: 5 })
const affiliations = [
    'Akatsuki', 'Allied Shinobi Forces',
    'Ame Orphans', 'Amegakure',
    'Fire Temple', 'Iwagakure',
    'Kabuto Yakushi', 'Kara',
    'Kirigakure', 'Konoha Orphanage',
    'Konohagakure', 'Kumogakure',
    'Kusagakure', 'Land of Ancestors',
    'Land of Earth', 'Land of Fire',
    'Land of Frost', 'Land of Hot Water',
    'Land of Iron', 'Land of Lightning',
    'Land of Valleys', 'Land of Water',
    'Land of Waves', 'Land of Wind',
    'Land of Woods', 'Land of the Moon',
    'Land of the Sea', 'Moon',
    'Mount Myōboku', 'Nara Clan',
    'Otogakure', 'Root',
    'Ryūchi Cave', 'Shikkotsu Forest',
    'Sunagakure', 'Takigakure',
    'Tsuchigumo Clan', 'Uzushiogakure',
    'Yugakure'
]
const natures = [
    'Boil Release',
    'Dust Release',
    'Earth Release',
    'Explosion Release',
    'Fire Release',
    'Ice Release',
    'Lava Release',
    'Lightning Release',
    'Magnet Release',
    'Scorch Release',
    'Storm Release',
    'Water Release',
    'Wind Release',
    'Wood Release',
    'Yang Release',
    'Yin Release',
    'Yin–Yang Release'
]
app.get('/clans', async (req, res) => {
    ClanModel.find({}, 'name', { sort: { name: 1 } }, (err, docs) => {
        if (err) console.error(err);
        res.status(200).json({
            "length": docs.length,
            "names": docs.map(doc => doc["name"])
        })
    })
})

app.get('/clans/:name', async (req, res) => {
    ClanModel.find({ name: req.params.name }, (err, docs) => {
        if (docs.length != 0) {
            return (res.status(200).json(docs[0]));
        }
        else {
            ClanModel.find({ name: { $regex: new RegExp(`^${req.params.name[0]}.*`), $options: 'i' } }, (err, doc) => {
                return (res.status(200).json(doc));
            })

        }
    })
})
app.get('/clans/affiliations/:affiliation', async (req, res) => {
    let affiliation = req.params.affiliation;
    if (affiliations.includes(affiliation)) {
        ClanModel.find({ 'affiliation': { $eq: affiliation } }, (err, docs) => {
            res.status(200).json({
                "length": docs.length,
                "affiliation": affiliation,
                "clans": docs
            })
        })
    } else {
        res.status(404).send({
            "error": 'Not a valid affiliation.',
            "affiliations": affiliations
        })
    }
})
app.get('/characters', async (req, res) => {
    CharacterModel.find({}, 'name', { sort: { name: 1 } }, (err, docs) => {
        if (err) return console.error(err);
        res.status(200).json({
            "length": docs.length,
            "names": docs.map(doc => doc["name"])
        })
    })
})
app.get('/characters/:name', async (req, res) => {
    CharacterModel.find({ name: req.params.name }, (err, docs) => {
        if (docs.length != 0) {
            return res.status(200).json(docs[0])
        } else {
            CharacterModel.find({ name: { $regex: new RegExp(`^${req.params.name[0]}.*`), $options: 'i' } }, (err, doc) => {
                return (res.status(200).json(doc[0]));
            })
        }
    });
})
app.get('/characters/affiliations/:affiliation', async (req, res) => {
    let affiliation = req.params.affiliation;
    if (affiliations.includes(affiliation)) {
        CharacterModel.find({ 'personalInfo.affiliation': { $eq: affiliation } }, (err, docs) => {
            res.status(200).json({
                "length": docs.length,
                "affiliation": affiliation,
                "characters": docs
            })
        })
    } else {
        res.status(404).send({
            "error": 'Not a valid affiliation.',
            "affiliations": affiliations
        })
    }
})
app.get('/characters/nature/:nature', async (req, res) => {
    let nature = req.params.nature;
    if (natures.includes(nature)) {
        CharacterModel.find({ 'personalInfo.nature type': { $eq: nature } }, (err, docs) => {
            res.status(200).json({
                "length": docs.length,
                "nature-type": nature,
                "characters": docs
            })
        })
    } else {
        res.status(404).send({
            "error": 'Not a valid nature type.',
            "nature-types": natures
        })
    }
})
app.get('/jutsus', async (req, res) => {
    JutsuModel.find({}, 'name', (err, docs) => {
        if (err) console.error(err);
        res.status(200).json({
            "length": docs.length,
            "names": docs.map(doc => doc["name"])
        })
    })

})
app.get('/jutsus/:name', async (req, res) => {
    JutsuModel.find({ name: req.params.name }, (err, docs) => {
        if (docs.length != 0) {
            return (res.status(200).json(docs[0]))
        } else {
            JutsuModel.find({ name: { $regex: new RegExp(`^${req.params.name[0]}.*`), $options: 'i' } }, (err, doc) => {
                return (res.status(200).json(doc));
            })
        }
    })
})
app.get('/jutsus/nature/:nature', async (req, res) => {
    let nature = req.params.nature;
    if (natures.includes(nature)) {
        JutsuModel.find({ 'nature': { $eq: nature } }, (err, docs) => {
            res.status(200).json({
                "length": docs.length,
                "nature-type": nature,
                "jutsus": docs
            })
        })
    } else {
        res.status(404).send({
            "error": 'Not a valid nature type.',
            "nature-types": natures
        })
    }
})

module.exports = { app, mongoose }