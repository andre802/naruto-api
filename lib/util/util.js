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
/**
 * Replaces all instances of the passed in search
 * with replacement in the passed string.
 * @param {String} string to replace instances in 
 * @param {String} search instances to replace
 * @param {String} replacement the string that replaces the instances
 * of search
 * @returns {String} with all instances of search replaced with replacement
 */
const replaceAll = (string, search, replacement) => {
    return string.split(search).join(replacement);
}
/**
 * Decodes the passed in string and returns the decoded
 * version.
 * @param {String} string potentially with encoded characters
 * @returns {String} decoded String
 */
const decode = (string) => {
    
    if(string.includes("&#039;")) {
         string = replaceAll(string, "&#039;", "'")
    } else if (string.includes("&#44;")) {
        string = replaceAll(string, "&#44;", ',')
    }
    return string;
}
module.exports = {getAttributeList, replaceAll, decode}