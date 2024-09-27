const LogicData = require("../LogicData")

class LogicColorGradientData extends LogicData {
    name = null
    colors = []
    speed = null
    scale = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")

        const arraySize = this.row.getBiggestArraySize()

        for (let i = 0; i < arraySize; i++) {
            this.colors.push(this.getStringArrayValue("Colors", i))
        }

        this.speed = this.getIntValue("Speed")
        this.scale = this.getIntValue("Scale")
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

    getStringArrayValue (name, index) {
        return this.getValue(name, index)
    }
}

module.exports = LogicColorGradientData