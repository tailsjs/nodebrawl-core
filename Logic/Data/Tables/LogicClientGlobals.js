const LogicDataTable = require("../LogicDataTable")
const LogicDataTables = require("../LogicDataTables")

class LogicClientGlobals extends LogicDataTable {
    // later

    constructor (table, index) {
        super(table, index)
    }

    createReferences () {
        super.createReferences()
    }

    getGlobalData (name) {
        return LogicDataTables.getClientGlobalByName(name)
    }

    getValue (name) {
        return this.getGlobalData(name).getTextValue()
    }

    getIntegerValue (name) {
        return this.getGlobalData(name).getNumberValue()
    }

    getBooleanValue (name) {
        return this.getGlobalData(name).getBooleanValue()
    }

    getNumberArray (name) {
        return this.getGlobalData(name).getNumberArray()
    }
}

module.exports = LogicClientGlobals