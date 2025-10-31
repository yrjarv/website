document.addEventListener("DOMContentLoaded", function() {

  // variables

  const appHead = document.getElementById('app-header-core');
  const headMenu = document.getElementById('header-menu');
  const languageMenu = document.getElementById('language-menu');
  const languageMenuButton = document.getElementById('language-menu-button');
  const languageMenuContent = document.getElementById('language-menu-content');
  const userMenu = document.getElementById('user-menu');
  const userMenuButton = document.getElementById('user-menu-button');
  const userMenuContent = document.getElementById('user-menu-content');
  const responsiveMenuButton = document.getElementById('responsive-menu-button');



  // language- and user menu expand button click handling

  if (languageMenuButton) {
    addClickEventListener(languageMenuButton);
  }
  if (userMenuButton) {
    addClickEventListener(userMenuButton);
  }

  function addClickEventListener(buttonObj) {
    if(buttonObj) {
      buttonObj.addEventListener('click', function(event) {
        var parentDiv = buttonObj.closest('div');
        var collapsableMenu = parentDiv.getElementsByClassName('collapsable-menu')[0];
        if (collapsableMenu.offsetWidth === 0 || collapsableMenu.offsetHeight === 0) {
          buttonObj.setAttribute('aria-expanded', 'true');
          collapsableMenu.classList.add('expanded');
        } else {
          buttonObj.setAttribute('aria-expanded', 'false');
          collapsableMenu.classList.remove('expanded');
        }
      });
    }
  }



  // close language- and user-menu if pressing escape key

  document.addEventListener('keyup', function(e) {
    if(e.key == 'Escape') {
      if (languageMenu) {
        languageMenuButton.setAttribute('aria-expanded', 'false');
        languageMenuContent.classList.remove('expanded');
      }
      if (userMenu) {
        userMenuButton.setAttribute('aria-expanded', 'false');
        userMenuContent.classList.remove('expanded');
      }
    }
  });



  // close language- and user-menu if clicking outside of them

  document.addEventListener('click', (event) => {

    // if element exists but does not contain click target..

    if (languageMenu && !languageMenu.contains(event.target)) {
      languageMenuButton.setAttribute('aria-expanded', 'false');
      languageMenuContent.classList.remove('expanded');
    }
    if ((userMenu) && !userMenu.contains(event.target)) {
      userMenuButton.setAttribute('aria-expanded', 'false');
      userMenuContent.classList.remove('expanded');
    }
  });



  // language selector. change html lang attribute based on selected option.

  if (languageMenu) {
    languageMenuContent.querySelectorAll('li button').forEach(function(button) {
      button.addEventListener('click', function(event){
        var langTxt = button.innerText.toLowerCase();
        var languagecode = document.documentElement.getAttribute("lang");
        if (langTxt.indexOf("norsk") > -1 || button.classList.contains('nb') ) {
          languagecode = "nb";
        }
        if (langTxt.indexOf("english") > -1 || button.classList.contains('en')) {
           languagecode = "en";
        }
        if (langTxt.indexOf("nynorsk") > -1 || button.classList.contains('nn')) {
          languagecode = "nn";
        }
        document.documentElement.setAttribute("lang", languagecode);
      });
    });
  }



  // responsive menu button click handling

  if (responsiveMenuButton) {
    responsiveMenuButton.addEventListener('click', function(event) {
      smallScreenHeaderLogic();
      if (headMenu.offsetWidth === 0 || headMenu.offsetHeight === 0) {
        appHead.classList.add('responsive-menu-expanded');
        responsiveMenuButton.setAttribute('aria-expanded', 'true');
      } else {
        appHead.classList.remove('responsive-menu-expanded');
        responsiveMenuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }



  // responsive check for small screen on window resize
  // based on presence of responsiveMenuButton (which is controlled by css breakpoint)

  window.addEventListener('resize', smallScreenHeaderLogic);

  // if small-screen header (with responsiveMenuButton), collapsable menus are always open
  // so disabling buttons and changing states

  function smallScreenHeaderLogic() {
    const expandButtonsAll = headMenu.querySelectorAll('.expand-button');
    const collapsableMenusAll = headMenu.querySelectorAll('.collapsable-menu');

    // if responsiveMenuButton visible...

    if (responsiveMenuButton.offsetHeight > 0) {
      // disable expand-buttons (always open)
      expandButtonsAll.forEach(expandButton => {
        expandButton.removeAttribute('aria-expanded');
        expandButton.disabled = true;
      });
      // remove expanded class from collapsableMenu (always open)
      collapsableMenusAll.forEach(function(collapsableMenu) {
        collapsableMenu.classList.remove('expanded');
      });
    }

    // if responsiveMenuButton not visible...

    else {
      // enable expand-buttons
      expandButtonsAll.forEach(expandButton => {
        expandButton.disabled = false;
      });
    }
  }
});
