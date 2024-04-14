const readline = require("node:readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Admin Console
rl.on('line', async (input) => {
    const command = input.trim().split(" ")[0];

    const args = input.trim().split(" ").slice(1).map(e => isNaN(e) ? e : Number(e));
  
    switch (command) {
      case 'exit':
        Warn("Server is off...")
        process.exit(0);
        break;
      case 'sessions':
        Log("Sessions amount:", sessions.size);
        break;
      case 'sessiondata':
        if (args.length < 1) return Warn("Usage: sessiondata <session id>")
        const session = global.sessions.get(args[0])

        if (!session) return Warn(`Session with ID ${args[0]} not found!`)
        Log(`Session ip: ${session.ip}\nQueue state: ${session.queue.state}`)
      break;
      case 'disconnect':
        if (args.length < 1) return Warn("Usage: disconnect <session id>")
        const sessionData = global.sessions.get(args[0])

        if (!sessionData) return Warn(`Session with ID ${args[0]} not found!`)

        destroySession(sessionData, "warn", "Client manually was disconnected!")
        Log(`Session with ID ${args[0]} was disconnected!`)
      break;
      default:
        Log(`Command "${command}" is not defined!`);
    }
  
    rl.prompt();
});

rl.setPrompt("> ")

global.rl = rl