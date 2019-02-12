//(function() {

  var navbar = document.getElementById('navbar');
  var logo = document.getElementById('logo');
  var navcontent = document.getElementById('nav-content');
  var navbarState = false;

  setTimeout(function() {
    logo.classList.add('wiggle');
  }, 1500);

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


  function runSearch(searchString) {
    var searchIndex;

    function buildList(items) {
      searchSuggestionList.innerHTML = '';
      for(var i in items) {
        var item = items[i];
        var suggestion = document.createElement('li');
        var suggestionLink = document.createElement('a');
        suggestionLink.innerHTML = item.title;
        suggestionLink.setAttribute('href', item.url);
        suggestion.appendChild(suggestionLink);
        searchSuggestionList.appendChild(suggestion);
      }
    }

    fetch('/search.json')
      .then(function(response) { return response.json();})
      .then(function(response) {
        searchIndex = response.search;
        var results = [];
        for(var item in searchIndex) {
          //var found = searchIndex[item].text.indexOf(searchString);
          var titleFound = searchIndex[item].title.toLowerCase().indexOf(searchString);
          var tagFound = searchIndex[item].tags.split(',').find(function(tag) {
            return tag.toLowerCase() === searchString.toLowerCase();
          });
          if(titleFound != -1 || tagFound) {
            results.push(searchIndex[item]);
          }
        }
        if(searchString === '') {
          results = [];
        }
        buildList(results);
    });

  }


  var search = document.getElementById('search');
  var searchSuggestionList = document.getElementById('search-suggestion-list');
  search.addEventListener('input', function(event) {
    event.preventDefault();
    var searchString = event.target.value;
    runSearch(searchString);
  }, false);


//})();



;(function(window) {

	'use strict';

	var mainContainer = document.querySelector('.container'),
		openCtrl = document.getElementById('btn-search'),
		closeCtrl = document.getElementById('btn-search-close'),
		searchContainer = document.querySelector('.search'),
		inputSearch = searchContainer.querySelector('.search__input'),
    tagEls = document.getElementsByClassName('tag');

  var searchOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openCtrl.addEventListener('click', openSearch);
		closeCtrl.addEventListener('click', closeSearch);
    for(var i = 0; i <= tagEls.length; i++) {
      var tagEl = tagEls[i];
      if(tagEl) {
        tagEl.addEventListener('click', openTagSearch);
      }
    }
		document.addEventListener('keyup', function(ev) {
			// escape key
			if( ev.keyCode == 27 ) {
				closeSearch();
			}
		});
		document.addEventListener('keyup', function(ev) {
      // s key
			if( ev.keyCode == 83 && !searchOpen ) {
				openSearch();
			}
		});
	}

  function openTagSearch(event) {
    var tag = event.target.innerText.toLowerCase().trim();
    openSearch();
		inputSearch.value = tag;
    runSearch(tag);
  }

	function openSearch() {
		mainContainer.classList.add('container--move');
		searchContainer.classList.add('search--open');
		setTimeout(function() {
			inputSearch.focus();
		}, 600);
    searchOpen = true;
	}

	function closeSearch() {
		mainContainer.classList.remove('container--move');
		searchContainer.classList.remove('search--open');
		inputSearch.blur();
		inputSearch.value = '';
    searchOpen = false;
	}

	init();

})(window);
