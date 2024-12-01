/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navBar = document.getElementById('navbar__list');
let navLinks = []; //initialize empty array for navlinks

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * check if the element is in the vp
 * @param {HTMLElement} element
 */
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= 300;
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNav = () => {
    //clearing the list
    navBar.innerHTML = '';

    //creating
    sections.forEach((section) => {
        const navItem = document.createElement('li');
        const navLink = document.createElement('a');
        navLink.href = `#${section.id}`;
        navLink.className = 'menu__link';
        navLink.textContent = section.dataset.nav;
        navItem.appendChild(navLink);
        navBar.append(navItem);
    });

    //selecting links
    navLinks = document.querySelectorAll(".menu__link");

    //check ..
    console.log('Updated navLinks:', navLinks); // This should now contain the anchor links
};

// Add class 'active' to section when near top of viewport
const setActive = () => {
    let activeIndex = -1;

    //finding the section in the vp
    sections.forEach((section, index) => {
        if (isInViewport(section)) {
            activeIndex = index;
        }
    });

    //if no active section is found:
    if (activeIndex === -1) return;

    console.log('Active section index:', activeIndex);

    //clearing the section active list
    sections.forEach((section) => {
        section.classList.remove("active");
    });

    //here i checked if the nav link list is founded correctly
    if (navLinks.length === 0) {
        console.error('No nav links found');
    }

    //clearing the link active list
    navLinks.forEach((link) => {
        link.classList.remove("active");
    });

    if (activeIndex !== -1) {
        sections[activeIndex].classList.add("active"); //active section
        navLinks[activeIndex].classList.add("active"); //active nav link
    } else {
        console.warn('no active section found in the viewport');
    }
};




// Scroll to Section smoothly using ( addEventListener - preventDefault - scrollIntoView )

const enableSmoothScrolling = () => {
    navBar.addEventListener('click', event=>{
        event.preventDefault();

        if(event.target.tagName === 'A'){
            const targetId =event.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            targetSection.scrollIntoView({behavior: 'smooth'});
        }
    })
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

//here is the build
document.addEventListener('DOMContentLoaded', function() {
    buildNav();
    enableSmoothScrolling();
    window.addEventListener("scroll", setActive);
    setActive();
});
