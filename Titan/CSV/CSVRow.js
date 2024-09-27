const LogicMath = require('../LogicMath')

class CSVRow {
    rowOffset = 0
    table = null

    constructor (table) {
        this.table = table
        this.rowOffset = table.getColumnRowCount()
    }

    getArraySize (column) {
        const columnIndex = this.getColumnIndexByName(column)

        if (columnIndex === -1) {
            return 0
        }

        return this.table.getArraySizeAt(this, columnIndex)
    }

    getBiggestArraySize () {
        const columnCount = this.table.getColumnCount()
        let maxSize = 1

        for (let i = columnCount - 1; i >= 0; i--) {
            maxSize = LogicMath.max(this.table.getArraySizeAt(this, i), maxSize)
        }

        return maxSize
    }

    getColumnCount () {
        return this.table.getColumnCount()
    }

    getColumnIndexByName (name) {
        return this.table.getColumnIndexByName(name)
    }

    getBooleanValue (columnName, index) {
        return this.table.getBooleanValue(columnName, this.rowOffset + index)
    }

    getBooleanValueAt (columnName, index) {
        return this.table.getBooleanValueAt(columnName, this.rowOffset + index)
    }

    getClampedBooleanValueAt (columnName, index) {
        const columnIndex = this.getColumnIndexByName(columnName)

        if (columnIndex !== -1) {
            const arraySize = this.table.getArraySizeAt(this, columnIndex)

            if (index >= arraySize || arraySize < 1) {
                index = LogicMath.max(arraySize - 1, 0)
            }

            return this.table.getBooleanValueAt(columnIndex, this.rowOffset + this.rowOffset + index)
        }

        return false
    }

    getIntegerValue (columnName, index) {
        return this.table.getIntegerValue(columnName, this.rowOffset + index)
    }

    getIntegerValueAt (columnName, index) {
        return this.table.getIntegerValueAt(columnName,this.rowOffset + index)
    }

    getClampedIntegerValueAt (columnName, index) {
        const columnIndex = this.getColumnIndexByName(columnName)

        if (columnIndex !== -1) {
            const arraySize = this.table.getArraySizeAt(this, columnIndex)

            if (index >= arraySize || arraySize < 1) {
                index = LogicMath.max(arraySize - 1, 0)
            }

            return this.table.getIntegerValueAt(columnIndex, this.rowOffset + index)
        }

        return 0
    }

    getValue (columnName, index) {
        return this.table.getValue(columnName, this.rowOffset + index)
    }

    getValueAt (columnName, index) {
        return this.table.getValueAt(columnName, this.rowOffset + index)
    }

    getClampedValueAt (columnName, index) {
        const columnIndex = this.getColumnIndexByName(columnName)

        if (columnIndex !== -1) {
            const arraySize = this.table.getArraySizeAt(this, columnIndex)

            if (index >= arraySize || arraySize < 1) {
                index = LogicMath.max(arraySize - 1, 0)
            }

            return this.table.getValueAt(columnIndex, this.rowOffset + index)
        }

        return ""
    }

    getName () {
        return this.table.getValueAt(0, this.rowOffset)
    }

    getRowOffset () {
        return this.rowOffset
    }
}

module.exports = CSVRow