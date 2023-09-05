const net = require('net')
const MessageFactory = require('./Protocol/MessageFactory')
const server = new net.Server()
const Messages = new MessageFactory()
const MessagesHandler = require("./Networking/MessagesHandler")
require("colors"), require("./Utils/Logger");

const PORT = 9339

server.on('connection', async (session) => {
  session.setNoDelay(true)

  session.log = function (text) {
    return Client(this.remoteAddress.split(':').slice(-1), text)
  }

  session.errLog = function (text) {
    return ClientError(this.remoteAddress.split(':').slice(-1), text)
  }

  session.log('A wild connection appeard!')
  
  const packets = Messages.getAllPackets();
  const MessageHandler = new MessagesHandler(session, packets)

  session.on('data', async (packet) => {
    const message = {
      id: packet.readUInt16BE(0),
      len: packet.readUIntBE(2, 3),
      version: packet.readUInt16BE(5),
      bytes: packet.slice(7, this.len)
    }

    await MessageHandler.handle(message.id, message.bytes, [])
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

server.once('listening', () => Log(`Server started on ${PORT} port!`))
server.listen(PORT)


process.on("uncaughtException", e => Warn(e));

process.on("unhandledRejection", e => Warn(e));
