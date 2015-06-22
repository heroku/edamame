import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['app-list__item'],
  classNameBindings: ['app.isCloned:app-list__item--is-cloned'],

  actions: {
    gitClone: function() {
      this.attrs.gitClone({ name: this.get('app.name') });
    },

    gitPull: function() {
      this.attrs.gitPull({ name: this.get('app.name') });
    },

    gitPush: function() {
      this.attrs.gitPush({ name: this.get('app.name') });
    },

    open: function() {
      this.attrs.open({ dir: this.get('app.dir') });
    }
  }
});
