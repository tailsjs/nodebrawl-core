const SERVER_ENV_ENUM = require("../Titan/Enums/ServerEnv")

class LogicVersion {
    static major = 29
    static minor = 258
    static build = 1

    static environment = SERVER_ENV_ENUM.DEV

    static getVersionString () {
        return `${LogicVersion.major}.${LogicVersion.minor}.${LogicVersion.build}`
    }

    static getServerEnv () {
        return LogicVersion.isProd() ? "prod" : 
            LogicVersion.isStage() ? "stage" :
            LogicVersion.isIntegration() ? "integration" : 
            LogicVersion.isDev() ? "dev" : 
            "unknown"
    }

    static isProd = () => this.environment === SERVER_ENV_ENUM.PROD
    static isStage = () => this.environment === SERVER_ENV_ENUM.STAGE
    static isIntegration = () => this.environment === SERVER_ENV_ENUM.INTEGRATION
    static isDev = () => this.environment === SERVER_ENV_ENUM.DEV
}

module.exports = LogicVersion