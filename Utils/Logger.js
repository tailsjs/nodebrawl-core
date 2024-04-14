require("colors");
const util = require("node:util");
const { enableLogs, enableAdminConsole } = require("../config.json");
if (enableAdminConsole) {
    require("./AdminConsole")
}

const buildPrefix = (mainPrefix) => mainPrefix + " >> ".gray

const PREFIXES = {
    SERVER: buildPrefix("[SERVER]".blue.bold),
    WARN: buildPrefix("[WARNING]".yellow.bold),
    ERROR: buildPrefix("[ERROR]".red.bold),
    FATAL: buildPrefix("[FATAL]".red.bold),
    LOG: buildPrefix("[LOG]".green.bold),
}

const log = (...args) => {
    if (!enableLogs) return;
    return logging(...args)
}

const logging = (...args) => {
    if (enableAdminConsole) {
        rl.pause();
        console.log(...args);
        rl.resume();
    } else {
        console.log(...args);
    }
}

const prepareArgs = (...args) => {
    const formattedArgs = args.map(arg => {
        if (typeof arg === 'string') {
            return arg.bold;
        }

        return util.inspect(arg, { colors: true });
    });

    return formattedArgs.join(" ");
};

// Server logs
global.Log = (...args) => logging(PREFIXES.LOG + prepareArgs(...args))
global.Warn = (...args) => logging(PREFIXES.WARN + prepareArgs(...args))
global.Err = (...args) => logging(PREFIXES.ERROR + prepareArgs(...args))
global.ServerLog = (...args) => logging(PREFIXES.SERVER + prepareArgs(...args))
global.Fatal = (...args) => {
    logging(PREFIXES.FATAL + prepareArgs(...args))
    return process.exit(1)
}

global.Debug = (text, showTime) => {
    const logLineDetails = ((new Error().stack).split("at ")[2]).trim();

    let file = logLineDetails.split(" ")[1].split("\\").slice(-1)[0].replace(")", "");

    if (!file.includes(":")) {
        file += ":" + logLineDetails.split(" ").slice(-1)[0].split(":").slice(-2).join(":").replace(")", "");
    }

    logging(buildPrefix(`[${file}]${showTime ? ` (${new Date().toUTCString()})` : ""}`.gray) + text.bold)
}

// Client logs
global.Client = (ip, ...args) => log(buildPrefix(`[${ip}]`.green.bold) + prepareArgs(...args))
global.ClientWarn = (ip, ...args) => log(buildPrefix(`[${ip}]`.yellow.bold) + prepareArgs(...args))
global.ClientError = (ip, ...args) => log(buildPrefix(`[${ip}]`.red.bold) + prepareArgs(...args))