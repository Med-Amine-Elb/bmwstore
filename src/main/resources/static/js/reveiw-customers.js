// Function to generate reviews content
function generateReviews() {
    const reviewsSection = document.querySelector('.reviews-section');

    // Check if reviews section exists
    if (!reviewsSection) return;

    // Create reviews container if it doesn't exist
    let reviewsList = reviewsSection.querySelector('.reviews-list');
    if (!reviewsList) {
        reviewsList = document.createElement('div');
        reviewsList.className = 'reviews-list';
        reviewsSection.appendChild(reviewsList);
    }

    // Clear existing content
    reviewsList.innerHTML = '';

    // Sample review data - replace with your actual data
    const reviewsData = [
        { author: "John D.", rating: 5, date: "2025-02-10", content: "Great product, exceeded my expectations!" },
        { author: "Sarah M.", rating: 4, date: "2025-02-08", content: "Very good quality and fast shipping. Would recommend." },
        { author: "Michael P.", rating: 5, date: "2025-01-25", content: "Excellent build quality and value for money." },
        { author: "Emma L.", rating: 3, date: "2025-01-20", content: "Decent product but took longer than expected to arrive." },
        { author: "David R.", rating: 5, date: "2025-01-15", content: "Absolutely love it! Will definitely purchase again." }
        // Add more sample reviews as needed
    ];

    // Create review items
    reviewsData.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';

        // Convert date to readable format
        const date = new Date(review.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Create rating stars
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

        reviewItem.innerHTML = `
            <div class="review-header">
                <span class="review-author">${review.author}</span>
                <div class="review-rating">${stars}</div>
                <span class="review-date">${formattedDate}</span>
            </div>
            <div class="review-content">
                <p>${review.content}</p>
            </div>
        `;

        reviewsList.appendChild(reviewItem);
    });

    // Add some basic styling to the reviews
    const style = document.createElement('style');
    style.textContent = `
        .reviews-list {
            margin-top: 2rem;
        }
        .review-item {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .review-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
        }
        .review-author {
            font-weight: bold;
        }
        .review-rating {
            color: #f0c14b;
            font-size: 1.2rem;
        }
        .review-date {
            color: #666;
            font-size: 0.9rem;
        }
        .review-content p {
            margin: 0;
            line-height: 1.5;
        }
    `;
    document.head.appendChild(style);
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Other initialization code...

    // Generate reviews
    generateReviews();
});
// Enhanced Review System with GSAP Animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Create animation for reviews section
        gsap.from('.reviews-section', {
            scrollTrigger: {
                trigger: '.reviews-section',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Create staggered animation for individual reviews
        gsap.from('.review-item', {
            scrollTrigger: {
                trigger: '.reviews-list',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power1.out'
        });
    }

    // Sample review data - replace with your actual data
    const reviewsData = [
        {
            author: "John D.",
            avatar: "/images/avatars/avatar1.jpg",
            rating: 5,
            title: "Absolutely Stunning Performance",
            date: "June 15, 2023",
            content: "The driving experience is unmatched. The power delivery is smooth yet explosive when needed. Interior quality is top-notch, and the technology features are intuitive. Couldn't be happier with my purchase!",
            images: [],
            helpfulCount: 12,
            notHelpfulCount: 2,
            verified: true
        },
        {
            author: "Sarah M.",
            avatar: "/images/avatars/avatar2.jpg",
            rating: 4,
            title: "Great Car, Minor Issues",
            date: "May 28, 2023",
            content: "The performance and handling are exceptional. The only drawbacks are the somewhat limited trunk space and the learning curve for the infotainment system. Overall, I'm very satisfied with the vehicle.",
            images: [],
            helpfulCount: 8,
            notHelpfulCount: 1,
            verified: true
        },
        {
            author: "Michael P.",
            avatar: "/images/avatars/avatar3.jpg",
            rating: 5,
            title: "Best Purchase I've Ever Made",
            date: "April 12, 2023",
            content: "This vehicle exceeds all expectations. The handling is precise, the acceleration is breathtaking, and the cabin is luxurious and quiet. The technology is cutting-edge yet intuitive to use. Worth every penny!",
            images: ["/images/reviews/review3-img1.jpg"],
            helpfulCount: 15,
            notHelpfulCount: 0,
            verified: true
        },
        {
            author: "Emma L.",
            avatar: "/images/avatars/avatar4.jpg",
            rating: 3,
            title: "Good Vehicle, Disappointing Dealer Experience",
            date: "March 5, 2023",
            content: "The car itself is great - responsive, comfortable, and well-built. However, my dealer experience left much to be desired. The sales process was lengthy and some promised features weren't properly explained.",
            images: [],
            helpfulCount: 6,
            notHelpfulCount: 3,
            verified: true
        },
        {
            author: "David R.",
            avatar: "/images/avatars/avatar5.jpg",
            rating: 5,
            title: "Engineering Masterpiece",
            date: "February 18, 2023",
            content: "From the moment you press the start button, you know this is something special. The engineering precision is evident in every aspect of the driving experience. The balance between comfort and performance is perfect.",
            images: ["/images/reviews/review5-img1.jpg", "/images/reviews/review5-img2.jpg"],
            helpfulCount: 20,
            notHelpfulCount: 1,
            verified: true
        }
    ];

    // Initialize reviews
    initializeReviews(reviewsData.slice(0, 2)); // Show first two reviews initially

    // Store remaining reviews for later loading
    const remainingReviews = reviewsData.slice(2);

    // Load more reviews button handler
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Add remaining reviews
            appendReviews(remainingReviews);

            // Update button state
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-check-circle"></i> All Reviews Loaded';
            this.classList.add('disabled');

            // Animate new reviews if GSAP is available
            if (typeof gsap !== 'undefined') {
                const newReviews = document.querySelectorAll('.review-item.new');
                gsap.from(newReviews, {
                    opacity: 0,
                    y: 30,
                    stagger: 0.15,
                    duration: 0.6,
                    ease: 'power1.out',
                    onComplete: function() {
                        newReviews.forEach(review => review.classList.remove('new'));
                    }
                });
            }
        });
    }

    // Sort reviews handler
    const reviewSort = document.getElementById('review-sort');
    if (reviewSort) {
        reviewSort.addEventListener('change', function() {
            sortReviews(this.value, reviewsData);
        });
    }
});

// Initialize reviews with the first batch
function initializeReviews(reviewsData) {
    const reviewsList = document.querySelector('.reviews-list');
    if (!reviewsList) return;

    // Clear existing reviews except the load more button
    const loadMoreDiv = reviewsList.querySelector('.more-reviews');
    reviewsList.innerHTML = '';

    // Add reviews
    reviewsData.forEach(review => {
        reviewsList.appendChild(createReviewElement(review));
    });

    // Re-add the load more button
    if (loadMoreDiv) {
        reviewsList.appendChild(loadMoreDiv);
    }

    // Setup helpful buttons handlers
    setupHelpfulButtons();
}

// Append additional reviews
function appendReviews(reviewsData) {
    const reviewsList = document.querySelector('.reviews-list');
    const loadMoreDiv = reviewsList.querySelector('.more-reviews');

    if (!reviewsList || !loadMoreDiv) return;

    // Insert reviews before the load more button
    reviewsData.forEach(review => {
        const reviewElement = createReviewElement(review);
        reviewElement.classList.add('new'); // Add class for animation
        reviewsList.insertBefore(reviewElement, loadMoreDiv);
    });

    // Setup helpful buttons handlers for new reviews
    setupHelpfulButtons();
}

// Create a review element
function createReviewElement(review) {
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';

    // Create star elements based on rating
    const starsHtml = createStarsHtml(review.rating);

    // Create images HTML if there are any
    const imagesHtml = review.images && review.images.length > 0
        ? `<div class="review-images">
         ${review.images.map(img => `<img src="${img}" alt="Review Image">`).join('')}
       </div>`
        : '';

    reviewItem.innerHTML = `
    <div class="review-header">
      <div class="reviewer-info">
        <div class="reviewer-avatar">
          <img src="${review.avatar}" alt="${review.author}">
        </div>
        <div class="reviewer-details">
          <h4 class="reviewer-name">${review.author}</h4>
          <div class="review-date">${review.date}</div>
        </div>
      </div>
      <div class="review-rating">
        <div class="stars">
          ${starsHtml}
        </div>
        ${review.verified ?
        `<div class="verified-badge">
           <i class="fas fa-check-circle"></i>
           Verified Purchase
         </div>` : ''}
      </div>
    </div>
    <div class="review-content">
      <h5 class="review-title">${review.title}</h5>
      <p class="review-text">${review.content}</p>
    </div>
    <div class="review-footer">
      ${imagesHtml}
      <div class="review-helpful">
        <span>Was this review helpful?</span>
        <button class="helpful-btn" data-action="helpful" data-count="${review.helpfulCount}">
          <i class="fas fa-thumbs-up"></i>
          Yes (${review.helpfulCount})
        </button>
        <button class="helpful-btn" data-action="not-helpful" data-count="${review.notHelpfulCount}">
          <i class="fas fa-thumbs-down"></i>
          No (${review.notHelpfulCount})
        </button>
      </div>
    </div>
  `;

    return reviewItem;
}

// Create stars HTML based on rating
function createStarsHtml(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    return starsHtml;
}

// Setup helpful buttons handlers
function setupHelpfulButtons() {
    const helpfulButtons = document.querySelectorAll('.helpful-btn');

    helpfulButtons.forEach(button => {
        // Skip if already initialized
        if (button.dataset.initialized) return;

        button.dataset.initialized = 'true';

        button.addEventListener('click', function() {
            // Get the review footer container
            const reviewFooter = this.closest('.review-footer');
            const helpfulBtns = reviewFooter.querySelectorAll('.helpful-btn');

            // Get current count
            const count = parseInt(this.dataset.count) || 0;

            // Update count and text
            this.dataset.count = count + 1;
            const action = this.dataset.action;
            const icon = action === 'helpful' ? 'fa-thumbs-up' : 'fa-thumbs-down';
            const text = action === 'helpful' ? 'Yes' : 'No';

            this.innerHTML = `
        <i class="fas ${icon}"></i>
        ${text} (${count + 1})
      `;

            // Add active class
            this.classList.add('active');

            // Disable all helpful buttons in this review
            helpfulBtns.forEach(btn => {
                btn.disabled = true;
                if (btn !== this) {
                    btn.classList.add('disabled');
                }
            });

            // Add a thank you message
            const thankYou = document.createElement('div');
            thankYou.className = 'thank-you-message';
            thankYou.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your feedback!';

            // Apply GSAP animation if available
            if (typeof gsap !== 'undefined') {
                // First hide it
                thankYou.style.opacity = 0;
                reviewFooter.appendChild(thankYou);

                // Then animate it
                gsap.to(thankYou, {
                    opacity: 1,
                    y: -10,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            } else {
                reviewFooter.appendChild(thankYou);
            }
        });
    });
}

// Sort reviews by different criteria
function sortReviews(sortBy, allReviewsData) {
    let sortedReviews = [...allReviewsData];

    switch(sortBy) {
        case 'newest':
            sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'highest':
            sortedReviews.sort((a, b) => b.rating - a.rating);
            break;
        case 'lowest':
            sortedReviews.sort((a, b) => a.rating - b.rating);
            break;
        default:
            break;
    }

    // Re-render all reviews with the new order
    initializeReviews(sortedReviews);

    // Hide the load more button since we're showing all reviews when sorting
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.parentElement.style.display = 'none';
    }
}