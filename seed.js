const mongoose = require('mongoose');
const { getCharacters, getCharacterInfo } = require('./lib/services/characterInfo');
const { getClans, getClanInfo } = require('./lib/services/clanInfo');
const { getJutsus, getJutsuInfo } = require('./lib/services/jutsuInfo');

mongoose.connect('mongodb://localhost:27017/naruto-api', { useNewUrlParser: true, socketTimeoutMS: 60000, keepAlive: true, reconnectTries: 5 })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
const characterSchema = new mongoose.Schema({
    name: String,
    jutsu: Array,
    summary: String,
    images: Array,
    personalInfo: {
        birthdate: 'String',
        sex: 'String',
        age: 'Array',
        height: 'Array',
        weight: 'Array',
        affiliation: 'Array',
        status: 'String',
        clan: 'Array',
        team: 'Array',
        "kekkei genkai": 'Array',
        "ninja rank": 'Array',
        "nature type": 'Array'
    }
})
const jutsuSchema = new mongoose.Schema({
    name: String,
    rank: String,
    classification: Array,
    handsign: String,
    summary: String,
    image: String,
    users: Array,
    derivedJutsu: Array,
    parentJutsu: Array,
    relatedJutsu: Array
})
const clanSchema = new mongoose.Schema({
    name: String,
    summary: String,
    affiliation: Array,
    image: String,
    members: Array,
    jutsu: Array

})
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