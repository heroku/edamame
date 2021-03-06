'use strict';

var BrowserWindow = require('browser-window');
var Menu          = require('menu');
var app           = require('app');
var dialog        = require('dialog');
var ipc           = require('ipc');
var path          = require('path');
var mkdirp        = require('mkdirp');
var git           = require('./git');
var spawn         = require('child_process').spawn;
var mainWindow    = null;

var template = [{
  label: 'File',
  submenu: [{
    label: 'Open',
    accelerator: 'Command+O',
    click: function() {
      dialog.showOpenDialog(mainWindow, {
        properties: ['openFile', 'multiSelections', 'createDirectory']
      }, onFileOpen);
    }
  }]
}];

app.on('window-all-closed', function onWindowAllClosed() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function onReady() {
  var projectsDir = path.join(process.env.HOME, 'Documents', 'heroku');
  mkdirp(projectsDir, function() {
    mainWindow = new BrowserWindow({ width: 420, height: 380 });

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    delete mainWindow.module;

    if (process.env.ELECTRON_ENV === 'development') {
      mainWindow.openDevTools();
      mainWindow.loadUrl('http://localhost:5000');
    } else {
      mainWindow.loadUrl('file://' + __dirname + '/dist/index.html');
    }

    mainWindow.on('closed', function onClosed() {
      mainWindow = null;
    });
  });
});

ipc.on('git-clone', function(event, data) {
  git.clone(data.name, function(err, dir) {
    if (err) {/* oh noes */}

    event.sender.send('git-clone:success', JSON.stringify({
      name: data.name,
      dir: dir
    }));
  });
});

ipc.on('git-pull', function(event, data) {
  git.pull(data.dir, function(err, dir) {
    var success = true;
    if (err) { success = false; }

    event.sender.send('git-pull:success', JSON.stringify({
      success: success,
      dir: dir
    }));
  });
});

ipc.on('git-push', function(event, data) {
  git.push(data.dir, function(err, dir) {
    var success = true;
    if (err) { success = false; }

    event.sender.send('git-push:success', JSON.stringify({
      success: success,
      dir: dir
    }));
  });
});

ipc.on('open', function(event, data) {
  var editor = process.env.EDITOR;
  var open = spawn(editor, [data.dir]);

  open.stdout.pipe(process.stdout);
  open.stderr.pipe(process.stderr);

  open.on('close', function(code) {
    if (code > 0) { return; }

    event.sender.send('open:success', JSON.stringify({
      success: true,
      dir: data.dir
    }));
  });
});

function onFileOpen(files) {
  if (files && files.length) {
      mainWindow.webContents.send('filesOpened', JSON.stringify(files));
  }
}
