document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header & Active Nav Link Highlighting ---
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Set Active Link based on current URL
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Default to index.html if path is empty (root)
    if (currentPath === '') currentPath = 'index.html';

    navLinks.forEach(link => {
        link.classList.remove('active');
        let linkHref = link.getAttribute('href');
        // Handle root/index cases
        if (linkHref === currentPath || (currentPath === 'index.html' && linkHref === '#')) {
            link.classList.add('active');
        }
    });

    // Sticky Header Effect on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const mobileIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');

        // Toggle icon between bars and times (close)
        if (navLinksContainer.classList.contains('active')) {
            mobileIcon.classList.remove('fa-bars');
            mobileIcon.classList.add('fa-times');
        } else {
            mobileIcon.classList.remove('fa-times');
            mobileIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            mobileIcon.classList.remove('fa-times');
            mobileIcon.classList.add('fa-bars');
        });
    });

    // --- Scroll Animation ---
    // Add fade-in class to elements we want to animate
    const animateElements = document.querySelectorAll('.section-title, .glass-card, .timeline-item, .achievement-banner');

    animateElements.forEach(el => {
        el.classList.add('fade-in');
    });

    // Intersection Observer for fade-in effect on scroll
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    animateElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // --- Certificate Modal ---
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("certImage");
    const certLinks = document.querySelectorAll(".open-cert-modal");
    const closeModal = document.querySelector(".close-modal");

    if (modal && closeModal) {
        certLinks.forEach(link => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                modal.style.display = "block";
                if (modalImg) modalImg.src = this.getAttribute("data-image");
            });
        });

        closeModal.addEventListener("click", function () {
            modal.style.display = "none";
        });

        // Close on outer click
        window.addEventListener("click", function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    // --- Custom Cursor Glow ---
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

});
