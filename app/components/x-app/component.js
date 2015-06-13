import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['app-list__item'],
  classNameBindings: ['app.isCloned:app-list__item--is-cloned'],

  actions: {
    gitClone: function() {
      this.sendAction('gitClone', { name: this.get('app.name') });
    },

    gitPull: function() {
      this.sendAction('gitPull', { name: this.get('app.name') });
    },

    gitPush: function() {
      this.sendAction('gitPush', { name: this.get('app.name') });
    },

    open: function() {
      this.sendAction('open', { dir: this.get('app.dir') });
    }
  }
});
