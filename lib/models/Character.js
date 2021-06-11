const mongoose = require('mongoose');
/**
 * Represents a character from the Naruto universe.
 */
class Character {
    constructor() {
        this.name = "";
        this.jutsu = [];
        this.summary = "";
        this.images = [];
        this.personalInfo = {
            "birthdate": "",
            "sex": "",
            "age": [],
            "height": [],
            "weight": [],
            "affiliation": [],
            "status": "",
            "clan": [],
            "team": [],
            "kekkei genkai": [],
            "ninja rank": [],
            "nature type": []
        }
    }
}
/**
 * Schema for a character from the Naruto universe.
 * @see Character 
 */
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
/**
 * Model representing a character from the Naruto universe.
 */
const CharacterModel = mongoose.model("Character", characterSchema);

module.exports = {Character, CharacterModel};