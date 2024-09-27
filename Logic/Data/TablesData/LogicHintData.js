const LogicData = require("../LogicData")

class LogicHintData extends LogicData {
    name = null
    TID = null
    minXPLevel = null
    maxXPLevel = null
    fileName = null
    exportName = null
    character = null
    referringSCID = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.TID = this.getStringValue("TID")
        this.minXPLevel = this.getIntValue("MinXPLevel")
        this.maxXPLevel = this.getIntValue("MaxXPLevel")
        this.fileName = this.getStringValue("FileName")
        this.exportName = this.getStringValue("ExportName")
        this.character = this.getStringValue("Character")
        this.referringSCID = this.getBoolValue("ReferringSCID")
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

module.exports = LogicHintData