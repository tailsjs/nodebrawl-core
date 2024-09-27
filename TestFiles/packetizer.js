'use strict';

class Packetizer {
    constructor() {
        this.buffer = null;
        this.packet = null;
    }

    packetize(data, callback) {
        let payloadLength = null

        if (this.buffer) {
            this.buffer = Buffer.concat([this.buffer, data]);
        } else {
            this.buffer = data;
        }

        while (this.buffer && this.buffer.length) {
            if (this.packet && this.packet.length) {
                payloadLength = this.packet.readUIntBE(2, 3);

                if (this.buffer.length >= payloadLength) {
                    if (this.packet) {
                        this.packet = Buffer.concat([this.packet, this.buffer.slice(0, payloadLength)]);
                    } else {
                        this.packet = this.buffer.slice(0, payloadLength);
                    }

                    callback(this.packet);
                    this.packet = null;

                    this.buffer = this.buffer.slice(payloadLength);
                } else {
                    break;
                }
            } else if (this.buffer.length >= 7) {
                this.packet = this.buffer.slice(0, 7);
                this.buffer = this.buffer.slice(7);
            } else {
                // we'll be coming back here soon, but looks like we went through current buffer without a full header yet
                break;
            }
        }
    }
}

module.exports = Packetizer;
