const LogicLong = require("../../LogicLong");

class ChecksumEncoder {
    checksum = 0
    snapshotChecksum = 0
    enabled = false

    constructor () {
        this.enabled = true;
    }

    enbaleChecksum (enable) {
        if (!this.enabled || enable) {
            if (!this.enabled && enable) {
                this.checksum = this.snapshotChecksum
            }

            this.enabled = enable
        } else {
            this.snapshotChecksum = this.checksum
            this.enabled = false
        }
    };

    resetChecksum () {
        this.checksum = 0
    };

    writeBoolean (boolean) {
        this.checksum = (boolean ? 13 : 7) + this.rotateRight(this.checksum, 31)
    };

    writeByte (byte) {
        this.checksum = byte + this.rotateRight(this.checksum, 31) + 11
    };

    writeShort (short) {
        this.checksum = short + this.rotateRight(this.checksum, 31) + 19
    };

    writeInt (int) {
        this.checksum = int + this.rotateRight(this.checksum, 31) + 9
    };

    writeVInt (vint) {
        this.checksum = vint + this.rotateRight(this.checksum, 31) + 33
    };

    writeLogicLong (logicLong) {
        if (!(logicLong instanceof LogicLong)) {
            throw new Error("Long must be instance of LogicLong!")
        }

        logicLong.encode(this)
    }

    writeLongLong (longlong) {
        const high = longlong >> 32
        const low = longlong

        this.checksum = high + low + this.rotateRight(low + this.rotateRight(this.checksum, 31) + 67, 31) + 91
    };

    writeString (string) {
        this.checksum = (string != null ? string.length + 28 : 27) + this.rotateRight(this.checksum, 31)
    };

    writeStringReference(string) {
        this.checksum = string.length + this.rotateRight(this.checksum, 31) + 38
    };

    writeBytes (buffer, length) {
        this.checksum = ((buffer ? length + 28 : 27) + (this.checksum >> 31)) | (this.checksum << 1)
    }

    isChecksumEnabled () {
        return this.enabled;
    }

    isChecksumOnlyMode() {
        return true;
    }

    equals (encoder) {
        if (!(encoder instanceof ChecksumEncoder)) {
            throw new Error("Encoder must be instance of ChecksumEncoder!")
        }

        if (encoder != null) {
            let checksum = encoder.checksum
            let currentChecksum = this.checksum

            if (!encoder.enabled) {
                checksum = encoder.snapshotChecksum
            }

            if (!this.enabled) {
                currentChecksum = this.snapshotChecksum
            }

            return checksum == currentChecksum
        }

        return false
    };

    rotateRight (value, count) {
        return (value >> count) | (value << (32 - count))
    };
}

module.exports = ChecksumEncoder