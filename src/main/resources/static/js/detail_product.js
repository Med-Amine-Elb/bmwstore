// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP animations
    initAnimations();

    // Set up event listeners
    setupEventListeners();

    // Remove quantity selector (as requested)
    removeQuantitySelector();

    // Initialize product functionality
    initProductFunctionality();
});

// Initialize GSAP animations for the page
function initAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Navbar scroll animation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.getElementById('main-nav').classList.add('scrolled');
        } else {
            document.getElementById('main-nav').classList.remove('scrolled');
        }
    });

    // Hero product image animation
    gsap.from('#main-product-image', {
        duration: 1.2,
        y: 30,
        opacity: 0,
        ease: "power3.out"
    });

    // Product info staggered animation
    gsap.from('.product-info > div', {
        duration: 0.8,
        y: 20,
        opacity: 0,
        stagger: 0.15,
        ease: "power2.out"
    });

    // Accordion items entrance animation
    gsap.from('.accordion-item', {
        scrollTrigger: {
            trigger: '.product-description',
            start: 'top 80%'
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(1.2)"
    });

    // Reviews section entrance
    gsap.from('.reviews-section', {
        scrollTrigger: {
            trigger: '.reviews-section',
            start: 'top 70%'
        },
        duration: 0.8,
        y: 40,
        opacity: 0,
        ease: "power2.out"
    });

    // Review items staggered entrance
    gsap.from('.review-item', {
        scrollTrigger: {
            trigger: '.reviews-list',
            start: 'top 80%'
        },
        duration: 0.7,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Related products entrance
    gsap.from('.product-card', {
        scrollTrigger: {
            trigger: '.related-products',
            start: 'top 80%'
        },
        duration: 0.8,
        y: 40,
        opacity: 0,
        stagger: 0.15,
        ease: "power2.out"
    });

    // Back to top button animation
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            gsap.to(backToTopBtn, { duration: 0.3, opacity: 1, visibility: 'visible' });
        } else {
            gsap.to(backToTopBtn, { duration: 0.3, opacity: 0, visibility: 'hidden' });
        }
    });

    // Color options hover effect
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            gsap.to(this, { duration: 0.3, scale: 1.15, ease: "back.out(1.7)" });
        });

        option.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                gsap.to(this, { duration: 0.3, scale: 1 });
            }
        });
    });
}

// Set up all event listeners
function setupEventListeners() {
    // Back to top button
    document.getElementById('back-to-top').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;

            // Toggle active class on the clicked item
            accordionItem.classList.toggle('active');

            // Animate the accordion content
            if (accordionItem.classList.contains('active')) {
                gsap.to(accordionContent, {
                    height: 'auto',
                    duration: 0.3,
                    ease: "power2.out",
                    onStart: function() {
                        accordionContent.style.display = 'block';
                    }
                });

                // Rotate the icon
                gsap.to(header.querySelector('.toggle-icon'), {
                    rotation: 180,
                    duration: 0.3
                });
            } else {
                gsap.to(accordionContent, {
                    height: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: function() {
                        accordionContent.style.display = 'none';
                    }
                });

                // Rotate the icon back
                gsap.to(header.querySelector('.toggle-icon'), {
                    rotation: 0,
                    duration: 0.3
                });
            }
        });
    });

    // Image zoom modal
    const mainImage = document.getElementById('main-product-image');
    const zoomModal = document.getElementById('image-zoom-modal');
    const zoomBtn = document.querySelector('.zoom-btn');
    const closeBtn = document.querySelector('.close-modal');
    const zoomedImage = document.getElementById('zoomed-image');

    zoomBtn.addEventListener('click', function() {
        zoomedImage.src = mainImage.src;
        gsap.fromTo(zoomModal,
            { opacity: 0, display: 'none' },
            { opacity: 1, display: 'flex', duration: 0.3 }
        );
    });

    closeBtn.addEventListener('click', function() {
        gsap.to(zoomModal, {
            opacity: 0,
            duration: 0.3,
            onComplete: function() {
                zoomModal.style.display = 'none';
            }
        });
    });

    // Thumbnail gallery
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));

            // Add active class to clicked thumbnail
            this.classList.add('active');

            // Update main image
            const thumbnailImg = this.querySelector('img');

            // Animate image change
            gsap.to(mainImage, {
                opacity: 0,
                duration: 0.3,
                onComplete: function() {
                    mainImage.src = thumbnailImg.src;
                    gsap.to(mainImage, { opacity: 1, duration: 0.3 });
                }
            });
        });
    });

    // Color options
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColorSpan = document.getElementById('selected-color');

    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all color options
            colorOptions.forEach(o => {
                o.classList.remove('active');
                gsap.to(o, { scale: 1, duration: 0.3 });
            });

            // Add active class to clicked color option
            this.classList.add('active');
            gsap.to(this, { scale: 1.15, duration: 0.3 });

            // Update selected color text
            const colorName = this.getAttribute('data-color');

            // Animate color text change
            gsap.to(selectedColorSpan, {
                opacity: 0,
                y: -10,
                duration: 0.2,
                onComplete: function() {
                    selectedColorSpan.textContent = colorName;
                    gsap.to(selectedColorSpan, {
                        opacity: 1,
                        y: 0,
                        duration: 0.2
                    });
                }
            });
        });
    });

    // Add to cart button
    document.getElementById('add-to-cart').addEventListener('click', function() {
        const cartModal = document.getElementById('cart-confirmation-modal');

        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        const currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;

        // Animate cart count
        gsap.fromTo(cartCount,
            { scale: 1 },
            { scale: 1.5, duration: 0.2, yoyo: true, repeat: 1 }
        );

        // Show modal with animation
        gsap.fromTo(cartModal,
            { opacity: 0, display: 'none', y: 20 },
            { opacity: 1, display: 'flex', y: 0, duration: 0.4, ease: "back.out(1.2)" }
        );
    });

    // Close cart confirmation modal
    document.querySelectorAll('.close-modal, .continue-shopping-btn').forEach(element => {
        element.addEventListener('click', function() {
            const cartModal = document.getElementById('cart-confirmation-modal');
            gsap.to(cartModal, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                onComplete: function() {
                    cartModal.style.display = 'none';
                }
            });
        });
    });

    // Buy now button
    document.getElementById('buy-now').addEventListener('click', function() {
        // Animate button press
        gsap.to(this, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });

        // Redirect to checkout (would be implemented with actual URL)
        setTimeout(() => {
            // window.location.href = '/checkout';
            alert('Redirecting to checkout...');
        }, 300);
    });
}

// Remove quantity selector as requested
function removeQuantitySelector() {
    const quantitySelector = document.querySelector('.quantity-selector');
    if (quantitySelector) {
        quantitySelector.style.display = 'none';
    }
}

// Initialize product functionality
function initProductFunctionality() {
    // Set up responsive design adjustments
    setupResponsiveDesign();

    // Initial accordion state - first one open
    const firstAccordion = document.querySelector('.accordion-item');
    if (firstAccordion) {
        const header = firstAccordion.querySelector('.accordion-header');
        const content = firstAccordion.querySelector('.accordion-content');

        firstAccordion.classList.add('active');
        content.style.display = 'block';
        content.style.height = 'auto';

        // Rotate the icon for the open accordion
        gsap.set(header.querySelector('.toggle-icon'), { rotation: 180 });
    }
}

// Set up responsive design adjustments
function setupResponsiveDesign() {
    // Function to handle responsive layout changes
    function handleResponsiveLayout() {
        const windowWidth = window.innerWidth;

        // Adjust product container grid for smaller screens
        if (windowWidth < 768) {
            document.querySelector('.product-container').style.gridTemplateColumns = '1fr';
        } else {
            document.querySelector('.product-container').style.gridTemplateColumns = '1fr 1fr';
        }

        // Make color options responsive
        const colorOptions = document.querySelectorAll('.color-option');
        if (windowWidth < 480) {
            colorOptions.forEach(option => {
                option.style.width = '30px';
                option.style.height = '30px';
            });
        } else {
            colorOptions.forEach(option => {
                option.style.width = '40px';
                option.style.height = '40px';
            });
        }

        // Adjust review items for mobile
        if (windowWidth < 640) {
            document.querySelectorAll('.review-item').forEach(item => {
                item.querySelector('.review-header').style.flexDirection = 'column';
                item.querySelector('.review-header').style.alignItems = 'flex-start';
                item.querySelector('.review-rating').style.marginTop = '1rem';
            });
        } else {
            document.querySelectorAll('.review-item').forEach(item => {
                item.querySelector('.review-header').style.flexDirection = 'row';
                item.querySelector('.review-header').style.alignItems = 'center';
                item.querySelector('.review-rating').style.marginTop = '0';
            });
        }
    }

    // Initial call
    handleResponsiveLayout();

    // Add resize event listener
    window.addEventListener('resize', handleResponsiveLayout);

    // Handle mobile navigation
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';

    const navContainer = document.querySelector('.nav-container');
    navContainer.insertBefore(navToggle, navContainer.firstChild);

    // Style the toggle button
    navToggle.style.display = 'none';
    navToggle.style.background = 'none';
    navToggle.style.border = 'none';
    navToggle.style.color = '#fff';
    navToggle.style.fontSize = '1.5rem';
    navToggle.style.cursor = 'pointer';

    // Media query for mobile view
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function handleMobileNav(e) {
        const navLinks = document.querySelector('.nav-links');

        if (e.matches) {
            // Mobile view
            navToggle.style.display = 'block';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = 'var(--primary-color)';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '1rem';
            navLinks.style.display = 'none';
            navLinks.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

            // Add click event for toggle
            navToggle.addEventListener('click', function() {
                if (navLinks.style.display === 'none') {
                    gsap.fromTo(navLinks,
                        { height: 0, opacity: 0, display: 'flex' },
                        { height: 'auto', opacity: 1, duration: 0.3 }
                    );
                } else {
                    gsap.to(navLinks, {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        onComplete: function() {
                            navLinks.style.display = 'none';
                        }
                    });
                }
            });
        } else {
            // Desktop view
            navToggle.style.display = 'none';
            navLinks.style.display = 'flex';
            navLinks.style.position = 'static';
            navLinks.style.flexDirection = 'row';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
            navLinks.style.opacity = '1';
            navLinks.style.height = 'auto';
        }
    }



    // Initial call
    handleMobileNav(mediaQuery);

    // Add listener for changes
    mediaQuery.addEventListener('change', handleMobileNav);
}


// Add CSS for responsive adjustments
function addResponsiveStyles() {
    const styleElement = document.createElement('style');

    styleElement.textContent = `
    /* Responsive styles */
    @media (max-width: 1024px) {
        .container {
            padding: 0 15px;
        }
        
        .product-container {
            gap: 1.5rem;
        }
        
        .product-info {
            padding: 1.5rem;
        }
    }
    
    @media (max-width: 768px) {
        .product-container {
            grid-template-columns: 1fr;
        }
        
        .nav-links {
            gap: 1rem;
        }
        
        .thumbnail {
            width: 60px;
            height: 60px;
        }
        
        .key-specs {
            grid-template-columns: 1fr;
        }
        
        .purchase-buttons {
            flex-direction: column;
        }
        
        .buy-now-btn {
            margin-left: 0;
            margin-top: 1rem;
        }
        
        .reviews-summary {
            flex-direction: column;
        }
        
        .rating-bars {
            width: 100%;
            margin-top: 1.5rem;
        }
        
        .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
    }
    
    @media (max-width: 640px) {
        h1 {
            font-size: 2rem;
        }
        
        .reviews-filter {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .write-review-btn {
            margin-top: 1rem;
            width: 100%;
        }
        
        .review-item {
            padding: 1rem;
        }
        
        .review-header {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .review-rating {
            margin-top: 1rem;
        }
    }
    
    @media (max-width: 480px) {
        .color-option {
            width: 30px;
            height: 30px;
        }
        
        .thumbnail-gallery {
            justify-content: center;
        }
        
        .product-price {
            flex-direction: column;
        }
        
        .current-price {
            font-size: 1.5rem;
        }
    }
    
    /* Animation styles */
    .accordion-content {
        display: none;
        height: 0;
        overflow: hidden;
    }
    
    .accordion-item.active .accordion-content {
        display: block;
    }
    
    /* Modal styles */
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 1500;
        justify-content: center;
        align-items: center;
    }
    `;

    document.head.appendChild(styleElement);
}

// Call the function to add responsive styles
addResponsiveStyles();