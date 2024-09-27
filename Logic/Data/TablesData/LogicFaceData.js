const LogicData = require("../LogicData")

class LogicFaceData extends LogicData {
    name = null
    fileName = null
    exportName = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.fileName = this.getStringValue("FileName")
        this.exportName = this.getStringValue("ExportName")
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

module.exports = LogicFaceData