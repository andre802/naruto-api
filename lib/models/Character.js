
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
module.exports = {Character, characterSchema};