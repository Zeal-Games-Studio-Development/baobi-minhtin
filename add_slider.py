import sys
import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Insert Swiper CSS
if "swiper-bundle.min.css" not in html:
    html = html.replace('<!-- Custom CSS -->', '<!-- Swiper CSS -->\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>\n    \n    <!-- Custom CSS -->')

# 2. Insert Swiper JS
if "swiper-bundle.min.js" not in html:
    html = html.replace('<script src="script.js"></script>\n</body>', '<!-- Swiper JS -->\n    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>\n    <script src="script.js"></script>\n</body>')

# 3. Product grid to swiper
if "product-swiper" not in html:
    product_start = html.find('<div class="product-grid-unified">')
    product_end = html.find('</div> <!-- End of Unified Grid -->') + len('</div> <!-- End of Unified Grid -->')
    product_block = html[product_start:product_end]

    # Replace each product card
    # A product card starts with <div class="product-card"> and ends with </div> just before the next or the end
    # Instead of fragile replace, we can use regex to wrap each <div class="product-card">...</div> with a <div class="swiper-slide">.
    # Actually, replacing '<div class="product-card">' with '<div class="swiper-slide"><div class="product-card">'
    # AND replacing the '                    </div>\n                </div>' with '                    </div>\n                </div></div>' is safer.
    
    # regex approach for wrapping:
    # Match <div class="product-card">.*?</div> (non greedy) but div inside div makes it hard for simple regex.
    # Since we know the exact HTML structure, replacing '<div class="product-card">' and finding the corresponding end is best via simple string replacements.
    
    new_product_block = product_block.replace('<div class="product-card">', '<div class="swiper-slide">\n                    <div class="product-card">')
    # The end of product info is '</div>\n                </div>'. We need to close swiper-slide too.
    new_product_block = new_product_block.replace('</div>\n                </div>\n', '</div>\n                    </div>\n                </div>\n')

    # Change container
    new_product_block = new_product_block.replace('<div class="product-grid-unified">', '<div class="swiper product-swiper" style="padding: 20px 0 50px;">\n                <div class="swiper-wrapper">')
    new_product_block = new_product_block.replace('</div> <!-- End of Unified Grid -->', '</div> <!-- End of swiper-wrapper -->\n                <div class="swiper-pagination"></div>\n                <div class="swiper-button-prev"></div>\n                <div class="swiper-button-next"></div>\n            </div> <!-- End of Swiper -->')

    html = html[:product_start] + new_product_block + html[product_end:]

# 4. Machinery grid to swiper
if "machinery-swiper" not in html:
    machinery_start = html.find('<div class="machinery-grid-images">')
    machinery_end = html.find('<div class="machine-image-item">', machinery_start)
    # Actually, we can just replace '<div class="machinery-grid-images">'
    html = html.replace('<div class="machinery-grid-images">', '<div class="swiper machinery-swiper" style="padding-bottom: 50px;">\n                <div class="swiper-wrapper">')
    
    # Wrap each machine item
    html = html.replace('<div class="machine-image-item">', '<div class="swiper-slide">\n                    <div class="machine-image-item">')
    html = html.replace('</div>\n                </div>\n                <div class="swiper-slide">', '</div>\n                    </div>\n                </div>\n                <div class="swiper-slide">')
    # The last one:
    html = html.replace('</div>\n                </div>\n            </div>\n        </div>\n    </section>', '</div>\n                    </div>\n                </div>\n                </div> <!-- end swiper-wrapper -->\n                <div class="swiper-pagination"></div>\n                <div class="swiper-button-prev"></div>\n                <div class="swiper-button-next"></div>\n            </div>\n        </div>\n    </section>')


with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Done index update")
