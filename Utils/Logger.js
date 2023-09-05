require("colors");
const PREFIXES = {
    SERVER: buildPrefix("[SERVER]".blue.bold),
    WARN: buildPrefix("[WARNING]".yellow.bold),
    ERROR: buildPrefix("[ERROR]".red.bold)
}

global.Log = function(text) {
    return console.log(PREFIXES.SERVER + text.bold)
}

global.Warn = function(text) {
    return console.warn(PREFIXES.WARN + text.bold)
}

global.Err = function(text){
    return console.error(PREFIXES.ERROR + text.bold)
}

global.Client = function(ip, text){
    return console.log(buildPrefix(`[${ip}]`.green.bold) + text.bold)
}

global.ClientError = function(ip, text){
    return console.error(buildPrefix(`[${ip}]`.red.bold) + text.bold)
}

function buildPrefix(mainPrefix) {
    return mainPrefix + " >> ".gray 
}