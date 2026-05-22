import os
import glob
import re

directory = "src/app"
files = glob.glob(f"{directory}/**/*.tsx", recursive=True) + glob.glob(f"{directory}/*.tsx")

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Update header background
    content = content.replace('bg-[#f8f9fa]', 'bg-[#FAF8F5]')
    content = content.replace('border-[#e9ecef]', 'border-[#E8E4DF]')

    # 2. Update nav links text color and hover
    content = content.replace('text-[#0f172a] hover:text-slate-500', 'text-[#1A1A1A] hover:text-[#C9540A]')
    
    # 3. Add Directory link in <nav> if not present
    if '<a href="/directory"' not in content and '<nav className="hidden lg:flex' in content:
        # Find Community link and insert Directory after it
        nav_pattern = r'(<a href="/community" className="[^"]+">Community</a>)'
        if re.search(nav_pattern, content):
            directory_link = '\n            <a href="/directory" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Directory</a>'
            content = re.sub(nav_pattern, r'\1' + directory_link, content)
        else:
            # Fallback if Community not found
            nav_end = r'(</nav>)'
            directory_link = '<a href="/directory" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Directory</a>\n          '
            content = re.sub(nav_end, directory_link + r'\1', content)

    # 4. Update mobile menu array
    mobile_menu_str = "['Home', 'Workshops', 'Community', 'Blog', 'Our Programs', 'Business Plan', 'Disclaimer', 'About us', 'Contact']"
    new_mobile_menu_str = "['Home', 'Workshops', 'Community', 'Directory', 'Blog', 'Our Programs', 'Business Plan', 'Disclaimer', 'About us', 'Contact']"
    content = content.replace(mobile_menu_str, new_mobile_menu_str)

    # 5. Update mobile menu styles and CTA button
    content = content.replace('text-[#0f172a] hover:text-[#C9540A]', 'text-[#1A1A1A] hover:text-[#C9540A]')
    content = content.replace('bg-[#0f172a] hover:bg-slate-800', 'bg-[#C9540A] hover:bg-[#A8420A]')
    content = content.replace('text-[#0f172a] hover:bg-slate-100', 'text-[#1A1A1A] hover:bg-gray-200')

    with open(filepath, 'w') as f:
        f.write(content)

print("Updated headers across all files.")
