
import codecs
with open(r'd:\Project\template-baobi\styles\orange\styles.css', 'rb') as f:
    data = f.read()

text = data.decode('utf-8', errors='ignore')
good_end = text.rfind('@media (max-width: 1080px)')
end_idx = text.find('}', good_end)
clean_text = text[:end_idx+1]

with open(r'd:\Project\template-baobi\styles\orange\styles.css', 'w', encoding='utf-8') as f:
    f.write(clean_text)

print('File fixed')

