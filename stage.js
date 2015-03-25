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
        var topbar = d.getElementById("pagelet_bluebar");
        topbar.style.display = "none";
        var sidebar = d.getElementById("pagelet_sidebar");
        sidebar.style.display = "none";
        var dock = d.getElementById("pagelet_dock");
        dock.style.display = "none";
        var ad = d.getElementById("rightCol");
        ad.style.display = "none";

        var root = document.getElementById("main");
        root.style.display = "block";
    }
  });

  // Need to set the menu using shortcuts on osx
  // https://github.com/nwjs/nw.js/wiki/Menu#menucreatemacbuiltinappname
  var nativeMenuBar = new gui.Menu({ type: "menubar" });
  if (nativeMenuBar && nativeMenuBar.createMacBuiltin) {
    nativeMenuBar.createMacBuiltin(gui.App.manifest.name);
    win.menu = nativeMenuBar;
  }
}).apply(this);
