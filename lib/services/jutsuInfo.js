const fetch = require('node-fetch');
const { parse } = require('node-html-parser');
const he = require('he');
const JutsuObj = require('../models/Jutsu');

/**
 * Returns a promise that when resolves contains an object
 * with an array of jutsu names and the length of the array.
 * @returns {Promise} object representing jutsu names and 
 * number of jutsus
 */
const getJutsus = async () => {
    const url = "https://naruto.fandom.com/wiki/Special:BrowseData/Jutsu?limit=1000&offset=0&_cat=Jutsu&Media=Manga";
    return await fetch(url)
        .then(res => res.text())
        .then(body => parseJutsuNames(body))
        .then(names => {
            return {
                "length": names.length,
                "names": names
            }
        })
}
/**
 * Parses the passed HTML string for jutsu names
 * @param {String} body HTML String
 * @returns {Array<String>} jutsu names
 */
const parseJutsuNames = (body) => {
    return parse(body).querySelectorAll(".smw-columnlist-container li").map(el => el.innerText.trim());
}

/**
 * Fetches the HTML contained within the naruto wikia for the
 * specified jutsu, parses that data and returns an object with
 * the information. 
 * @param {String} jutsu name 
 * @returns Object containing information about the Jutsu
 */
const getJutsuInfo = (jutsu) => {
    let url = `https://naruto.fandom.com/wiki/${encodeURIComponent(jutsu)}`;
    return fetch(url)
        .then(url => url.text())
        .then(data => {
            const Jutsu = new JutsuObj();
            let root = parse(data);
            let image = root.querySelector(".pi-image-thumbnail").attributes.src;
            let jutsuData = root.querySelector("aside").querySelectorAll("div.pi-item").filter(el => (el.attributes["data-source"]))
            Jutsu.name = jutsu;
            Jutsu.image = image.replace("/revision/latest/scale-to-width-down/350", "");
            jutsuData.forEach(item => {
                switch(item.attributes["data-source"]) {
                    case 'jutsu rank':
                        Jutsu.rank = item.querySelector("div").innerText;
                        break;
                    case 'jutsu classification':
                        Jutsu.classification = item.querySelector("div").innerText.split(", ");
                        break;
                    case 'hand signs':
                        item.querySelector("div").querySelectorAll("a").forEach(a => a.remove());
                        Jutsu.handsigns = item.querySelector("div").innerText;
                        break;
                    case 'jutsu media':
                         Jutsu.derivedJutsu = item.querySelectorAll('div.pi-data-value div ul li a').map(el => el.innerText);
                         break;
                    case 'parent jutsu':
                        Jutsu.parentJutsu = item.querySelectorAll('div.pi-data-value div ul li a').map(el => el.innerText);
                        break;
                    case 'users':
                        Jutsu.users = item.querySelectorAll('div.pi-data-value div ul li a').map(el => el.innerText.trim());
                        break;
                    case 'related jutsu':
                        Jutsu.relatedJutsu = item.querySelectorAll('div.pi-data-value a').map(el => el.innerText.trim());
                        break;
                }
            })
            root.querySelectorAll("ul, img, table, aside, .toc, p >p , h2 > p").forEach(el => el.remove())
            Jutsu.summary = he.decode(root.querySelectorAll(".mw-parser-output *")[0].innerText.trim());
            return Jutsu;
        })
}
module.exports = {getJutsuInfo, getJutsus}
