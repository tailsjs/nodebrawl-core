/**
 * BitStream
 * 
 * Used in battles.
 * 
 * @param { Buffer } bytes Bytes
 */
class BitStream { // Still in beta.
    constructor (bytes = Buffer.alloc(0)) {
        this.buffer = bytes;
        this.offset = 0;
        this.bitOffset = 0;
    }

    /**
     * Read bit from Bytes
     * @returns { Number } Bit
     */
    readBit () {
        if (this.offset > this.buffer.length) {
            return 0;
        }

        let value = ((this.buffer[this.offset] >> this.bitOffset) & 1);
        this.bitOffset++;
        if (this.bitOffset == 8) {
            this.bitOffset = 0;
            this.offset += 1;
        }

        return value;
    }

    /**
     * Read bytes from Bytes
     * @param { Number } length Amount of bytes to read
     * @returns { Buffer } Readed bytes
     */
    readBytes (length) {
        const data = [];
        let i = 0;
    
        while (i < length) {
          let value = 0;
          let p = 0;
    
          while (p < 8 && i < length) {
            value |= this.readBit() << p;
            i += 1;
            p += 1;
          }
    
          data.push(value);
        }
    
        return Buffer.from(data);
    }
    
    /**
     * Read positive int from Bytes
     * @param { Number } bitsCount Max amount of bits
     * @returns { Number } Readed int
     */
    readPositiveInt (bitsCount) {
        const data = this.readBytes(bitsCount);
        return data.readUIntLE(0, data.length);
    }

    readPositiveIntMax31 () {
        const v2 = this.readPositiveInt(5);
        return this.readPositiveInt(v2);
    }

    /**
     * Read int from Bytes
     * @param { Number } bits Max amount of bits
     * @returns { Number } Readed int
     */
    readInt (bits) {
        const v2 = 2 * this.readPositiveInt(1) - 1;
        const res = v2 * this.readPositiveInt(bits);
        return res
    }

    readPositiveVIntMax255 () {
        const v2 = this.readPositiveInt(3);
        return this.readPositiveInt(v2);
    }

    readPositiveVIntMax65535 () {
        const v2 = this.readPositiveInt(4);
        return this.readPositiveInt(v2);
    }

    writeBit (data) {
        if (this.bitOffset == 0) {
            this.offset += 1;
            this.writeByte(0xFF);
        }

        let value = this.buffer[this.offset-1];
        value &= ~(1 << this.bitOffset);
        value |= (data << this.bitOffset)
        this.buffer[this.offset - 1] = value;
        this.bitOffset = (this.bitOffset + 1) % 8;
    }

    writeBoolean (value) {
        this.writePositiveInt(value ? 1 : 0, 1);
    }

    writeBits (bits, count) {
        let position = 0;
        for (let i = 0; i < count;){ 
            for (let p = 0; p < 8 && i < count; i++, p++) {
                const value = ((bits[position++] >> p) & 1);
                this.writeBit(value);
            }
        }
    }

    writePositiveInt (value, bits) {
        const bytes = new Buffer.alloc(4)
        bytes[0] = value
        bytes[1] = value >> 8
        bytes[2] = value >> 16
        bytes[3] = value >> 24
        this.writeBits(bytes, bits);
    }

    writeInt (value, bits) {
        this.writePositiveInt(value <= -1 ? 0 : 1, 1)
        value = Math.abs(value);

        this.writePositiveInt(value, bits);
    }

    writePositiveVInt (value, bits) {
        const v3 = v7 != 0 ? 0 : 1;
        const v7 = value;

        if (v7 > 1) {
            let v8 = v7;
            while (v8 != 0) {
                v3 += 1;
                v8 >>= 1;
            }
        }

        this.writePositiveInt(v3 - 1, bits);
        this.writePositiveInt(v7, v3);
    }

    writeByte (value) {
        this.ensureCapacity(1);
        this.buffer[this.offset - 1] = value;
    }

    writePositiveVIntMax255OftenZero (a1) {
        this.writePositiveInt(a1 == 0 ? 1 : 0, 1)

        if (a1 > 0) {
            this.writePositiveVIntMax255(a1)
        }
    }

    writePositiveVIntMax65535OftenZero (a1) {
        this.writePositiveInt(a1 == 0 ? 1 : 0, 1)

        if (a1 > 0) {
            this.writePositiveVIntMax65535(a1)
        }
    }

    writePositiveVIntMax255 (a1) {
        this.writePositiveVInt(a1, 3)
    }

    writePositiveVIntMax65535 (a1) {
        this.writePositiveVInt(a1, 4)
    }

    ensureCapacity (capacity) {
        const bufferLength = this.buffer.length;

        if (this.offset + capacity > bufferLength) {
            const tmpBuffer = new Buffer.alloc(capacity);
            this.buffer = Buffer.concat([this.buffer, tmpBuffer]);
        }
    }
}

module.exports = BitStream;
