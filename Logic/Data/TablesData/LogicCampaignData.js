const LogicData = require("../LogicData")

class LogicCampaignData extends LogicData {
    name = null
    TID = null
    location = null
    allowedHeroes = null
    reward = null
    levelGenerationSeed = null
    map = null
    enemies = null
    enemyLevel = null
    boss = null
    bossLevel = null
    base = null
    numBases = null
    baseLevel = null
    tower = null
    numTowers = null
    towerLevel = null
    requiredStars = null


    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.TID = this.getStringValue("TID")
        this.location = this.getStringValue("Location")
        this.allowedHeroes = this.getStringValue("AllowedHeroes")
        this.reward = this.getStringValue("Reward")
        this.levelGenerationSeed = this.getIntValue("LevelGenerationSeed")
        this.map = this.getStringValue("Map")
        this.enemies = this.getStringValue("Enemies")
        this.enemyLevel = this.getIntValue("EnemyLevel")
        this.boss = this.getStringValue("Boss")
        this.bossLevel = this.getIntValue("BossLevel")
        this.base = this.getStringValue("Base")
        this.numBases = this.getIntValue("NumBases")
        this.baseLevel = this.getIntValue("BaseLevel")
        this.tower = this.getStringValue("Tower")
        this.numTowers = this.getIntValue("NumTowers")
        this.towerLevel = this.getIntValue("TowerLevel")
        this.requiredStars = this.getIntValue("RequiredStars")
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

module.exports = LogicCampaignData