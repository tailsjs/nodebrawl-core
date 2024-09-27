const LogicData = require('../LogicData')

class LogicBillingPackagesData extends LogicData {
    name = null
    TID = null
    type = null
    typeCN = null
    disabled = null
    existsApple = null
    existsAndroid = null
    existsCN = null
    disabledCN = null
    existsAppleCN = null
    existsAndroidCN = null
    diamonds = null
    USD = null
    order = null
    RMB = null
    tencentID = null
    iconExportName = null
    frameNumber = null
    starterPackNumber = null
    bigBoxCount = null
    xpLevelReq = null
    valueFactor = null
    labelTID = null
    labelValue = null
    bg = null
    decor = null
    isPromotion = null
    coins = null
    refundGemValue = null
    brawlPassSeason = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () { 
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.TID = this.getStringValue("TID")
        this.type = this.getIntValue("Type")
        this.typeCN = this.getIntValue("TypeCN")
        this.disabled = this.getBoolValue("Disabled")
        this.existsApple = this.getBoolValue("ExistsApple")
        this.existsAndroid = this.getBoolValue("ExistsAndroid")
        this.existsCN = this.getBoolValue("ExistsCN")
        this.disabledCN = this.getBoolValue("DisabledCN")
        this.existsAppleCN = this.getBoolValue("ExistsAppleCN")
        this.existsAndroidCN = this.getBoolValue("ExistsAndroidCN")
        this.USD = this.getIntValue("USD")
        this.order = this.getIntValue("Order")
        this.RMB = this.getIntValue("RMB")
        this.tencentID = this.getStringValue("TencentID")
        this.iconExportName = this.getStringValue("IconExportName")
        this.frameNumber = this.getIntValue("FrameNumber")
        this.starterPackNumber = this.getIntValue("StarterPackNumber")
        this.bigBoxCount = this.getIntValue("BigBoxCount")
        this.xpLevelReq = this.getIntValue("XpLevelReq")
        this.valueFactor = this.getIntValue("ValueFactor")
        this.labelTID = this.getStringValue("LabelTID")
        this.labelValue = this.getIntValue("LabelValue")
        this.bg = this.getIntValue("Bg")
        this.decor = this.getIntValue("Decor")
        this.isPromotion = this.getBoolValue("IsPromotion")
        this.coins = this.getIntValue("Coins")
        this.refundGemValue = this.getIntValue("RefundGemValue")
        this.brawlPassSeason = this.getIntValue("BrawlPassSeason")
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

module.exports = LogicBillingPackagesData