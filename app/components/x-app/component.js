import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['app-list__item'],

  actions: {
    gitClone: function() {
      this.sendAction('gitClone');
    }
  }
});
