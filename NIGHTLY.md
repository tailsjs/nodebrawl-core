# Nightly Changelogs.
* If you expirienced some bug, write about it in `Issues`

### 2023.11.10
* Rewrited `MessageFactory` packet loader. Now it can use directories.
* * Now you need to change imports if you put packet in subdirectory.
```js
// In /Protocol/Messages/Client
const PiranhaMessage = require("../../PiranhaMessage") 
const ByteStream = require("../../../ByteStream")
// In /Protocol/Messages/Client/Subdirectory
const PiranhaMessage = require("../../../PiranhaMessage") 
const ByteStream = require("../../../../ByteStream")
```
* * You can back to legacy loader, if you have some troubles with new one.
* * Legacy Loader will be removed after 3.1 release.

### 2023.09.22
* Added `sessions`.
* `Messaging` class got new functions `sendToSession` and `sendToSessions`
* * It means, you now can send packets from one session to another. (For example, `AllianceDataMessage`)
* * Also it means, you can code to do send packets by lowID.
```js
const SESSION_ID = 1
const SECOND_SESSION_ID = 5

new ExampleMessage(this.session).sendToSession(SESSION_ID)
new ExampleMessage(this.session).sendToSessions([ SESSION_ID, SECOND_SESSION_ID ])
```
* `Messaging`, `MessagesHandler` and `CryptoRC4` got `JSDocs`

### 2023.09.07
* Added `config.json` file for setting some parameters.
* New core name! `nodebrawl-core` -> `nodesc-core`. Repo name will be changed after 3.0 release.
* Added RC4 crypto implementation. You can change keys in `config.json` file.

### 2023.09.06
* MessageFactory now uses `node:path`
* MessageFactory got new function `getAllPackets`
* MessageFactory got rid of functions `handle` and `getPackets`.
* Now all logs are colored.
* `ByteStream` class got new function `writeHex`
```js
this.stream.writeHex("00AA00")
```
* New `MessagesHandler` class, whichs handles packets.
* Removed `ByteArray` class.
* New function in `Messaging` class `generateHeader`, which generates header for packet.

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
* Stable packet decoding
```js
const Queue = require("./Networking/Queue")

session.queue = new Queue()

// When got something

if (session.queue.isBusy()) {
    session.queue.push(bytes)

    if (session.queue.isBusy()){
        bytes = session.queue.release()
    } else {
        return;
    }
} 
```