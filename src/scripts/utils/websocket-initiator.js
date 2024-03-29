import NotificationHelper from './notification-helper';
import CONFIG from '../globals/config';

const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this.__onMessageHandler;
  },

  ___onMessageHandler(message) {
    console.log(message.data);
    const movie = JSON.parse(message.data);
    console.log(JSON.parse(message.data));
    NotificationHelper.sendNotification({
      title: `${movie.title} is on cinema!`,
      options: {
        body: movie.overview,
        image: `${CONFIG.BASE_IMAGE_URL + movie.poster_path}`,
      },
    });
  },
};

export default WebSocketInitiator;
