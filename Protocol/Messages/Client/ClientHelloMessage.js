const PiranhaMessage = require("../../PiranhaMessage");
const ServerHelloMessage = new (require("../Server/ServerHelloMessage"))

class ClientHelloMessage extends PiranhaMessage{
    constructor(client, bytes){
        super(bytes)
        this.client = client;
        this.id = 10100
        this.version = 0
    }

    decode(){
        // this.readInt()
    }

    process(){
        ServerHelloMessage.send(this.client)
    }
}

module.exports = ClientHelloMessage