import DS from 'ember-data';

const path = window.requireNode('path');
const fs = window.requireNode('fs');
const process = window.requireNode('process');
const dir = path.join(process.env.HOME, 'Documents', 'heroku');

export {dir};

export default DS.Model.extend({
  archived_at:  DS.attr('date'),
  created_at:   DS.attr('date'),
  git_url:      DS.attr('string'),
  name:         DS.attr('string'),
  released_at:  DS.attr('date'),
  updated_at:   DS.attr('string'),
  web_url:      DS.attr('string'),

  dir: function() {
    return `${dir}/${this.get('name')}`;
  }.property('name'),

  isCloned: function() {
    try {
      fs.statSync(this.get('dir'));
      return true;
    } catch(error) {
      return false;
    }
  }.property('dir')
});
