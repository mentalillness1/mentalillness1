document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-down-indicator a');
    const arrowIcon = document.querySelector('.scroll-down-indicator i');
    const targetSection = document.querySelector('#mentalquestions');
    
    function toggleArrow() {
        if (window.scrollY === 0) {
            arrowIcon.classList.remove('fa-angle-up');
            arrowIcon.classList.add('fa-angle-down');
            scrollIndicator.setAttribute('href', '#mentalquestions');
        } else {
            arrowIcon.classList.remove('fa-angle-down');
            arrowIcon.classList.add('fa-angle-up');
            scrollIndicator.setAttribute('href', '#');
        }
    }

    scrollIndicator.addEventListener('click', function(event) {
        event.preventDefault();
        
        if (scrollIndicator.getAttribute('href') === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            history.pushState(null, null, '/');
        } else {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            history.pushState(null, null, `#${targetSection.getAttribute('id')}`);
        }

        toggleArrow();
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY === 0) {
            history.pushState(null, null, '/');
        } else if (window.scrollY >= targetSection.offsetTop - window.innerHeight / 2) {
            history.pushState(null, null, `#${targetSection.getAttribute('id')}`);
        }

        toggleArrow();
    });

    // Initial check on page load
    toggleArrow();
});
