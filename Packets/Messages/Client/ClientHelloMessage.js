const ByteStream = require("../../../ByteStream");
const ServerHelloMessage = require("../Server/ServerHelloMessage");

module.exports = {
    id: 10100,
    handle: function(client){
        let data = new ByteStream(client.payload);
        ServerHelloMessage.send(client);
    }
}