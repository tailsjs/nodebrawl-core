# Nightly Changelogs.
* If you expirienced some bug, write about it in `Issues`

### 2023.09.??
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
* Hm?
