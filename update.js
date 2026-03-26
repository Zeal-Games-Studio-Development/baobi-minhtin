const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Insert Swiper CSS
if (!html.includes('swiper-bundle.min.css')) {
    html = html.replace('<!-- Custom CSS -->', '<!-- Swiper CSS -->\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>\n    \n    <!-- Custom CSS -->');
}

// Insert Swiper JS
if (!html.includes('swiper-bundle.min.js')) {
    html = html.replace('<script src="script.js"></script>\n</body>', '<!-- Swiper JS -->\n    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>\n    <script src="script.js"></script>\n</body>');
}

// Replace Product Cards
// Wrap product-card with swiper-slide
html = html.split('<div class="product-card">').join('<div class="swiper-slide">\n                    <div class="product-card">');

// Since we opened swiper-slide, we need to close it after product-info
// A product card ends with </div> just before the next one or the container end.
// We can find '</div>\n                </div>\n                <div class="swiper-slide">' to close it? No, we just replaced <div class="product-card">.
// Let's revert and use regex
