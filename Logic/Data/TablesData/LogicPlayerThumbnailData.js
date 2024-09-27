const LogicData = require("../LogicData")

class LogicPlayerThumbnailData extends LogicData {
    name = null
    requiredExpLevel = null
    requiredTotalTrophies = null
    requiredSeasonPoints = null
    requiredHero = null
    iconSWF = null
    iconExportName = null
    sortOrder = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.requiredExpLevel = this.getIntValue("RequiredExpLevel")
        this.requiredTotalTrophies = this.getIntValue("RequiredTotalTrophies")
        this.requiredSeasonPoints = this.getIntValue("RequiredSeasonPoints")
        this.requiredHero = this.getStringValue("RequiredHero")
        this.iconSWF = this.getStringValue("IconSWF")
        this.iconExportName = this.getStringValue("IconExportName")
        this.sortOrder = this.getIntValue("SortOrder")
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

module.exports = LogicPlayerThumbnailData