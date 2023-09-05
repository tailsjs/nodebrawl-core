class Messaging {
    constructor(session){
        this.session = session;
    }

    send () {
        if (this.id < 20000) return;
    
        this.encode()
    
        const header = this.generateHeader(this.id, this.stream.buffer.length, this.version)

        this.session.write(Buffer.concat([header, this.stream.buffer, Buffer.from([0xFF, 0xFF, 0x0, 0x0, 0x0, 0x0, 0x0])]))
        this.session.log(`Packet ${this.id} (${this.constructor.name}) was sent.`)
    }

    generateHeader (id, length, version) {
        const header = Buffer.alloc(7)

        header.writeUInt16BE(id, 0)
        header.writeUIntBE(length, 2, 3)
        header.writeUInt16BE(version, 5)

        return header
    }
}

module.exports = Messaging