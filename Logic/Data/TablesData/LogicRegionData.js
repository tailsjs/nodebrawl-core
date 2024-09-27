const LogicData = require('../LogicData')

class LogicRegionData extends LogicData {
    name = null
    TID = null
    displayName = null
    isCountry = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences() {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.TID = this.getStringValue("TID")
        this.displayName = this.getStringValue("DisplayName")
        this.isCountry = this.getBoolValue("IsCountry")
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

module.exports = LogicRegionData