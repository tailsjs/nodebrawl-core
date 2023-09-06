const net = require('net')
const config = require("./config.json")
const Crypto = require("./Crypto/RC4")
const MessageFactory = require('./Protocol/MessageFactory')
const server = new net.Server()
const Messages = new MessageFactory()
const MessagesHandler = require("./Networking/MessagesHandler")
require("colors"), require("./Utils/Logger");

const PORT = config.port

server.on('connection', async (session) => {
  session.setNoDelay(true)

  session.ip = session.remoteAddress.split(':').slice(-1);

  session.log = function (text) {
    return Client(session.ip, text)
  }

  session.errLog = function (text) {
    return ClientError(session.ip, text)
  }

  session.crypto = new Crypto(config.crypto.keys.key, config.crypto.keys.nonce)

  session.log('A wild connection appeard!')
  
  const packets = Messages.getAllPackets();
  const MessageHandler = new MessagesHandler(session, packets)

  session.on('data', async (packet) => {
    const messageHeader = {
      id: packet.readUInt16BE(0),
      len: packet.readUIntBE(2, 3),
      version: packet.readUInt16BE(5),
      bytes: packet.slice(7, this.len)
    }

    if (config.crypto.activate) {
      messageHeader.bytes = await session.crypto.decrypt(messageHeader.bytes)
    }

    await MessageHandler.handle(messageHeader.id, messageHeader.bytes, {})
  })

  session.on('end', async () => {
    return session.log('Client disconnected.')
  })

  session.on('error', async error => {
    try {
      session.errLog('A wild error!')
      console.error(error)
      session.destroy()
    } catch (e) { }
  })
})

server.once('listening', () => Log(`${config.serverName} started on ${PORT} port!`))
server.listen(PORT)


process.on("uncaughtException", e => Warn(e.stack));

process.on("unhandledRejection", e => Warn(e.stack));
