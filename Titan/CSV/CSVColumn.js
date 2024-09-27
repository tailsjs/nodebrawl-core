const BOOLEAN_VALUE_NOT_SET = 0x2
const INT_VALUE_NOT_SET = 0x7FFFFFFF

class CSVColumn {
    booleanValues = []
    integerValues = []
    stringValues = []

    columnType = 0

    constructor (columnType, size) {
        this.columnType = columnType

        this.booleanValues = []
        this.integerValues = []
        this.stringValues = []

        if (columnType < -1 && columnType > 2) {
            Err("Invalid CSVColumn type: " + columnType)
        }
    }

    addEmptyValue () {
        switch (this.columnType) {
            case -1:
            case 0:
                this.stringValues.push("")
                break
            case 1:
                this.integerValues.push(INT_VALUE_NOT_SET)
                break
            case 2:
                this.booleanValues.push(BOOLEAN_VALUE_NOT_SET)
                break
        }
    }

    addBooleanValue (value) {
        this.booleanValues.push(value ? 1 : 0)
    }

    addIntegerValue (value) {
        this.integerValues.push(Number(value))
    }

    addStringValue (value) {
        this.stringValues.push(value)
    }

    getArraySize (startOffset, endOffset) {
        switch (this.columnType) {
            case -1:
            case 0:
                for (let i = endOffset - 1; i + 1 > startOffset; i--) {
                    if (this.stringValues[i].length > 0) {
                        return i - startOffset + 1
                    }
                }
                break;
            case 1:
                for (let i = endOffset - 1; i + 1 > startOffset; i--) {
                    if (this.integerValues[i] !== INT_VALUE_NOT_SET) {
                        return i - startOffset + 1
                    }
                }
                break;
            case 2:
                for (let i = endOffset - 1; i + 1 > startOffset; i--) {
                    if (this.booleanValues[i] !== BOOLEAN_VALUE_NOT_SET) {
                        return i - startOffset + 1
                    }
                }
                break;
        }

        return 0
    }

    getBooleanValue (index) {
        return this.booleanValues[index] === 1
    }

    getIntegerValue (index) {
        return this.integerValues[index]
    }

    getStringValue (index) {
        return this.stringValues[index]
    }

    getSize () {
        switch (this.columnType) {
            case -1:
            case 0:
                return this.stringValues.length
            case 1:
                return this.integerValues.length
            case 2:
                return this.booleanValues.length
            default:
                return 0
        }
    }

    getColumnType () {
        return this.columnType
    }
}

module.exports = CSVColumn