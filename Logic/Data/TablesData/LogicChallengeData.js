const LogicData = require("../LogicData")

class LogicChallengeData extends LogicData {
    name = null
    challengeId = null
    fileName = null
    locale = []
    logoAsset = []
    homeScreenLogo = null
    eventAsset = null
    bannerSWF = null
    eventBanner = null
    rewardItem = null
    rewardUnlockedItem = null
    headerFrame = null
    tID = null
    stageTID = null
    rewardTID = null
    completedTID = null
    rewardPopupTID = null
    battleEndHeaderTID = null
    battleEndWinLabelTID = null
    battleEndWinTID = null
    startNotification = null
    reminderNotification = null
    teaserTitleTID = null
    teaserInfoTID = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.challengeId = this.getIntValue("ChallengeId")
        this.fileName = this.getStringValue("FileName")
        
        const arraySize = this.row.getBiggestArraySize() 
        
        for (let i = 0; i < arraySize; i++) {
            this.locale.push(this.getStringArrayValue("Locale", i))
            this.logoAsset.push(this.getStringArrayValue("LogoAsset", i))
        }
        
        this.eventAsset = this.getStringValue("EventAsset")
        this.bannerSWF = this.getStringValue("BannerSWF")
        this.eventBanner = this.getStringValue("EventBanner")
        this.rewardItem = this.getStringValue("RewardItem")
        this.rewardUnlockedItem = this.getStringValue("RewardUnlockedItem")
        this.headerFrame = this.getStringValue("HeaderFrame")
        this.TID = this.getStringValue("TID")
        this.stageTID = this.getStringValue("StageTID")
        this.rewardTID = this.getStringValue("RewardTID")
        this.completedTID = this.getStringValue("CompletedTID")
        this.rewardPopupTID = this.getStringValue("RewardPopupTID")
        this.battleEndHeaderTID = this.getStringValue("BattleEndHeaderTID")
        this.battleEndWinLabelTID = this.getStringValue("BattleEndWinLabelTID")
        this.battleEndWinTID = this.getStringValue("BattleEndWinTID")
        this.startNotification = this.getStringValue("StartNotification")
        this.reminderNotification = this.getStringValue("ReminderNotification")
        this.teaserTitleTID = this.getStringValue("TeaserTitleTID")
        this.teaserInfoTID = this.getStringValue("TeaserInfoTID")
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

    getStringArrayValue (name, index) {
        return this.getValue(name, index)
    }
}

module.exports = LogicChallengeData