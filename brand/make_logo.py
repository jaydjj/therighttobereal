"""Build assets/logo.svg: outlined Fraunces lockup "The right to" / "be real.".

Usage: python3 make_logo.py <fontsource-fraunces files dir> <out.svg> [colour]
Fonts: npm pack @fontsource-variable/fraunces (files/ folder)."""
import sys, io
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import uharfbuzz as hb

pkg, out = sys.argv[1], sys.argv[2]
BLUE = sys.argv[3] if len(sys.argv) > 3 else "#151413"

def instance(path, axes):
    f = TTFont(path)
    inst = instantiateVariableFont(f, axes)
    inst.flavor = None
    buf = io.BytesIO(); inst.save(buf)
    return TTFont(io.BytesIO(buf.getvalue())), buf.getvalue()

def line(font, data, text, size, tracking_em, x0, baseline):
    upm = font["head"].unitsPerEm
    face = hb.Face(data); hfont = hb.Font(face)
    b = hb.Buffer(); b.add_str(text); b.guess_segment_properties()
    hb.shape(hfont, b, {"kern": True, "liga": True})
    gs = font.getGlyphSet(); order = font.getGlyphOrder()
    scale = size / upm
    pen = SVGPathPen(gs, ntos=lambda v: ("%.2f" % v).rstrip("0").rstrip("."))
    x = 0
    for info, pos in zip(b.glyph_infos, b.glyph_positions):
        name = order[info.codepoint]
        # flip y (font units are y-up), place at baseline
        t = (scale, 0, 0, -scale, x0 + (x + pos.x_offset) * scale, baseline - pos.y_offset * scale)
        gs[name].draw(TransformPen(pen, t))
        x += pos.x_advance + tracking_em * upm
    width = (x - tracking_em * upm) * scale
    return pen.getCommands(), width

roman, roman_data = instance(f"{pkg}/fraunces-latin-full-normal.woff2", {"wght": 700, "SOFT": 100, "WONK": 1, "opsz": 144})
italic, italic_data = instance(f"{pkg}/fraunces-latin-full-italic.woff2", {"wght": 500, "SOFT": 100, "WONK": 1, "opsz": 24})

MAIN = 100                     # "be real." size
TOP = MAIN * 0.82 / 1.9        # same ratio as the old header lockup
pad = 4
top_base = pad + TOP * 0.95
main_base = top_base + 4 + MAIN * 0.80
d_top, w_top = line(italic, italic_data, "The right to", TOP, 0, pad + MAIN * 0.03, top_base)
d_main, w_main = line(roman, roman_data, "be real.", MAIN, -0.035, pad, main_base)
W = round(max(w_top, w_main) + pad * 2 + 2)
H = round(main_base + MAIN * 0.03 + pad)
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="The right to be real.">
<title>The right to be real.</title>
<path fill="{BLUE}" d="{d_top}"/>
<path fill="{BLUE}" d="{d_main}"/>
</svg>
'''
open(out, "w").write(svg)
print(W, H, len(svg))
