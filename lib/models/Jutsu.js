const mongoose = require('mongoose');
/**
 * Represents a Jutsu in the Naruto universe.
 */
class Jutsu {
    constructor() {
        this.name = "";
        this.rank = "";
        this.classification = [];
        this.nature = [];
        this.handsigns = "";
        this.summary = "";
        this.image = "";
        this.users = [];
        this.derivedJutsu = [];
        this.parentJutsu = [];
        this.relatedJutsu = []
    }
}
/**
 * Mongoose schema representing a Jutsu.
 * @see Jutsu
 */
const jutsuSchema = new mongoose.Schema({
    name: String,
    rank: String,
    classification: Array,
    nature: Array,
    handsigns: String,
    summary: String,
    image: String,
    users: Array,
    derivedJutsu: Array,
    parentJutsu: Array,
    relatedJutsu: Array
})
/**
* Model representing a jutsu from the Naruto universe.
 */
const JutsuModel = mongoose.model("Jutsu", jutsuSchema);

module.exports = {Jutsu, JutsuModel};