const mongoose = require('mongoose');
/**
 * Represents a clan from the Naruto universe.
 */
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
/**
 * Mongoose schema for a clan.
 * @see Clan
 */
const clanSchema = new mongoose.Schema({
    name: String,
    summary: String,
    affiliation: Array,
    image: String,
    members: Array,
    jutsu: Array

})
/* 
* Model representing a clan from the Naruto universe.
*/
const ClanModel = mongoose.model("Clan", clanSchema);

module.exports = {Clan, ClanModel}