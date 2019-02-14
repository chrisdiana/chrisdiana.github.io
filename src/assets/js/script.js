;(function(window) {

	'use strict';

	var mainContainer = document.querySelector('.main'),
		openCtrl = document.getElementById('btn-search'),
		closeCtrl = document.getElementById('btn-search-close'),
		searchContainer = document.querySelector('.search'),
		inputSearch = searchContainer.querySelector('.search__input'),
    tagEls = document.getElementsByClassName('tag'),
    navbar = document.getElementById('navbar'),
    logo = document.getElementById('logo'),
    navcontent = document.getElementById('nav-content'),
    search = document.getElementById('search'),
    searchSuggestionList = document.getElementById('search-suggestion-list');

  var navbarState = false;
  var searchOpen = false;
  var searchData = '/search.json';

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

    fetch(searchData)
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
    search.addEventListener('input', function(event) {
      event.preventDefault();
      var searchString = event.target.value;
      runSearch(searchString);
    }, false);
	}

  function toggleNavbar() {
    if(navbarState) {
      logo.classList.add('logo-hover');
      navcontent.classList.add('nav-content-hover');
    } else {
      navcontent.classList.remove('nav-content-hover');
      logo.classList.remove('logo-hover');
    }
  }

  function openTagSearch(event) {
    var tag = event.target.innerText.toLowerCase().trim();
    openSearch();
		inputSearch.value = tag;
    runSearch(tag);
  }

	function openSearch() {
    searchSuggestionList.innerHTML = '';
		mainContainer.classList.add('main--move');
		searchContainer.classList.add('search--open');
		setTimeout(function() {
			inputSearch.focus();
		}, 600);
    searchOpen = true;
	}

	function closeSearch() {
		mainContainer.classList.remove('main--move');
		searchContainer.classList.remove('search--open');
		inputSearch.blur();
		inputSearch.value = '';
    searchOpen = false;
	}

	function init() {
		initEvents();
    setTimeout(function() {
      logo.classList.add('wiggle');
    }, 1500);
	}

	init();

})(window);
