document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector('.grid');
    
    // Initialize Masonry with consistent gutter
    const masonry = new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 6,
        transitionDuration: 0 // Disable animations for more stable layout
    });

    // Make grid items visible by default
    document.querySelectorAll('.grid-item-inner').forEach(item => {
        item.style.opacity = 1;
    });

    // Handle images
    document.querySelectorAll('.grid-item img').forEach(img => {
        img.parentElement.parentElement.style.opacity = 1;
        
        img.onload = () => {
            masonry.layout();
        };
    });

    // Handle videos with Safari-specific fixes
    document.querySelectorAll('.grid-item video').forEach(video => {
        video.parentElement.parentElement.style.opacity = 1;
        
        // Force explicit dimensions for Safari
        video.style.width = '100%';
        video.style.height = 'auto';
        video.style.display = 'block';
        
        // Add loading class
        video.classList.add('loading');

        // Handle video loading
        video.addEventListener('loadedmetadata', () => {
            video.classList.remove('loading');
            video.classList.add('loaded');
            masonry.layout();
        });

        // Handle video playing
        video.addEventListener('playing', () => {
            masonry.layout();
        });

        // Load and play video
        try {
            video.load();
            setTimeout(() => {
                video.play().catch(() => {
                    // Silent catch for autoplay restrictions
                });
                masonry.layout();
            }, 100);
        } catch (error) {
            console.error('Video load error:', error);
        }
    });

    // Force multiple layouts to handle Safari issues
    const forceLayout = () => {
        masonry.layout();
    };

    // Layout sequence with increasing delays
    forceLayout();
    setTimeout(forceLayout, 100);
    setTimeout(forceLayout, 500);
    setTimeout(forceLayout, 1000);
    setTimeout(forceLayout, 2000);

    // Add resize handler for Safari
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            masonry.layout();
        }, 250);
    });
});

// Initialize particles.js (moved outside the DOMContentLoaded event listener)
document.addEventListener("DOMContentLoaded", function () {
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 10,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: false
            },
            move: {
                enable: true,
                speed: 2,
                direction: "bottom",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: false
                },
                onclick: {
                    enable: false
                },
                resize: true
            }
        },
        retina_detect: true
    });
});

// Language toggle functionality
let currentLanguage = 'en'; // Default language

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ja' : 'en';
    
    // Update all elements with data-en/data-ja attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        // Create a temporary div to decode HTML entities
        const temp = document.createElement('div');
        temp.innerHTML = text;
        element.innerHTML = temp.innerHTML;
    });

    // Update placeholders for form inputs
    document.querySelectorAll('[data-en-placeholder]').forEach(element => {
        element.placeholder = element.getAttribute(`data-${currentLanguage}-placeholder`);
    });

    // Update the language button text
    const langBtn = document.querySelector('.lang-text');
    langBtn.textContent = langBtn.getAttribute(`data-${currentLanguage}`);
}

// Add this after the existing code
document.addEventListener('DOMContentLoaded', function() {
    // Add click/tap handler to each grid item
    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // Prevent click from propagating
            e.stopPropagation();
            
            // Toggle the flipped state only for this item
            const inner = this.querySelector('.grid-item-inner');
            if (inner.style.transform === 'rotateY(180deg)') {
                inner.style.transform = 'rotateY(0)';
            } else {
                inner.style.transform = 'rotateY(180deg)';
            }
        });
    });
});

