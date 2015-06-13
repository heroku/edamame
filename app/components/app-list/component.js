import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['app-list'],

  actions: {
    gitClone: function() {
      this.sendAction('gitClone');
    }
  }
});
