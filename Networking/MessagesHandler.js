class MessagesHandler {
    constructor(session, packets){
        this.session = session
        this.packets = packets
    }

    /**
     * Handle packet
     * @param { Number } id Packet ID
     * @param { Buffer } bytes Packet bytes
     * @param { Object } args Some other args, if you want.
     */
    async handle(id, bytes, args){
        if(this.isPacketExists(id.toString())){
            try{
                const PacketHandler = this.getPacketHandler(id)
                const packet = new PacketHandler(bytes, this.session, args)

                this.session.log(`Gotcha ${id} (${packet.constructor.name}) packet!`)

                await packet.decode()
                await packet.process()
            } catch(e) {
                console.log(e)
            }
        }else{
            this.session.log(`Gotcha undefined ${id} packet!`)
        }
    }

    /**
     * Check if packet exists
     * @param { Number } id Packet ID
     * @returns { boolean } Is packet exists?
     */
    isPacketExists(id){
        return Object.keys(this.packets).includes(id)
    }

    /**
     * Get packet handler
     * @param { Number } id Packet ID
     * @returns { Class } Packet class 
     */
    getPacketHandler(id){
        return this.packets[id]
    }
}

module.exports = MessagesHandler