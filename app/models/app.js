import DS from 'ember-data';

const path = window.requireNode('path');
const fs = window.requireNode('fs');
const process = window.requireNode('process');
const dir = path.join(process.env.HOME, 'Documents', 'heroku');
const {spawnSync} = window.requireNode('child_process');

export {dir};

export default DS.Model.extend({
  archived_at:  DS.attr('date'),
  created_at:   DS.attr('date'),
  git_url:      DS.attr('string'),
  name:         DS.attr('string'),
  released_at:  DS.attr('date'),
  updated_at:   DS.attr('string'),
  web_url:      DS.attr('string'),

  isWatchingGitStatus: false,

  dir: function() {
    return `${dir}/${this.get('name')}`;
  }.property('name'),

  isCloned: function() {
    try {
      fs.statSync(this.get('dir'));
      this.watchDirtyState();
      return true;
    } catch(error) {
      this.unwatchDirtyState();
      return false;
    }
  }.property('dir'),

  isDirty: function() {
    if (!this.get('isCloned')) { return false; }

    return spawnSync('git', ['status', '--porcelain'], {
      cwd: this.get('dir')
    }).output[1].toString().length > 0;
  }.property('isCloned'),

  watchDirtyState: function() {
    if (this.get('isWatchingGitStatus')) { return; }

    fs.watch(this.get('dir'), { recursive: true }, () => this.notifyPropertyChange('isDirty'));
    this.set('isWatchingGitStatus', true);
  },

  unwatchDirtyState: function() {
    fs.unwatchFile(this.get('dir'));
    this.set('isWatchingGitStatus', false);
  }
});
