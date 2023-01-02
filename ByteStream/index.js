const ByteArray = require('./ByteArray')

class ByteStream {
  constructor (data) {
    // eslint-disable-next-line new-cap
    this.buffer = data != null ? data : Buffer.alloc(0)
    this.length = 0
    this.offset = 0
    this.bitOffset = 0
  }

  readInt () {
    this.bitOffset = 0
    return (this.buffer[this.offset++] << 24 |
            (this.buffer[this.offset++] << 16 |
                (this.buffer[this.offset++] << 8 |
                    this.buffer[this.offset++])))
  }

  skip (len) {
    this.bitOffset += len
  }

  readShort () {
    this.bitOffset = 0
    return (this.buffer[this.offset++] << 8 |
            this.buffer[this.offset++])
  }

  writeShort (value) {
    this.bitOffset = 0
    this.ensureCapacity(2)
    this.buffer[this.offset++] = (value >> 8)
    this.buffer[this.offset++] = (value)
  }

  writeInt (value) {
    this.bitOffset = 0
    this.ensureCapacity(4)
    this.buffer[this.offset++] = (value >> 24)
    this.buffer[this.offset++] = (value >> 16)
    this.buffer[this.offset++] = (value >> 8)
    this.buffer[this.offset++] = (value)
  }

  getHex () {
    return ByteArray.bytesToHex(this.buffer)
  }

  readString () {
    const length = this.readInt()

    if (length > 0 && length < 90000) {
      const stringBytes = this.buffer.slice(this.offset, this.offset + length)
      const string = stringBytes.toString('utf8')
      this.offset += length
      return string
    }
    return ''
  }

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

  readDataReference () {
    const x = this.readVInt();
    return [ x, x === 0 ? 0 : this.readVInt() ] 
  }

  writeDataReference (a1, a2) {
    if(a1 == 0){
      this.writeVInt(0)
    }else{
      this.writeVInt(a1)
      this.writeVInt(a2)
    }
  }

  writeVInt (value) {
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

  writeBoolean (value) {
    if (this.bitOffset === 0) {
      this.ensureCapacity(1)
      this.buffer[this.offset++] = 0
    }

    if (value)
    { this.buffer[this.offset - 1] |= (1 << this.bitOffset) }

    this.bitOffset = (this.bitOffset + 1) & 7
  }

  writeString (value) {
    if (value == null || value.length > 90000) {
      this.writeInt(-1)
      return
    }

    const buf = Buffer.from(value, 'utf8')
    this.writeInt(buf.length)
    this.buffer = Buffer.concat([this.buffer, buf])
    this.offset += buf.length
  }

  writeStringReference = this.writeString

  writeLongLong (value) {
    this.writeInt(value >> 32)
    this.writeInt(value)
  }

  writeLogicLong (a1, a2) {
    this.writeVInt(a1)
    this.writeVInt(a2)
  }

  readLogicLong = this.readDataReference

  writeLong (a1, a2) {
    this.writeInt(a1)
    this.writeInt(a2)
  }

  readLong () {
    return [ this.readInt(), this.readInt() ]
  }

  writeByte (value) {
    this.bitOffset = 0
    this.ensureCapacity(1)
    this.buffer[this.offset++] = value
  }

  writeBytes (bytes) {
    const length = bytes.length

    if (bytes != null) {
      this.writeInt(length)
      this.buffer = Buffer.concat([this.buffer, bytes])
      this.offset += length
      return
    }

    this.writeInt(-1)
  }


  ensureCapacity (capacity) {
    const bufferLength = this.buffer.length

    if (this.offset + capacity > bufferLength) {
      // eslint-disable-next-line new-cap
      const tmpBuffer = new Buffer.alloc(capacity)
      this.buffer = Buffer.concat([this.buffer, tmpBuffer])
    }
  }

  send () {
    this.encode()
    const header = Buffer.alloc(7)
    header.writeUInt16BE(this.id, 0)
    header.writeUIntBE(this.buffer.length, 2, 3)
    header.writeUInt16BE(this.version, 5)
    this.client.write(Buffer.concat([header, this.buffer]))
    this.client.log(`Packet ${this.id} (${this.constructor.name}) was sent.`)
  }
}

module.exports = ByteStream
