/*
** This is example of how to use CSVParser.
** You can do it with any CSV file. For example, "skins.csv"
*/

const parse = require("./CSVParser")
const data = parse("../../GameAssets/csv_logic/characters.csv")

/**
 * Get character default skin name by ID
 * @param { Number } id Brawler ID
 * @returns { String } Character default skin name
 */
function getDefSkinById(id){
    return data[id].DefaultSkin
}

/**
 * Get character codename by ID
 * @param { Number } id Brawler ID
 * @returns { String } Character codename
 */
function getCodenameById(id){
    return data[id].Name
}

module.exports = {
    getDefSkinById,
    getCodenameById
}