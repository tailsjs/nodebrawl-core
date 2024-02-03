require("colors");
const { enableLogs } = require("../config.json");

const PREFIXES = {
    SERVER: buildPrefix("[SERVER]".blue.bold),
    WARN: buildPrefix("[WARNING]".yellow.bold),
    ERROR: buildPrefix("[ERROR]".red.bold),
    FATAL: buildPrefix("[FATAL]".red.bold),
    LOG: buildPrefix("[LOG]".green.bold),
}

const buildPrefix = (mainPrefix) => mainPrefix + " >> ".gray

const log = (text) => {
    if (!enableLogs) return;
    return console.log(text)
}

// Server logs
global.Log = (text) => console.log(PREFIXES.LOG + text.bold)
global.Warn = (text) => console.log(PREFIXES.WARN + text.bold)
global.Err = (text) => console.log(PREFIXES.ERROR + text.bold)
global.ServerLog = (text) => console.log(PREFIXES.SERVER + text.bold)
global.Fatal = (text) => {
    console.error(PREFIXES.FATAL + text.bold)
    return process.exit(1)
}

global.Debug = (text, showTime) => {
    const logLineDetails = ((new Error().stack).split("at ")[2]).trim();

    const file = logLineDetails.split(" ")[1].split("\\").slice(-1)[0].replace(")", "");

    log(buildPrefix(`[${file}]${showTime ? ` (${new Date().toUTCString()})` : ""}`.gray) + text.bold)
}

// Client logs
global.Client = (ip, text) => log(buildPrefix(`[${ip}]`.green.bold) + text.bold)
global.ClientWarn = (ip, text) => log(buildPrefix(`[${ip}]`.yellow.bold) + text.bold)
global.ClientError = (ip, text) => log(buildPrefix(`[${ip}]`.red.bold) + text.bold)