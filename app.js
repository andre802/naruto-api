const fetch = require('node-fetch');
const { parse } = require('node-html-parser');
const he = require('he');
/**
 * Object of characters indexed by name
 */
let Characters = {};
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
            //getCharacterInfo(names)
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
* the info parse
* @param {String} body - HTML text
*/
const getPersonalInfo = (body) => {
    let pi = {
        "birthdate": "",
        "sex": "",
        "age": [],
        "height": [],
        "weight": [],
        "affiliation": "",
        "status": "",
        "clan": [],
        "team": [],
        "kekkei genkai": [],
        "ninja rank": [],
        "nature type": []
    }
    let info = parse(body).querySelectorAll("th").filter(el => {
        return (
            ((el.nextElementSibling || el.innerText.includes("Nature Type"))&& el.innerText.toLowerCase().trim() in pi)
        )
    });
    let weight, height = [];
    info.forEach(i => {
        if (i.innerText.includes("Birthdate")) {
            pi["birthdate"] = i.nextElementSibling.innerText.trim();
        } else if (i.innerText.includes("Sex")) {
            pi["sex"] = i.nextElementSibling.innerText.trim()
        } else if (i.innerText.includes("Age")) {
            pi["age"] = i.nextElementSibling.innerText.trim().split("\n")
        } else if (i.innerText.includes("Height")) {
            height = he.decode(i.nextElementSibling.innerText.trim());
            height = height.replaceAll("<br />", "").replaceAll(" cm", "cm ").split('\n')
            pi["height"] = height
        } else if (i.innerText.includes("Weight")) {
            weight = he.decode(i.nextElementSibling.innerText.trim());
            weight = weight.replaceAll("<br />", "").replaceAll(" kg", "kg ").split('\n');
            pi["weight"] = weight;
        } else if (i.innerText.includes("Affiliation")) {
            pi["affiliation"] = i.nextElementSibling.innerText.trim().split("\n")
        } else if (i.innerText.includes("Status")) {
            pi["status"] = i.nextElementSibling.innerText.trim()
        } else if (i.innerText.includes("Clan")) {
            pi["clan"] = i.nextElementSibling.innerText.trim().split("\n")
        } else if (i.innerText.includes("Team")) {
            pi["team"] = i.nextElementSibling.innerText.trim().split("\n")
        }  else if (i.innerText.includes("Kekkei Genkai")) {
            pi["kekkei genkai"] = i.nextElementSibling.innerText.trim().split("\n")
        }  else if (i.innerText.includes("Ninja Rank")) {
            pi["ninja rank"] = i.nextElementSibling.innerText.trim().split("\n")
        } else if (i.innerText.includes("Nature Type")) {
            pi["nature type"] = i.parentNode.parentNode.querySelectorAll("li").map(el => el.innerText.trim())
            
        }
    })

    return (
        pi
    )
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
            if (text.length != 0) summary += (elements[i].text)
        } else if (elements[i].id == "toc") {
            i = elements.length;
        }
    }
    return summary;
}
/**
 * Parses the HTML string for jutsu used by the user and returns
* jutsu as array of strings.
 * @param {String} data HTML string
 * @returns {Array<String>} jutsu used by the user
 */
const getJutsu = (data) => {
    let jutsu = [];
    let jutsuEls;
    try {
        jutsuEls = parse(data).querySelector(".infobox").querySelectorAll("tbody");
        jutsuEls = jutsuEls.filter(el => el.innerText.includes("Jutsu"));
        jutsuEls = jutsuEls[1].querySelectorAll('li');
        jutsuEls.forEach(el => {
            jutsu.push(el.innerText.trim());
        });
    } catch (e) {
        jutsu.push();
    }
    return jutsu;
}
/**
 * Parses the HTML string for images of the character and returns an array
 * of the images referred to by the img tag's src attribute.
 * @param {String} data HTML string containing images of a character
 * @returns {Array<String>} images parsed from the HTML string
 */
const getCharacterImages = (data) => {
    return [parse(data).querySelectorAll(".imagecell img").map(img => img.attributes.src)];
}
/**
 * Fetches data from the naruto wiki page for the specified
 * character and returns a promise that when resolved contains
 * an object containing information about the character.
 * @param {String} name of Naruto character
 */
const getCharacterInfo = (name) => {
    Characters[name] = { jutsu: [], summary: "", images: [], personalInfo: {} };
    return fetch(`https://naruto.fandom.com/wiki/${name}`)
        .then(res => res.text())
        .then((data) => {
            const summary = getSummary(data);
            const jutsu = getJutsu(data);
            Characters[name]["summary"] = summary.toString();
            Characters[name]["jutsu"] = jutsu;
            Characters[name]["images"] = getCharacterImages(data);
            Characters[name]["personalInfo"] = getPersonalInfo(data);
            return Characters[name];
        })
}

module.exports = { getCharacters, getCharacterInfo }