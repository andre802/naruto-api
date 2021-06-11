require('dotenv').config()
const mongoose = require('mongoose');
const { getCharacters, getCharacterInfo } = require('./lib/services/characterInfo');
const { getClans, getClanInfo } = require('./lib/services/clanInfo');
const { getJutsus, getJutsuInfo } = require('./lib/services/jutsuInfo');
const {characterSchema} =require('./lib/models/Character');
const {clanSchema} = require('./lib/models/Clan');
const {jutsuSchema} = require('./lib/models/Jutsu');

mongoose.connect(process.env.mongoURL,{ useNewUrlParser: true, socketTimeoutMS: 60000, keepAlive: true, reconnectTries: 5 })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))

const Character = mongoose.model("Character", characterSchema);
const Jutsu = mongoose.model("Jutsu", jutsuSchema);
const Clan = mongoose.model("Clan", clanSchema);
const populateCharacters = async () => {
    let charNames = await getCharacters();
    charNames.names.forEach(async (name) => {
        Character.find({name: name}, name, async (err, docs) => {
            if (docs.length == 0) {
                let info = await getCharacterInfo(name);
                const char = new Character(info);
                char.save((err, char) => {
                    if (err) console.error(err);
                });
            }
        })
    })
}
const populateJutsus = async () => {


    let jutsuNames = await getJutsus();
    jutsuNames.names.forEach(async (name) => {
        let info = await getJutsuInfo(name);
        const jutsu = new Jutsu(info);
        jutsu.save((err, char) => {
            if (err) console.error(err);
        })
    })
}
const populateClans = async () => {
    getClans()
        .then(body => {
            body.names.forEach(async name => {
                let info = await getClanInfo(name);
                const clan = new Clan(info);
                clan.save((err, clan) => {
                    if (err) console.error(err);
                })
            })
        })
}
db.once('open', async () => {
    console.log("Connected");
    // populateCharacters()
    // populateJutsus();
    // populateClans();


})
module.exports = { Character, Jutsu, Clan };