# Nightly Changelogs.
* If you expirienced some bug, write about it in `Issues`

### 2024.02.03
* Rewrited `Logger`.
* * Added new `Debug` and `ServerLog` functions.
```js
ServerLog("Hello, world!") // [SERVER] >> Hello, world!
Debug("Hey, this is debug!") // [index.js:2:7] >> Hey, this is debug!
Debug("Now it shows time!", true) // [index.js:3:7] (Sat, 03 Feb 2024 00:00:00 GMT) >> Now it shows time!
```
* New config in `config.json`
* * `enableLogs` - Enable logs? (Socket connecting, etc.) (Doesn't affect on server logs). Default: `true`
* More jsdocs.

### 2023.11.17
* At most fixed TCP issue with packet merging.
* If queue will detect incorrect packet, it will report needfull information into `queuebug.txt` file and will turn off server.
* * You can disable it in `config.json`
* New config in `config.json`
* * `disableQueuebugtxtFile` - Disable queue bug report into file? Default: `false`. Will be removed after `3.0`

### 2023.11.15
* You can now configure the maximum inactivity time of the session.
* New config in `config.json`
* * `sessionTimeoutSeconds` - Maximum number of seconds of session inactivity. Default: `15`

### 2023.11.11
* New `Queue` class, which handles big packets.
* * Before:
```js
// It will split packet, if packet bytes length is more than 65,535
session.on('data', async (packet) => {
    const messageHeader = {
      id: packet.readUInt16BE(0),
      len: packet.readUIntBE(2, 3),
      version: packet.readUInt16BE(5),
      bytes: packet.slice(7, this.len)
    }

    await MessageHandler.handle(messageHeader.id, messageHeader.bytes, {}) // For example, it will try to handle packets 10100, 94316, 883134
})
``` 
* * After:
```js
// If it catches splitted packet, it will put in Queue. When packet length will be equal with packet bytes length (header excludes), it will release bytes to MessageHandler.
session.on('data', async (bytes) => {
    let messageHeader = {}

    session.queue.push(bytes)

    if (!session.queue.isBusy()) {
      const queueBytes = session.queue.release()
      messageHeader = {
        id: queueBytes.readUInt16BE(0),
        len: queueBytes.readUIntBE(2, 3),
        version: queueBytes.readUInt16BE(5),
        bytes: queueBytes.slice(7, this.len)
      }
    } else {
      return;
    }

    await MessageHandler.handle(messageHeader.id, messageHeader.bytes, {}) // Now it will handle only 10100 in that case.
})
```
* Also for `Query` some configs in `config.json` was added.
* * `maxQueueSize` - Max queue bytes size. If queue overfills, it will warn you, if you enabled `enableQueueOverfillingWarning`. You can set number to `0`, if you want to disable this. Default: `1024`
* * `disconnectSessionOnQueueOverfilling` - Disconnect session if queue overfills? Default: `true`
* * `enableQueueOverfillingWarning` - Warn you if session queue is overfilled? Default: `true`
* `Queue` have states.
* * `0` - `QUEUE_FREE` - Queue is free.
* * `1` - `QUEUE_BUSY` - Queue is busy.
* * `2` - `QUEUE_OVERFILLED` - Queue is overfilled.
* * `3` - `QUEUE_PUSHED_MORE_THAN_EXPECTED` - Queue size is more than expected.

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
* Logging level
