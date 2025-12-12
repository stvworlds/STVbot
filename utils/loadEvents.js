const fs = require('fs');
const path = require('path');

module.exports = function loadEvents(client) {
  const eventsPath = path.join(__dirname, '..', 'events');

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.js')) {
        const event = require(fullPath);
        if (!event.event || typeof event.execute !== 'function') continue;

        const emitter = event.emitter || client;
        emitter.setMaxListeners(100)
        const run = (...args) => event.execute(...args, client);

        try {
          if (event.once) {
            emitter.once(event.event, run);
          } else {
            emitter.on(event.event, run);
          }
        } catch (err) {
          console.error(`Failed to process event ${entry.name} with type ${event.event}. Error message:`)
          console.error(err)
        }
        
      }
    }
  }

  walk(eventsPath);
};
