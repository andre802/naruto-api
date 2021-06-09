const mongoose = require('mongoose');
const { getCharacters, getCharacterInfo } = require('./lib/services/characterInfo');

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
    console.log("Characters populated")
}
db.once('open', () => {
    console.log("Connected");
    populateCharacters()
})