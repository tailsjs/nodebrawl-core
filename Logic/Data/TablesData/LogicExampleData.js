const LogicData = require("../LogicData")

class LogicExampleData extends LogicData {

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()


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

module.exports = LogicExampleData