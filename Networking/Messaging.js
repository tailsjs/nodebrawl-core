const config = require("../config.json")

class Messaging {
    /**
     * Messaging
     * 
     * Class for server responses.
     * 
     * @param { Session } session User session (`this.session`)
     */
    constructor (session) {
        this.session = session;
    }

    /**
     * Send packet to user session.
     * 
     * @param { Boolean? } doNotEncrypt Skip packet encryption?
     * 
     * @example
     * ```js
     * new ExampleMessage(this.session).send()
     * new ExampleMessage(this.session).send(true)
     * ```
     */
    send (doNotEncrypt) {
        if (this.id < 20000) return;
    
        this.encode()

        const buffer = config.crypto.activate && !doNotEncrypt ? this.session.crypto.encrypt(this.id, this.stream.buffer) : this.stream.buffer
    
        const header = this.writeHeader(this.id, buffer.length, this.version)

        this.session.write(Buffer.concat([header, buffer, Buffer.from([0xFF, 0xFF, 0x0, 0x0, 0x0, 0x0, 0x0])]))
        this.session.log(`Packet ${this.id} (${this.constructor.name}) was sent.`)
    }

    /**
     * Send packet to another user session
     * 
     * @param { Number } sessionId Session ID
     * @param { Boolean? } doNotEncrypt Skip packet encryption?
     * 
     * @example
     * ```js
     *  new ExampleMessage(this.session).sendToSession(1)
     *  new ExampleMessage(this.session).sendToSession(2, true)
     * ```
     */
    sendToSession (sessionId, doNotEncrypt) {
        if (this.id < 20000) return;

        this.encode()

        const session = sessions.find(session => session.id === sessionId)

        if (!session) return;

        const buffer = config.crypto.activate && !doNotEncrypt ? session.crypto.encrypt(this.id, this.stream.buffer) : this.stream.buffer

        const header = this.writeHeader(this.id, buffer.length, this.version)

        session.write(Buffer.concat([header, buffer, Buffer.from([0xFF, 0xFF, 0x0, 0x0, 0x0, 0x0, 0x0])]))
        session.log(`Packet ${this.id} (${this.constructor.name}) was sent to session with ID ${session.id}.`)
    }

    /**
     * Send packet to another users sessions
     * @param { Array } sessionIdArray Session ID Array
     * @param { Boolean? } doNotEncrypt Skip packet encryption?
     * 
     * @example
     * ```js
     *  new ExampleMessage(this.session).sendToSessions([ 2, 4 ])
     *  new ExampleMessage(this.session).sendToSessions([ 1, 3, 5 ], true)
     * ```
     */
    sendToSessions (sessionIdArray, doNotEncrypt) {
        if (this.id < 20000) return;

        this.encode()

        const selectedSessions = sessions.filter(session => sessionIdArray.includes(session.id))

        if (!selectedSessions) return;

        for (const session of selectedSessions) {
            const buffer = config.crypto.activate && !doNotEncrypt ? session.crypto.encrypt(this.id, this.stream.buffer) : this.stream.buffer

            const header = this.writeHeader(this.id, buffer.length, this.version)
            session.write(Buffer.concat([header, buffer, Buffer.from([0xFF, 0xFF, 0x0, 0x0, 0x0, 0x0, 0x0])]))
            session.log(`Packet ${this.id} (${this.constructor.name}) was sent to session with ID ${session.id}.`)
        }
    }

    /**
     * Send packet to all sessions
     * 
     * @param { Boolean? } doNotEncrypt Skip packet encryption?
     * 
     * @example
     * ```js
     *  new ExampleMessage(this.session).sendToAll()
     *  new ExampleMessage(this.session).sendToAll(true)
     * ```
     */
    sendToAll (doNotEncrypt) {
        if (this.id < 20000) return;

        this.encode()

        for (const session of sessions) {
            const buffer = config.crypto.activate && !doNotEncrypt ? session.crypto.encrypt(this.id, this.stream.buffer) : this.stream.buffer
            const header = this.writeHeader(this.id, buffer.length, this.version)
            session.write(Buffer.concat([header, buffer, Buffer.from([0xFF, 0xFF, 0x0, 0x0, 0x0, 0x0, 0x0])]))
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
    writeHeader (id, length, version) {
        const header = Buffer.alloc(7)

        header.writeUInt16BE(id, 0)
        header.writeUIntBE(length, 2, 3)
        header.writeUInt16BE(version, 5)

        return header
    }
}

module.exports = Messaging