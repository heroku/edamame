import Ember from 'ember';
import IPCListener from '../lib/ipc-listener';
const ipc = IPCListener.create();

export default Ember.Route.extend({
  actions: {
    gitClone(opts) {
      ipc.send('git-clone', {
        name: 'pure-anchorage-9855',
        url: 'git@heroku.com:pure-anchorage-9855.git'
      });

      ipc.on('git-clone:success', (data) => {
        console.log(data);
      });
    }
  },
});
