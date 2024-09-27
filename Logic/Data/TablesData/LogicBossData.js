const LogicData = require("../LogicData")

class LogicBossData extends LogicData {
    name = null
    TID = null
    playerCount = null
    requiredCampaignProgressToUnlock = null
    location = null
    allowedHeroes = null
    reward = null
    levelGenerationSeed = null
    map = null
    boss = null
    bossLevel = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.TID = this.getStringValue("TID")
        this.playerCount = this.getIntValue("PlayerCount")
        this.requiredCampaignProgressToUnlock = this.getIntValue("RequiredCampaignProgressToUnlock")
        this.location = this.getStringValue("Location")
        this.allowedHeroes = this.getStringValue("AllowedHeroes")
        this.reward = this.getStringValue("Reward")
        this.levelGenerationSeed = this.getIntValue("LevelGenerationSeed")
        this.map = this.getStringValue("Map")
        this.boss = this.getStringValue("Boss")
        this.bossLevel = this.getIntValue("BossLevel")
    }

    getStringValue (name) {
        return this.getValue(name, 0)
    }

    getIntValue (name) {
        return this.getIntegerValue(name, 0)
    }

    getBoolValue (name) {
        return this.getBooleanValue(name, 0)
    }
}

module.exports = LogicBossData