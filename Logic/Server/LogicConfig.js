const LogicVersion = require("../LogicVersion")

class LogicConfig {
    static port = 9339
    static serverName = "Server"
    static disableQueuebugtxtFile = true
    static patcher = {
        enabled: true,
        uri: "http://127.0.0.1",
        port: 3000
    }
    
    static queue = {
        maxSize: 1024,
        disconnectSessionOnOverfilling: true,
        enableOverfillingWarning: true
    }

    static session = {
        timeoutSeconds: 15,
        maxConnections: 100,
        maxConnectionsPerIP: 10
    }

    static logger = {
        enableServerLogs: true,
        enableClientLogs: true,
        enableAdminConsole: true,
        save: {
            enabled: true,
            path: "./logs/"
        }
    }

    static crypto = {
        activate: false,
        type: 0,
        rc4: {
            key: "fhsd6f86f67rt8fw78fw789we78r9789wer6re",
            nonce: "nonce"
        },
        pepper: {
            client_secret_key: "8434902B6A7D834C222FBEE06BE5950194B70D1B9F2DF140B4A36460900E032E",
            server_public_key: "E230E00906463A4B041FD2F9B1D07B4910595EB60EEBF222C438D7A6B2094348"
        }
    }

    static loadConfig () {
        const config = require("../../config." + LogicVersion.getServerEnv() + ".json")

        for (const configVar in config) {
            this[configVar] = config[configVar]
        }
    }
}

module.exports = LogicConfig