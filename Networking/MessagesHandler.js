const LogicLaserMessageFactory = require("../Protocol/LogicLaserMessageFactory")

class MessagesHandler {
    /**
     * MessagesHandler
     * 
     * Class for handling client packets
     * 
     * @param { Session } session User session (`this.session`)
     * @param { MessageFactory } MessageFactory MessageFactory class instance
     */
    constructor (session, MessageFactory) {
        this.session = session
    }

    /**
     * Handle message
     * @param { Number } id Packet ID
     * @param { Buffer } bytes Packet bytes
     * @param { Object } args Some other args, if you want.
     */
    async handle (id, bytes, args) {
        const MessageHandler = LogicLaserMessageFactory.createMessageByType(id)

        if (!MessageHandler) {
            this.session.log(`Gotcha undefined ${id} packet!`)
            return
        }

        try {
            const MessageInstance = new MessageHandler(bytes, this.session, args)

            this.session.log(`Gotcha ${id} (${MessageInstance.constructor.name}) packet!`)

            await MessageInstance.decode()
            await MessageInstance.execute()
        } catch(e) {
            this.session.errLog(e.stack)
        }
    }
}

module.exports = MessagesHandler