const LogicData = require("../LogicData")

class LogicAllianceBadgeData extends LogicData {
    name = null
    iconSWF = null
    iconExportName = null
    category = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.iconSWF = this.getStringValue("IconSWF")
        this.iconExportName = this.getStringValue("IconExportName")
        this.category = this.getStringValue("Category")
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

module.exports = LogicAllianceBadgeData