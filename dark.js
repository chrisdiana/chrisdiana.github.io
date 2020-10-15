/*
 - Home / About / Social Links / Subscribe
 - Open Source / Projects
 - CV / Work / Companies / Consulting- add profile pic instead of logo / generate with JS?
*/

var projectsEl = document.getElementById('projects');
var projectsOpen = false;


var projects = [
  {
    link: 'https://dribbble.com/shots/5253468',
    src: 'https://cdn.dribbble.com/users/84464/screenshots/5253468/automatefitness-full.jpg',
  },
  {
    link: 'https://dribbble.com/shots/5260423',
    src: 'https://cdn.dribbble.com/users/84464/screenshots/5260423/pghcares.jpg',
  },
    {
    link: 'https://dribbble.com/shots/6199222',
    src: 'https://cdn.dribbble.com/users/84464/screenshots/6199222/screen_shot_2019-03-18_at_16.59.30-fullpage_4x.png',
  },
    {
    link: 'https://dribbble.com/shots/4670169',
    src: 'https://cdn.dribbble.com/users/84464/screenshots/4670169/ramenbar.jpg',
  },
    {
    link: 'https://dribbble.com/shots/5263724',
    src: 'https://cdn.dribbble.com/users/84464/screenshots/5263724/truckduty-full.jpg',
  },
  {
    link: 'https://dribbble.com/shots/5263598',
    src: 'https://cdn.dribbble.com/users/84464/screenshots/5263598/simplestore-full.jpg',
  },
  {
    link: 'https://dribbble.com/shots/4610070',
    src: 'https://cdn.dribbble.com/users/84464/screenshots/4610070/loclii-full.jpg',
  },
  {
    link: 'https://dribbble.com/shots/4670177',
    src: 'https://cdn.dribbble.com/users/84464/screenshots/5253468/automatefitness-full.jpg',
  },
  {
    link: 'https://dribbble.com/shots/5253468',
    src: 'https://cdn.dribbble.com/users/84464/screenshots/4670177/bigdataai.jpg',
  },
];

function loadProjects() {
  projects.forEach(function(project) {
    var el = document.createElement('div');
    var link = document.createElement('a');
    var img = document.createElement('img');
    el.className = 'project-img';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', project.link);
    img.setAttribute('src', project.src);
    link.appendChild(img);
    el.appendChild(link);
    projectsEl.appendChild(el);
  });
}

document.getElementById('projects-link').addEventListener('click', function(e) {
  projectsEl.classList.add('open');
  projectsOpen = true;
}, true);

document.getElementById('intro').addEventListener('click', function(e) {
  if(projectsOpen) {
    projectsEl.classList.remove('open');
  }
}, true);

loadProjects();




/*
function openTab(id) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove('active')
  }

  tablinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove('active')
  }

  document.getElementById(id).classList.add('active')
}


document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            // lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});
*/
