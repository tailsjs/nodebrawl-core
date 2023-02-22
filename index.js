const net = require('net')
const MessageFactory = require('./Protocol/MessageFactory')
const server = new net.Server()
const Messages = new MessageFactory()

const PORT = 9339

server.on('connection', async (client) => {
  client.log = function (text) {
    return console.log(`[${this.remoteAddress.split(':').slice(-1)}] >> ${text}`)
  }

  client.log('A wild connection appeard!')
  
  const packets = Messages.getPackets();

  client.on('data', async (packet) => {
    const message = {
      id: packet.readUInt16BE(0),
      len: packet.readUIntBE(2, 3),
      version: packet.readUInt16BE(5),
      payload: packet.slice(7, this.len),
      client,
    }
    if (packets.indexOf(String(message.id)) !== -1) {
      try {
        const packet = new (Messages.handle(message.id))(message.payload, client)

        client.log(`Gotcha ${message.id} (${packet.constructor.name}) packet! `)

        await packet.decode()
        await packet.process()
      } catch (e) {
        console.log(e)
      }
    } else {
      client.log(`Gotcha undefined ${message.id} packet!`)
    }
  })

  client.on('end', async () => {
    return client.log('Client disconnected.')
  })

  client.on('error', async error => {
    try {
      client.log('A wild error!')
      console.log(error)
      client.destroy()
    } catch (e) { }
  })
})

server.once('listening', () => console.log(`[SERVER] >> Server started on ${PORT} port!`))
server.listen(PORT)


process.on("uncaughtException", e => console.log(e));

process.on("unhandledRejection", e => console.log(e));