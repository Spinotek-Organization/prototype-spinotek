/**
 * PANDORA Wedding Planner
 * Core Interactions & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State
    init();

    // 2. Navbar Scroll Effect
    handleNavbar();

    // 3. Scroll Progress Bar
    window.addEventListener('scroll', updateScrollProgress);

    // 4. Intersection Observer for Scroll Reveal
    setupScrollReveal();

    // 5. Hero Parallax Effect
    setupHeroParallax();

    // 6. Smooth Scroll for Anchor Links
    setupSmoothScroll();

    // 7. Contact Form Validation
    setupFormValidation();
});

function init() {
    console.log('Pandora Wedding Planner - Luxury Experience Loaded');
}

/**
 * Navbar Background Transparency/Color on Scroll
 */
function handleNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Scroll Progress Bar Calculation
 */
function updateScrollProgress() {
    const scrollBar = document.querySelector('.scroll-progress');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;

    if (scrollBar) {
        scrollBar.style.width = `${progress}%`;
    }
}

/**
 * Intersection Observer for Reveal Animations
 */
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Hero Section Parallax
 */
function setupHeroParallax() {
    const heroBg = document.querySelector('.hero-parallax-bg');

    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        if (heroBg && scrollVal < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollVal * 0.4}px) scale(${1 + (scrollVal * 0.0002)})`;
        }
    });
}

/**
 * Smooth Navigation for Anchors
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active link
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

/**
 * Contact Form Logic
 */
function setupFormValidation() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic animation feedback
            const submitBtn = form.querySelector('button');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'SENDING...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                submitBtn.innerText = 'MESSAGE SENT';
                submitBtn.style.backgroundColor = '#22c55e'; // Success green
                submitBtn.style.borderColor = '#22c55e';

                form.reset();

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.style.opacity = '';
                }, 3000);
            }, 1500);
        });
    }
}

// Product Data for Modal
const productData = {
    'basic': {
        title: 'Paket Basic',
        price: 'Rp 43.000.000',
        features: {
            'Layanan Utama': [
                'Wedding Coordinator Hari-H (4 Personel)',
                'Koordinasi dengan Seluruh Vendor',
                'Penyusunan Rundown Acara',
                'Technical Meeting Vendor'
            ],
            'Fasilitas': [
                'Buku Panduan Pernikahan',
                'Family Coordination',
                'Guest Management (Digital)',
                'Maksimal 300 Tamu'
            ]
        }
    },
    'intimate': {
        title: 'Paket Intimate',
        price: 'Rp 65.000.000 – 71.000.000',
        features: {
            'Layanan Utama': [
                'Wedding Planning & 1 Month Coordination',
                'Tim Hari-H (6 Personel)',
                'Konsep & Tema Pernikahan',
                'Kurasi Vendor Pilihan'
            ],
            'Eksklusif': [
                'Venue Consultation',
                'Luxury Stationery Design',
                'VIP Guest Handling',
                'Maksimal 150 - 200 Tamu'
            ]
        }
    },
    '500tamu': {
        title: 'Paket 500 Tamu',
        price: 'Rp 78.000.000 – 90.000.000',
        features: {
            'Layanan Utama': [
                'Full Wedding Planning Services',
                'Tim Hari-H Profesional (10 Personel)',
                'Penyusunan Anggaran (Budgeting)',
                'Vendor Negotiation'
            ],
            'Fasilitas Mewah': [
                'Luxury Guest Reception',
                'Premium Rundown Management',
                'Full Vendor Coordination',
                'Hingga 500 Tamu'
            ]
        }
    },
    '1000tamu': {
        title: 'Paket 1000+ Tamu',
        price: 'Rp 100.000.000 ke atas',
        features: {
            'Layanan Utama': [
                'Masterpiece Wedding Planning',
                'Tim Hari-H Lengkap (15+ Personel)',
                'Konsep Megah Custom',
                'Art Direction & Design'
            ],
            'Fasilitas VIP': [
                'Full Guest Concierge',
                'Luxury Logistics Support',
                'VVIP Family Handling',
                '1000+ Tamu (Grand Ballroom)'
            ]
        }
    }
};

/**
 * Open Product Detail Modal
 */
function openProductDetail(productId) {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    const data = productData[productId];

    if (!modal || !data) return;

    let featuresHtml = '';
    for (const [group, items] of Object.entries(data.features)) {
        featuresHtml += `
            <div class="feature-group">
                <h4>${group}</h4>
                <ul>
                    ${items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    modalBody.innerHTML = `
        <div class="modal-detail-header">
            <h2>${data.title}</h2>
            <p class="modal-price">${data.price}</p>
        </div>
        <div class="modal-features">
            ${featuresHtml}
        </div>
        <div style="text-align: center; margin-top: 3rem;">
            <a href="#contact" class="btn btn-gold" onclick="closeProductModal()">Hubungi Kami Untuk Paket Ini</a>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

/**
 * Close Product Modal
 */
function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scroll
    }
}

// Close on outside click
window.onclick = (event) => {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        closeProductModal();
    }
};

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
});
