const ChecksumEncoder = require('../ChecksumEncoder')

/**
  * ByteStream
  * 
  * For clear communication between client and server.
  * 
  * @param { Buffer } bytes Bytes
  */
class ByteStream extends ChecksumEncoder {
  constructor (bytes = Buffer.alloc(0)) {
    // eslint-disable-next-line new-cap
    super()
    this.buffer = bytes;
    this.length = 0
    this.offset = 0
    this.bitOffset = 0
  }

  /**
   * Reading Int from Bytes
   * @returns { Number } Int
   */
  readInt () {
    this.bitOffset = 0
    return (this.buffer[this.offset++] << 24 |
            (this.buffer[this.offset++] << 16 |
                (this.buffer[this.offset++] << 8 |
                    this.buffer[this.offset++])))
  }

  /**
   * Reading Little-Endian Int from Bytes
   * @returns {Number} Little-Endian Int
   */
  readIntLE() {
    this.bitOffset = 0;
    return (this.buffer[this.offset++] |
            (this.buffer[this.offset++] << 8) |
              (this.buffer[this.offset++] << 16) |
                (this.buffer[this.offset++] << 24));
  }

  /**
   * Skip some bit offset
   * @param { Number } len Amount of bits to skip
   */
  skip (len) {
    this.bitOffset += len
  }

  /**
   *  Reading Short from Bytes (`commonly isn't used.`)
   * @returns { Number } Short
   */
  readShort () {
    this.bitOffset = 0
    return (this.buffer[this.offset++] << 8 |
            this.buffer[this.offset++])
  }

  /**
   * Writing value to Bytes as Short (`commonly isn't used`)
   * @param {Number} value Your value to write.
   */
  writeShort (value) {
    super.writeShort(value)
    this.bitOffset = 0
    this.ensureCapacity(2)
    this.buffer[this.offset++] = (value >> 8)
    this.buffer[this.offset++] = (value)
  }


  /**
   * Writing value to Bytes as Int
   * @param {Number} value Your value to write.
   */
  writeInt (value) {
    super.writeInt(value)
    this.bitOffset = 0
    this.ensureCapacity(4)
    this.buffer[this.offset++] = (value >> 24)
    this.buffer[this.offset++] = (value >> 16)
    this.buffer[this.offset++] = (value >> 8)
    this.buffer[this.offset++] = (value)
  }

  /**
   * Writing value to Bytes as Little-Endian Int
   * @param {Number} value Your value to write.
   */
  writeIntLE(value) {
    this.bitOffset = 0;
    this.ensureCapacity(4);
    this.buffer[this.offset++] = (value);
    this.buffer[this.offset++] = (value >> 8);
    this.buffer[this.offset++] = (value >> 16);
    this.buffer[this.offset++] = (value >> 24);
  }

  /**
   * Get Bytes in String
   * @returns { String } Bytes in String form (`AA-BB-CC`)
   */
  getHex () {
    return this.buffer.toString("hex").toUpperCase().match(/.{0,2}/g).filter(e => e != "").join("-")
  }

  /**
   *  Reading String from Bytes
   * @returns { String } String
   */
  readString () {
    const length = this.readInt()

    if (length > 0 && length < 900001) {
      const stringBytes = this.buffer.slice(this.offset, this.offset + length)
      const string = stringBytes.toString('utf8')
      this.offset += length
      return string
    }
    return ''
  }

  /**
   * Reading VarInt from Bytes
   * @returns { Number } VarInt
   */
  readVInt () {
    let result = 0,
      shift = 0,
      s = 0,
      a1 = 0,
      a2 = 0
    do {
      let byte = this.buffer[this.offset++]
      if (shift === 0) {
        a1 = (byte & 0x40) >> 6
        a2 = (byte & 0x80) >> 7
        s = (byte << 1) & ~0x181
        byte = s | (a2 << 7) | a1
      }
      result |= (byte & 0x7f) << shift
      shift += 7
      if (!(byte & 0x80))
      { break }
    } while (true)

    return (result >> 1) ^ (-(result & 1))
  }

  /**
   * Writing value to Bytes as VarInt
   * @param {Number} value Your value to write.
   */
  writeVInt (value) {
    super.writeVInt(value)
    this.bitOffset = 0
    let temp = (value >> 25) & 0x40

    let flipped = value ^ (value >> 31)

    temp |= value & 0x3F

    value >>= 6
    flipped >>= 6

    if (flipped === 0) {
      this.writeByte(temp)
      return 0
    }

    this.writeByte(temp | 0x80)

    flipped >>= 7
    let r = 0

    if (flipped)
    { r = 0x80 }

    this.writeByte((value & 0x7F) | r)

    value >>= 7

    while (flipped !== 0) {
      flipped >>= 7
      r = 0
      if (flipped)
      { r = 0x80 }
      this.writeByte((value & 0x7F) | r)
      value >>= 7
    }
  }

  /**
   * Writing value to Bytes as Boolean
   * @param {Boolean} value Your value to write.
   */
  writeBoolean (value) {
    super.writeBoolean(value)
    if (this.bitOffset === 0) {
      this.ensureCapacity(1)
      this.buffer[this.offset++] = 0
    }

    if (value)
    { this.buffer[this.offset - 1] |= (1 << this.bitOffset) }

    this.bitOffset = (this.bitOffset + 1) & 7
  }

  /**
   * Reading Boolean from Bytes
   * @returns { Boolean } Boolean (`true/false`)
   */
  readBoolean () {
    const BitOffset = this.bitOffset
    const Offset = this.offset + (8 - BitOffset >> 3)
    
    this.offset = Offset
    this.bitOffset = BitOffset + 1 & 7

    return (1 << (BitOffset & 7) & this.buffer[Offset - 1]) != 0
  }

  /**
   * Writing value to Bytes as String
   * @param {String} value Your value to write.
   */
  writeString (value) {
    super.writeString(value)
    if (value == null || value.length > 900001 || !value) {
      this.writeInt(-1)
      return
    }

    const buf = Buffer.from(value, 'utf8')
    this.writeInt(buf.length)
    this.buffer = Buffer.concat([this.buffer, buf])
    this.offset += buf.length
  }

  /**
   * Writing value to Bytes as String Reference
   * @param {String} value Your value to write.
   */
  writeStringReference (value) {
    super.writeStringReference(value)
    if (value == null || value.length > 900001 || !value) {
      this.writeInt(0)
      return
    }
    
    if (value && value.length > 0) {
      const buf = Buffer.from(value, 'utf8')
      this.writeInt(buf.length)
      this.buffer = Buffer.concat([this.buffer, buf])
      this.offset += buf.length
    } else {
      this.writeInt(0)
    }
  }

  /**
   * Reading String Reference from Bytes
   * @param { Number } maxCapacity Max String Capacity
   * @returns { String }
   */
  readStringReference (maxCapacity) {
    const length = this.readInt()

    if (length > 0 && length <= maxCapacity) {
      const stringBytes = this.buffer.slice(this.offset, this.offset + length)
      const string = stringBytes.toString('utf8')
      this.offset += length
      return string
    }

    return ''
  }

  readIntInternal = this.readInt
  readBytesLength = this.readInt

  /**
   * Writing value to Bytes as LongLong (`commonly isn't used`)
   * @param {Number} value Your value to write.
   */
  writeLongLong (value) {
    super.writeLongLong(value)
    this.writeInt(value >> 32)
    this.writeInt(value)
  }

  /**
   * Writing values to Bytes as Ints
   * 
   * @param {Number} value1 Your value to write.
   * @param {Number} value2 Your value to write.
   */
  writeLong (value1, value2) {
    this.writeInt(value1)
    this.writeInt(value2)
  }

  /**
   * Reading 2 Ints from Bytes
   * @returns { Array<Number> } Long Ints
   */
  readLong () {
    return [ this.readInt(), this.readInt() ]
  }

  /**
   * Writing value to Bytes as Byte
   * @param {Number} value Your value to write.
   */
  writeByte (value) {
    super.writeByte(value)
    this.bitOffset = 0
    this.ensureCapacity(1)
    this.buffer[this.offset++] = value
  }

  /**
   * Writing value to Bytes as ByteArray with ByteArray length
   * @param {Buffer} buffer Your buffer to write.
   */
  writeBytes (buffer) {
    const length = buffer.length

    super.writeBytes(buffer, length)

    if (buffer != null) {
      this.writeInt(length)
      this.buffer = Buffer.concat([this.buffer, buffer])
      this.offset += length
      return
    }

    this.writeInt(-1)
  }

  /**
    * Reading ByteArray from Bytes 
    * @returns { Buffer }
    */
  readBytes () {
    const length = this.readBytesLength()

    const buffer = this.buffer.slice(this.offset, this.offset + length)
    this.offset += length
    return buffer
  }

  /**
   * Writing value to Bytes as ByteArray without ByteArray length
   * @param {Buffer} buffer Your buffer to write.
   */
  writeBytesWithoutLength (buffer) {
    if (buffer != null) {
      this.buffer = Buffer.concat([this.buffer, buffer])
      this.offset += buffer.length
    }
  }

  /**
   * Writing HEX to Bytes
   * @param {String} str HEX data.
   */
  writeHex (str){
    let encoded = Buffer.from(str.replace(/-/g, '').match(/.{1,2}/g).map(byte => parseInt(byte, 16)))

    this.writeBytesWithoutLength(encoded)
  }

  /**
   * Move offset to start, if you feel so.
   */
  moveOffsetToStart () {
    this.offset = 0;
    this.bitOffset = 0;
  }

  /**
   * Adding more space to Buffer
   * @param {Number} capacity Amount of new space
   */
  ensureCapacity (capacity) {
    const bufferLength = this.buffer.length

    if (this.offset + capacity > bufferLength) {
      // eslint-disable-next-line new-cap
      const tmpBuffer = new Buffer.alloc(capacity)
      this.buffer = Buffer.concat([this.buffer, tmpBuffer])
    }
  }
}

module.exports = ByteStream
