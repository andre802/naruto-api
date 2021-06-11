const mongoose = require('mongoose');
class Jutsu {
    constructor() {
        this.name = "";
        this.rank = "";
        this.classification = [];
        this.handsign = "";
        this.summary = "";
        this.image = "";
        this.users = [];
        this.derivedJutsu = [];
        this.parentJutsu = [];
        this.relatedJutsu = []
    }
}

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

module.exports = {Jutsu, jutsuSchema};