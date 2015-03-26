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
        // disable Meiryo hack once cause Mac font will be ugly
        //d.body.style.fontFamily = "Meiryo UI";

        var topbar = d.getElementById("pagelet_bluebar");
        topbar.style.display = "none";
        var sidebar = d.getElementById("pagelet_sidebar");
        sidebar.style.display = "none";
        var dock = d.getElementById("pagelet_dock");
        dock.style.display = "none";
        var ad = d.getElementById("rightCol");
        ad.style.display = "none";

        // listen notification via audio tag
        var a = d.getElementsByTagName("audio")[0];
        var notif_count = 0;
        a.onplay = function () {
            notif_count++;
            win.setBadgeLabel(notif_count);
        }
        win.on('focus', function() {
            notif_count = 0;
            win.setBadgeLabel("");
        });

        // ready to show
        var root = document.getElementById("main");
        root.setAttribute("class", "visible");
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
