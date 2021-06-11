const mongoose = require('mongoose');
class Clan {
    constructor() {
        this.name = "";
        this.summary = "";
        this.affiliation = [];
        this.image = "";
        this.members = [];
        this.jutsu = []
    }
}
const clanSchema = new mongoose.Schema({
    name: String,
    summary: String,
    affiliation: Array,
    image: String,
    members: Array,
    jutsu: Array

})

module.exports = {Clan, clanSchema}