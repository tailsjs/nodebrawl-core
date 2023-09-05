class MessagesHandler {
    constructor(session, packets){
        this.session = session
        this.packets = packets
    }

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

    isPacketExists(id){
        return Object.keys(this.packets).includes(id)
    }

    getPacketHandler(id){
        return this.packets[id]
    }
}

module.exports = MessagesHandler