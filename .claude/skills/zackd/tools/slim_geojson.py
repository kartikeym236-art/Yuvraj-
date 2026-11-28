"""Slim a Natural Earth GeoJSON for map3d.js: keep code/name/label props, round coords, MultiPolygon only.
   python tools/slim_geojson.py in.geojson out.geojson [decimals=2]"""
import json, sys
src, dst = sys.argv[1], sys.argv[2]; dec = int(sys.argv[3]) if len(sys.argv) > 3 else 2
KEYS = ['ADM0_A3', 'NAME', 'NAME_LONG', 'LABEL_X', 'LABEL_Y', 'CONTINENT', 'LATITUDE', 'LONGITUDE']
g = json.load(open(src)); out = []
for f in g['features']:
    geo = f['geometry']
    if not geo: continue
    polys = geo['coordinates'] if geo['type'] == 'MultiPolygon' else [geo['coordinates']]
    keep = []
    for poly in polys:
        rings = []
        for r in poly:
            rr = []
            for x, y in r:
                q = [round(x, dec), round(y, dec)]
                if not rr or rr[-1] != q: rr.append(q)
            if len(rr) >= 4: rings.append(rr)
        if rings: keep.append(rings)
    out.append({'type': 'Feature', 'properties': {k.lower(): f['properties'].get(k) for k in KEYS if k in f['properties']},
                'geometry': {'type': 'MultiPolygon', 'coordinates': keep}})
json.dump({'type': 'FeatureCollection', 'features': out}, open(dst, 'w'), separators=(',', ':'))
print(dst, len(out), 'features')
