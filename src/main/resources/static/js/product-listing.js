// Initialize GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const header = document.getElementById('main-header');
const heroSlider = document.querySelector('.hero-slider');
const vehicleGrid = document.getElementById('vehicleGrid');
const vehicleModal = document.getElementById('vehicleModal');
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonialDots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.testimonial-btn.prev');
const nextBtn = document.querySelector('.testimonial-btn.next');
const applyFiltersBtn = document.getElementById('apply-filters');

// Sample vehicle data (replace with actual data from your database)
const vehicles = [
    {
        id: 1,
        name: "NXT Sedan 2023",
        brand: "NXT",
        category: "Sedan",
        price: 35000,
        description: "A sleek and efficient sedan for the modern driver.",
        imageFileName: "/public/image/vehicles/sedan.jpg",
        modelYear: 2023,
        mileage: "0",
        horsepower: "200",
        automatic: true,
        engines: "2.0L 4-Cylinder",
        fuelTypes: "Gasoline",
        seats: "5"
    },
    // Add more vehicle objects here
];

// Hero slider images
const heroImages = [
    "/public/image/hero/hero1.jpg",
    "/public/image/hero/hero2.jpg",
    "/public/image/hero/hero3.jpg"
];

// Current slide index for hero and testimonial sliders
let currentHeroSlide = 0;
let currentTestimonialSlide = 0;

// Initialize hero slider
function initHeroSlider() {
    heroImages.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        heroSlider.appendChild(img);
    });

    gsap.to(heroSlider.children, {
        opacity: 0,
        duration: 0
    });

    gsap.to(heroSlider.children[0], {
        opacity: 1,
        duration: 0
    });

    setInterval(nextHeroSlide, 5000);
}

// Next hero slide
function nextHeroSlide() {
    gsap.to(heroSlider.children[currentHeroSlide], {
        opacity: 0,
        duration: 1
    });

    currentHeroSlide = (currentHeroSlide + 1) % heroImages.length;

    gsap.to(heroSlider.children[currentHeroSlide], {
        opacity: 1,
        duration: 1
    });
}

// Create vehicle cards
function createVehicleCards() {
    vehicleGrid.innerHTML = '';

    vehicles.forEach(vehicle => {
        const card = document.createElement('div');
        card.className = 'vehicle-card';
        card.innerHTML = `
            <div class="vehicle-image">
                <img src="${vehicle.imageFileName}" alt="${vehicle.name}">
            </div>
            <div class="vehicle-info">
                <h3 class="vehicle-title">${vehicle.name}</h3>
                <div class="vehicle-specs">
                    <span>${vehicle.modelYear}</span>
                    <span>${vehicle.mileage === '0' ? 'New' : vehicle.mileage + ' miles'}</span>
                    <span>${vehicle.automatic ? 'Automatic' : 'Manual'}</span>
                </div>
                <div class="vehicle-price">$${vehicle.price.toLocaleString()}</div>
                <div class="vehicle-actions">
                    <button class="view-details" data-id="${vehicle.id}">View Details</button>
                    <button class="add-favorite"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;

        vehicleGrid.appendChild(card);

        // Animate card entrance
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: 0.1 * vehicles.indexOf(vehicle),
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100px'
            }
        });
    });

    // Add event listeners to view details buttons
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const vehicleId = parseInt(this.getAttribute('data-id'));
            openVehicleModal(vehicleId);
        });
    });
}

// Open vehicle modal
function openVehicleModal(vehicleId) {
    const vehicle = vehicles.find(v => v.id === vehicleId);

    if (!vehicle) return;

    const modalBody = vehicleModal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="modal-vehicle">
            <div class="modal-gallery">
                <img src="${vehicle.imageFileName}" alt="${vehicle.name}">
            </div>
            <div class="modal-info">
                <h2>${vehicle.name}</h2>
                <p class="modal-price">$${vehicle.price.toLocaleString()}</p>
                <div class="modal-specs">
                    <div class="spec-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${vehicle.modelYear}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>${vehicle.mileage === '0' ? 'New' : vehicle.mileage + ' miles'}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-cog"></i>
                        <span>${vehicle.automatic ? 'Automatic' : 'Manual'}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-gas-pump"></i>
                        <span>${vehicle.fuelTypes}</span>
                    </div>
                </div>
                <p class="modal-description">${vehicle.description}</p>
                <div class="modal-actions">
                    <button class="btn primary">Schedule Test Drive</button>
                    <button class="btn secondary">Add to Favorites</button>
                </div>
            </div>
        </div>
    `;

    vehicleModal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Animate modal entrance
    gsap.from('.modal-vehicle', {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
    });
}

// Close vehicle modal
function closeVehicleModal() {
    gsap.to('.modal-vehicle', {
        y: -50,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
            vehicleModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}

// Testimonial slider functionality
function showTestimonialSlide(index) {
    if (index < 0) {
        currentTestimonialSlide = testimonialDots.length - 1;
    } else if (index >= testimonialDots.length) {
        currentTestimonialSlide = 0;
    } else {
        currentTestimonialSlide = index;
    }

    // Update active dot
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentTestimonialSlide);
    });

    // Animate slide transition
    gsap.to(testimonialSlider, {
        x: -currentTestimonialSlide * 100 + '%',
        duration: 0.5,
        ease: 'power2.inOut'
    });
}

// Initialize animations
function initAnimations() {
    // Navbar color change on scroll
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {className: 'scrolled', targets: header}
    });

    // Hero content animations
    gsap.from('.hero-content h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    gsap.from('.hero-content p', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.hero-buttons', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1.1,
        ease: 'power3.out'
    });

    // Scroll animations
    gsap.utils.toArray('.feature').forEach(feature => {
        gsap.from(feature, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: feature,
                start: 'top bottom-=100px'
            }
        });
    });
}

// Apply filters
function applyFilters() {
    // Implement your filter logic here
    console.log('Filters applied');

    // Animate the "Apply Filters" button
    gsap.to(applyFiltersBtn, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1
    });
}

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    createVehicleCards();
    initAnimations();

    // Close modal when clicking outside
    vehicleModal.addEventListener('click', (e) => {
        if (e.target === vehicleModal) {
            closeVehicleModal();
        }
    });

    // Close modal with close button
    document.querySelector('.close-modal').addEventListener('click', closeVehicleModal);

    // Testimonial navigation
    prevBtn.addEventListener('click', () => showTestimonialSlide(currentTestimonialSlide - 1));
    nextBtn.addEventListener('click', () => showTestimonialSlide(currentTestimonialSlide + 1));
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonialSlide(index));
    });

    // Apply filters
    applyFiltersBtn.addEventListener('click', applyFilters);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});