const fetch = require('node-fetch');
const { parse } = require('node-html-parser');
const he = require('he');
const Jutsu = require('../models/Jutsu');

/**
 * Fetches the HTML contained within the naruto wikia for the
 * specified jutsu, parses that data and returns an object with
 * the information. 
 * @param {String} jutsu name 
 * @returns Object containing information about the Jutsu
 */
const getJutsuInfo = (jutsu) => {
    let url = `https://naruto.fandom.com/wiki/${jutsu}`;
    return fetch(url)
        .then(url => url.text())
        .then(data => {
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
                        Jutsu.classification = item.querySelector("div").innerText;
                        break;
                    case 'hand signs':
                        Jutsu.handsigns = he.decode(item.querySelector("div").innerText);
                        break;
                    case 'jutsu media':
                        Jutsu.derivedJutsu = item.querySelectorAll('div.pi-data-value div ul li a').map(el => el.innerText);
                    case 'parent jutsu':
                        Jutsu.parentJutsu = item.querySelectorAll('div.pi-data-value div ul li a').map(el => el.innerText);
                    case 'users':
                        Jutsu.users = item.querySelectorAll('div.pi-data-value div ul li a').map(el => el.innerText.trim());
                }
            })
            root.querySelectorAll("ul, img, table, aside, .toc, p >p , h2 > p").forEach(el => el.remove())
            Jutsu.summary = he.decode(root.querySelectorAll(".mw-parser-output *")[0].innerText.trim());
            return Jutsu;
        })
}
module.exports = {getJutsuInfo }
