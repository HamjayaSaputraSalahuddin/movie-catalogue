const NotificationHelper = {
  sendNotification({ title, options }) {
    if (!this.__checkAvailability()) {
      console.log('Notification not supported in this browser');
      return;
    }

    if (!this.__checkPermission()) {
      console.log('User did not yet granted permission');
      this.__requestPermission();
      return;
    }

    this.__showNotification({ title, options });
  },

  __checkAvailability() {
    return 'Notification' in window;
  },

  __checkPermission() {
    return Notification.permission === 'granted';
  },

  async __requestPermission() {
    const status = await Notification.requestPermission();

    if (status === 'denied') {
      console.log('Notification Denied');
    }

    if (status === 'default') {
      console.log('Permission closed');
    }
  },

  async __showNotification({ title, options }) {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    serviceWorkerRegistration.showNotification(title, options);
  },
};

export default NotificationHelper;
