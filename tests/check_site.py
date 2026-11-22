from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids, self.links, self.headings, self.papers = set(), [], 0, 0
        self.feed(path.read_text(encoding='utf-8'))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f"Duplicate ID: {attrs['id']}"
            self.ids.add(attrs['id'])
        self.headings += tag == 'h1'
        self.papers += 'paper' in attrs.get('class', '').split()
        self.links.extend(attrs[key] for key in ('href', 'src') if key in attrs)

pages = {path.name: Page(path) for path in ROOT.glob('*.html')}
for name, page in pages.items():
    assert page.headings == 1, (name, 'Expected one main heading')
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            continue
        target = unquote(url.path) or name
        assert (ROOT / target).is_file(), (name, link, 'Missing file')
        if url.fragment and target in pages:
            assert unquote(url.fragment) in pages[target].ids, (name, link, 'Missing anchor')
assert pages['publications.html'].papers == 12
print('PASS: page headings, local assets, anchor links, and 12 publications')
