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
 * Define Global Variables
 * 
*/
// i did that var to remove the errors in the eslinter
var document;
// array to store all the sections with spread operator
const allSecs = [...document.querySelectorAll("section")];
// a selector to select the <ul> tag in the html to append to it the <li>s as children
const navBarMenu = document.querySelector('ul');
//selecting html to add stuff to it later
const html = document.querySelector('html');
// selecting the header to make the navbar disappear when scrolling down
const navBar = document.querySelector('header');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// a helper function to check if the section we are viewing is on viewport
const isActive = function (elem) {
    let onView = elem.getBoundingClientRect();
    // I kept randomly trying to get workable numbers
    return  ( onView.top >= -400 && onView.top <= 200); 
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

// i kept that list global because i am going to use it in other functions
let navBarList=  [];
// main function
function creatNavBarList() {
    // fragment to be appended later to the actulal DOM to increase performance
    const newFragment = document.createDocumentFragment();
    // loop over every section
    for (let i = 0; i < allSecs.length; i++) {
        // create <li> element
        navBarList[i] = document.createElement('li');
        // create anchor element to add to the li
        let newAnchor = document.createElement('a');
        // add text with the section number
        newAnchor.innerText = `Section ${i + 1}`;
        // append anchor to the <li>
        navBarList[i].appendChild(newAnchor);
        // add class to the <li>
        navBarList[i].classList.add('menu__link');
        // add event on click to that <li> to scroll to the corresponding section
        navBarList[i].addEventListener('click' ,
        () => {
            allSecs[i].scrollIntoView();
        });
         // append this <li> to the fragment
        newFragment.append(navBarList[i]);
    }
    // append the fragment with all of the <li>s to the <ul>
    navBarMenu.append(newFragment);
}

// Add class 'active' to section when near top of viewport and change the corresponding <li> style
function spotActiveSec() {
    for (let i = 0; i < allSecs.length; i++) {
        if (isActive(allSecs[i])) {
            //if it is the active section add the active class
            allSecs[i].classList.add('your-active-class');
            navBarList[i].style.backgroundColor= 'lightblue';
        } else {
            //if it is not the active section remove the active class if it has it
            allSecs[i].classList.remove('your-active-class');
            navBarList[i].style.backgroundColor= 'white';
        }
    }
}
// to make smooth scroll
html.style.scrollBehavior = 'smooth';

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu when page loaded
window.addEventListener('load', creatNavBarList);
// Set sections as active and change the active <li> style
window.addEventListener('scroll', spotActiveSec);


// make the navbar disappear when scroll down
let oldScrollpos = window.pageYOffset;
window.addEventListener('scroll',() => {
    let currentScrollPos = window.pageYOffset;
        if (oldScrollpos > currentScrollPos) {
        navBar.style.top = "0";
        } else {
        navBar.style.top = "-200px";
        }
        oldScrollpos = currentScrollPos;
    });
