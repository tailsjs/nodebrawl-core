const LogicData = require("../LogicData")

class LogicPinData extends LogicData {
    name = null
    pinType = null
    rarity = null
    index = null
    bonus = null
    craftCost = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        this.name = this.getStringValue("Name")
        this.pinType = this.getIntValue("PinType")
        this.rarity = this.getIntValue("Rarity")
        this.index = this.getIntValue("Index")
        this.bonus = this.getIntValue("Bonus")
        this.craftCost = this.getIntValue("CraftCost")
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

module.exports = LogicPinData