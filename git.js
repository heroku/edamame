var spawn  = require('child_process').spawn;
var path   = require('path');

var projectsDir = path.join(process.env.HOME, 'Documents', 'heroku');

function pull(dir) {

}

function clone(appName, cb) {
  var url = 'https://git.heroku.com/' + appName + '.git';

  var clone = spawn('git', ['clone', url], {
    cwd: projectsDir
  });

  clone.stdout.pipe(process.stdout);
  clone.stderr.pipe(process.stderr);

  clone.on('exit', function() {
    cb(null, projectsDir);
  });

  clone.on('error', cb);
}

module.exports = { clone };
