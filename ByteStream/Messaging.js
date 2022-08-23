class Messaging{
    constructor(client){
        this.client = client;
    };

    send(message){
        let header = Buffer.alloc(7);
        header.writeUInt16BE(message.id, 0);
        header.writeUIntBE(message.buffer.buffer.length, 2, 3);
        header.writeUInt16BE(message.version, 5);
        this.client.write(Buffer.concat([header, message.buffer.buffer]));
        this.client.log(`Packet ${message.id} was sent.`)
    }
};

module.exports = Messaging