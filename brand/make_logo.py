"""Build assets/logo.svg: the stacked lockup "THE RIGHT TO" / "be" / "real".

Usage: python3 make_logo.py <fontsource-fraunces files dir> <out.svg> [ink] [red]
Fonts: npm pack @fontsource-variable/fraunces (files/ folder).
Every glyph is converted to outlines, so the logo looks the same everywhere.
"""
import sys, io
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
import uharfbuzz as hb

pkg, out = sys.argv[1], sys.argv[2]
INK = sys.argv[3] if len(sys.argv) > 3 else "#1a1714"
RED = sys.argv[4] if len(sys.argv) > 4 else "#9e2a1f"

def instance(name, axes):
    f = TTFont(f"{pkg}/{name}")
    inst = instantiateVariableFont(f, axes)
    inst.flavor = None
    buf = io.BytesIO(); inst.save(buf)
    data = buf.getvalue()
    return TTFont(io.BytesIO(data)), data

def shape(font, data, text, tracking=0.0):
    face = hb.Face(data); hfont = hb.Font(face)
    b = hb.Buffer(); b.add_str(text); b.guess_segment_properties()
    hb.shape(hfont, b, {"kern": True, "liga": True})
    upm = font["head"].unitsPerEm
    order = font.getGlyphOrder()
    x, glyphs = 0, []
    for info, pos in zip(b.glyph_infos, b.glyph_positions):
        glyphs.append((order[info.codepoint], x + pos.x_offset, pos.y_offset))
        x += pos.x_advance + tracking * upm
    return glyphs, upm

def draw(font, data, text, size, x0, baseline, tracking=0.0):
    glyphs, upm = shape(font, data, text, tracking)
    gs = font.getGlyphSet(); s = size / upm
    pen = SVGPathPen(gs, ntos=lambda v: ("%.2f" % v).rstrip("0").rstrip("."))
    bp = BoundsPen(gs)
    for name, gx, gy in glyphs:
        t = (s, 0, 0, -s, x0 + gx * s, baseline - gy * s)
        gs[name].draw(TransformPen(pen, t)); gs[name].draw(TransformPen(bp, t))
    return pen.getCommands(), bp.bounds  # bounds in SVG space (y down)

roman_black, rb = instance("fraunces-latin-full-normal.woff2", {"wght": 900, "SOFT": 100, "WONK": 0, "opsz": 144})
ital_black, ib = instance("fraunces-latin-full-italic.woff2", {"wght": 900, "SOFT": 0, "WONK": 0, "opsz": 9})
caps, cb = instance("fraunces-latin-full-normal.woff2", {"wght": 700, "SOFT": 0, "WONK": 0, "opsz": 72})

R = 200                         # size of "real"
base_real = 400
d_real, b_real = draw(roman_black, rb, "real", R, 0, base_real, -0.02)
x_left, real_w = b_real[0], b_real[2] - b_real[0]
# top of the x-height of "real" (r, e, a), ignoring the tall l
_, b_rea = draw(roman_black, rb, "rea", R, 0, base_real, -0.02)
be_size = R * 0.56
base_be = b_rea[1] - R * 0.005   # "be" rests on top of "real"
d_be, b_be = draw(ital_black, ib, "be", be_size, x_left + R * 0.08, base_be, -0.01)
# "THE RIGHT TO" spans about four-fifths of "real", starting a little in
_, probe = draw(caps, cb, "THE RIGHT TO", 100, 0, 0, 0.05)
cap_size = 100 * (real_w * 0.80) / (probe[2] - probe[0])
base_caps = b_be[1] - R * 0.035
d_caps, b_caps = draw(caps, cb, "THE RIGHT TO", cap_size, x_left + real_w * 0.12, base_caps, 0.05)

minx = min(b_real[0], b_be[0], b_caps[0]); maxx = max(b_real[2], b_be[2], b_caps[2])
miny = min(b_real[1], b_be[1], b_caps[1]); maxy = max(b_real[3], b_be[3], b_caps[3])
pad = 4
vb = (round(minx - pad, 2), round(miny - pad, 2), round(maxx - minx + 2 * pad, 2), round(maxy - miny + 2 * pad, 2))
W, H = round(vb[2]), round(vb[3])
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb[0]} {vb[1]} {vb[2]} {vb[3]}" width="{W}" height="{H}" role="img" aria-label="The right to be real">
<title>The right to be real</title>
<path fill="{INK}" d="{d_caps}"/>
<path fill="{INK}" d="{d_be}"/>
<path fill="{RED}" d="{d_real}"/>
</svg>
'''
open(out, "w").write(svg)
print(W, H, len(svg))
