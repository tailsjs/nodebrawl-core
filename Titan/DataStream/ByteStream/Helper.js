const ByteStream = require(".")
const BitStream = require("../BitStream")
const GlobalID = require("../../GlobalID")
const LogicLong = require("../../LogicLong")
const LogicBattlePlayerMap = require("../../../Logic/LogicBattlePlayerMap")

/**
 * ByteStreamHelper
 * 
 * Helper class for ByteStream, which includes some useful methods
 * 
 * @param { ByteStream | BitStream } stream ByteStream or BitStream class instance. In case, if instance is invalid, throws error
 * @example
 *   const stream = new ByteStream()
 *   const helper = new ByteStreamHelper(stream)
 */
class ByteStreamHelper {
    constructor (stream) {
        if (!(stream instanceof ByteStream) || !(stream instanceof BitStream)) {
            throw new Error("Stream must be instance of ByteStream or BitStream!")
        }

        this.stream = stream
    }

    /**
    * Encoding Intener Array to ByteStream
     * @param { Array<Number> } array Array with ints
     * @example
     *   helper.encodeIntList([1, 2, 3, 4, 5])
     */
    encodeIntList (array) {
        if (!array) return;

        this.stream.writeVInt(array.length)

        for (const int of array) {
            this.stream.writeVInt(int)
        }
    }

    /**
     * Decoding Integer Array from ByteStream
     * @returns { Array<Number> } Array with ints
     * @example
     *   const intList = helper.decodeIntList()
     */
    decodeIntList () {
        const length = this.stream.readVInt()

        const array = [];

        for (let index = 0; index < length; index++) {
            array.push(this.stream.readVInt())
        }

        return array
    }

    /**
     * Write Integer Array to ByteStream
     * @param { Array<Number> } array Array with ints
     */
    writeIntList (array) {
        if (!array) {
            return this.stream.writeVInt(-1)
        }

        this.stream.writeVInt(array.length)

        for (const int of array) {
            this.stream.writeVInt(int)
        }
    }

    /**
     * Read Integer Array from ByteStream
     * @param { Number } allowedMaxSize Max size of array
     * @returns { Array | Array<Number> } Array with ints
     */
    readIntList (allowedMaxSize) {
        const length = this.stream.readVInt()

        if (length < 0 || allowedMaxSize && length > allowedMaxSize) {
            return []
        }

        const array = []

        for (let index = 0; index < length; index++) {
            array.push(this.stream.readVInt())
        }
    }

    /**
     * Encode LogicLong to ByteStream
     * @param { LogicLong } logicLong LogicLong class instance
     * @example
     *   const logicLong = new LogicLong(1, 234567)
     *   helper.encodeLogicLong(logicLong)
     */
    encodeLogicLong (logicLong = new LogicLong(0, 0)) {
        this.stream.writeVInt(logicLong.getHigherInt())
        this.stream.writeVInt(logicLong.getLowerInt())
    }

    /**
     * Decode LogicLong from ByteStream
     * @param { LogicLong } logicLong LogicLong class instance
     * @returns { LogicLong } LogicLong class instance (not necessary to use)
     * @example
     *   const logicLong = helper.decodeLogicLong()
     *   const logicLongExample = new LogicLong(1, 234567)
     */
    decodeLogicLong (logicLong = new LogicLong(0, 0)) {
        logicLong.high = this.stream.readVInt()
        logicLong.low = this.stream.readVInt()

        return logicLong
    }

    /**
     * Encoding whole Array of LogicLong to ByteStream
     * @param { Array<LogicLong> } array Array, filled with LogicLong instances.
     * @example
     *   helper.encodeLogicLongList([new LogicLong(1, 234567), new LogicLong(2, 345678)])
     */
    encodeLogicLongList (array) {
        if (!array) return;

        this.stream.writeVInt(array.length)

        for (const logicLong of array) {
            this.encodeLogicLong(logicLong)
        }
    }

    /**
     * Decoding whole Array of LogicLong from ByteStream
     * @returns { Array<LogicLong> } Array, filled with LogicLong instances.
     * @example
     *   const logicLongList = helper.decodeLogicLongList()
     */
    decodeLogicLongList () {
        const length = this.readVInt()

        const array = []

        for (let index = 0; index < length; index++) {
            array.push(this.decodeLogicLong())
        }

        return array
    }

    /**
     * Write GlobalID to Bytes (DataReference)
     * @param { Number } globalID GlobalID (28000001)
     * @example
     *   const globalID = GlobalID.composeGlobalID(28, 1)
     *   helper.writeGlobalID(globalID)
     */
    writeGlobalID (globalID) {
        const decomposedGlobalID = GlobalID.decomposeGlobalID(globalID)

        this.writeDataReference(decomposedGlobalID[0], decomposedGlobalID[1])
    }

    /**
     * Decode GlobalID from Bytes (DataReference)
     * @returns { Number } GlobalID
     * @example
     *   const globalID = helper.readGlobalID() // 28000001
     */
    readGlobalID () {
        const DataReference = this.readDataReference()

        if (DataReference[0] == 0) {
            return 0;
        }

        return GlobalID.composeGlobalID(DataReference[0], DataReference[1])
    }

    /**
     * Reading 2 VarInts from Bytes
     * @returns { Array<Number> } ClassID and InstanceID
     * @example
     *   const DataReference = helper.readDataReference()
     */
    readDataReference () {
        if (this.stream instanceof ByteStream) {
            const ClassID = this.stream.readVInt()
            return [ ClassID, ClassID == 0 ? 0 : this.stream.readVInt() ]
        } else if (this.stream instanceof BitStream) {
            const ClassID = this.stream.readPositiveIntMax31()
            return [ ClassID, ClassID == 0 ? 0 : this.stream.readPositiveIntMax511() ]
        }
    }

    /**
     * Writing values to Bytes as VarInts
     * If value1 is 0, then 2nd value doesn't used
     * 
     * @param {Number | Array<Number>} ClassID Your ClassID to write. If array, then 1st value is ClassID and 2nd is InstanceID
     * @param {Number} InstanceID Your InstanceID to write. Optional, if 1st arg is array
     * @example
     *   helper.writeDataReference(1, 2)
     *   helper.writeDataReference([1, 2])
     */
    writeDataReference (ClassID, InstanceID) {
        if (Array.isArray(ClassID) && ClassID.length == 2) {
            InstanceID = ClassID[1]
            ClassID = ClassID[0]
        }

        if (this.stream instanceof ByteStream) {
            this.stream.writeVInt(ClassID < 1 ? 0 : ClassID)

            if (ClassID > 0) this.stream.writeVInt(InstanceID)
        } else if (this.stream instanceof BitStream) {
            this.stream.writePositiveIntMax31(ClassID < 1 ? 0 : ClassID)
               
            if (ClassID > 0) this.stream.writePositiveIntMax511(InstanceID)
        }
    }

    /**
     * Reading running object id from BitStream
     * @param { Number } ClassID 
     * @returns { Number } GlobalID
     */
    readObjectRunningId (ClassID) {
        const InstanceID = this.stream.readPositiveVIntMax255()

        return GlobalID.createGlobalID(ClassID, InstanceID)
    }

    /**
     * Writing running object id to BitStream
     * @param { Number } GlobalID 
     */
    writeObjectRunningId (globalID) {
        const InstanceID = GlobalID.getInstanceID(globalID)

        this.stream.writePositiveVIntMax65535(InstanceID)
    }

    /**
     * Reading battle player map from ByteStream
     * @returns { LogicBattlePlayerMap } Instance of LogicBattlePlayerMap
     */
    readBattlePlayerMap () {
        const bool = this.stream.readBoolean()
        if (!bool) return;

        const BattlePlayerMap = new LogicBattlePlayerMap();

        BattlePlayerMap.decode(this.stream);

        return BattlePlayerMap
    }

    /**
     * Writing battle player map to ByteStream
     * @param { LogicBattlePlayerMap } BattlePlayerMap Instance of LogicBattlePlayerMap
     */
    writeBattlePlayerMap (BattlePlayerMap) {
        if (!(BattlePlayerMap instanceof LogicBattlePlayerMap)) {
            throw new Error("BattlePlayerMap must be instance of LogicBattlePlayerMap!")
        }

        const shouldWrite = BattlePlayerMap.compressedMapData != ""
        this.stream.writeBoolean(shouldWrite)

        if (shouldWrite) {
            BattlePlayerMap.encode(this.stream)
        }
    }

    writeConstantSizeIntArray (array, size) {
        if (!array) return;

        for (let i = 0; i < size; i++) {
            this.stream.writeVInt(array[i])
        }
    }

    readConstantSizeIntArray (size) {
        const array = []

        for (let i = 0; i < size; i++) {
            array.push(this.stream.readVInt())
        }

        return array
    }
}

module.exports = ByteStreamHelper