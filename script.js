'use strict';

(function() {

  var els = {
    projects: document.getElementById('projects'),
    list: document.createElement('div')
  };

  var projectsOpen = false;

  function initElements() {
    els.list.className = 'projects-list';
    els.projects.appendChild(els.list);
  }

  function loadProjects() {
    window.projects.forEach(function(project, index) {
      var img = document.createElement('img');
      img.className = 'project-img';
      img.setAttribute('src', project.src);
      img.setAttribute('data-index', index);
      els.list.appendChild(img);
    });
  }

  document.body.addEventListener('click', function(e) {

    // Show projects
    if(e.target.classList.contains('projects-link')) {
      els.projects.classList.add('open');
      projectsOpen = true;
    }

    // // Close projects
    if(projectsOpen &&
      (e.target.id == 'projects' ||
      e.target.classList.contains('project-preview-container'))) {
      els.projects.classList.remove('open');
    }
  }, true);

  initElements();
  loadProjects();

})();
