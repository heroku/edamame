import Ember from 'ember';

const ipc = window.requireNode('ipc');

export default Ember.Object.extend({
  send(...args) {
    return ipc.send(...args);
  },

  on(event, callback) {
    ipc.on(event, function sendEvent(payload) {
      console.log(payload);
      try {
        payload = JSON.parse(payload);
        callback(payload);
      } catch(err) {
        console.warn(`Error parsing IPC payload: ${payload}.`);
      }
    });
  }
});
