const LogicData = require("../LogicData")

class LogicCardData extends LogicData {
    name = null
    iconSWF = null
    iconExportName = null
    target = null
    lockedForChronos = null
    dynamicRarityStartSeason = null
    metaType = null
    requiresCard = null
    type = null
    skill = null
    value = null
    value2 = null
    value3 = null
    rarity = null
    TID = null
    powerNumberTID = null
    powerNumber2TID = null
    powerNumber3TID = null
    powerIcon1ExportName = null
    powerIcon2ExportName = null
    sortOrder = null
    dontUpgradeStat = null
    hideDamageStat = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.iconSWF = this.getStringValue("IconSWF")
        this.iconExportName = this.getStringValue("IconExportName")
        this.target = this.getStringValue("Target")
        this.dynamicRarityStartSeason = this.getIntValue("DynamicRarityStartSeason")
        this.metaType = this.getIntValue("MetaType")
        this.requiresCard = this.getStringValue("RequiresCard")
        this.type = this.getStringValue("Type")
        this.skill = this.getStringValue("Skill")
        this.value = this.getIntValue("Value")
        this.value2 = this.getIntValue("Value2")
        this.value3 = this.getIntValue("Value3")
        this.rarity = this.getStringValue("Rarity")
        this.TID = this.getStringValue("TID")
        this.powerNumberTID = this.getStringValue("PowerNumberTID")
        this.powerNumber2TID = this.getStringValue("PowerNumber2TID")
        this.powerNumber3TID = this.getStringValue("PowerNumber3TID")
        this.powerIcon1ExportName = this.getStringValue("PowerIcon1ExportName")
        this.powerIcon2ExportName = this.getStringValue("PowerIcon2ExportName")
        this.sortOrder = this.getIntValue("SortOrder")
        this.dontUpgradeStat = this.getBoolValue("DontUpgradeStat")
        this.hideDamageStat = this.getBoolValue("HideDamageStat")
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

module.exports = LogicCardData