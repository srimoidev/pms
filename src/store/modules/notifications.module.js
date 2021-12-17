export const notifications = {
  namespaced: true,
  state: {
    isConnected: false,
    notifications: []
  },
  actions: {
    connect({ commit }) {
      commit("SOCKET_CONNECT");
    },
    disconnect({ commit }) {
      commit("SOCKET_CONNECT");
    },
    getNotifications({ commit }) {
      commit("SOCKET_CONNECT");
    }
  },
  mutations: {
    SOCKET_CONNECT(state) {
      state.isConnected = true;
    },

    SOCKET_DISCONNECT(state) {
      state.isConnected = false;
    },

    SOCKET_MESSAGECHANNEL(state, pNotification) {
      let noti = {};
      noti.NotiType = pNotification.NotiType;
      noti.Action = pNotification.Action;
      noti.Message = pNotification.Message;
      state.notifications.push(noti);
    }
  },
  getters: {
    isConnected: state => state.isConnected,
    notifications: state => state.notifications
  }
};
