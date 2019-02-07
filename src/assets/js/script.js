// var mixer = mixitup('.portfolio', {
//   animation: {
//         duration: 250,
//         nudge: true,
//         reverseOut: false,
//         effects: "fade translateX(20%)"
//     }
// });

//(function() {

  var navbar = document.getElementById('navbar');
  var logo = document.getElementById('logo');
  var navcontent = document.getElementById('nav-content');
  var navbarState = false;

  function toggleNavbar() {
    if(navbarState) {
      logo.classList.add('logo-hover');
      navcontent.classList.add('nav-content-hover');
    } else {
      navcontent.classList.remove('nav-content-hover');
      logo.classList.remove('logo-hover');
    }
  }

  navbar.addEventListener('mouseenter', function() {
    navbarState = true;
    toggleNavbar();
  });
  navbar.addEventListener('mouseleave', function() {
    navbarState = false;
    toggleNavbar();
  });
  navbar.addEventListener('click', function(){
    toggleNavbar();
    navbarState = !navbarState;
  });


//})();
