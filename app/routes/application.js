import Ember from 'ember';
import IPCListener from '../lib/ipc-listener';
const ipc = IPCListener.create();

export default Ember.Route.extend({
  actions: {
    gitClone(opts) {
      // OPTS requires url and name
      // TODO: clone vs pull
      ipc.send('git-pull', {
        name: 'pure-anchorage-9855',
        url: 'git@heroku.com:pure-anchorage-9855.git'
      });

      ipc.on('git-pull:success', (data) => {
        console.log(data);
      });
    }
  },
});
