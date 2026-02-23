/* ========================================
   Alex & Bailey Wedding — Interactive Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // Navbar Scroll Effect
    // ===========================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===========================
    // Mobile Menu Toggle
    // ===========================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ===========================
    // Smooth Scroll
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ===========================
    // Reveal on Scroll (Intersection Observer)
    // ===========================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ===========================
    // FAQ Accordion
    // ===========================
    const faqItems = document.querySelectorAll('.faq-accordion-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Opcional: fechar outros ao abrir um novo
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });


    // ===========================
    // Scroll Animation for History (Pinned)
    // ===========================
    const storySection = document.querySelector('.story-pin-section');
    const storyScrollWrapper = document.querySelector('.story-scroll-wrapper');
    const storyCards = document.querySelectorAll('.story-card');
    const progressFill = document.querySelector('.progress-fill');

    if (storySection && storyScrollWrapper) {
        window.addEventListener('scroll', () => {
            const sectionRect = storySection.getBoundingClientRect();
            const wrapperRect = storyScrollWrapper.getBoundingClientRect();

            // Total distance to scroll within the wrapper
            const totalDistance = storyScrollWrapper.offsetHeight - window.innerHeight;
            // How much we've scrolled inside the wrapper
            const scrolled = -wrapperRect.top;

            if (scrolled >= 0 && scrolled <= totalDistance) {
                const scrollPercent = scrolled / totalDistance;
                const totalCards = storyCards.length;

                // Calculate which card should be active
                const cardIndex = Math.floor(scrollPercent * totalCards);
                const activeIndex = Math.min(cardIndex, totalCards - 1);

                storyCards.forEach((card, idx) => {
                    if (idx === activeIndex) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
                });

                if (progressFill) {
                    progressFill.style.width = `${scrollPercent * 100}%`;
                }
            }
        });
    }


    // ===========================
    // Contact Form
    // ===========================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;

            btn.innerHTML = '<span>Enviando...</span>';
            btn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                btn.innerHTML = '<span>✓ Presença Confirmada!</span>';
                btn.style.background = 'var(--accent-primary)';

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ===========================
    // Active Nav Link Highlight (Revised for better accuracy)
    // ===========================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    const highlightNavLink = () => {
        let currentId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentId = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Run once on load

});

// ===========================
// Gift Modal Functions
// ===========================
function abrirModal(item, valor) {
    const modal = document.getElementById('modalPix');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalValor = document.getElementById('modalValor');
    const modalQrCode = document.getElementById('modalQrCode');

    if (modal && modalTitulo && modalValor && modalQrCode) {
        modalTitulo.innerText = "Presentear: " + item;
        modalValor.innerText = "R$ " + valor;

        // Update QR Code
        const pixData = `Chave: seuemail@exemplo.com | Item: ${item} | Valor: ${valor}`;
        modalQrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixData)}`;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function fecharModal() {
    const modal = document.getElementById('modalPix');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}
