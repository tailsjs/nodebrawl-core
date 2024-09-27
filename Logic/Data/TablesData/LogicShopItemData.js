const LogicData = require("../LogicData")

class LogicShopItemData extends LogicData {
    name = null
    offerType = null
    iconFrameNumber = null
    maxResourcePerFrame = null
    fileName = null
    shopItemAsset = null
    popupItemAsset = null
    shopItemBg = null
    miniOfferAsset = null
    separatedSectionOfferAsset = null
    separatedSectionTeaseAsset = null
    seasonalEventOfferAsset = null
    legendaryOfferAsset = null
    confirmItemAsset = null
    confirmItemBg = null
    offerAssetSmall = null
    offerAssetLarge = null
    offerAssetVerySmall = null
    offerAssetRankProfile = null
    offerAssetRankLarge = null
    brawlPassAssetPaid = null
    brawlPassAssetFree = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () { // TODO: number/string arrays fill arrays
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.offerType = this.getIntValue("OfferType")
        this.iconFrameNumber = this.getIntValue("IconFrameNumber")
        this.maxResourcePerFrame = this.getIntValue("MaxResourcePerFrame")
        this.fileName = this.getStringValue("FileName")
        this.shopItemAsset = this.getStringValue("ShopItemAsset")
        this.popupItemAsset = this.getStringValue("PopupItemAsset")
        this.shopItemBg = this.getStringValue("ShopItemBg")
        this.miniOfferAsset = this.getStringValue("MiniOfferAsset")
        this.separatedSectionOfferAsset = this.getStringValue("SeparatedSectionOfferAsset")
        this.separatedSectionTeaseAsset = this.getStringValue("SeparatedSectionTeaseAsset")
        this.seasonalEventOfferAsset = this.getStringValue("SeasonalEventOfferAsset")
        this.legendaryOfferAsset = this.getStringValue("LegendaryOfferAsset")
        this.confirmItemAsset = this.getStringValue("ConfirmItemAsset")
        this.confirmItemBg = this.getStringValue("ConfirmItemBg")
        this.offerAssetSmall = this.getStringValue("OfferAssetSmall")
        this.offerAssetLarge = this.getStringValue("OfferAssetLarge")
        this.offerAssetVerySmall = this.getStringValue("OfferAssetVerySmall")
        this.offerAssetRankProfile = this.getStringValue("OfferAssetRankProfile")
        this.offerAssetRankLarge = this.getStringValue("OfferAssetRankLarge")
        this.brawlPassAssetPaid = this.getStringValue("BrawlPassAssetPaid")
        this.brawlPassAssetFree = this.getStringValue("BrawlPassAssetFree")
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

module.exports = LogicShopItemData