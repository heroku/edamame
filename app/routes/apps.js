import Ember from 'ember';
import {dir} from 'hello-world/models/app';

const fs = window.requireNode('fs');

export default Ember.Route.extend({
  model() {
    return this.store.find('app');
  },

  afterModel(apps) {
    fs.watch(dir, () => {
      apps.forEach((app) => app.notifyPropertyChange('isCloned'));
    });

    this.on('deactivate', () => fs.unwatchFile(dir));
  }
});
