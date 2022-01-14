import bindFlyoutMenuListeners from './header/flyout-nav';
import setHeaderHeightVariable from './header/header-height';
import menuToggle from './header/menu-toggle';

function domReady(fn) {
    // If we're early to the party
    document.addEventListener("DOMContentLoaded", fn);
    // If late; I mean on time.
    if (document.readyState === "interactive" || document.readyState === "complete" ) {
      fn();
    }
  }
  
  domReady(() => {
      bindFlyoutMenuListeners();
      menuToggle();
      setHeaderHeightVariable();
  });


