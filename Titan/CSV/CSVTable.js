const CSVColumn = require("./CSVColumn")
const CSVRow = require("./CSVRow")

const BOOLEAN_VALUE_NOT_SET = 0x2
const INT_VALUE_NOT_SET = 0x7FFFFFFF

class CSVTable {
    columnNameList = []
    columnList = []
    rowList = []

    node = null;
    size = 0

    constructor (node, size) {
        this.node = node
        this.size = size
    }

    addAndConvertValue (value, columnIndex) {
        const column = this.columnList[columnIndex]

        if (!column) {
            return Err("CSVTable::addAndConvertValue: invalid column index", columnIndex, this.getFileName())
        }
        
        if (value != null && value.length > 0) {
            switch (column.getColumnType()) {
                case -1:
                case 0:
                    column.addStringValue(value)
                    break
                case 1:
                    column.addIntegerValue(value)
                    break
                case 2:
                    if (Boolean(value)) {
                        column.addBooleanValue(value)
                    } else {
                        Warn(`CSVTable::addAndConvertValue: Invalid value '${value}' in Boolean column '${this.columnNameList[columnIndex]}', ${this.getFileName()}`)

                        column.addBooleanValue(false)
                    }

                    break
            }
        } else {
            column.addEmptyValue()
        }
    }

    addColumn (columnName) {
        this.columnNameList.push(columnName)
    }

    addColumnType (columnType) {
        this.columnList.push(new CSVColumn(columnType, this.size))
    }

    addRow (row) {
        this.rowList.push(row)
    }

    columnNamesLoaded () {} // what do you expect me to do here?

    createRow () {
        this.rowList.push(new CSVRow(this))
    }

    getArraySizeAt (row, columnIndex) {
        if (this.rowList.length > 0) {
            const rowId = this.rowList.indexOf(row)

            if (rowId !== -1) {
                const column = this.columnList[columnIndex]
                return column.getArraySize(this.rowList[rowId].getRowOffset(), 
                                            rowId + 1 >= this.rowList.length ? column.getSize() : this.rowList[rowId + 1].getRowOffset())
            }
        }

        return 0
    }

    getColumnName (columnIndex) {
        return this.columnNameList[columnIndex]
    }

    getColumnIndexByName (name) {
        return this.columnNameList.indexOf(name)
    }

    getColumnCount () {
        return this.columnList.length
    }

    getColumnRowCount () {
        return this.columnList[0].getSize()
    }

    getColumnTypeCount () {
        return this.columnList.length
    }

    getFileName () {
        return this.node.getFileName()
    }

    getBooleanValue (name, index) {
        return this.getBooleanValueAt(this.getColumnIndexByName(name), index)
    }

    getBooleanValueAt (columnIndex, index) {
        if (columnIndex !== -1) {
            return this.columnList[columnIndex].getBooleanValue(index)
        }

        return false
    }

    getIntegerValue (name, index) {
        return this.getIntegerValueAt(this.getColumnIndexByName(name), index)
    }

    getIntegerValueAt (columnIndex, index) {
        if (columnIndex !== -1) {
            let value = this.columnList[columnIndex].getIntegerValue(index)

            if (value === INT_VALUE_NOT_SET) {
                value = 0
            }

            return value
        }

        return 0;
    }

    getValue (name, index) {
        return this.getValueAt(this.getColumnIndexByName(name), index)
    }

    getValueAt (columnIndex, index) {
        if (columnIndex !== -1) {
            return this.columnList[columnIndex].getStringValue(index)
        }

        return ""
    }

    getValueIndex (name) {
        return this.getColumnIndexByName(name)
    }

    getRowAt (index) {
        return this.rowList[index]
    }

    getCSVColumn (index) {
        return this.columnList[index]
    }

    getRowCount () {
        return this.rowList.length
    }

    validateColumnTypes () {
        if (this.columnNameList.length !== this.columnList.length) {
            Warn(`CSVTable::validateColumnTypes: Column name list length (${this.columnNameList.length}) doesn't match column list length (${this.columnList.length}), ${this.getFileName()}`)
        }
    }
}

module.exports = CSVTable