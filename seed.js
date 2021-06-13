require('dotenv').config()

const mongoose = require('mongoose');
const { getCharacters, getCharacterInfo } = require('./lib/services/characterInfo');
const { getClans, getClanInfo } = require('./lib/services/clanInfo');
const { getJutsus, getJutsuInfo } = require('./lib/services/jutsuInfo');
const { CharacterModel } = require('./lib/models/Character');
const { ClanModel } = require('./lib/models/Clan');
const { JutsuModel } = require('./lib/models/Jutsu');

mongoose.connect(process.env.mongoURL, { useNewUrlParser: true, socketTimeoutMS: 60000, keepAlive: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))

/**
 * Populates the characters collections.
 */
const populateCharacters = async () => {
    getCharacters()
        .then(body => body.names)
        .then(names => {
            names.forEach(async (name) => {
                CharacterModel.find({ name: name }, name, async (err, docs) => {
                    if (!docs.length) {
                        let characters = await getCharacterInfo(name    );
                        CharacterModel.create(characters);
                    }
                })
            })
        })

}
/**
 * Populates the jutsus collections.
 */
const populateJutsus = async () => {
    getJutsus()
        .then(body => body.names)
        .then(names => {
            names.forEach(async (name) => {
                JutsuModel.find({ name: name }, name, async (err, docs) => {
                    if (!docs.length) {
                        let jutsu = await getJutsuInfo(name);
                        JutsuModel.create(jutsu);
                    }
                })
            })
        })
}
/**
 * Populates the clans collections.
 */
const populateClans = async () => {
    getClans()
        .then(body => body.names)
        .then(names => {
            names.forEach(async name => {
                ClanModel.find({ name: name }, name, async (err, docs) => {
                    if (!docs.length) {
                        let clan = await getClanInfo(name);
                        console.log(clan);
                        ClanModel.create(clan);
                    }
                })
            })
        })
}

db.once('open', async () => {
    console.log("Connected");
    // await populateCharacters()
    await populateJutsus();
    // await populateClans();
    
})
