var isMobileMenuOpen = false;
var isLogoTransparent = false;

window.addEventListener('scroll', function() {
    if (window.scrollY > 64) {
        isLogoTransparent = true;
    } else {
        isLogoTransparent = false;
    }

  
    document.querySelector('.logo').classList.toggle('transparent', isLogoTransparent);
});

document.querySelector('.mobile-menu-burger').addEventListener('click', function() {
    document.querySelector('.nav-links-container').classList.toggle('open');
    isMobileMenuOpen = !isMobileMenuOpen;
});