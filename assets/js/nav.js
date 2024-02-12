document.addEventListener('DOMContentLoaded', () => {
    let isLogoTransparent = false;

    const logo = document.querySelector('.logo');
    const navLinksContainer = document.querySelector('.nav-links-container');
    const mobileMenuBurger = document.querySelector('.mobile-menu-burger');

    window.addEventListener('scroll', () => {
        isLogoTransparent = window.scrollY > 64;
        logo.classList.toggle('transparent', isLogoTransparent);
    });

    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('mobile-menu-burger')) {
            navLinksContainer.classList.toggle('open');
            mobileMenuBurger.classList.toggle('open');
        }
    });
});
