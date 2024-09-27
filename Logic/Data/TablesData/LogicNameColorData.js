const LogicData = require("../LogicData")

class LogicNameColorData extends LogicData {
    name = null
    colorCode = null
    gradient = null
    requiredExpLevel = null
    requiredTotalTrophies = null
    requiredSeasonPoints = null
    requiredHero = null
    sortOrder = null
    colorGradient = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.colorCode = this.getStringValue("ColorCode")
        this.gradient = this.getStringValue("Gradient")
        this.requiredExpLevel = this.getIntValue("RequiredExpLevel")
        this.requiredTotalTrophies = this.getIntValue("RequiredTotalTrophies")
        this.requiredSeasonPoints = this.getIntValue("RequiredSeasonPoints")
        this.requiredHero = this.getStringValue("RequiredHero")
        this.sortOrder = this.getIntValue("SortOrder")
        this.colorGradient = this.getStringValue("ColorGradient")
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

module.exports = LogicNameColorData