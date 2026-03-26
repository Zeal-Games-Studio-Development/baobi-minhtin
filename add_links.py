import re

filepath = r"c:\UnityProject\nhua_minh_tin_web\index.html"
with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

def replacer(match):
    full = match.group(0)
    card_open = match.group(1)
    content = match.group(2)
    card_close = match.group(3)
    
    href = "product-detail.html"
    if "thung_carton.png" in content or "Khay Giấy Bế" in content:
        href = "product-detail-carton.html"
    elif "hop_cod.png" in content or "Hộp Pizza" in content:
        href = "product-detail-cod.html"
    elif "tui_giay.png" in content:
        href = "product-detail-tui.html"
        
    return f'{card_open}\n                    <a href="{href}" style="display:block; text-decoration:none; color:inherit;">\n{content}\n                    </a>\n{card_close}'

pattern = re.compile(r'(<div class="product-card"[^>]*>)(.*?)(</div>\s*(?:<!--.*?-->)?\s*(?=</?div|<div class="product-card"))', re.DOTALL)

# We need to make sure we don't accidentally match the unified grid
# Actually it's simpler:
chunks = []
last_idx = 0
for match in re.finditer(r'(<div class="product-card" data-aos="fade-up"[^>]*>)(.*?)(</div>\n)', html, re.DOTALL):
    start = match.start()
    end = match.end()
    
    card_open = match.group(1)
    content = match.group(2)
    card_close = match.group(3)
    
    if "<a href=" in content:
        continue # already linked
        
    href = "product-detail.html"
    if "thung_carton.png" in content:
        href = "product-detail-carton.html"
    elif "hop_cod.png" in content:
        href = "product-detail-cod.html"
    elif "tui_giay.png" in content:
        href = "product-detail-tui.html"
        
    new_str = f'{card_open}<a href="{href}" style="display:block; color:inherit; text-decoration:none;">{content}</a>{card_close}'
    chunks.append((start, end, new_str))

# apply reverse
new_html = html
for start, end, new_str in reversed(chunks):
    new_html = new_html[:start] + new_str + new_html[end:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_html)

print(f"Replaced {len(chunks)} items")
