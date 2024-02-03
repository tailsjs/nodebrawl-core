const config = require("../config.json")

class Messaging {
    /**
     * Messaging
     * 
     * Class for server responses.
     * 
     * @param { Session } session User session (`this.session`)
     */
    constructor(session){
        this.session = session;
    }

    /**
     * Send packet to user session.
     */
    send () {
        if (this.id < 20000) return;
    
        this.encode()

        if (config.crypto.activate) {
            this.stream.buffer = this.session.crypto.encrypt(this.stream.buffer)
        }
    
        const header = this.generateHeader(this.id, this.stream.buffer.length, this.version)

        this.session.write(Buffer.concat([header, this.stream.buffer, Buffer.from([0xFF, 0xFF, 0x0, 0x0, 0x0, 0x0, 0x0])]))
        this.session.log(`Packet ${this.id} (${this.constructor.name}) was sent.`)
    }

    /**
     * Send packet to another user session
     * @param { Number } sessionId Session ID
     * 
     * @example
     * ```js
     *  new ExampleMessage(this.session).sendToSession(1)
     * ```
     */
    sendToSession (sessionId) {
        if (this.id < 20000) return;

        this.encode()

        const session = sessions.find(session => session.id === sessionId)

        if (!session) return;

        const header = this.generateHeader(this.id, this.stream.buffer.length, this.version)

        session.write(Buffer.concat([header, this.stream.buffer, Buffer.from([0xFF, 0xFF, 0x0, 0x0, 0x0, 0x0, 0x0])]))
        session.log(`Packet ${this.id} (${this.constructor.name}) was sent to session with ID ${session.id}.`)
    }

    /**
     * Send packet to another users sessions
     * @param { Array } sessionIdArray Session ID Array
     * 
     * @example
     * ```js
     *  new ExampleMessage(this.session).sendToSessions([ 1, 5 ])
     * ```
     */
    sendToSessions (sessionIdArray) {
        if (this.id < 20000) return;

        this.encode()

        const selectedSessions = sessions.filter(session => sessionIdArray.includes(session.id))

        if (!selectedSessions) return;

        const header = this.generateHeader(this.id, this.stream.buffer.length, this.version)
        for (let session of selectedSessions) {
            session.write(Buffer.concat([header, this.stream.buffer, Buffer.from([0xFF, 0xFF, 0x0, 0x0, 0x0, 0x0, 0x0])]))
            session.log(`Packet ${this.id} (${this.constructor.name}) was sent to session with ID ${session.id}.`)
        }
    }

    /**
     * Generates header for packet.
     * @param { Number } id Packet ID
     * @param { Number } length Packet length
     * @param { Number } version Packet version
     * @returns { Buffer } Packet header
     */
    generateHeader (id, length, version) {
        const header = Buffer.alloc(7)

        header.writeUInt16BE(id, 0)
        header.writeUIntBE(length, 2, 3)
        header.writeUInt16BE(version, 5)

        return header
    }
}

module.exports = Messaging