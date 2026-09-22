import glob

old_string = "href={item === 'Home' ? '/' : item === 'Our Programs' ? '/programs' : item === 'About us' ? '/about' : `/${item.toLowerCase().replace(' ', '-')}`}"
new_string = "href={item === 'Home' ? '/' : item === 'Business Showcase' ? '/directory' : `/${item.toLowerCase().replace(' ', '-')}`}"

for filepath in glob.glob("src/app/**/page.tsx", recursive=True):
    with open(filepath, "r") as f:
        content = f.read()
    
    if old_string in content:
        content = content.replace(old_string, new_string)
        with open(filepath, "w") as f:
            f.write(content)

print("Done fixing mobile nav")
