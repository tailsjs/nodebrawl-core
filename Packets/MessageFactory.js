const fs = require("fs");

class MessageFactory{
    constructor(){
        this.packets = {};
        fs.readdir('./Packets/Messages/Client', (err, files) => {
            files.forEach(e => {
                let packet = require(`./Messages/Client/${e.replace(".js", "")}`);
        
                this.packets[packet.id] = packet.handle 
            })
        })
    };

    handle(id){
        return this.packets[id]
    };

    getPackets(){
        return Object.keys(this.packets)
    }
};

module.exports = MessageFactory