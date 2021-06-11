const {parse} = require('node-html-parser');
/**
 * Parses the passed HTML string for the values
 * described by the passed attribute and returns
 * an array of those values.
 * @param {String} data HTML String
 * @param {String} attribute describing which values
 * to parse
 * @returns {Array<String>} containing the values described
 * by the attribute, if any. 
 */
const getAttributeList = (data, attribute) => {
    let th = parse(data).querySelectorAll("th").filter(el => el.innerText.includes(attribute))[0];
    if (th) {
        let lis =th.parentNode.parentNode.querySelectorAll("li");
        return lis.map(li => li.innerText.trim());
    }
    return  [];
}

const replaceAll = (string, search, replacement) => {
    return string.split(search).join(replacement);
}

const decode = (string) => {
    
    if(string.includes("&#039;")) {
         string = replaceAll(string, "&#039;", "'")
    } else if (string.includes("&#44;")) {
        string = replaceAll(string, "&#44;", ',')
    }
    return string;
}
module.exports = {getAttributeList, replaceAll, decode}