var spawn  = require('child_process').spawn;
var path   = require('path');

var projectsDir = path.join(process.env.HOME, 'Documents', 'heroku');

function pull(dir, cb) {
  var pull = spawn('git', ['pull'], {
    cwd: dir
  });

  pull.stdout.pipe(process.stdout);
  pull.stderr.pipe(process.stderr);

  pull.on('close', function(code) {
    if (code > 0) {
      cb(true);
    } else {
      cb(null, projectsDir);
    }
  });

  pull.on('error', cb);
}

function clone(appName, cb) {
  var url = 'https://git.heroku.com/' + appName + '.git';

  var clone = spawn('git', ['clone', url], {
    cwd: projectsDir
  });

  clone.stdout.pipe(process.stdout);
  clone.stderr.pipe(process.stderr);

  clone.on('close', function() {
    cb(null, projectsDir);
  });

  clone.on('error', cb);
}

module.exports = { clone, pull };
