const fetch = require('node-fetch');
const {parse} = require('node-html-parser');
const Clan = require('../models/Clan');
const {getSummary} = require('../services/characterInfo');
const {getAttributeList} = require('../util/util');
/**
 * Returns a promise then when resolved 
 * contains an object with an array of clan names and the
 * length of the array.
 * @returns {Promise} Promise object representing clan names,
 * and number of clans.
 */
const getClans = async () => {
    const url = "https://naruto.fandom.com/wiki/Category:Clans";
    return await fetch(url)
        .then(res => res.text())
        .then(body => parseClanNames(body))
        .then(names => {
            return { 
                "length": names.length,
                "names": names }
        })
}

/**
 * Parses HTML string for name of clans.
 * @param {String} body HTML String 
 * @returns Array<String> of clan names
 */
const parseClanNames = (body) => {
    return parse(body).querySelectorAll(".category-page__member-link").map(el => el.innerText.trim());
}
const getAffiliation = (data) => {
    return parse(data).querySelectorAll("table.infobox th").filter(th => th.innerText.includes("Affiliation"))[0].nextElementSibling.innerText.trim().split("\n");
}
/**
 * Parses the image href of the clan
 * from the passed in HTML string
 * @param {String} data HTML String 
 * @returns {String} image href
 */
const getImage = (data) => {
    return parse(data).querySelector("table.infobox img").attributes.src
}
/**
 * 
 * @param {name} name of the clan
 * @returns {Promise} representing a Clan object
 */
const getClanInfo = (name) => {
    return fetch(`https://naruto.fandom.com/wiki/${name}`)
        .then(res => res.text())
        .then(data => {
            Clan.affiliation = getAffiliation(data);
            Clan.image = getImage(data)
            Clan.summary = getSummary(data);
            Clan.jutsu = getAttributeList(data, "Jutsu");
            Clan.members = getAttributeList(data, "Members");
            return Clan;
        })
}
module.exports = {getClans, getClanInfo};