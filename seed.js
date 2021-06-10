const mongoose = require('mongoose');
const { getCharacters, getCharacterInfo } = require('./lib/services/characterInfo');
const { getClans, getClanInfo } = require('./lib/services/clanInfo');
const { getJutsus, getJutsuInfo } = require('./lib/services/jutsuInfo');

mongoose.connect('mongodb://localhost:27017/naruto-api', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))

const populateCharacters = async () => {
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
    const Character = mongoose.model("Character", characterSchema)
    let charNames = await getCharacters();
    charNames.names.forEach(async (name) => {
        let info = await getCharacterInfo(name);
        const char = new Character(info);
        char.save((err, char) => {
            if (err) console.error(err);
        })
    })
}
const populateJutsus = async () =>{
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
    const Jutsu = mongoose.model("Jutsu", jutsuSchema)
    let jutsuNames = await getJutsus();
    jutsuNames.names.forEach(async (name) => {
        let info = await getJutsuInfo(name);
        const jutsu = new Jutsu(info);
        jutsu.save((err, char) => {
            if (err) console.error(err);
        })
    })
}
const populateClans = async () =>{
     const clanSchema = new mongoose.Schema({
        summary: String,
        affiliation: Array,
        image: String,
        members: Array,
        jutsu: Array

    })
    const Clan = mongoose.model("Clan", clanSchema)
    
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
db.once('open', async() => {
    console.log("Connected");
    // populateCharacters()
    // populateJutsus();
    // populateClans();
})