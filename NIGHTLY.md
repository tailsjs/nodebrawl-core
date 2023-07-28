# Nightly Changelogs.
* If you expirienced some bug, write about it in `Issues`

### 2023.07.28
* A new `Messaging` class has been created.
* `PiranhaMessage` extends the `Messaging` class instead of the `ByteStream` class
```js
// Because of that, now you need to initialize ByteStream inside of constructor

constructor(bytes, session){
    super(session)
    this.session = session
    this.id = 10100
    this.version = 0
    this.stream = new ByteStream(bytes)
}

this.readInt() // old usage, will throw an error.
this.stream.readInt() // new usage
```
* Core now uses `session` word instead of `client`
* In `super` you need to use `session`.
```js
// Example:
constructor(bytes, session){
    super(session)
}
```
#### Ideas bag:
* Rewrite `MessageFactory` and write better `MessageHandler`
```js
// index.js
const MessageFactory = require("./Protocol/MessageFactory")
const MessageHandlerClass = require("./Networking/MessageHandler") // Maybe.

const packets = MessageFactory.getPackets()

const MessageHandler = new MessageHandlerClass(packets)

await MessageHandler.handle(Packet.ID, params)

// MessageHandler.js
class MessageHandler {
    constructor(packets){
        this.packets = packets
    }

    async handle(id, params){
        if(Object.keys(this.packets).includes(id)){
            // I guess you got it.
        }else{
            // This too
        }
    }
}
```
* Add `writeHex` into `ByteStream` class.
```js
this.stream.writeHex("00AA00")
```
* Colored logs.
