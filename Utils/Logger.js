require("colors");
const util = require("node:util");
const fs = require("node:fs");
const LogicConfig = require("../Logic/Server/LogicConfig");
const { logger } = LogicConfig
if (logger.enableAdminConsole) {
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

const logging = (...args) => {
    if (logger.enableAdminConsole) {
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

const disassembleColors = (text) => text.replace(/\x1b\[(\d+)(;\d+)*m/g, '')

const buildFile = (file) => logger.save.path + file

const buildClientLogs = (prefix, ...args) => {
    if (!logger.enableClientLogs) return;

    if (logger.save.enabled) {
        const savePath = buildFile("client-logs.txt");

        fs.appendFileSync(savePath, disassembleColors(prefix + prepareArgs(...args)) + "\n");
    }

    logging(prefix + prepareArgs(...args))
}

const buildServerLogs = (prefix, ...args) => {
    if (!logger.enableServerLogs) return;

    if (logger.save.enabled) {
        const savePath = buildFile("server-logs.txt");

        fs.appendFileSync(savePath, disassembleColors(prefix + prepareArgs(...args)) + "\n");
    }

    logging(prefix + prepareArgs(...args))
}

// Server logs
global.Log = (...args) => buildServerLogs(PREFIXES.LOG, prepareArgs(...args))
global.Warn = (...args) => buildServerLogs(PREFIXES.WARN, prepareArgs(...args))
global.Err = (...args) => buildServerLogs(PREFIXES.ERROR, prepareArgs(...args))
global.ServerLog = (...args) => buildServerLogs(PREFIXES.SERVER, prepareArgs(...args))
global.Fatal = (...args) => {
    buildServerLogs(PREFIXES.FATAL, prepareArgs(...args))
    return process.exit(1)
}

global.Debug = (...args) => {
    const logLineDetails = ((new Error().stack).split("at ")[2]).trim();

    let file = logLineDetails.split(" ")[1].split("\\").slice(-1)[0].replace(")", "");

    if (!file.includes(":")) {
        file += ":" + logLineDetails.split(" ").slice(-1)[0].split(":").slice(-2).join(":").replace(")", "");
    }

    buildServerLogs(buildPrefix(`[${file}] (${new Date().toUTCString()})`.gray), prepareArgs(...args))
}

// Client logs
global.Client = (ip, ...args) => buildClientLogs(buildPrefix(`[${ip}]`.green.bold), prepareArgs(...args))
global.ClientWarn = (ip, ...args) => buildClientLogs(buildPrefix(`[${ip}]`.yellow.bold), prepareArgs(...args))
global.ClientError = (ip, ...args) => buildClientLogs(buildPrefix(`[${ip}]`.red.bold), prepareArgs(...args))