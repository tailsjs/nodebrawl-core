const LogicDataTable = require("../LogicDataTable")
const LogicDataTables = require("../LogicDataTables")

class LogicGlobals extends LogicDataTable {
    allianceCreateResource = null
    allianceCreateCost = null

    startingDiamonds = null

    maxMessageLength = null
    maxAllianceMailLength = null

    speedUpDiamondCost1Min = null
    speedUpDiamondCost1Hour = null
    speedUpDiamondCost24Hours = null
    speedUpDiamondCost1Week = null
    speedUpFreeSeconds = null

    resourceDiamondCost1 = null
    resourceDiamondCost10 = null
    resourceDiamondCost100 = null
    resourceDiamondCost1000 = null
    resourceDiamondCost10000 = null
    resourceDiamondCost100000 = null
    resourceDiamondCost1000000 = null
    resourceDiamondCost10000000 = null

    allianceScoreContributionPercentage = []

    startingGold = null

    battlePingSampleSeconds = null
    allianceUnlockExpLevel = null
    afkTimerSeconds = null

    bossDamagePercentIncrease = null
    bossPetDamagePercentIncrease = null
    bossHealthIncreaseFixed = null
    bossHealthIncreasePercent = null
    bossSpeedIncrease = null
    bossReloadTimeDiv = null
    bossPetHealthIncreasePercent = null
    bossUltiChargeMul = null
    bossUltiChargeDiv = null
    bossHealMul = null
    bossHealDiv = null

    coopUltiChargeMul = null
    coopUltiChargeDiv = null

    maxCorpsesPerTeam = null
    useMask = null
    displayJoystickArea = null
    
    visibilityX = null
    visibilityUp = null
    visibilityDown = null
    visibilityHorizontalMargin = null
    visibilityVerticalMargin1 = null
    visibilityVerticalMargin2 = null

    startingHeroLvlUpMaterial = null
    transformFreeBoxToAdBox = null
    vampiresHealMul = null
    vampiresHealDiv = null
    emoteCooldownTicks = null
    emoteCooldownTicksMatchEnd = null
    chinaBoxLimit = null
    offlineRaidDifficulty = null

    deviceLinkCodeLength = null
    deviceLinkCodeValidSeconds = null

    constructor (table, index) {
        super(table, index)
    }

    createReferences () {
        super.createReferences()

        this.allianceCreateResource = this.getValue("ALLIANCE_CREATE_RESOURCE")
        this.allianceCreateCost = this.getIntegerValue("ALLIANCE_CREATE_COST")

        this.startingDiamonds = this.getIntegerValue("STARTING_DIAMONDS")
        this.maxMessageLength = this.getIntegerValue("MAX_MESSAGE_LENGTH")
        this.maxAllianceMailLength = this.getIntegerValue("MAX_ALLIANCE_MAIL_LENGTH")
        this.speedUpDiamondCost1Min = this.getIntegerValue("SPEED_UP_DIAMOND_COST_1_MIN")
        this.speedUpDiamondCost1Hour = this.getIntegerValue("SPEED_UP_DIAMOND_COST_1_HOUR")
        this.speedUpDiamondCost24Hours = this.getIntegerValue("SPEED_UP_DIAMOND_COST_24_HOURS")
        this.speedUpDiamondCost1Week = this.getIntegerValue("SPEED_UP_DIAMOND_COST_1_WEEK")
        this.speedUpFreeSeconds = this.getIntegerValue("SPEED_UP_FREE_SECONDS")

        this.resourceDiamondCost1 = this.getIntegerValue("RESOURCE_DIAMOND_COST_1")
        this.resourceDiamondCost10 = this.getIntegerValue("RESOURCE_DIAMOND_COST_10")
        this.resourceDiamondCost100 = this.getIntegerValue("RESOURCE_DIAMOND_COST_100")
        this.resourceDiamondCost1000 = this.getIntegerValue("RESOURCE_DIAMOND_COST_1000")
        this.resourceDiamondCost10000 = this.getIntegerValue("RESOURCE_DIAMOND_COST_10000")
        this.resourceDiamondCost100000 = this.getIntegerValue("RESOURCE_DIAMOND_COST_100000")
        this.resourceDiamondCost1000000 = this.getIntegerValue("RESOURCE_DIAMOND_COST_1000000")
        this.resourceDiamondCost10000000 = this.getIntegerValue("RESOURCE_DIAMOND_COST_10000000")

        const allianceScoreContributionPercentage = this.getGlobalData("ALLIANCE_SCORE_CONTRIBUTION_PERCENTAGE")

        for (let i = 0; i < allianceScoreContributionPercentage.getNumberArraySize(); i++) {
            this.allianceScoreContributionPercentage[i] = allianceScoreContributionPercentage.getNumberArray(i)
        }

        this.startingGold = this.getIntegerValue("STARTING_GOLD")
        this.battlePingSampleSeconds = this.getIntegerValue("BATTLE_PING_SAMPLE_SECONDS")
        this.allianceUnlockExpLevel = this.getIntegerValue("ALLIANCE_UNLOCK_EXP_LEVEL")
        this.afkTimerSeconds = this.getIntegerValue("AFK_TIMER_SECONDS")
        this.bossDamagePercentIncrease = this.getIntegerValue("BOSS_DAMAGE_PERCENT_INCREASE")
        this.bossPetDamagePercentIncrease = this.getIntegerValue("BOSS_PET_DAMAGE_PERCENT_INCREASE")
        this.bossHealthIncreaseFixed = this.getIntegerValue("BOSS_HEALTH_INCREASE_FIXED")
        this.bossHealthIncreasePercent = this.getIntegerValue("BOSS_HEALTH_INCREASE_PERCENT")
        this.bossSpeedIncrease = this.getIntegerValue("BOSS_SPEED_INCREASE")
        this.bossReloadTimeDiv = this.getIntegerValue("BOSS_RELOAD_TIME_DIV")
        this.bossPetHealthIncreasePercent = this.getIntegerValue("BOSS_PET_HEALTH_INCREASE_PERCENT")
        this.bossUltiChargeMul = this.getIntegerValue("BOSS_ULTI_CHARGE_MUL")
        this.bossUltiChargeDiv = this.getIntegerValue("BOSS_ULTI_CHARGE_DIV")
        this.bossHealMul = this.getIntegerValue("BOSS_HEAL_MUL")
        this.bossHealDiv = this.getIntegerValue("BOSS_HEAL_DIV")

        this.coopUltiChargeMul = this.getIntegerValue("COOP_ULTI_CHARGE_MUL")
        this.coopUltiChargeDiv = this.getIntegerValue("COOP_ULTI_CHARGE_DIV")

        this.maxCorpsesPerTeam = this.getIntegerValue("MAX_CORPSES_PER_TEAM")

        this.useMask = this.getBooleanValue("USE_MASK")
        this.displayJoystickArea = this.getBooleanValue("DISPLAY_JOYSTICK_AREA")
        this.visibilityX = this.getIntegerValue("VISIBILITY_X")
        this.visibilityUp = this.getIntegerValue("VISIBILITY_UP")
        this.visibilityDown = this.getIntegerValue("VISIBILITY_DOWN")
        this.visibilityHorizontalMargin = this.getIntegerValue("VISIBILITY_HORIZONTAL_MARGIN")
        this.visibilityVerticalMargin1 = this.getIntegerValue("VISIBILITY_VERTICAL_MARGIN_1")
        this.visibilityVerticalMargin2 = this.getIntegerValue("VISIBILITY_VERTICAL_MARGIN_2")
        this.startingHeroLvlUpMaterial = this.getIntegerValue("STARTING_HERO_LVL_UP_MATERIAL")
        this.transformFreeBoxToAdBox = this.getBooleanValue("TRANSFORM_FREE_BOX_TO_AD_BOX")
        this.vampiresHealMul = this.getIntegerValue("VAMPIRES_HEAL_MUL")
        this.vampiresHealDiv = this.getIntegerValue("VAMPIRES_HEAL_DIV")
        this.emoteCooldownTicks = this.getIntegerValue("EMOTE_COOLDOWN_TICKS")
        this.emoteCooldownTicksMatchEnd = this.getIntegerValue("EMOTE_COOLDOWN_TICKS_MATCH_END")
        this.chinaBoxLimit = this.getIntegerValue("CHINA_BOX_LIMIT")
        this.offlineRaidDifficulty = this.getIntegerValue("OFFLINE_RAID_DIFFICULTY")
        this.deviceLinkCodeLength = this.getIntegerValue("DEVICE_LINK_CODE_LENGTH")
        this.deviceLinkCodeValidSeconds = this.getIntegerValue("DEVICE_LINK_CODE_VALID_SECONDS")
    }

    getGlobalData (name) {
        return LogicDataTables.getGlobalByName(name)
    }

    getValue (name) {
        return this.getGlobalData(name).getTextValue()
    }

    getIntegerValue (name) {
        return this.getGlobalData(name).getNumberValue()
    }

    getBooleanValue (name) {
        return this.getGlobalData(name).getBooleanValue()
    }

    getNumberArray (name) {
        return this.getGlobalData(name).getNumberArray()
    }
}

module.exports = LogicGlobals