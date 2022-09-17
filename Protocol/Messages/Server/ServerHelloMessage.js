const PiranhaMessage = require("../../PiranhaMessage")

class ServerHelloMessage extends PiranhaMessage{
    constructor(client, bytes){
        super(client, bytes)
        this.id = 20100
        this.version = 0
    }

    encode(){
        this.writeInt(24)
        for(let i = 0; i < 24; i++)
            this.writeInt(1)
            
    }
}

module.exports = ServerHelloMessage