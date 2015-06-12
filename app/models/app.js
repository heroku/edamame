import DS from 'ember-data';

export default DS.Model.extend({
  archived_at:  DS.attr('date'),
  created_at:   DS.attr('date'),
  git_url:      DS.attr('string'),
  name:         DS.attr('string'),
  released_at:  DS.attr('date'),
  updated_at:   DS.attr('string'),
  web_url:      DS.attr('string')
});
