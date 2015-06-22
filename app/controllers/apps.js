import Ember from 'ember';
import IPCListener from '../lib/ipc-listener';

const ipc = IPCListener.create();

export default Ember.Controller.extend({
  actions: {
    gitClone(opts) {
      ipc.send('git-clone', opts);

      ipc.on('git-clone:success', (data) => {
        console.log(data);
      });
    },

    // Required: opts.dir
    gitPull(opts) {
      ipc.send('git-pull', opts);

      ipc.on('git-pull:success', (data) => {
        console.log(data);
      });
    },

    gitPush(opts) {
      ipc.send('git-push', opts);

      ipc.on('git-push:success', (data) => {
        console.log(data);
      });
    },

    open(opts) {
      ipc.send('open', opts);

      ipc.on('open:success', (data) => {
        console.log(data);
      });
    },

    run(opts) {
      ipc.send('run', opts);

      ipc.on('run:success', (data) => {
        console.log(data);
      });
    },

    stop(opts) {
      ipc.send('stop', opts);

      ipc.on('stop:success', (data) => {
        console.log(data);
      });
    }
  }
});
