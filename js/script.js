'use strict';

const projectsSec = document.querySelector('#projects');
const articlesSec = document.querySelector('#articles');
const contactSec = document.querySelector('#contact');
const servicesSec = document.querySelector('#services');
const heroSec = document.querySelector('#home');
const sections = document.querySelectorAll('section');

const navLinks = document.querySelector('.navbar-collapse');
const navbar = document.querySelector('.navbar');
const heroImg = document.querySelector('.hero-img');
const services = document.querySelectorAll('.service-body');
const blogPosts = document.querySelectorAll('.blog-post');
const video = document.querySelector('.video-player');
const boxNum = document.querySelectorAll('.box-number');
const funFacts = document.querySelector('.fun-facts-box');

/**
 * Light Gallery Plugin
 */

lightGallery(
  document.getElementById('light-gallery', {
    selector: '.project-item',
    width: '100vw',
  })
);

/**
 * Navbar Auto-scrolling
 */

const navbarEventListener = event => {
  // minize navbar toggler when link tapped (mobile)
  if (navLinks.classList.contains('show')) {
    // navLinks.classList.add('collapsing');
    navLinks.classList.remove('show');
    // navLinks.classList.remove('collapsing');
  }
  const navLink = event.target;
  if (navLink.classList.contains('nav-link')) {
    const section = event.target.getAttribute('href');
    if (section === '#projects') {
      smoothScrollTo(projectsSec);
    } else if (section === '#services') {
      smoothScrollTo(servicesSec);
    } else if (section === '#articles') {
      smoothScrollTo(articlesSec);
    } else if (section === '#contact') {
      smoothScrollTo(contactSec);
    } else if (section === '#home') {
      smoothScrollTo(heroSec);
    }
  }
};

const smoothScrollTo = section => {
  window.scrollTo({
    top: section.getBoundingClientRect().top + window.pageYOffset,
    left: section.getBoundingClientRect().left + window.pageXOffset,
    behavior: 'smooth',
  });
};

document.querySelector('.navbar-brand').addEventListener('click', event => {
  event.preventDefault();
  smoothScrollTo(heroSec);
});

navLinks.addEventListener('click', event => {
  event.preventDefault();
  navbarEventListener(event);
});

document.querySelector('.hero-nav-links').addEventListener('click', event => {
  event.preventDefault();
  navbarEventListener(event);
});

/** chevron icon */
heroSec.querySelector('i').addEventListener('click', () => smoothScrollTo(servicesSec));

/**
 * Navbar Links animation
 * @param {string} opacity a string from '0' - '1' inclusive
 */
const animateLinks = (event, opacity) => {
  const curLink = event.target;
  if (curLink.classList.contains('nav-link')) {
    document.querySelectorAll('.nav-link').forEach(link => {
      if (curLink !== link) link.style.opacity = opacity;
    });
  }
};

navLinks.addEventListener('mouseover', event => animateLinks(event, '0.5'));
navLinks.addEventListener('mouseout', event => animateLinks(event, '1'));

/**
 * Navbar sticky Animation using the IntersectionObserver API
 */
const stickyNav = entries => {
  if (!entries[0].isIntersecting) navbar.classList.add('show-navbar');
  else navbar.classList.remove('show-navbar');
};

const navbarObserver = new IntersectionObserver(stickyNav, { root: null, threshold: 0.3 });
navbarObserver.observe(heroSec);

/**
 * Navbar active-link highlight (scroll spy) using the IntersectionObserver API
 */
const sectionObsCallback = entries => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    const curSecID = entry.target.getAttribute('id');
    const curSecLink = document.querySelector(`.${curSecID}`);
    if (curSecLink) {
      document.querySelector('.active')?.classList.remove('active');
      curSecLink.classList.toggle('active');
    }
  }
};

const sectionObserver = new IntersectionObserver(sectionObsCallback, { threshold: 0.25 }); // -> root: null is default
sections.forEach(section => sectionObserver.observe(section));

/**
 * Lazy-loading certain elements
 */

/** Service section images */
const imagesObsCallback = entries => {
  if (entries[0].isIntersecting) {
    entries.forEach(entry => {
      entry.target.style.animation = `service-anim 1s ${entry.target.dataset.delay} forwards ease`;
    });
  }
};

/** Articles section images */
const blogObsCallback = entries => {
  if (entries[0].isIntersecting) {
    entries.forEach(entry => {
      entry.target.style.animation = `service-anim 1s ${entry.target.dataset.delay} forwards ease`;
    });
  }
};

/** Video section */
const videoObsCallback = entries => {
  const [video] = entries;
  if (video.isIntersecting) {
    video.target.style.opacity = '1';
    video.target.style.transform = 'translateY(0)';
  }
};

/** Lazy load service section images */
const imagesObserver = new IntersectionObserver(imagesObsCallback, { threshold: 0.1 }); // threshold: 10%
services.forEach(service => imagesObserver.observe(service));

/** Lazy load article section images */
const blogObserver = new IntersectionObserver(blogObsCallback, { threshold: 0.1 });
blogPosts.forEach(post => blogObserver.observe(post));

/** Lazy load video player */
const videoObserver = new IntersectionObserver(videoObsCallback, { threshold: 0.2 });
videoObserver.observe(video);

/**
 * Animate fun-facts box numbers
 */

const funFactObsCallback = entries => {
  if (entries[0].isIntersecting) {
    boxNum.forEach(box => {
      const updateCounter = () => {
        const target = +box.dataset.target; // <- converts from string to number
        const animSpeed = +box.dataset.speed;
        const curCount = +box.textContent;
        const increment = target / animSpeed;

        if (curCount < target) {
          box.textContent = Math.trunc(curCount + increment);
          setTimeout(updateCounter, 1);
        } else {
          box.textContent = Math.trunc(target);
        }
      };
      updateCounter();
    });
  }
};

const funFactObs = new IntersectionObserver(funFactObsCallback, { threshold: 0.2 });
funFactObs.observe(funFacts);

/**
 * window.onload
 */

window.addEventListener('load', () => {
  // hide-preloader
  document.querySelector('.preloader').style.opacity = '0';
  document.querySelector('.preloader').style.visibility = 'hidden';
  document.querySelector('body').style.overflowY = 'visible';

  document.querySelectorAll('.hero-anim').forEach(el => {
    setTimeout(() => {
      if (el.classList.contains('hero-title-small')) {
        el.style.animation = 'hero-anim 1.5s cubic-bezier(0.18, 0.58, 0.6, 1.03) forwards';
      } else {
        el.style.animation = 'hero-anim 1.25s cubic-bezier(0.18, 0.58, 0.6, 1.03) .6s forwards';
      }
    }, 500);
  });
  setTimeout(() => {
    document.querySelector('.fa-chevron-circle-down').style.opacity = '0';
    document.querySelector('.fa-chevron-circle-down').style.animation = 'arrow-anim 1s ease-in-out infinite alternate';
    document.querySelector('.fa-chevron-circle-down').style.opacity = '1';
  }, 1300);
});
