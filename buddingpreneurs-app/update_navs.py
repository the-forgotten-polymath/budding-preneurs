import os
import glob
import re

new_desktop_nav = """<nav className="hidden lg:flex flex-nowrap items-center justify-center gap-3 xl:gap-5 whitespace-nowrap">
            <a href="/" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Home</a>
            <a href="/directory" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Business Showcase</a>
            <a href="/community" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Community</a>
            <a href="/programs" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Programs</a>
            <a href="/workshops" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Workshops</a>
            <a href="/about" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">About</a>
          </nav>"""

for filepath in glob.glob("src/app/**/page.tsx", recursive=True):
    with open(filepath, "r") as f:
        content = f.read()

    # The block might be slightly different per file (e.g., active page style)
    # So I will just use regex to replace the <nav className="hidden lg:flex ...">...</nav> block
    # Note: we shouldn't replace it if it's already updated, but it doesn't matter much.
    content = re.sub(r'<nav className="hidden lg:flex[^>]*>.*?</nav>', new_desktop_nav, content, flags=re.DOTALL)
    
    # Also update mobile navigation array
    content = re.sub(
        r"\['Home', 'Workshops', 'Community', 'Business Showcase', 'Blog', 'Our Programs', 'Business Plan', 'Disclaimer', 'About us', 'Contact'\]",
        "['Home', 'Business Showcase', 'Community', 'Programs', 'Workshops', 'About']",
        content
    )

    with open(filepath, "w") as f:
        f.write(content)

with open("src/components/NavAuth.tsx", "r") as f:
    navauth = f.read()
    navauth = navauth.replace("Join Free", "Get Featured")
with open("src/components/NavAuth.tsx", "w") as f:
    f.write(navauth)

print("Nav updated")
