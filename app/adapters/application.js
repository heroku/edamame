import DS from 'ember-data';

const {spawnSync} = window.requireNode('child_process');
const token = spawnSync('heroku', ['auth:token']).output[1].toString().replace('\n', '');

export default DS.RESTAdapter.extend({
  host: 'https://api.heroku.com',
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.heroku+json; version=3',
    'Content-Type': 'application/json'
  }
});
