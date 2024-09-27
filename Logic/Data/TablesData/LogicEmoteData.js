const LogicData = require("../LogicData")

class LogicEmoteData extends LogicData {
    name = null
    disabled = null
    fileName = null
    exportName = null
    character = null
    skin = null
    isPicto = null
    battleCategory = null
    rarity = null
    emoteType = null
    lockedForChronos = null
    bundleCode = null
    isDefaultBattleEmote = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.disabled = this.getBoolValue("Disabled")
        this.fileName = this.getStringValue("FileName")
        this.exportName = this.getStringValue("ExportName")
        this.character = this.getStringValue("Character")
        this.skin = this.getStringValue("Skin")
        this.isPicto = this.getBoolValue("IsPicto")
        this.battleCategory = this.getIntValue("BattleCategory")
        this.rarity = this.getIntValue("Rarity")
        this.emoteType = this.getIntValue("EmoteType")
        this.lockedForChronos = this.getBoolValue("LockedForChronos")
        this.bundleCode = this.getIntValue("BundleCode")
        this.isDefaultBattleEmote = this.getBoolValue("IsDefaultBattleEmote")
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

module.exports = LogicEmoteData