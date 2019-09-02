'use strict';

(function() {

  var els = {
    projects: document.getElementById('projects'),
    list: document.createElement('div'),
    preview: document.createElement('div'),
  };

  var projectsOpen = false;

  function initElements() {
    els.list.className = 'projects-list';
    els.preview.className = 'project-preview-container';
    els.projects.appendChild(els.preview);
    els.projects.appendChild(els.list);
  }

  function loadPreview(index) {
    els.preview.innerHTML = '';
    var img = document.createElement('img');
    img.setAttribute('src', window.projects[index].src);
    img.className = 'project-preview-img';
    els.preview.appendChild(img);
  }

  function loadProjects() {
    window.projects.forEach(function(project, index) {
      var img = document.createElement('img');
      img.className = 'project-img';
      img.setAttribute('src', project.src);
      img.setAttribute('data-index', index);
      els.list.appendChild(img);
    });
    loadPreview(0);
  }

  document.body.addEventListener('click', function(e) {

    // Show projects
    if(e.target.classList.contains('projects-link')) {
      els.projects.classList.add('open');
      projectsOpen = true;
    }

    // Load preview
    if(e.target.classList.contains('project-img')) {
      loadPreview(e.target.getAttribute('data-index'));
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