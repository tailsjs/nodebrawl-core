const ByteArray = require("../Utils/ByteArray");
const util = require("../Utils/Utils");

class ByteStream {
    constructor(data) {
        if (data != null) {
            this.buffer = data;
        } else {
            this.buffer = new Buffer.alloc(0);
        }
        this.length = 0;
        this.offset = 0;
        this.bitOffset = 0;
    }

    readInt() {
        this.bitOffset = 0;
        return (this.buffer[this.offset++] << 24 |
            (this.buffer[this.offset++] << 16 |
                (this.buffer[this.offset++] << 8|
                    this.buffer[this.offset++])));
    }

    readShort() {
        this.bitOffset = 0;
        return (this.buffer[this.offset++] << 8 |
            this.buffer[this.offset++]);
    }

    writeShort(value) {
        this.bitOffset = 0;
        this.ensureCapacity(2);
        this.buffer[this.offset++] = (value >> 8);
        this.buffer[this.offset++] = (value);
    }
    writeInt(value) {
        this.bitOffset = 0;
        this.ensureCapacity(4);
        this.buffer[this.offset++] = (value >> 24);
        this.buffer[this.offset++] = (value >> 16);
        this.buffer[this.offset++] = (value >> 8);
        this.buffer[this.offset++] = (value);
    }
	
	getHex() {
		return util.bytesToHex(this.buffer);
	}
    readString() {
        var length = this.readInt();

        if (length > 0) {
            if (length < 90000) {
                var stringBytes = this.buffer.slice(this.offset, this.offset+length);
                var string = ByteArray.bytesToString(stringBytes);
                //var string = byteArray.bytesToString(stringBytes);
                this.offset += length;
                return string;
            }
            return null;
        }
        return null;
    }

    writeVInt(value) {
        this.bitOffset = 0;
        var temp = (value >> 25) & 0x40;

        var flipped = value ^ (value >> 31);

        temp |= value & 0x3F;

        value >>= 6;
        flipped >>= 6;

        if (flipped == 0) {
            this.writeByte(temp);
            return 0;
        }

        this.writeByte(temp | 0x80);

        flipped >>= 7;
        var r = 0;

        if (flipped) {
            r = 0x80;
        }

        this.writeByte((value & 0x7F) | r);

        value >>= 7;

        while (flipped != 0) {
            flipped >>= 7;
            r = 0;
            if (flipped) {
                r = 0x80;
            }
            this.writeByte((value & 0x7F) | r);
            value >>= 7;
        }
    }

    writeBoolean(value) {
        if (this.bitOffset == 0) {
            this.ensureCapacity(1);
            this.buffer[this.offset++] = 0;
        }

        if (value) {
            this.buffer[this.offset - 1] |= (1 << this.bitOffset);
        }

        this.bitOffset = (this.bitOffset + 1) & 7;
    }

    writeString(value) {
        if (value == null) {
            this.writeInt(-1);
            return;
        }
        if (value.length > 90000) {
            this.writeInt(-1);
            return;
        }

        this.writeInt(value.length);
        //this.ensureCapacity(value.length);
        var buf = Buffer.from(value, 'utf8');
        this.buffer = Buffer.concat([this.buffer, buf]);
        this.offset += value.length;
    }
    writeLongLong(value) {
        this.writeInt(value >> 32);
        this.writeInt(value);
    }
    writeByte(value) {
        this.bitOffset = 0;
        this.ensureCapacity(1);
        this.buffer[this.offset++] = value;
    }

    writeBytes(bytes) {
        var length = bytes.length;

        if (bytes != null) {
            this.writeInt(length);
            this.buffer = Buffer.concat([this.buffer, bytes]);
            this.offset += length;
            return;
        }

        this.writeInt(-1);
    }

    ensureCapacity(capacity) {
        var bufferLength = this.buffer.length;

        if (this.offset + capacity > bufferLength) {
            var tmpBuffer = new Buffer.alloc(capacity);
            this.buffer = Buffer.concat([this.buffer, tmpBuffer]);
        }
    }
}

module.exports = ByteStream;