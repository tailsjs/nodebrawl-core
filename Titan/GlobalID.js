/**
 * GlobalID
 * 
 * Class for working with Global IDs.
 */
class GlobalID {
    /**
     * Compose Global ID from Class ID and Instance ID
     * @param { Number | Array<[ClassID, InstanceID]> } ClassID 
     * @param { Number } InstanceID Optional, if 1st arg is array
     * @returns { Number } Global ID
     * @example
     *   GlobalID.createGlobalID(1, 2) // 1000002
     *   GlobalID.createGlobalID([1, 2]) // 1000002
     */
    static createGlobalID (ClassID, InstanceID) {
        if (Array.isArray(ClassID) && ClassID.length == 2) {
            InstanceID = ClassID[1]
            ClassID = ClassID[0]
        }

        return ClassID * 1000000 + InstanceID
    }

    /**
     * Get Class ID from Global ID
     * @param { Number } GlobalID 
     * @returns { Number } Class ID
     * @example
     *   GlobalID.getClassID(1000002) // 1
     */
    static getClassID (GlobalID) {
        return Math.floor(GlobalID / 1000000)
    }

    /**
     * Get Instance ID from Global ID
     * @param { Number } GlobalID 
     * @returns { Number } Instance ID
     * @example
     *   GlobalID.getInstanceID(1000002) // 2
     */
    static getInstanceID (GlobalID) {
        return GlobalID % 1000000
    }

    /**
     * Decompose GlobalID into ClassID and InstanceID
     * @param { Number } GlobalID 
     * @returns { Array<[ClassID, InstanceID]> } ClassID and InstanceID
     * @example
     *   GlobalID.parseGlobalID(1000002) // [1, 2]
     */
    static parseGlobalID (GlobalID) {
        return [ this.getClassID(GlobalID), this.getInstanceID(GlobalID) ]
    }

    /**
     * Compose GlobalID from ClassID and InstanceID
     * @param { Number } ClassID 
     * @param { Number } InstanceID 
     * @returns { Number } GlobalID
     * @example
     *   GlobalID.composeGlobalID(1, 2) // 1000002
     */
    static composeGlobalID = this.createGlobalID
    /**
     * Decompose GlobalID into ClassID and InstanceID
     * @param { Number } GlobalID 
     * @returns { Array<[ClassID, InstanceID]> } ClassID and InstanceID
     * @example
     *   GlobalID.decomposeGlobalID(1000002) // [1, 2]
     */
    static decomposeGlobalID = this.parseGlobalID
}

module.exports = GlobalID