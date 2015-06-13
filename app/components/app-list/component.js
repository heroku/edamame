import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['app-list'],

  actions: {
    gitClone: function(opts) {
      this.sendAction('gitClone', opts);
    },

    gitPull: function(opts) {
      this.sendAction('gitPull', opts);
    },

    gitPush: function(opts) {
      this.sendAction('gitPush', opts);
    },

    open: function(opts) {
      this.sendAction('open', opts);
    }
  }
});
