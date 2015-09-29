"use strict";

const { classes: Cc, interfaces: Ci, utils: Cu } = Components;

const ICON_HDPI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAWCAYAAAAxSueLAAAAAXNSR0IArs4c6QAAAOdJREFUSA3tlj0KwkAQhd8LqUQLD6EnsPMI4hkSiEX8KS30BNrYiiBBPYN4BUt7vYSgtjpOlHQjGHCtss2ws7PvzX7NLINOtw9gCpGyRjeLvKnwyKfIRAB3Rmn7+hACE1+NKul+kyx072YFUSypj+dG3lYtzGwuObMFxpzA7PICo80lZ7bAmBOYXf5XjAyj+JKNGbuf32R1fl09Icd4T9LfqFoqqv/ysc5c5T5O5zDqtYHHTBHXvjYnTxQO18l8a935aJYVB9GgCe/e0r9KA8K6mldBlChQNDirwFFrDyR3q+V8n92z4hNcNDP6qelDfAAAAABJRU5ErkJggg==";
const ICON_XHDPI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAAAXNSR0IArs4c6QAAAUtJREFUWAntl7tKxEAUhs85SWFjsz6Bha0KYuEFLCx8g1ia9QKSp8gj2CyKi5dtfQ8RFcQV7CwstPNSWiXHfxZcdiHkCMKOCzMQksxP5nz5MgMTTveyeSrLcyWaJSLG4aMpCj+QSCqkegaYOVD4gnECuMcAFlFVB/MvmmOJQdI30zk56l+PknBrZx+Ceo1llIV/UysAWZaCoWDIMmDlYQ4FQ5YBKw9zKBiyDFh5mENjZ4ixfSxB7WXrWmFLhZm7FYGXLsciUazb0OOgfjbaPmDcf1mXmJs+io9XTXMyN3ezzVK1hS869bdX4/dIJDttty7qxonqQpfd390+Li6sdJT1C/Qz6Jq0nhnKmV5F+GAi1rR9fHgzlFXcmIYGn8nzPH5+eVslKpaxApaQTcNcg4kbOBfo+8CAnzg/YcVcw8jVxvraZZIkxeA4ddff5klO7Te5Hm4AAAAASUVORK5CYII=";
const ICON_XXHDPI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAtCAYAAADlVJiFAAAAAXNSR0IArs4c6QAAAf1JREFUaAXtms1KQkEUx88ZfYCgwha1CVr0AbWolvkEPUGFiB+oiyCC3Lp1FYSUaCYSPUPr3AUREaQEtWrjQl8guvd0pkVIKc29QpxbMyDemXvmzP+c34wDziBwiaVyW0hunggWuBrSbQEsDiK0CFWxUT2+wHgyu+0SnQcwkKGSFeKOcgnyQy0C+oKADhQAzQdU/1DZeklxYIFdU0MD0zGFB71t1Mo4qF1qWyyRoa/aNLE/WWxgQcNqiVliQjJgp6IQEMYyLDHjVAkxtMSEgDCWYYkZp0qIoSUmBISxDEvMOFVCDC0xISCMZVhixqkSYmiJCQFhLMMSM06VEEMc9PewEG0jydBT0RnJg8zODgeGbZna/KvSJ5tKIRT9u5DZUx/Xhu5ub+5XVtefEGiOZU7wJ6i/lPoM+gGU2tdn0DJTblX9wwx4PpKNJTO7CHhIRL+yFhGRLzbQXuO0fOSFj+fAtPN4KhslF854wFkvg3m2RXjmOxuJevXkymtfX1n/GGgmsqhAZZjeo9dBf7RHbKNSaZyeWvITlPbvi1i/MJ6SmEjnNh0XEuxsgymO9b83fkbocpKavNvU6tXSJU/BbzcBjH2x4ciB9Q9WKBTUS6ez7LxhlNvXgCjC37w34iSPNM71V673WHGXhff4ucP753UYQ81KpdQaNRj291neAeiAdCFRHoGDAAAAAElFTkSuQmCC";

Cu.import("resource://gre/modules/PageActions.jsm");
Cu.import("resource://gre/modules/Prompt.jsm");
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

XPCOMUtils.defineLazyGetter(this, "Strings", function() {
  return Services.strings.createBundle("chrome://fxostv/locale/fxostv.properties");
});

function chooseAction(win) {
  // See documentation here: https://developer.mozilla.org/en-US/Add-ons/Firefox_for_Android/API/BrowserApp
  var BrowserApp = win.BrowserApp;
  var currentURL = BrowserApp.selectedBrowser.currentURI.spec;

  var items = [
    // TODO: Only show video option when a video is present.
    { label: Strings.GetStringFromName("prompt.sendVideo") },
    { label: Strings.GetStringFromName("prompt.sendURL") },
    { label: Strings.GetStringFromName("prompt.addURL") },
  ];

  // See documentation here: https://developer.mozilla.org/en-US/Add-ons/Firefox_for_Android/API/Prompt.jsm
  var p = new Prompt({
    title: Strings.GetStringFromName("prompt.title")
  });
  p.setSingleChoiceItems(items);

  // TODO: Get real remote control URL.
  var remoteControlURL = "https://mozilla.org";

  p.show(function(data) {
    switch (data.button) {
      case 0:
        win.alert("TODO: send video from page: " + currentURL);
        break;

      case 1:
        win.alert("TODO: send URL from page: " + currentURL);
        BrowserApp.addTab(remoteControlURL);
        break;

      case 2:
        win.alert("TODO: add URL to TV home screen: " + currentURL);
        BrowserApp.addTab(remoteControlURL);
        break;
    }
  });
}

var gPageActionIcon;
var gPageActionId;

function loadIntoWindow(win) {
  // Using data URIs as a workaround until bug 993698 is fixed.
  if (win.devicePixelRatio <= 1.5) {
    gPageActionIcon = ICON_HDPI;
  } else if (win.devicePixelRatio <= 2) {
    gPageActionIcon = ICON_XHDPI;
  } else {
    gPageActionIcon = ICON_XXHDPI;
  }

  // See documentation here: https://developer.mozilla.org/en-US/Add-ons/Firefox_for_Android/API/PageActions.jsm
  // TODO: Only show the page action when a TV is present.
  gPageActionId = PageActions.add({
    icon: gPageActionIcon,
    title: Strings.GetStringFromName("pageaction.title"),
    clickCallback: () => chooseAction(win)
  });
}

function unloadFromWindow(win) {
  PageActions.remove(gPageActionId);
}

/**
 * bootstrap.js API
 *
 * See documentation here: https://developer.mozilla.org/en-US/Add-ons/Bootstrapped_extensions
 */
var windowListener = {
  onOpenWindow: function(win) {
    // Wait for the window to finish loading
    function loadListener() {
      win.removeEventListener("load", loadListener, false);
      loadIntoWindow(win);
    };
    win.addEventListener("load", loadListener, false);
  },
  
  onCloseWindow: function(win) {
  },
  
  onWindowTitleChange: function(win, aTitle) {
  }
};

function startup(aData, aReason) {
  // Load into any existing windows
  let windows = Services.wm.getEnumerator("navigator:browser");
  while (windows.hasMoreElements()) {
    let win = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
    loadIntoWindow(win);
  }

  // Load into any new windows
  Services.wm.addListener(windowListener);
}

function shutdown(aData, aReason) {
  // When the application is shutting down we normally don't have to clean
  // up any UI changes made
  if (aReason == APP_SHUTDOWN) {
    return;
  }

  // Stop listening for new windows
  Services.wm.removeListener(windowListener);

  // Unload from any existing windows
  let windows = Services.wm.getEnumerator("navigator:browser");
  while (windows.hasMoreElements()) {
    let win = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
    unloadFromWindow(win);
  }
}

function install(aData, aReason) {
}

function uninstall(aData, aReason) {
}
