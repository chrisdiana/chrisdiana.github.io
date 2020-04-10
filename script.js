'use strict';

(function() {

  document.addEventListener('DOMContentLoaded', function() {
    const lazy = {};

    const lazyLoad = function() {
      if (lazy.active === false) {
        lazy.active = true;
        setTimeout(function() {
          lazy.images.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove('lazy');
            lazy.images = lazy.images.filter(function(image) {
              return image !== lazyImage;
            });
          });
          lazy.active = false;
        }, 200);
      }
    };

    var els = {
      projects: document.getElementById('projects'),
      project: document.getElementById('project'),
      list: document.createElement('div')
    };

    var projectOpen = false;

    function initElements() {
      els.list.className = 'projects-list';
      els.projects.appendChild(els.list);
    }

    function loadProjects(callback) {
      window.projects.forEach(function(project, index) {
        var img = document.createElement('img');
        img.className = 'lazy project-img';
        img.setAttribute('src', './img/placeholder.png');
        img.setAttribute('data-src', project.src);
        img.setAttribute('data-index', index);
        els.list.appendChild(img);
      });
      callback();
    }

    function openProject(el) {
      var project = window.projects[el.getAttribute('data-index')];
      var moreLink = project.more.length ? `<a href="${project.more}" target="_blank" class="project-detail-link">More &raquo;</a>` : '';
      var html = `
        <img class="lazy project-preview" data-src="${project.src}" src="./img/loading.gif"/>
        <div class="project-detail">
          <div id="close">&times;</div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <br>
          <p class="project-tags">${project.tags}</p>
          ${moreLink}
        </div>
      `;

      els.project.innerHTML = html;
      els.project.classList.add('open');
      projectOpen = true;
      runLazyLoad();
    }

    document.body.addEventListener('click', function(e) {
      if(e.target.classList.contains('project-img')) {
        openProject(e.target);
      }
      if(projectOpen && e.target.id == 'close') {
        els.project.classList.remove('open');
      }
    }, true);

    function runLazyLoad() {
      lazy.images = [].slice.call(document.querySelectorAll("img.lazy"));
      lazy.active = false;
      lazyLoad()
    }

    initElements();
    loadProjects(runLazyLoad);
  });

})();
