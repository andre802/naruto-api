const Character = require('./Character');
const fetch = require('node-fetch');
const {parse} = require('node-html-parser');
const he = require('he');
let Characters = {};
/**
 * Returns a promise containing names of characters
 * from Naruto.
 * 
 * URL restricted to low limit for testing.
 */
const getCharacters = async () => {
    const url = "https://naruto.fandom.com/wiki/Special:BrowseData/Characters?limit=5&offset=0&_cat=Characters&Media=Manga";
    return await fetch(url)
    .then(res => res.text())
    .then(body => parseCharacterNames(body))
    .then((names) => {
        return {"names": names}
         //getCharacterInfo(names)
    })
    
};
const parseCharacterNames = (body) => {
    return parse(body).querySelector(".smw-columnlist-container").querySelectorAll('li').map(el=> el.innerText.trim());
}
const getPersonalInfo = (body) => {
    let info = parse(body).querySelectorAll("th").filter(el => {
        return (
        el.innerText.includes("Birthdate") || el.innerText.includes("Sex") ||
        el.innerText.includes("Age") || el.innerText.includes("Height") ||
        el.innerText.includes("Weight")
        )
    }).map(el => el.nextElementSibling.innerText.trim());
    let weight = he.decode(info[4]);
    weight = weight.replaceAll("<br />","").replaceAll(" kg", "kg ").split('\n')
    let height = he.decode(info[3]);
    height= height.replaceAll("<br />","").replaceAll(" cm", "cm ").split('\n')

    return ({
        "birthday": info[0],
        "sex": info[1],
        "age": he.decode(info[2]).split('\n'),
        "height": height,
        "weight": weight
    })
}
const getSummary = (data) => {
    let summary = "";
    const root = parse(data);
    let elements = root.querySelectorAll(".mw-parser-output *");
    for (let i = 0; i < elements.length; i++) {
        if(elements[i].rawTagName == "p") {
            let text = elements[i].innerText.trim();
            if (text.length != 0) summary += (elements[i].text)
        } else if (elements[i].id == "toc") {
            i = elements.length;
        }
    }
    return summary;
}
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
    } catch(e) {
        jutsu.push();
    }
    return jutsu;
}
const getCharacterImages = (data) => { 
    return [parse(data).querySelectorAll(".imagecell img").map(img => img.attributes.src)];
}
 const getCharacterInfo = (name) => {
    Characters[name] = {jutsu: [], summary: "", images: [], personalInfo: {}};
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

module.exports = {getCharacters, getCharacterInfo}