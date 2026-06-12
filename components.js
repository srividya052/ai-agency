// Testimonials Slider Component
function initTestimonialsSlider() {
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    
    if (!testimonialsContainer || !prevBtn || !nextBtn || indicatorDots.length === 0) {
        return;
    }
    
    let currentIndex = 0;
    let autoSlideInterval;

    function updateSlider() {
        const translateX = -currentIndex * 100;
        testimonialsContainer.style.transform = `translateX(${translateX}%)`;
        
        // Update indicator dots
        indicatorDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.remove('bg-gray-600');
                dot.classList.add('bg-cyan-500');
            } else {
                dot.classList.remove('bg-cyan-500');
                dot.classList.add('bg-gray-600');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % indicatorDots.length;
        updateSlider();
        resetAutoSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + indicatorDots.length) % indicatorDots.length;
        updateSlider();
        resetAutoSlide();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    }

    function autoSlide() {
        nextSlide();
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(autoSlide, 5000);
    }

    // Event listeners for buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Event listeners for indicator dots
    indicatorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.getAttribute('data-index')));
        });
    });

    // Pause on hover
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        testimonialsSection.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(autoSlide, 5000);
        });
    }

    // Start auto-slide
    autoSlideInterval = setInterval(autoSlide, 5000);
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTestimonialsSlider();
    initTabsSection();
});

// Tabs Component
function initTabsSection() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length === 0 || tabContents.length === 0) {
        return;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-white/10', 'border-cyan-500/30', 'text-white');
                btn.classList.add('bg-white/5', 'border-gray-600/30', 'text-gray-300');
            });

            // Add active class to clicked button
            button.classList.add('active', 'bg-white/10', 'border-cyan-500/30', 'text-white');
            button.classList.remove('bg-white/5', 'border-gray-600/30', 'text-gray-300');

            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });

            // Show selected tab content
            const selectedContent = document.getElementById(`${tabName}-content`);
            if (selectedContent) {
                selectedContent.classList.remove('hidden');
            }
        });
    });
}
