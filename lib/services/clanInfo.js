const fetch = require('node-fetch');
const {parse} = require('node-html-parser');
const {Clan} = require('../models/Clan');
const {getSummary} = require('../services/characterInfo');
const {getAttributeList, decode} = require('../util/util');

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
                "names": names.map(name => decode(name))
            }
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
/**
 * Parses HTML string for the affiliations
 * of the character described within the string.
 * @param {String} data HTML string
 * @returns Array<String> of affiliations related to the character
 * specified in the HTML string.
 */
const getAffiliation = (data) => {
    let root = parse(data);
    let th = root.querySelectorAll("table.infobox th").filter(th => th.innerText.includes("Affiliation"))[0];
    if (th) {
        return th.nextElementSibling.querySelector("a").innerText.trim().split("\n").map(el => el.trim());
    } else return [];

}
/**
 * Parses the image href of the clan
 * from the passed in HTML string
 * @param {String} data HTML String 
 * @returns {String} image href
 */
const getImage = (data) => {
    let image = parse(data).querySelector("table.infobox td.imagecell img")
    if (image) {
        return image.attributes.src.replace(/\/revision\/latest\/scale-to-width-down\/\d+/, "");
    } else return "";
}
/**
 * 
 * @param {name} name of the clan
 * @returns {Promise} representing a Clan object
 */
const getClanInfo = (name) => {
    return fetch(`https://naruto.fandom.com/wiki/${encodeURIComponent(name)}`)
        .then(res => res.text())
        .then(data => {
            const clan = new Clan();
            clan.name = name;
            clan.affiliation = getAffiliation(data);
            clan.image = getImage(data)
            clan.summary = getSummary(data);
            clan.jutsu = getAttributeList(data, "Jutsu");
            clan.members = getAttributeList(data, "Members");
            return clan;
        })
}
module.exports = {getClans, getClanInfo};