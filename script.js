document.addEventListener('DOMContentLoaded', () => {

    // ── Hero Slider ──────────────────────────────────
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 1 && dotsContainer) {
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        if (slides.length <= 1) return;
        slides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        resetInterval();
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }
    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 4000);
    }
    if (slides.length > 1) resetInterval();

    // ── Header Scroll ─────────────────────────────────
    const header = document.querySelector('#mainHeader');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── Mobile Menu ───────────────────────────────────
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose  = document.getElementById('menuClose');
    const overlay    = document.getElementById('overlay');

    function openMenu() {
        mobileMenu.classList.add('open');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        mobileMenu.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }
    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (menuClose)  menuClose.addEventListener('click', closeMenu);
    if (overlay)    overlay.addEventListener('click', closeMenu);

    // ── FAQ Accordion ─────────────────────────────────
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // ── Process Line Fill on Scroll Into View ─────────
    const fill = document.getElementById('processLineFill');
    if (fill) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) fill.style.width = '100%';
            });
        }, { threshold: 0.3 });
        observer.observe(fill.parentElement);
    }

    // ── AOS ───────────────────────────────────────────
    AOS.init({ duration: 550, easing: 'ease-out', once: false, offset: 30 });

});
