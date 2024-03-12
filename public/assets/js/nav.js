document.addEventListener('DOMContentLoaded', () => {
    let isLogoTransparent = false;

    const logo = document.querySelector('.logo');
    const navLinksContainer = document.querySelector('.nav-links-container');
    const mobileMenuBurger = document.querySelector('.mobile-menu-burger');

    window.addEventListener('scroll', () => {
        isLogoTransparent = window.scrollY > 64;
        logo.classList.toggle('transparent', isLogoTransparent);
    });

    mobileMenuBurger.addEventListener("click", toggleMenuBurger);
    function toggleMenuBurger(){
        navLinksContainer.classList.toggle('open');
        mobileMenuBurger.classList.toggle('open');
    }

});
