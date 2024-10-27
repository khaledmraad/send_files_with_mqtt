import * as mqtt from 'mqtt/dist/mqtt.min';

let client;

self.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'connect':
      connect(payload);
      break;
    case 'subscribe':
      subscribe(payload);
      break;
    case 'publish':
      publish(payload);
      break;
    case 'disconnect':
      disconnect();
      break;
  }
});

function connect({ brokerUrl, options }) {
  client = mqtt.connect(brokerUrl, options);

  client.on('connect', () => {
    self.postMessage({ type: 'connected' });
  });

  client.on('message', (topic, message) => {
    self.postMessage({ type: 'message', payload: { topic, message: message.toString() } });
  });

  client.on('error', (error) => {
    self.postMessage({ type: 'error', payload: error.message });
  });
}

function subscribe(topic) {
  if (client) {
    client.subscribe(topic, (error) => {
      if (error) {
        self.postMessage({ type: 'error', payload: `Failed to subscribe: ${error.message}` });
      } else {
        self.postMessage({ type: 'subscribed', payload: topic });
      }
    });
  }
}

function publish({ topic, message }) {
  if (client) {
    client.publish(topic, message, (error) => {
      if (error) {
        self.postMessage({ type: 'error', payload: `Failed to publish: ${error.message}` });
      } else {
        self.postMessage({ type: 'published', payload: { topic, message } });
      }
    });
  }
}

function disconnect() {
  if (client) {
    client.end();
    self.postMessage({ type: 'disconnected' });
  }
}
