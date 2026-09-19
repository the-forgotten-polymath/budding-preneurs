import os
import glob
import re

nav_links = """<nav className="hidden lg:flex flex-nowrap items-center justify-center gap-3 xl:gap-5 whitespace-nowrap">
            <a href="/" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Home</a>
            <a href="/directory" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Business Showcase</a>
            <a href="/community" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Community</a>
            <a href="/programs" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Programs</a>
            <a href="/workshops" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Workshops</a>
            <a href="/about" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">About</a>
          </nav>"""

# Find all page.tsx files
for filepath in glob.glob("src/app/**/page.tsx", recursive=True):
    with open(filepath, "r") as f:
        content = f.read()
    
    # 1. Replace nav links block (which has variations in highlighting per page)
    # Actually, the highlighting is different on each page (e.g. bold and border-b-2).
    # Maybe I just replace "Marketplace" with "Business Showcase" everywhere first.
    content = content.replace(">Marketplace<", ">Business Showcase<")
    content = content.replace("Marketplace'", "Business Showcase'")
    content = content.replace("'Marketplace'", "'Business Showcase'")
    content = content.replace("BP Marketplace", "BP Business Showcase")
    content = content.replace("Marketplace Selling", "Business Showcase Selling")
    
    with open(filepath, "w") as f:
        f.write(content)

print("Done")
