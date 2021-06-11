
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
module.exports = Character;