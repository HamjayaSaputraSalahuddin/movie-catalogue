const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this.__onMessageHandler;
  },

  ___onMessageHandler(message) {
    console.log(message.data);
    console.log(JSON.parse(message.data));
  },
};

export default WebSocketInitiator;
