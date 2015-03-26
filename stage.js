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
        $(d.head).contents().append("<style>.panelFlyout {right: 0 !important;}</style>");
        // disable Meiryo hack once cause Mac font will be ugly
        //d.body.style.fontFamily = "Meiryo UI";

        var topbar = d.getElementById("pagelet_bluebar");
        if (topbar && topbar.style) {
          topbar.style.display = "none";
        }
        var sidebar = d.getElementById("pagelet_sidebar");
        if (sidebar && sidebar.style) {
          sidebar.style.display = "none";
        }
        var dock = d.getElementById("pagelet_dock");
        if (dock && dock.style) {
          dock.style.display = "none";
        }
        var ad = d.getElementById("rightCol");
        if (ad && ad.style) {
          ad.style.display = "none";
        }
        
        // observe message notification count on the blue bar
        var messageBadgeCountTag = d.querySelector('#mercurymessagesCountValue');
        var badgeCountObserver = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            var addedNodes = mutation.addedNodes;
            if (addedNodes && addedNodes.length ===1) {
              var count = parseInt(addedNodes[0].data);
              if (count) {
                win.setBadgeLabel(count);
              } else {
                win.setBadgeLabel("");
              }
            }
          });
        });
        badgeCountObserver.observe(messageBadgeCountTag, { childList: true });

        // listen notification via audio tag
        //var a = d.getElementsByTagName("audio")[0];
        //if (a) {
        //  var notif_count = 0;
        //  a.onplay = function () {
        //    notif_count++;
        //    win.setBadgeLabel(notif_count);
        //  }
        //  win.on('focus', function() {
        //    console.log('focus');
        //    notif_count = 0;
        //    win.setBadgeLabel("");
        //  });
        //}

        // ready to show
        var root = document.getElementById("main");
        root.setAttribute("class", "visible");
    }
  });

  // Need to set the menu using shortcuts on osx
  // https://github.com/nwjs/nw.js/wiki/Menu#menucreatemacbuiltinappname
  var nativeMenuBar = new gui.Menu({type: "menubar"});
  if (nativeMenuBar && nativeMenuBar.createMacBuiltin) {
    nativeMenuBar.createMacBuiltin(gui.App.manifest.name);
    win.menu = nativeMenuBar;
  }
}).apply(this);
