// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {    anchor.addEventListener('click', function (e) {        e.preventDefault();        const href = this.getAttribute('href');        if (href === '#') return;        const target = document.querySelector(href);        if (target) {            const header = document.querySelector('.header');            const headerOffset = header.offsetHeight;            const elementPosition = target.getBoundingClientRect().top;            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;            window.scrollTo({                top: offsetPosition,                behavior: 'smooth'            });        }    });});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.benefit-card, .feature, .ingredient-category, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter Animation for Statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(statNumber.textContent.replace(/\D/g, ''));
            const suffix = statNumber.textContent.replace(/\d/g, '');
            
            animateCounter(statNumber, targetValue);
            
            // Add suffix back after animation
            setTimeout(() => {
                statNumber.textContent = targetValue + suffix;
            }, 2000);
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"][data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});
// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
// ===============================
// FAQ ACCORDION (100% COMPATÍVEL)
// ===============================
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');
    const isOpen = answer.classList.contains('active');

    // Fecha todos
    document.querySelectorAll('.faq-answer').forEach(a => {
        a.classList.remove('active');
    });

    document.querySelectorAll('.faq-question .faq-icon').forEach(i => {
        i.textContent = '+';
    });

    // Abre o clicado
    if (!isOpen) {
        answer.classList.add('active');
        icon.textContent = '−';
    }
}

// Abre automaticamente a primeira pergunta
document.addEventListener('DOMContentLoaded', function () {
    const firstQuestion = document.querySelector('#faq .faq-question');
    if (!firstQuestion) return;

    const firstAnswer = firstQuestion.nextElementSibling;
    const firstIcon = firstQuestion.querySelector('.faq-icon');

    firstAnswer.classList.add('active');
    firstIcon.textContent = '−';
});
