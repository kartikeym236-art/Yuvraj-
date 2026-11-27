"""Merge BodyParts3D element OBJs (FJxxxx.obj) for a concept into one OBJ.
Usage: python bp3d_merge.py <bp3d_dir> <out_dir> name=FMAid[+FMAid...]@tree ...   (tree = partof | isa)
Example: python bp3d_merge.py "D:\\Claude skills\\ZackD\\assets\\bodyparts3d" out brain=FMA50801@partof skull=FMA46565@partof
Coordinates stay in BodyParts3D millimetres (shared frame for every part). Prints vertex/face counts and bounds.
Licence: BodyParts3D, (c) The Database Center for Life Science, CC BY-SA 2.1 JP: credit it in the video description."""
import os, sys, glob

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
objs = {os.path.basename(p)[:-4]: p for p in glob.glob(os.path.join(src, "obj", "**", "FJ*.obj"), recursive=True)}
maps = {}
for tree in ("partof", "isa"):
    m = {}
    for line in open(os.path.join(src, f"{tree}_element_parts.txt"), encoding="utf-8", errors="ignore").read().splitlines()[1:]:
        p = line.split("\t")
        if len(p) >= 3: m.setdefault(p[0], []).append(p[2])
    maps[tree] = m

for spec in sys.argv[3:]:
    name, rest = spec.split("=", 1)
    ids, tree = rest.split("@")
    elems = sorted({e for fma in ids.split("+") for e in maps[tree].get(fma, [])})
    vs, fs, off = [], [], 0
    for e in elems:
        p = objs.get(e)
        if not p: continue
        lv = 0
        for line in open(p, encoding="utf-8", errors="ignore"):
            if line.startswith("v "):
                vs.append(line); lv += 1
            elif line.startswith("f "):
                idx = [int(t.split("/")[0]) + off for t in line.split()[1:]]
                fs.append("f " + " ".join(map(str, idx)) + "\n")
        off += lv
    with open(os.path.join(out, name + ".obj"), "w") as f:
        f.writelines(vs); f.writelines(fs)
    xs = [[float(c) for c in v.split()[1:4]] for v in vs[:: max(1, len(vs) // 2000)]]
    mn = [min(c[i] for c in xs) for i in range(3)] if xs else [0, 0, 0]; mx = [max(c[i] for c in xs) for i in range(3)] if xs else [0, 0, 0]
    print(f"{name}: {len(elems)} elements, {len(vs)} verts, {len(fs)} faces, bounds {[round(a) for a in mn]}..{[round(a) for a in mx]}")
