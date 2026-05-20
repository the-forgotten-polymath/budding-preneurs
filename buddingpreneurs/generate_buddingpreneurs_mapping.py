import os
import json

base_dir = "/Users/geu/Desktop/BAKERYDATA/buddingpreneurs"
data_file = os.path.join(base_dir, "site_data.json")

if not os.path.exists(data_file):
    print(f"Error: {data_file} does not exist!")
    exit(1)

with open(data_file, 'r', encoding='utf-8') as f:
    site_data = json.load(f)

# Structure the mapping
mapping = {
    "project_name": "Buddingpreneurs Redesign Catalog & Architecture Map",
    "site_base_url": "https://buddingpreneurs.in/",
    "total_pages": len(site_data),
    "navigation_hierarchy": [
        {"label": "Home", "route": "/", "slug": "home"},
        {"label": "Our Programs", "route": "/our-programs", "slug": "our-programs"},
        {"label": "Workshops", "route": "/workshops", "slug": "workshops"},
        {"label": "Business Plan", "route": "/business-plan", "slug": "business-plan"},
        {"label": "Community", "route": "/community", "slug": "community"},
        {"label": "Blog", "route": "/blog", "slug": "blog"},
        {"label": "About Us", "route": "/about-us", "slug": "about-us"},
        {"label": "Contact", "route": "/contact", "slug": "contact"},
        {"label": "Disclaimer", "route": "/disclaimer", "slug": "disclaimer"}
    ],
    "pages": []
}

for page in site_data:
    url = page.get("url")
    title = page.get("title")
    slug = page.get("slug")
    
    # Clean headings and paragraphs
    headings = [h.strip() for h in page.get("headings", []) if h.strip()]
    paragraphs = [p.strip() for p in page.get("paragraphs", []) if p.strip()]
    
    # Process images and ensure paths are relative to base_dir
    images = []
    for img in page.get("images", []):
        local_path = img.get("local_path")
        if local_path:
            images.append({
                "local_path": local_path,
                "alt": img.get("alt", ""),
                "original_url": img.get("original_url")
            })
            
    page_map = {
        "url": url,
        "slug": slug,
        "title": title,
        "headings": headings,
        "content_snippets": paragraphs[:12], # key intro text snippets
        "full_text_blocks": paragraphs,
        "images": images,
        "local_dir": f"images/{slug}"
    }
    mapping["pages"].append(page_map)

# Save architecture_mapping.json
output_file = os.path.join(base_dir, "architecture_mapping.json")
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(mapping, f, indent=2, ensure_ascii=False)

print(f"Successfully generated architecture_mapping.json at: {output_file}")
