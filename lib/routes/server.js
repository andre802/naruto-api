require('dotenv').config()
const express = require('express');
const { CharacterModel } = require('../models/Character');
const { ClanModel } = require('../models/Clan');
const { JutsuModel } = require('../models/Jutsu');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.mongoURL, { useNewUrlParser: true, socketTimeoutMS: 60000, keepAlive: true, reconnectTries: 5 })

app.get('/clans', async (req, res) => {
    ClanModel.find({}, 'name', (err, docs) => {
        if (err) console.error(err);
        res.status(200).json({
            "length": docs.length,
            "names": docs.map(doc => doc["name"])
        })
    })
})

app.get('/clans/:name', async (req, res) => {
    ClanModel.find({ name: req.params.name }, (err, docs) => {
        if (!docs.length) {
            return (res.status(200).json(docs[0]));
        }
         else {
            ClanModel.find({ name: { $regex: new RegExp(`^${req.params.name[0]}.*`), $options: 'i' } }, (err, doc) => {
                return (res.status(200).json(doc));
            })

        }
    })
})
app.get('/characters', async (req, res) => {
    CharacterModel.find({}, 'name', (err, docs) => {
        if (err) return console.error(err);
        res.status(200).json({
            "length": docs.length,
            "names": docs.map(doc => doc["name"])
        })
    })
})
app.get('/characters/:name', async (req, res) => {
    CharacterModel.find({ name: req.params.name}, (err, docs) => {
        if (!docs.length) {
            return (res.status(200).json(docs[0]))
        } else {
            CharacterModel.find({name: { $regex: new RegExp(`^${req.params.name[0]}.*`), $options: 'i'}}, (err, doc) => {
                return (res.status(200).json(doc));
            }) 
        }
    })
    ;
})

app.get('/jutsus', async (req, res) => {
    JutsuModel.find({}, 'name', (err, docs) => {
      if (err) console.error(err);
        res.status(200).json({
            "length": docs.length,
            "names": docs.map(doc => doc["name"])
        })  
    })
    res.status(200).send(jutsus);
})
app.get('/jutsus/:name', async (req, res) => {
    JutsuModel.find({ name: req.params.name}, (err, docs) => {
        if (!docs.length) {
            return (res.status(200).json(docs[0]))
        } else {
            CharacterModel.find({name: { $regex: new RegExp(`^${req.params.name[0]}.*`), $options: 'i'}}, (err, doc) => {
                return (res.status(200).json(doc));
            }) 
        }
    })
})


module.exports = app