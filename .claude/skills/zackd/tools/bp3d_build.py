"""Build the engine's anatomy OBJs from the BodyParts3D 4.3 library (olivercase/body_parts_3d_api layout).

  python3 tools/bp3d_build.py [lib=assets/bodyparts3d] [out=assets/shared/anatomy] [recipe=tools/anatomy_parts.json] [only=a,b]
  python3 tools/bp3d_build.py --find "heart"          list element names matching a regex (to write new recipe entries)

Library layout: <lib>/obj/FJxxxx[M]_BPxxxx_FMAxxxx_<name>.obj, <lib>/FMA2Obj.txt, <lib>/MANIFEST.csv.
Output: one OBJ per part, BodyParts3D millimetres (x right->left, y back(+)/front(-), z up), vertices + faces only
(normals are computed in the browser), 0.1 mm precision. Each element becomes its own 'o' object so the engine can
split pieces (e.g. left/right kidney). Licence: BodyParts3D (c) DBCLS, CC BY-SA 2.1 JP - credit it.
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
args = [a for a in sys.argv[1:] if not a.startswith('--')]
kw = dict(a.split('=', 1) for a in args if '=' in a)
LIB = Path(kw.get('lib', ROOT / 'assets/bodyparts3d'))
OUT = Path(kw.get('out', ROOT / 'assets/shared/anatomy'))
RECIPE = json.loads(Path(kw.get('recipe', ROOT / 'tools/anatomy_parts.json')).read_text())
ONLY = set(kw['only'].split(',')) if 'only' in kw else None

files = {}
for p in (LIB / 'obj').glob('FJ*.obj'):
    fj, _bp, _fma, name = p.stem.split('_', 3)
    files[fj] = (p, name)
tree = {}
for line in (LIB / 'FMA2Obj.txt').read_text(errors='ignore').replace('\r', '\n').split('\n'):
    c = line.split('\t')
    if line.startswith('FMA') and len(c) >= 3: tree[f'{c[0]}@{c[1]}'] = c[2].split('+')

if '--find' in sys.argv:
    rx = re.compile(sys.argv[sys.argv.index('--find') + 1], re.I)
    for fj, (_, n) in sorted(files.items(), key=lambda kv: kv[1][1]):
        if rx.search(n): print(fj, n)
    sys.exit()

_bbox = {}
def zc(fj):
    """element bbox centre height (mm), cached"""
    if fj not in _bbox:
        zs = [float(l.split()[3]) for l in open(files[fj][0], errors='ignore') if l.startswith('v ')]
        _bbox[fj] = (min(zs) + max(zs)) / 2 if zs else 0
    return _bbox[fj]

def select(spec):
    pick = set()
    for f in spec.get('fma', []): pick |= {x for x in tree.get(f, []) if x in files}
    if 'name' in spec:
        rx = re.compile(spec['name'], re.I)
        pool = {x for x in tree.get(spec['within'], []) if x in files} if 'within' in spec else files.keys()
        if 'within' in spec and 'fma' in spec: pick = set()        # name filter applies to the concept
        pick |= {x for x in pool if rx.search(files[x][1])}
    if 'not' in spec:
        rx = re.compile(spec['not'], re.I); pick = {x for x in pick if not rx.search(files[x][1])}
    if 'zmin' in spec: pick = {x for x in pick if zc(x) >= spec['zmin']}
    if 'zmax' in spec: pick = {x for x in pick if zc(x) <= spec['zmax']}
    return sorted(pick)

OUT.mkdir(parents=True, exist_ok=True)
for part, spec in RECIPE.items():
    if part.startswith('_') or (ONLY and part not in ONLY): continue
    fjs = select(spec)
    if not fjs: print(f'{part:14s} NOTHING MATCHED'); continue
    out, base, nv, nf = [], 0, 0, 0
    for fj in fjs:
        p, name = files[fj]; vs, fs = [], []
        for l in open(p, errors='ignore'):
            if l.startswith('v '):
                x, y, z = l.split()[1:4]; vs.append(f'v {float(x):.1f} {float(y):.1f} {float(z):.1f}')
            elif l.startswith('f '):
                fs.append('f ' + ' '.join(str(int(t.split('/')[0]) + base) for t in l.split()[1:]))
        out.append(f'o {fj} {name}'); out += vs; out += fs; base += len(vs); nv += len(vs); nf += len(fs)
    (OUT / f'{part}.obj').write_text('\n'.join(out) + '\n')
    print(f'{part:14s} {len(fjs):4d} pieces {nv:8d} verts {nf:8d} faces  {(OUT / (part + ".obj")).stat().st_size / 1e6:6.1f} MB')
