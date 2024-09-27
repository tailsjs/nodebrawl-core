const LogicData = require("../LogicData")

class LogicSkinData extends LogicData {
    name = null
    conf = null
    campaign = null
    obtainType = null
    obtainTypeCN = null
    petSkin = null
    petSkin2 = null
    costLegendaryTrophies = null
    costGems = null
    costCoins = null
    TID = null
    shopTID = null
    features = null
    communityCredit = null
    materialsFile = null
    blueTexture = null
    redTexture = null
    blueSpecular = null
    redSpecular = null
    outlineShader = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.conf = this.getStringValue("Conf")
        this.campaign = this.getIntValue("Campaign")
        this.obtainType = this.getIntValue("ObtainType")
        this.obtainTypeCN = this.getIntValue("ObtainTypeCN")
        this.petSkin = this.getStringValue("PetSkin")
        this.petSkin2 = this.getStringValue("PetSkin2")
        this.costLegendaryTrophies = this.getIntValue("CostLegendaryTrophies")
        this.costGems = this.getIntValue("CostGems")
        this.costCoins = this.getIntValue("CostCoins")
        this.TID = this.getStringValue("TID")
        this.shopTID = this.getStringValue("ShopTID")
        this.features = this.getStringValue("Features")
        this.communityCredit = this.getStringValue("CommunityCredit")
        this.materialsFile = this.getStringValue("MaterialsFile")
        this.blueTexture = this.getStringValue("BlueTexture")
        this.redTexture = this.getStringValue("RedTexture")
        this.blueSpecular = this.getStringValue("BlueSpecular")
        this.redSpecular = this.getStringValue("RedSpecular")
        this.outlineShader = this.getStringValue("OutlineShader")
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

module.exports = LogicSkinData