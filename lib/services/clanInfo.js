const fetch = require('node-fetch');
const {parse} = require('node-html-parser');
const Clan = require('../models/Clan');
const {getSummary} = require('../services/characterInfo');
/**
 * Fetches the page containing clans within the naruto
 * universe and returns a promise then when resolved 
 * contains an object with an array of clan names and the
 * length of the array.
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
 * Parses HTML string returns array of
 * clan names.
 * @param {String} body HTML String 
 * @returns Array<String> of clan names
 */
const parseClanNames = (body) => {
    return parse(body).querySelectorAll(".category-page__member-link").map(el => el.innerText.trim());
}

const getMembers = (data) => {
     let th = parse(data).querySelectorAll("th").filter(el => el.innerText.includes("Members"))[0]
    let lis =th.parentNode.parentNode.querySelectorAll("li");
    return lis.map(li => li.innerText.trim());
}
const getAffiliation = (data) => {
    return parse(data).querySelectorAll("table.infobox th").filter(th => th.innerText.includes("Affiliation"))[0].nextElementSibling.innerText.trim().split("\n");
}
const getJutsu = (data) => {
    let th = parse(data).querySelectorAll("th").filter(el => el.innerText.includes("Jutsu"))[0]
    let lis =th.parentNode.parentNode.querySelectorAll("li");
    return lis.map(li => li.innerText.trim());
}
const getImage = (data) => {
    return parse(data).querySelector("table.infobox img").attributes.src
}
const getClanInfo = (name) => {
    return fetch(`https://naruto.fandom.com/wiki/${name}`)
        .then(res => res.text())
        .then(data => {
            Clan.affiliation = getAffiliation(data);
            Clan.image = getImage(data)
            Clan.summary = getSummary(data);
            Clan.jutsu = getJutsu(data);
            Clan.members = getMembers(data);
            return Clan;
        })
}
module.exports = {getClans, getClanInfo};