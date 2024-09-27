const LogicData = require("../LogicData")

class LogicGlobalData extends LogicData {
    numberValue = 0
    booleanValue = false
    textValue = ""

    numberArray = []

    stringArray = []
    altStringArray = []

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        const size = this.row.getBiggestArraySize()

        this.numberValue = this.getIntegerValue("NumberValue", 0)
        this.booleanValue = this.getBooleanValue("BooleanValue", 0)
        this.textValue = this.getValue("TextValue", 0)

        for (let i = 0; i < size; i++) {
            this.numberArray[i] = this.getIntegerValue("NumberArray", i)
            this.stringArray[i] = this.getValue("StringArray", i)
            this.altStringArray[i] = this.getValue("AltStringArray", i)
        }
    }

    getNumberValue () {
        return this.numberValue
    }

    getBooleanValue () {
        return this.booleanValue
    }

    getTextValue () {
        return this.textValue
    }

    getNumberArraySize () {
        return this.numberArray.length
    }

    getNumberArray (index) {
        return this.numberArray[index]
    }

    getStringArraySize () {
        return this.stringArray.length
    }

    getStringArray (index) {
        return this.stringArray[index]
    }
}

module.exports = LogicGlobalData