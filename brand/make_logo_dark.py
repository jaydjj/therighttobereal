"""Build assets/logo-dark.svg from assets/logo.svg for dark mode.

Same artwork, recoloured: black lettering becomes cream, red "real" becomes gold (never red on black).
Usage (from the repo root): python3 brand/make_logo_dark.py
Rerun it whenever assets/logo.svg changes.
"""
from pathlib import Path

root = Path(__file__).resolve().parent.parent
svg = (root / "assets/logo.svg").read_text()
for light, dark in {"#1a1714": "#efe6d4", "#9e2a1f": "#d9a441"}.items():
    assert light in svg, light
    svg = svg.replace(f'fill="{light}"', f'fill="{dark}"')
(root / "assets/logo-dark.svg").write_text(svg)
print("wrote assets/logo-dark.svg")
