const LogicData = require("../LogicData")

class LogicMilestone extends LogicData {
    name = null
    type = null
    index = null
    progressStart = null
    progress = null
    league = null
    tier = null
    season = null
    seasonEndRewardKeys = null
    primaryLvlUpRewardType = null
    primaryLvlUpRewardCount = null
    primaryLvlUpRewardExtraData = null
    primaryLvlUpRewardData = null
    secondaryLvlUpRewardType = null
    secondaryLvlUpRewardCount = null
    secondaryLvlUpRewardExtraData = null
    secondaryLvlUpRewardData = null
    dependsOnIndex = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.type = this.getIntValue("Type")
        this.index = this.getIntValue("Index")
        this.progressStart = this.getIntValue("ProgressStart")
        this.progress = this.getIntValue("Progress")
        this.league = this.getIntValue("League")
        this.tier = this.getIntValue("Tier")
        this.season = this.getIntValue("Season")
        this.seasonEndRewardKeys = this.getIntValue("SeasonEndRewardKeys")
        this.primaryLvlUpRewardType = this.getIntValue("PrimaryLvlUpRewardType")
        this.primaryLvlUpRewardCount = this.getIntValue("PrimaryLvlUpRewardCount")
        this.primaryLvlUpRewardExtraData = this.getIntValue("PrimaryLvlUpRewardExtraData")
        this.primaryLvlUpRewardData = this.getStringValue("PrimaryLvlUpRewardData")
        this.secondaryLvlUpRewardType = this.getIntValue("SecondaryLvlUpRewardType")
        this.secondaryLvlUpRewardCount = this.getIntValue("SecondaryLvlUpRewardCount")
        this.secondaryLvlUpRewardExtraData = this.getIntValue("SecondaryLvlUpRewardExtraData")
        this.secondaryLvlUpRewardData = this.getStringValue("SecondaryLvlUpRewardData")
        this.dependsOnIndex = this.getIntValue("DependsOnIndex")
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

module.exports = LogicMilestone