const net = require('net') // Modules
const config = require("./config.json")
const StreamEncrypter = require("./Titan/Crypto")
const MessageFactory = require('./Protocol/MessageFactory')
const MessagesHandler = require("./Networking/MessagesHandler")
const Queue = require("./Networking/Queue")
const PatcherServer = require("./Patcher/Server")
require("./Utils/Logger");

const server = new net.Server() // Class inits
const Messages = new MessageFactory()
const Patcher = new PatcherServer()

const PORT = config.port

global.sessions = new Map(); // Sessions

const clearSession = (sessionId) => global.sessions.delete(sessionId) // Clear session

const getLastSessionId = () => { // Get last session ID
  const sessionsIds = Array.from(global.sessions.keys())

  return sessionsIds.length == 0 ? 0 : sessionsIds[sessionsIds.length - 1]
}

const destroySession = (session, logType = "log", reason = "Client disconnected.") => {
  if (!session) return;

  switch (logType) {
    case "log":
      session.log(reason)
      break
    case "warn":
      session.warn(reason)
      break
    case "err":
      session.errLog(reason)
      break
    default:
      session.log(reason)
  }

  session.destroy()
  clearSession(session.id)
}

global.destroySession = destroySession

server.on('connection', async (session) => {
  session.setNoDelay(true)
  session.setTimeout(config.sessionTimeoutSeconds * 1000)

  session.ip = session.remoteAddress.split(':').slice(-1) + `:${session.remotePort}`;

  session.log = (text) => Client(session.ip, text)
  session.warn = (text) => ClientWarn(session.ip, text)
  session.errLog = (text) => ClientError(session.ip, text)

  session.crypto = config.crypto.activate ? new StreamEncrypter(config.crypto.type) : null

  session.id = getLastSessionId() + 1

  session.queue = new Queue(config.queue.maxSize, config.disableQueuebugtxtFile)

  global.sessions.set(session.id, session)

  session.log(`A wild connection appeard! (SESSIONID: ${session.id})`)
  
  const MessageHandler = new MessagesHandler(session, Messages)

  session.on('data', async (bytes) => {
    let messageHeader = {}

    session.queue.push(bytes)

    switch (session.queue.state) {
      case session.queue.QUEUE_OVERFILLED:
        if (config.queue.enableOverfillingWarning) session.warn(`Queue is overfilled! Queue size: ${session.queue.size()}`)

        if (config.queue.disconnectSessionOnOverfilling) {
          return destroySession(session, "warn", "Client disconnected.")
        }
      break;
      case session.queue.QUEUE_PUSHED_MORE_THAN_EXPECTED:
        session.warn(`Queue got more bytes than expected! Expected: ${session.queue.getQueueExpectedSize()} size. Got: ${session.queue.size()} size.`)
      break;
      case session.queue.QUEUE_DETECTED_MERGED_PACKETS:
        session.warn(`Queue detected merged packets!`)
      break;
    }

    if (!session.queue.isBusy()) {
      const queueBytes = session.queue.release()

      if (Array.isArray(queueBytes)) {
        session.log("Handling merged packets...")
        for(let packet of queueBytes) {
          if (config.crypto.activate) {
            packet.bytes = session.crypto.decrypt(packet.id, packet.bytes)
          }
          
          await MessageHandler.handle(packet.id, packet.bytes, { })
        }

        return session.log("Merged packets was handled.")
      }
      
      messageHeader = {
        id: queueBytes.readUInt16BE(0),
        len: queueBytes.readUIntBE(2, 3),
        version: queueBytes.readUInt16BE(5),
        bytes: queueBytes.slice(7, messageHeader.len)
      }

      if (config.crypto.activate) {
        messageHeader.bytes = session.crypto.decrypt(messageHeader.id, messageHeader.bytes)
      }
  
      await MessageHandler.handle(messageHeader.id, messageHeader.bytes, {})
    }
  })

  session.on('end', async () => {
    return destroySession(session, "log", "Client disconnected.")
  })

  session.on('error', async error => {
    if (error.message.includes("ECONNRESET")) {
      return destroySession(session, "log", "Client disconnected.")
    }

    try {
      destroySession(session, "err", "A wild error!")
      
      return console.error(error)
    } catch (e) { }
  })

  session.on('timeout', async () => {
    return destroySession(session, "warn", "Session timeout was reached.")
  })
})

server.once('listening', () => {
  ServerLog(`${config.serverName} started on ${PORT} port!`)
  if (config.patcher.enabled) {
    Patcher.start();
  }

  if (config.enableAdminConsole) {
    rl.setPrompt("> ")
    rl.prompt();

    global.rl.on('close', () => {
      Warn('Server stopped!');
      server.close();
      process.exit(0)
    });
  }
})

server.listen(PORT)

process.on("uncaughtException", e => Warn(e.stack));

process.on("unhandledRejection", e => Warn(e.stack));
