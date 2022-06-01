const ByteStream = require("../../../ByteStream");
const Messaging = require("../../../ByteStream/Messaging");

module.exports = {
    id: 20100,
    send: function(client){
        let buffer = new ByteStream();

        buffer.writeInt(24);
        for(let i = 0; i < 24; i++)
            buffer.writeInt(1);
        

        let message = new Messaging(client.client);
        message.send({
            id: this.id,
            buffer,
            version: client.version
        })
    }
}