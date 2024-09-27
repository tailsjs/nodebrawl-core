const LogicData = require('../LogicData')

class LogicResourceData extends LogicData {
    name = null
    TID = null
    iconSWF = null
    collectEffect = null
    iconExportName = null
    type = null
    rarity = null
    premiumCurrency = null
    textRed = null
    textGreen = null
    textBlue = null
    cap = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.TID = this.getStringValue("TID")
        this.iconSWF = this.getStringValue("IconSWF")
        this.collectEffect = this.getStringValue("CollectEffect")
        this.iconExportName = this.getStringValue("IconExportName")
        this.type = this.getStringValue("Type")
        this.rarity = this.getStringValue("Rarity")
        this.premiumCurrency = this.getBoolValue("PremiumCurrency")
        this.textRed = this.getIntValue("TextRed")
        this.textGreen = this.getIntValue("TextGreen")
        this.textBlue = this.getIntValue("TextBlue")
        this.cap = this.getIntValue("Cap")
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

module.exports = LogicResourceData