(function() {
  var $ = require('jquery');
  var gui = require('nw.gui');

  // Get the current window
  var win = gui.Window.get();

  win.on('new-win-policy', function(frame, url, policy) {
    policy.ignore();
    gui.Shell.openExternal(url);
    //policy.forceNewWindow();
  });

  // FIXME: very hacky way to forcefully update font-family
  win.on('document-end', function() {
    var i = frames[0];
    var d = i.document;

    i.onload = function() {
        console.log('loaded');
        var bar = d.getElementById("pagelet_bluebar");
        bar.style.display = "none";
    }
  });
  
  // for osx we need set the menu
  // https://github.com/nwjs/nw.js/wiki/Menu#menucreatemacbuiltinappname
  var nativeMenuBar = new gui.Menu({ type: "menubar" });
  nativeMenuBar.createMacBuiltin(gui.App.manifest.name);
  win.menu = nativeMenuBar;
}).apply(this);
