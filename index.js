const net = require("net");
const Packetizer = require("./ByteStream/packetizer");
const MessageFactory = require("./Packets/MessageFactory");
const server = new net.Server();
const Messages = new MessageFactory();


server.on("connection", async(client) => {
    console.log("A wild connection appeared!");
    const packets = Messages.getPackets();
    const packetizer = new Packetizer();
    
    client.on('data', async(chunk) => {
        packetizer.packetize(chunk, (packet) => {
            let message = {
                id: packet.readUInt16BE(0),
                len: packet.readUIntBE(2, 3),
                version: packet.readUInt16BE(5),
                payload: packet.slice(7, this.len),
                client
            };
            if(packets.indexOf(String(message.id)) != -1){
                try{
                    console.log(`Gotcha ${message.id} packet!`);
                    Messages.handle(message.id)(message)
                }catch(e){
                    console.log(e)
                }
            }else{
                console.log(`Gotcha undefined ${message.id} packet!`)
            }
        })
    });

    client.on('end', async () => {
        return console.error('Client disconnected.')
    });

    client.on('error', async error => {
        try {
            console.error('A wild error!');
            console.log(error);
            client.destroy()
        } catch (e) { }
    })
});

server.once('listening', () => console.log('Server started!'));
server.listen(9339)