document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // 1. HERO SLIDER
    // =============================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.getElementById('slider-dots');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    let slideInterval;

    if (heroSlides.length > 1 && dotsContainer) {
        heroSlides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    const dots = () => document.querySelectorAll('.dot');

    function goToSlide(index) {
        if (heroSlides.length <= 1) return;
        heroSlides[currentSlide].classList.remove('active');
        const d = dots();
        if (d.length) d[currentSlide].classList.remove('active');

        currentSlide = (index + heroSlides.length) % heroSlides.length;

        heroSlides[currentSlide].classList.add('active');
        if (d.length) d[currentSlide].classList.add('active');

        clearInterval(slideInterval);
        slideInterval = setInterval(() => goToSlide(currentSlide + 1), 4000);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    if (heroSlides.length > 1) {
        slideInterval = setInterval(() => goToSlide(currentSlide + 1), 4000);
    }

    // =============================================
    // 2. HEADER SCROLL EFFECT + SCROLL PROGRESS
    // =============================================
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / maxScroll) * 100;
        document.documentElement.style.setProperty('--scroll-progress', progress + '%');

        if (header) {
            if (scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // =============================================
    // 3. MOBILE NAV
    // =============================================
    const menuToggle = document.getElementById('menu-toggle-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileClose = document.getElementById('mobile-nav-close');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }
    if (mobileClose && mobileNav) {
        mobileClose.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
    // Close mobile nav on link click
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // =============================================
    // 4. FAQ ACCORDION
    // =============================================
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // =============================================
    // 5. PRODUCT CATEGORY TABS (Bento)
    // =============================================
    const catTabs = document.querySelectorAll('.cat-tab');
    const bentoCards = document.querySelectorAll('.bento-card');

    catTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            catTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const cat = tab.dataset.cat;
            bentoCards.forEach(card => {
                if (cat === 'all' || card.dataset.cat === cat) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(12px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.35s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // =============================================
    // 6. MACHINERY DRAG SCROLL
    // =============================================
    const scroller = document.querySelector('.machinery-scroll-wrap');
    if (scroller) {
        let isDown = false;
        let startX;
        let scrollLeft;

        scroller.addEventListener('mousedown', e => {
            isDown = true;
            startX = e.pageX - scroller.offsetLeft;
            scrollLeft = scroller.scrollLeft;
        });
        scroller.addEventListener('mouseleave', () => { isDown = false; });
        scroller.addEventListener('mouseup', () => { isDown = false; });
        scroller.addEventListener('mousemove', e => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scroller.offsetLeft;
            const walk = (x - startX) * 1.5;
            scroller.scrollLeft = scrollLeft - walk;
        });
    }

    // =============================================
    // 7. AOS INIT
    // =============================================
    AOS.init({
        duration: 450,
        easing: 'ease-out',
        once: false,
        offset: 30
    });

    // =============================================
    // 8. COUNTER ANIMATION
    // =============================================
    function animateCounters() {
        document.querySelectorAll('.stat-cell strong').forEach(el => {
            const text = el.innerText;
            const num = parseFloat(text.replace(/[^0-9.]/g, ''));
            if (isNaN(num)) return;
            const suffix = text.replace(/[0-9.]/g, '');
            let start = 0;
            const duration = 1500;
            const step = duration / num;
            const timer = setInterval(() => {
                start += Math.max(1, Math.ceil(num / 60));
                if (start >= num) {
                    el.innerText = text;
                    clearInterval(timer);
                } else {
                    el.innerText = start + suffix;
                }
            }, step);
        });
    }

    // Trigger counter when stats strip is visible
    const statsStrip = document.querySelector('.stats-strip');
    if (statsStrip) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        observer.observe(statsStrip);
    }

});
