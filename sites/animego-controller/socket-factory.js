function socketFactory(host, actions) {
  const socket = new WebSocket(`ws://${host}/`);

  socket.onopen = function() {
    console.log('[INFO]: Connection established!');
  };

  socket.onmessage = function({ data }) {
    const { action, value } = JSON.parse(data);

    const knownAction = actions[action];

    if (!knownAction) {
      console.log(`[WARNING]: Unknown action: ${action}!`);
      return;
    }

    knownAction(value);
    console.log('[INFO]: Action performed: ', action, value);
  };

  socket.onclose = function() {
    console.error(`[ERROR]: Connection closed!`);
    
    // Try to reconnect
    socketFactory(host, actions);
  };

  socket.onerror = function(error) {
    console.error(`[ERROR]: ${error}`);
  };

  return socket;
}