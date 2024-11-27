document.addEventListener('DOMContentLoaded', function () {
    const scrollIndicators = document.querySelectorAll('.scroll-down-indicator a');
    const arrowIcons = document.querySelectorAll('.scroll-down-indicator i');
    const sections = ['#ocdinfo', '#ocdinformation']; // Section IDs

    function toggleArrow(scrollIndicator, arrowIcon, targetSection, index) {
        const currentSection = document.querySelector(sections[index]);
        const isAtTop = window.scrollY === 0;
        const isInTargetSection =
            targetSection &&
            window.scrollY >= targetSection.offsetTop - window.innerHeight / 2;

        if (isAtTop || isInTargetSection) {
            arrowIcon.classList.remove('fa-angle-up');
            arrowIcon.classList.add('fa-angle-down');
            scrollIndicator.setAttribute('href', targetSection ? `#${targetSection.id}` : sections[index]);
        } else {
            arrowIcon.classList.remove('fa-angle-down');
            arrowIcon.classList.add('fa-angle-up');
            scrollIndicator.setAttribute('href', '#');
        }
    }

    scrollIndicators.forEach((scrollIndicator, index) => {
        const targetSection = document.querySelector(sections[index]);

        scrollIndicator.addEventListener('click', function (event) {
            event.preventDefault();

            if (scrollIndicator.getAttribute('href') === '#') {
                // Scroll to the top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                history.pushState(null, null, '/ocd');
            } else if (targetSection) {
                // Scroll to the target section
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, null, `#${targetSection.id}`);
            }

            // Toggle arrow icon after scrolling
            toggleArrow(scrollIndicator, arrowIcons[index], targetSection, index);
        });

        window.addEventListener('scroll', function () {
            toggleArrow(scrollIndicator, arrowIcons[index], targetSection, index);
        });

        // Initialize the arrow states
        toggleArrow(scrollIndicator, arrowIcons[index], targetSection, index);
    });
});

showFormButton.addEventListener('click', function() {
    formContainer.classList.remove('hidden');
    formContainer.classList.add('visible');
    showFormButton.style.display = 'none';
});