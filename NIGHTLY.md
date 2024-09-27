# Nightly Changelogs.
* If you expirienced some bug, write about it in `Issues`

### 2024.09.27
* `process` functions for client packets now named `execute`
* New method of working with CSV Files
* * New classes `ResourceManager`, `LogicResources`, `LogicDataTableResource`, `LogicDataTables`, `LogicDataTable`, `LogicData`, `CSVNode`, `CSVTable`, `CSVRow`, `CSVColumn`.. And many other
* * For working with data, you need `LogicDataTables` class.
```js
const LogicDataTables = require("./Logic/Data/LogicDataTables")

const ShotgunGirlData = LogicDataTables.getCharacterDataByIndex(0)

ShotgunGirlData.isHero() // true
```
* * You can create your own methods.
```js
// LogicDataTables

static getLocaleData () {
  return LogicDataTables.tables[LogicDataType.LOCALES]
}

static getLocaleDataByIndex (index) {
  return LogicDataTables.getLocaleData().items[index]
}

// LogicLocaleData
const LogicVersion = require("../../LogicVersion")

getLaserboxUrl () {
  return LogicVersion.isStage() ? this.laserboxUrlStagingUrl : this.laserboxUrl
}

// SomeOtherNerdFile
const LogicDataTables = require("./Logic/Data/LogicDataTables")

const LocaleData = LogicDataTables.getLocaleDataByIndex(0)

LocaleData.getLaserboxUrl() // https://inbox.brawlstars.com/
```
* * It means `CSVParser` is outdated and was removed.
* Fixes in `ByteStream.readStringReference` and `ByteStream.writeStringReference`
```js
ByteStream.writeStringReference("is technically same") // but...

const maxStringLength = 10
ByteStream.readStringReference(maxStringLength) // you need to write here your own max string length
```
* Added `LogicRandom` and `LogicMersenneTwisterRandom` classes
```js
const LogicRandom = require("./Titan/Random/LogicRandom")
const seed = 1488
const random = new LogicRandom(seed)
random.rand(98) // 21

const LogicMersenneTwisterRandom = require("./Titan/Random/LogicMersenneTwisterRandom")
const seed = 1488
const random = new LogicMersenneTwisterRandom(seed)
random.rand(98) // 94
```
* Now `MessageFactory` renamed to `LogicLaserMessageFactory`... and it's now static class.
```js
const LogicLaserMessageFactory = require("./Protocol/LogicLaserMessageFactory")

LogicLaserMessageFactory.loadMessages()

LogicLaserMessageFactory.createMessageByType(10100) // [class ClientHelloMessage extends PiranhaMessage]
```
* New `LogicConfig` class.
* * It means, `config.json` file doesn't exists anymore. It was divided to 4 different files `config.{env}.json`
* Small fixes

### 2024.05.02
* Added `ChecksumEncoder`
* Some changes in `config.json`
* * Now `sessionTimeoutSeconds` in `session` object.
* * `session` - Session settings
* * `session.timeoutSeconds` - Maximum number of seconds of session inactivity. Default: `15`
* * `session.maxConnections` - Maximum number of connections on one server. Default: `100`. You can disable it if value is `0`
* * `session.maxConnectionsPerIP` - Maximum number of connections from one IP. Default: `10`
* * Now `enableLogs` and `enableAdminConsole` in `logger` object
* * `logger` - Logger settings
* * `logger.enableServerLogs` - Enable server logs. Default: `true`
* * `logger.enableClientLogs` - Enable client logs. Default: `true`
* * `logger.enableAdminConsole` - Enable admin console. Default: `true`
* * `logger.save` - Saving logs settings.
* * `logger.save.enabled` - Enable logs savings. Default: `true`
* * `logger.save.path` - Path to logs folder. Default: `./logs/`
* `Messaging` class got new function `sendToAll`
* `Messaging` functions got new arg, named `doNotEncrypt`
* * It will send uncrypted packet, if you have enabled crypto.
```js
new ExampleMessage(this.session).send(true)
new ExampleMessage(this.session).sendToSession(true)
new ExampleMessage(this.session).sendToSessions(true)
new ExampleMessage(this.session).sendToAll(true)
```

### 2024.04.14
* Biggest update ever.
* Rewrited most of the core.
* Added some related to Brawl Stars classes (they're in `/Logic` directory)
* * Technical (`LogicVersion`) {maybe part of titan idk lmao}
* * Related to ByteStream (`ChronosTextEntry`, `ChronosFileEntry`)
* * Related to some messages (`Home/LogicGemOffer`, `PlayerDisplayData`, `ProLeagueSeasonData`, `LogicBattlePlayerMap`)
* * You can use them like:
```js
const PlayerDisplayData = require("../../../../Logic/PlayerDisplayData")
class SomeClientMessage extends PiranhaMessage {
  constructor (bytes, session) {
    ...
    this.stream = this.DataStream.getByteStream(bytes);
  }

  decode () {
    this.playerDisplayData = new PlayerDisplayData(this.stream)
  }

  process () {
    console.log(this.playerDisplayData.name) // tailsjs
  }
}
```
* * or if static...
```js
const LogicVersion = require("../../../../Logic/LogicVersion")

class SomeServerMessage extends PiranhaMessage {
  constructor (bytes, session) {
    ...
    this.stream = this.DataStream.getByteStream();
  }

  async encode () {
    this.stream.writeString("Server version is: " + LogicVersion.getVersionString())
  }
}
```
* Added `Patcher`
* * Your best friend if you don't want to update apk so often.
* * You need to enable it in `config.json` and push your csv files into `GameAssets` directory
* * Also you need to write logic to make patcher fully work.
* Rewrited `MessageFactory`
* * It means, legacy loader was removed.
* * Now you can get messages like
```js
const MessageFactory = require('./Protocol/MessageFactory')
const Messages = new MessageFactory()

const ClientHelloMessage = Messages.getMessage(10100)
// you got this
```
* Rewrited `Crypto`
* * Now it's named `StreamEncrypter` and it's very easy to use.
* * Also added `Pepper` encryption.
```js
const Encrypter = new StreamEncrypter(CRYPTO_TYPE) // 0 - RC4, 1 - Pepper

Encrypter.encrypt(20100, serverPacketData)
Encrypter.decrypt(10100, clientPacketData)
```
* ByteStream now moved into `Titan/DataStream` directory
* * Also added `ByteStreamHelper` class
* Added some related to Titan classes (they're in `/Titan` directory)
* * Crypto-related classes in `Titan/Crypto` directory
* * Byte-working classes in `Titan/DataStream` directory
* * Yes, i added `BitStream` also.
```js
const DataStream = require("./Titan/DataStream/")

DataStream.getByteStream(bytes)
DataStream.getByteStreamHelper(ByteStream)
DataStream.getBitStream(bytes)
```
* * Also some helpful enums in `Titan/Enums` directory
* * Related to some messages (`GlobalID`, `LogicCompressedString`, `LogicLong`) <!-- Fuck LogicLong -->
* * Technical (`LogicMath`, `LogicHashTag`)
* Updated `Logger`
* * Now you can use it like `console.log()`
```js
require("./Utils/Logger")
Log("I hate", 42, "bananas") // i hate 42 bananas
```
* Added `AdminConsole`
* * I wrote some commands so you get the point
```console
> sessions
[LOG] >> Sessions amount: 1
> sessiondata 1
[LOG] >> Session IP: 127.0.0.1:67881
Queue state: 0
> disconnect 1
[127.0.0.1:50267] >> Client manually was disconnected!
[LOG] >> Session with ID 1 was disconnected!
> someunused
[WARNING] >> Command "someunused" is not defined!
> exit
[WARNING] >> Server is off...
```
* * You can disable it in `config.json`
* Some changes in `config.json`
* * `enableAdminConsole` - Enable admin console? Default: `true`
* * `crypto.type` - Encryption type. Default: `0`
* * `crypto.pepper` - Pepper settings
* * `crypto.pepper.client_secret_key` - Client secret key
* * `crypto.pepper.server_public_key` - Server public key
* * `patcher` - Patcher settings
* * `patcher.enabled` - Enable patcher? Default: `true`
* * `patcher.port` - Patcher port. Default: `80`
* * Queue settings now in one object
* * `queue` - Queue settings
* * `queue.maxSize` - Max queue bytes size. If queue overfills, it will warn you, if you enabled `queue.enableOverfillingWarning`. You can set number to `0`, if you want to disable this. Default: `1024`
* * `queue.disconnectSessionOnOverfilling` - Disconnect session if queue overfills? Default: `true`
* * `queue.enableOverfillingWarning` - Warn you if session queue is overfilled? Default: `true`
* * Removed `useLegacyPacketLoader` setting.

### 2024.02.10
* Update with QoL features. Maybe next is release.
* Added `Time` functions for easier work with time functions (Like shop, etc.)
* * You can change `unit` argument in `hasBeenPassed`, `addToTime`, `addToNowTime` from string to number, if you feel it so.
* * JSDocs also included!
```js
const Time = require("./Utils/Time")

parseTime("1 week, 2d, 3hours, 4 minutes, 5sec") // 788645000
hasBeenPassed(Date.now() - 6000, "5s") // true
hasBeenPassed(Date.now() + 10000, 15000) // false
addToTime(1000, "5m") // 301000
addToNowTime("5m") // Date.now() + 300000
```
* Added `CSVParser`.
* * It's easy-to-use. If you rewriting your poor server from `ClassicBrawl`, it's very easy to understand.
* * Here is example of parsing `characters.csv`
```js
const parse = require("./CSVParser")
const data = parse("../../GameAssets/csv_logic/characters.csv")

function getDefSkinById(id){
    return data[id].DefaultSkin
}

getDefSkinById(0) // BanditGirlDefault
getDefSkinById(1) // GunSlingerDefault
```

### 2024.02.05
* Rewrited `sessions` system.
* * Now it's using [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
* * All destroy session logic now in `destroySession` function.
```js
destroySession(session, "log", "Hey! I'm a session!")
destroySession(session, "warn", "Eeh?")
destroySession(session, "err", "Oh no! 9+10 is NOT 21! :(")
```

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
* Also for `Queue` some configs in `config.json` was added.
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
* Huh?