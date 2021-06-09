const Character = require('../models/Character');
const fetch = require('node-fetch');
const { parse } = require('node-html-parser');
const he = require('he');
const {getAttributeList} = require('../util/util');
/**
 * Returns a promise containing names of characters
 * from Naruto.
 * 
 * URL restricted to low limit for testing.
 */
const getCharacters = async () => {
    const url = "https://naruto.fandom.com/wiki/Special:BrowseData/Characters?limit=700&offset=0&_cat=Characters&Media=Manga";
    return await fetch(url)
        .then(res => res.text())
        .then(body => parseCharacterNames(body))
        .then((names) => {
            return { "names": names }
        })

};

/**
 * Parses HTML string for character's names and returns them.
 * @param {String} body HTML String
 * @returns {Array<String>} Character names
 */
const parseCharacterNames = (body) => {
    return parse(body).querySelector(".smw-columnlist-container").querySelectorAll('li').map(el => el.innerText.trim());
}


/** Parses the passed in HTML text for a character's
* personal information and returns an object detailing 
* the info parsed.
* @param {String} body - HTML text
*/
const getPersonalInfo = (body) => {
    let pi = Character.personalInfo;
    let tableHeaders = parse(body).querySelectorAll("th").filter(el => {
        return (
            ((el.nextElementSibling || el.innerText.includes("Nature Type")) && el.innerText.toLowerCase().trim() in pi)
        )
    });
    tableHeaders.forEach(th => {
        let thText = th.innerText.toLowerCase().trim();
        if (thText in pi) {
            switch (thText) {
                case 'birthdate':
                case 'sex':
                case 'status':
                    pi[thText] = th.nextElementSibling.innerText.trim();
                    break;
                case 'age':
                case 'affiliation':
                case 'clan':
                case 'team':
                case 'kekkei genkai':
                case 'ninja rank':
                    pi[thText] = th.nextElementSibling.innerText.trim().split('\n').map(el => el.trim());
                    break;
                case 'weight':
                    let weight = he.decode(th.nextElementSibling.innerText.trim())
                                .replaceAll("<br />", "")
                                .replaceAll(" kg", "kg ")
                                .split("\n")
                    pi[thText] = weight;
                    break;
                case 'height':
                    let height = he.decode(th.nextElementSibling.innerText.trim())
                                .replaceAll("<br />", "")
                                .replaceAll(" cm", "cm ")
                                .split("\n")
                    pi[thText] = height;
                    break;
                case 'nature type':
                    pi[thText] = th.parentNode.parentNode.querySelectorAll("li").map(el => el.innerText.trim())
                    break;
            }
        }
    })
    return pi;
}
/**
 * Parses the HTML string for the character summary and returns
 * it.
 * @param {String} data HTML string
 * @return {String} summary parsed from HTML string
 */
const getSummary = (data) => {
    let summary = "";
    const root = parse(data);
    let elements = root.querySelectorAll(".mw-parser-output *");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].rawTagName == "p") {
            let text = elements[i].innerText.trim();
            if (text.length != 0) summary += (elements[i].innerText.trim())
        } else if (elements[i].id == "toc") {
            i = elements.length;
        }
    }
    return summary;
}
/**
 * Parses the HTML string for images of the character and returns an array
 * of the images referred to by the img tag's src attribute.
 * @param {String} data HTML string containing images of a character
 * @returns {Array<String>} image hrefs parsed from the HTML string
 */
const getCharacterImages = (data) => {
    return [parse(data).querySelectorAll(".imagecell a").map(link => link.attributes.href)];
}
/**
 * Fetches data from the naruto wiki page for the specified
 * character and returns a promise that when resolved contains
 * an object containing information about the character.
 * @param {String} name of Naruto character
 */
const getCharacterInfo = (name) => {
    
    return fetch(`https://naruto.fandom.com/wiki/${name}`)
        .then(res => res.text())
        .then((data) => {
            Character.summary = getSummary(data);
            Character.jutsu = getAttributeList(data, "Jutsu");
            Character.images = getCharacterImages(data);
            Character.personalInfo = getPersonalInfo(data);
            return Character;
        })
}


module.exports = {getCharacters, getCharacterInfo, getSummary}