const LogicData = require("../LogicData")

class LogicLinkData extends LogicData {
    name = null
    language = null
    URL = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.language = this.getStringValue("Language")
        this.URL = this.getStringValue("URL")
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

module.exports = LogicLinkData