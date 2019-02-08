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




  var search = document.querySelector('#search');
  search.addEventListener('input', function(event) {
    event.preventDefault();
    var searchString = event.target.value;

    var searchIndex;
    fetch('/search.json')
      .then(function(response) { return response.json();})
      .then(function(response) {
        searchIndex = response.search;
        var results = [];
        for(var item in searchIndex) {
          //var found = searchIndex[item].text.indexOf(searchString);
          var found = searchIndex[item].title.toLowerCase().indexOf(searchString);
          if(found != -1 ) {
            results.push(searchIndex[item])
          }
        }
        console.log(results);
    });


  }, false);


//})();


;(function(window) {

	'use strict';

	var mainContainer = document.querySelector('.main-wrap'),
		openCtrl = document.getElementById('btn-search'),
		closeCtrl = document.getElementById('btn-search-close'),
		searchContainer = document.querySelector('.search'),
		inputSearch = searchContainer.querySelector('.search__input');

	function init() {
		initEvents();
	}

	function initEvents() {
		openCtrl.addEventListener('click', openSearch);
		closeCtrl.addEventListener('click', closeSearch);
		document.addEventListener('keyup', function(ev) {
			// escape key.
			if( ev.keyCode == 27 ) {
				closeSearch();
			}
		});
	}

	function openSearch() {
		mainContainer.classList.add('main-wrap--overlay');
		closeCtrl.classList.remove('btn--hidden');
		searchContainer.classList.add('search--open');
		setTimeout(function() {
			inputSearch.focus();
		}, 500);
	}

	function closeSearch() {
		mainContainer.classList.remove('main-wrap--overlay');
		closeCtrl.classList.add('btn--hidden');
		searchContainer.classList.remove('search--open');
		inputSearch.blur();
		inputSearch.value = '';
	}

	init();

})(window);
