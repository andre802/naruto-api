require('dotenv').config()
const express = require('express');
const { CharacterModel } = require('../models/Character');
const { ClanModel } = require('../models/Clan');
const { JutsuModel } = require('../models/Jutsu');
const { affiliations, natures, jutsuClassifications,
    characterClassifications, characterRanks,
    jutsuRanks, kekkeiGenkais } = require('../models/queryTypes');
const mongoose = require('mongoose');
const app = express();
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

mongoose.connect(process.env.mongoURL, { useUnifiedTopology: true, useNewUrlParser: true, socketTimeoutMS: 60000, reconnectTries: 5 })

const cache = (req, res, next) => {
    const key = req.url;
    client.get(key, (err, data) => {
        if (err) throw err;
        if (data != null) {
            res.status(200).json(JSON.parse(data));
            return;
        }
        next()
    })
}
app.use(cache);
app.get('/clans', async (req, res) => {
    ClanModel.find({}, 'name', { sort: { name: 1 } }, (err, docs) => {
        if (err) console.error(err);
        res.status(200).json({
            "length": docs.length,
            "names": docs.map(doc => doc["name"])
        })
        client.setex(req.url, 3000, JSON.stringify({
            "length": docs.length,
            "names": docs.map(doc => doc["name"])
        }))
    })
})
app.get('/clans/:name', async (req, res) => {
    ClanModel.find({ name: req.params.name }, (err, docs) => {
        if (docs.length != 0) {
            return (res.status(200).json(docs[0]));
        }
        else {
            ClanModel.find({ name: { $regex: new RegExp(`^${req.params.name[0]}.*`), $options: 'i' } }, (err, doc) => {
                client.setex(req.url, 3000, JSON.stringify({ doc }))
                return (res.status(200).json(doc));
            })

        }
    })
})
app.get('/clans/affiliation/:affiliation', async (req, res) => {
    let affiliation = req.params.affiliation;
    if (affiliations.includes(affiliation)) {
        ClanModel.find({ 'affiliation': { $eq: affiliation } }, (err, docs) => {
            res.status(200).json({
                "length": docs.length,
                "affiliation": affiliation,
                "clans": docs
            })
            client.setex(req.url, 3000, JSON.stringify({
                "length": docs.length,
                "affiliation": affiliation,
                "clans": docs
            }))
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
        client.setex(req.url, 3000, JSON.stringify({
            "length": docs.length,
            "names": docs.map(doc => doc["name"])
        }))
    })
})
app.get('/characters/:name', async (req, res) => {
    CharacterModel.find({ name: req.params.name }, (err, docs) => {
        if (docs.length != 0) {
            return res.status(200).json(docs[0])
        } else {
            CharacterModel.find({ name: { $regex: new RegExp(`^${req.params.name[0]}.*`), $options: 'i' } }, (err, doc) => {
                client.setex(req.url, 3000, JSON.stringify(doc[0]))
                return (res.status(200).json(doc[0]));
            })
        }
    });
})
app.get('/characters/affiliation/:affiliation', async (req, res) => {
    let affiliation = req.params.affiliation;
    if (affiliations.includes(affiliation)) {
        CharacterModel.find({ 'personalInfo.affiliation': { $eq: affiliation } }, (err, docs) => {
            res.status(200).json({
                "length": docs.length,
                "affiliation": affiliation,
                "characters": docs
            })
            client.setex(req.url, 3000, JSON.stringify({
                "length": docs.length,
                "affiliation": affiliation,
                "characters": docs
            }))
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
        CharacterModel.find({ 'personalInfo.nature type': { $regex: nature } }, (err, docs) => {
            res.status(200).json({
                "length": docs.length,
                "nature-type": nature,
                "characters": docs
            })
            client.setex(req.url, 3000, JSON.stringify({
                "length": docs.length,
                "nature-type": nature,
                "characters": docs
            }))
        })
    } else {
        res.status(404).send({
            "error": 'Not a valid nature type.',
            "nature-types": natures
        })
    }
})
app.get('/characters/rank/:rank', async (req, res) => {
    let rank = req.params.rank;
    if (characterRanks.includes(rank)) {
        CharacterModel.find({ 'personalInfo.ninja rank': { $regex: rank } }, (err, docs) => {
            res.status(200).json({
                "length": docs.length,
                "rank": rank,
                "characters": docs
            })
            client.setex(req.url, 3000, JSON.stringify({
                "length": docs.length,
                "rank": rank,
                "characters": docs
            }))
        })
    } else {
        res.status(404).send({
            "error": 'Not a valid character rank.',
            "ranks": characterRanks
        })
    }
})
app.get('/characters/kekkeiGenkai/:kekkeiGenkai', async (req, res) => {

    let kekkeiGenkai = req.params.kekkeiGenkai;
    if (kekkeiGenkais.includes(kekkeiGenkai)) {
        CharacterModel.find({ 'personalInfo.kekkei genkai': { $regex: kekkeiGenkai } }, (err, docs) => {
            res.status(200).json({
                "length": docs.length,
                "kekkei genkai": kekkeiGenkai,
                "characters": docs
            })
            client.setex(req.url, 3000, JSON.stringify({
                "length": docs.length,
                "kekkei genkai": kekkeiGenkai,
                "characters": docs
            }))
        })
    } else {
        res.status(404).send({
            "error": 'Not a valid kekkei genkai.',
            "ranks": kekkeiGenkais
        })
    }
})
app.get('/characters/classification/:classification', async (req, res) => {
    let classification = req.params.classification;
    if (characterClassifications.includes(classification)) {
        CharacterModel.find({ 'personalInfo.classification': { $regex: classification } }, (err, docs) => {
            res.status(200).json({
                "length": docs.length,
                "classification": classification,
                "characters": docs
            })
            client.setex(req.url, 3000, JSON.stringify({
                "length": docs.length,
                "classification": classification,
                "characters": docs
            }))
        })
    } else {
        res.status(404).send({
            "error": 'Not a valid character classification.',
            "classifications": characterClassifications
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
        client.setex(req.url, 3000, JSON.stringify({
            "length": docs.length,
            "names": docs.map(doc => doc["name"])
        }))
    })

})
app.get('/jutsus/:name', async (req, res) => {
    JutsuModel.find({ name: req.params.name }, (err, docs) => {
        if (docs.length != 0) {
            return (res.status(200).json(docs[0]))
        } else {
            JutsuModel.find({ name: { $regex: new RegExp(`^${req.params.name[0]}.*`), $options: 'i' } }, (err, doc) => {
                client.setex(req.url, 3000, JSON.stringify({ doc }))
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
            client.setex(req.url, 3000, JSON.stringify({
                "length": docs.length,
                "nature-type": nature,
                "jutsus": docs
            }))
        })
    } else {
        res.status(404).send({
            "error": 'Not a valid nature type.',
            "nature-types": natures
        })
    }
})
app.get('/jutsus/classification/:classification', async (req, res) => {
    let classification = req.params.classification;
    if (jutsuClassifications.includes(classification)) {
        JutsuModel.find({ 'classification': { $regex: classification } }, (err, docs) => {

            res.status(200).json({
                "length": docs.length,
                "classification": classification,
                "jutsus": docs
            })
            client.setex(req.url, 3000, JSON.stringify({
                "length": docs.length,
                "classification": classification,
                "jutsus": docs
            }))

        })
    } else {
        res.status(404).send({
            "error": 'Not a valid classification.',
            "classifications": jutsuClassifications
        })
    }
})
app.get('/jutsus/rank/:rank', async (req, res) => {
    let rank = req.params.rank;
    if (jutsuRanks.includes(rank)) {
        JutsuModel.find({ 'rank': { $regex: rank } }, (err, docs) => {
            res.status(200).json({
                "length": docs.length,
                "rank": rank,
                "jutsus": docs
            })
            client.setex(req.url, 3000, JSON.stringify({
                "length": docs.length,
                "rank": rank,
                "jutsus": docs
            }))
        })
    } else {
        res.status(404).send({
            "error": 'Not a valid jutsu rank.',
            "jutsu ranks": jutsuRanks
        })
    }
})


module.exports = { app, mongoose }