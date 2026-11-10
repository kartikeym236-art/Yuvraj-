// Each theme returns { W, H, items } for one randomized drawing.
'use strict';
const { INK, st, f, C, E, R, P, L, S, G, mirror, star, heart, bow, flake, I } = require('./lib');

const PINKS = ['#f28fb0', '#f7a8c4', '#e86f9a'];
const GOLDS = ['#f2c14e', '#e6e6e6', '#f08a5d'];

// ------------------------------------------------------------------ girl
function girl(rng) {
  const W = 720, H = 1420;
  const skin = rng.pick(['#f7d3bd', '#f3c6a8', '#e0aa85', '#b97c5a']);
  const hair = rng.pick(['#8a4520', '#3b2416', '#c98a3c', '#22201e', '#a0522d']);
  const dress = rng.pick(['#27407a', '#b3263a', '#1f7a72', '#5b3d8f', '#2f6b3a', '#c25a1c']);
  const dressDark = shade(dress, -0.25);
  const pat = rng.pick(['#ffffff', '#ffffff', '#ffe08a']);
  const patAlt = pat === '#ffffff' ? ['#ffd1dc', '#bfe3ff', '#ffe08a'] : ['#ffffff', '#ffd1dc', '#bfe3ff'];
  const eye = rng.pick(['#6b3e1f', '#3d6b8a', '#4f7a3a']);
  const shoe = rng.pick([dress, '#262626', '#c0392b', '#e8c39e']);
  const items = [];
  const skirtD = 'M302 600 L418 600 Q500 760 560 960 Q360 1010 160 960 Q220 760 302 600 Z';
  const bodiceD = 'M285 412 Q360 445 435 412 L418 605 L302 605 Z';
  items.push(`<defs><clipPath id="ID_sk"><path d="${skirtD}"/></clipPath><clipPath id="ID_bd"><path d="${bodiceD}"/></clipPath></defs>`);
  // hair back
  items.push(P('M252 200 C212 330 222 470 242 560 C290 592 330 578 360 560 C390 578 430 592 478 560 C498 470 508 330 468 200 Z', hair));
  items.push(S('M270 330 C262 400 268 470 282 530', 3, shade(hair, -0.3)));
  items.push(S('M450 330 C458 400 452 470 438 530', 3, shade(hair, -0.3)));
  // legs + shoes
  items.push(P('M318 950 L314 1320 L342 1320 L350 950 Z', skin));
  items.push(P('M370 950 L378 1320 L406 1320 L402 950 Z', skin));
  const shoeL = (fl) => P('M300 1318 L350 1318 Q358 1350 352 1372 L292 1372 Q284 1346 300 1318 Z', fl) + R(340, 1372, 10, 30, fl, 2);
  items.push(I(shoeL, { fill: shoe, alt: ['#262626', '#c0392b', '#8e5ea2', '#e8c39e'], kinds: ['color'], cx: 322, cy: 1350, r: 40 }));
  items.push(I((fl) => mirror(shoeL(fl)), { fill: shoe, alt: ['#262626', '#c0392b', '#8e5ea2', '#e8c39e'], kinds: ['color'], cx: 398, cy: 1350, r: 40 }));
  items.push(I((fl) => bow(325, 1322, 13, fl), { fill: '#f28fb0', alt: ['#ffffff', '#f2c14e', '#7fc8f8'], kinds: ['color', 'hide', 'scale'], cx: 325, cy: 1322, r: 18 }));
  items.push(I((fl) => bow(395, 1322, 13, fl), { fill: '#f28fb0', alt: ['#ffffff', '#f2c14e', '#7fc8f8'], kinds: ['color', 'hide'], cx: 395, cy: 1322, r: 18 }));
  // arms
  const arm = P('M292 425 C255 470 238 560 236 660 L262 662 C266 575 282 500 310 455 Z', skin) + C(249, 680, 21, skin);
  items.push(arm);
  items.push(mirror(arm));
  items.push(I((fl) => R(232, 640, 34, 12, fl, 5), { fill: rng.pick(GOLDS), alt: ['#f2c14e', '#7fc8f8', '#f28fb0'], kinds: ['color', 'hide'], cx: 249, cy: 646, r: 22 }));
  // handbag in right hand
  const bagCol = rng.pick(['#e8c39e', '#c0392b', '#f2c14e', '#8e5ea2']);
  items.push(S('M461 690 Q471 650 486 690', 4));
  items.push(I((fl) => R(438, 688, 76, 58, fl, 10), { fill: bagCol, alt: ['#e8c39e', '#c0392b', '#f2c14e', '#8e5ea2'].filter((c) => c !== bagCol), kinds: ['color'], cx: 476, cy: 717, r: 40 }));
  items.push(I((fl) => R(468, 700, 16, 12, fl, 3), { fill: '#f2c14e', alt: ['#e6e6e6'], kinds: ['hide', 'color'], cx: 476, cy: 706, r: 16 }));
  items.push(I(heart(476, 730, 8, '#f28fb0'), { optional: true, cx: 476, cy: 730, r: 14 }));
  items.push(C(453, 680, 21, skin));
  // skirt + pattern
  items.push(P(skirtD, dress));
  const patType = rng.pick(['dots', 'lattice', 'bands']);
  items.push('<g clip-path="url(#ID_sk)">');
  addPattern(items, rng, patType, { x0: 150, x1: 570, y0: 590, y1: 1010, pat, patAlt, base: dress, inside: (x, y) => Math.abs(x - 360) < 58 + ((y - 600) * 150) / 360 - 22 && y < 945 && y > 625 });
  items.push('</g>');
  items.push(`<path d="${skirtD}" fill="none" ${st}/>`);
  items.push(S('M300 640 Q280 800 250 975', 3, dressDark));
  items.push(S('M420 640 Q440 800 470 975', 3, dressDark));
  items.push(I(heart(455, 880, 14, '#f28fb0'), { optional: true, cx: 455, cy: 880, r: 20 }));
  // bodice
  items.push(P(bodiceD, dress));
  items.push('<g clip-path="url(#ID_bd)">');
  addPattern(items, rng, patType, { x0: 270, x1: 450, y0: 400, y1: 610, pat, patAlt, base: dress, inside: () => false, decor: true });
  items.push('</g>');
  items.push(`<path d="${bodiceD}" fill="none" ${st}/>`);
  for (const [i, y] of [470, 510, 550].entries()) {
    items.push(I((fl) => C(360, y, 7, fl), { fill: '#ffffff', alt: ['#f2c14e', '#f28fb0'], kinds: i === 1 ? ['hide', 'color'] : ['hide'], cx: 360, cy: y, r: 14 }));
  }
  // belt
  items.push(R(300, 592, 120, 22, dressDark, 3));
  items.push(I((fl) => R(347, 588, 26, 30, fl, 4) + R(354, 595, 12, 16, dressDark, 2), { fill: '#f2c14e', alt: ['#e6e6e6', '#f28fb0'], kinds: ['color', 'scale'], cx: 360, cy: 603, r: 22 }));
  // neck + head
  items.push(P('M338 330 L338 418 Q360 432 382 418 L382 330 Z', skin));
  items.push(E(360, 250, 88, 102, skin));
  // necklace
  const beads = [];
  for (let i = 0; i < 9; i++) {
    const t = i / 8, x = 322 + t * 76, y = 402 + Math.sin(t * Math.PI) * 18;
    beads.push([x, y]);
  }
  beads.forEach(([x, y], i) => {
    const k = i === 2 || i === 6 ? { kinds: ['hide', 'color'], alt: ['#f2c14e', '#f28fb0'] } : {};
    items.push(I((fl) => C(x, y, 6.5, fl, 'stroke-width="3"'), Object.assign({ fill: '#ffffff', cx: x, cy: y, r: 12 }, k)));
  });
  // fringe
  items.push(P('M272 238 C276 150 340 128 384 138 C434 150 458 192 452 250 C425 205 384 188 332 206 C300 218 284 232 272 238 Z', hair));
  // clip in hair
  const clipCol = rng.pick(['#f28fb0', '#7fc8f8', '#f2c14e']);
  items.push(I((fl) => star(298, 196, 17, 8, fl), { fill: clipCol, alt: ['#f28fb0', '#7fc8f8', '#f2c14e'], kinds: ['color', 'swap', 'rotate'], rot: 36, swap: (fl) => heart(298, 196, 15, fl), cx: 298, cy: 196, r: 22 }));
  // earrings
  items.push(I((fl) => C(273, 292, 9, fl), { fill: '#ffffff', alt: ['#f2c14e', '#7fc8f8'], kinds: ['color', 'hide', 'scale'], cx: 273, cy: 292, r: 16 }));
  items.push(I((fl) => C(447, 292, 9, fl), { fill: '#ffffff', alt: ['#f2c14e', '#7fc8f8'], kinds: ['color', 'hide'], cx: 447, cy: 292, r: 16 }));
  // brows
  items.push(I(S('M306 226 Q324 214 344 222', 4, shade(hair, -0.2)), { kinds: ['rotate', 'hide'], rot: 16, cx: 325, cy: 220, r: 20 }));
  items.push(I(S('M376 222 Q396 214 414 226', 4, shade(hair, -0.2)), { kinds: ['rotate'], rot: 16, cx: 395, cy: 220, r: 20 }));
  // eyes
  for (const [x, side] of [[325, -1], [395, 1]]) {
    items.push(E(x, 256, 15, 11, '#ffffff', 'stroke-width="3"'));
    items.push(I((fl) => C(x, 256, 8, fl, 'stroke-width="0"') + C(x, 256, 3.5, '#111', 'stroke-width="0"') + C(x + 2.5, 253, 1.8, '#fff', 'stroke-width="0"'), { fill: eye, alt: ['#6b3e1f', '#3d6b8a', '#4f7a3a'], kinds: ['color'], cx: x, cy: 256, r: 14 }));
    items.push(I(S(`M${x + side * 13} 250 L${x + side * 22} 243`, 3), { kinds: ['hide'], cx: x + side * 18, cy: 246, r: 12 }));
  }
  items.push(I(S('M358 268 Q350 290 364 292', 3), { kinds: ['flip', 'scale'], cx: 358, cy: 282, r: 14 }));
  items.push(I(P('M338 312 Q360 304 382 312 Q360 330 338 312 Z', '#d9536f', 'stroke-width="3"'), { kinds: ['swap'], swap: () => P('M340 312 Q360 300 380 312 Q360 340 340 312 Z', '#d9536f', 'stroke-width="3"') + S('M346 316 L374 316', 2, '#fff'), cx: 360, cy: 315, r: 22 }));
  items.push(I(C(306, 292, 13, '#f4a3a8', 'stroke-width="0" opacity="0.6"'), { kinds: ['hide'], cx: 306, cy: 292, r: 16 }));
  items.push(C(414, 292, 13, '#f4a3a8', 'stroke-width="0" opacity="0.6"'));
  items.push(I(C(404, 304, 2.6, '#4a2a1a', 'stroke-width="0"'), { optional: true, cx: 404, cy: 304, r: 12 }));
  return { W, H, items };
}

function addPattern(items, rng, type, o) {
  const { x0, x1, y0, y1, pat, patAlt, base, inside, decor } = o;
  if (type === 'dots') {
    const dots = [];
    let row = 0;
    for (let y = y0 + 22; y < y1; y += 46, row++) {
      for (let x = x0 + (row % 2 ? 23 : 0); x < x1; x += 46) dots.push([x, y]);
    }
    const ok = dots.filter(([x, y]) => inside(x, y));
    const live = new Set(rng.shuffle(ok).slice(0, decor ? 0 : 4).map((d) => d.join()));
    for (const [x, y] of dots) {
      const m = live.has([x, y].join());
      items.push(I((fl) => `<circle cx="${x}" cy="${y}" r="10" fill="${fl}"/>`, { fill: pat, alt: patAlt, kinds: m ? ['hide', 'color', 'scale'] : [], scaleK: 1.6, cx: x, cy: y, r: 16 }));
    }
    if (!decor) {
      const [x, y] = rng.pick(ok.filter((d) => !live.has(d.join())));
      // an extra dot squeezed between two others
      items.push(I(`<circle cx="${x + 23}" cy="${y}" r="7" fill="${pat}"/>`, { optional: true, cx: x + 23, cy: y, r: 14 }));
    }
  } else if (type === 'lattice') {
    const sp = 84;
    for (let c = -1400; c < 1400; c += sp) {
      items.push(`<line x1="${y0 + c}" y1="${y0}" x2="${y1 + c}" y2="${y1}" stroke="${pat}" stroke-width="10"/>`);
      items.push(`<line x1="${c - y0}" y1="${y0}" x2="${c - y1}" y2="${y1}" stroke="${pat}" stroke-width="10"/>`);
    }
    if (!decor) {
      // fill a couple of cells: candidates for "show" differences
      const cells = [];
      for (let c1 = -1400 + sp / 2; c1 < 1400; c1 += sp)
        for (let c2 = -1400 + sp / 2; c2 < 1400; c2 += sp) {
          const x = (c1 + c2) / 2, y = (c2 - c1) / 2;
          if (inside(x, y)) cells.push([x, y]);
        }
      for (const [x, y] of rng.shuffle(cells).slice(0, 3)) {
        const h = sp / 2 - 9;
        items.push(I(`<polygon points="${x - h},${y} ${x},${y - h} ${x + h},${y} ${x},${y + h}" fill="${rng.pick(patAlt)}"/>`, { optional: true, cx: x, cy: y, r: 24 }));
      }
    }
  } else {
    const bh = 34;
    let k = 0;
    const bands = [];
    for (let y = y0 + 20; y < y1; y += bh * 2, k++) bands.push(y);
    const live = decor ? -1 : rng.int(2, bands.length - 3);
    bands.forEach((y, i) => {
      items.push(I((fl) => `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${bh * 0.45}" fill="${fl}"/>`, { fill: pat, alt: patAlt, kinds: i === live ? ['color'] : [], cx: 360, cy: y + 8, r: 40 }));
    });
    if (!decor) {
      const y = bands[rng.int(1, bands.length - 3)] + bh;
      items.push(I(`<g>${[0, 1, 2].map((j) => `<circle cx="${330 + j * 30}" cy="${y + 8}" r="5" fill="${pat}"/>`).join('')}</g>`, { optional: true, cx: 360, cy: y + 8, r: 40 }));
    }
  }
}

// ------------------------------------------------------------------ cat
function cat(rng) {
  const W = 720, H = 1180;
  const fur = rng.pick(['#f0a35c', '#9a9a9a', '#e8dccb', '#5a4a42', '#f5c16c']);
  const dark = shade(fur, -0.28);
  const light = shade(fur, 0.45);
  const eye = rng.pick(['#8cc152', '#f6c344', '#5dade2']);
  const cushion = rng.pick(['#7fb3d5', '#c39bd3', '#f1948a', '#82c99b']);
  const collar = rng.pick(['#e74c3c', '#3498db', '#9b59b6']);
  const items = [];
  // cushion
  items.push(E(360, 1080, 320, 72, cushion));
  items.push(S('M80 1080 Q360 1135 640 1080', 3, shade(cushion, -0.3)) );
  items.push(`<ellipse cx="360" cy="1080" rx="290" ry="55" fill="none" stroke="${shade(cushion, -0.3)}" stroke-width="3" stroke-dasharray="10 9"/>`);
  for (const [x, k] of [[46, 1], [674, -1]]) {
    items.push(I((fl) => P(`M${x} 1080 L${x - 26 * k} 1062 L${x - 26 * k} 1098 Z`, fl), { fill: '#f2c14e', alt: ['#ffffff', '#e74c3c'], kinds: ['color', 'hide'], cx: x - 12 * k, cy: 1080, r: 22 }));
  }
  // tail
  items.push(P('M470 1010 C620 1005 655 870 600 800 C578 772 545 795 562 820 C604 878 590 960 462 972 Z', fur));
  items.push(I(S('M592 846 L626 838', 7, dark), { kinds: ['hide'], cx: 608, cy: 842, r: 18 }));
  items.push(S('M584 900 L620 908', 7, dark));
  // body
  items.push(E(360, 860, 180, 200, fur));
  items.push(E(360, 900, 88, 130, light, 'stroke-width="0"'));
  const spotA = I((fl) => E(240, 790, 34, 22, fl, 'stroke-width="0" transform="rotate(-25 240 790)"'), { fill: dark, kinds: ['hide', 'scale'], cx: 240, cy: 790, r: 30 });
  const spotB = I((fl) => E(482, 900, 26, 40, fl, 'stroke-width="0"'), { fill: dark, kinds: ['hide', 'scale'], cx: 482, cy: 900, r: 30 });
  items.push(spotA, spotB);
  items.push(I(E(268, 950, 18, 14, dark, 'stroke-width="0"'), { optional: true, cx: 268, cy: 950, r: 20 }));
  // paws
  for (const x of [300, 420]) {
    items.push(E(x, 1035, 46, 28, fur));
    items.push(I(S(`M${x - 12} 1020 L${x - 12} 1040 M${x + 12} 1020 L${x + 12} 1040`, 3), { kinds: ['hide'], cx: x, cy: 1032, r: 22 }));
  }
  // head
  const ear = (fl) => P('M218 455 L228 300 L322 392 Z', fur) + P('M238 425 L242 335 L296 392 Z', fl, 'stroke-width="3"');
  items.push(I(ear, { fill: '#f6a5c0', alt: [light, '#f7d6a0'], kinds: ['color'], cx: 260, cy: 380, r: 30 }));
  items.push(I((fl) => mirror(ear(fl)), { fill: '#f6a5c0', alt: [light, '#f7d6a0'], kinds: ['color'], cx: 460, cy: 380, r: 30 }));
  items.push(E(360, 525, 175, 150, fur));
  items.push(E(360, 595, 70, 52, light, 'stroke-width="0"'));
  [['M338 385 L344 425', 338], ['M360 380 L360 430', 360], ['M382 385 L376 425', 382]].forEach(([d, x], i) => {
    items.push(I(S(d, 8, dark), { kinds: i === 1 ? [] : ['hide'], cx: x, cy: 405, r: 14 }));
  });
  items.push(I(S('M195 520 L230 525 M197 545 L230 545', 7, dark), { kinds: ['hide'], cx: 212, cy: 535, r: 20 }));
  // eyes
  for (const [x, k] of [[293, 0], [427, 1]]) {
    items.push(I((fl) => E(x, 512, 33, 38, fl), { fill: eye, alt: ['#8cc152', '#f6c344', '#5dade2'], kinds: k ? ['color'] : [], cx: x, cy: 512, r: 36 }));
    items.push(I(E(x, 515, 9, 26, '#1d1d1d', 'stroke-width="0"'), { kinds: ['scale'], scaleK: 1.9, cx: x, cy: 515, r: 30 }));
    items.push(I(C(x + 10, 495, 7, '#fff', 'stroke-width="0"'), { kinds: ['hide'], cx: x + 10, cy: 495, r: 14 }));
  }
  // nose, mouth
  items.push(I((fl) => P('M346 568 L374 568 L360 584 Z', fl, 'stroke-width="3"'), { fill: '#f28fb0', alt: ['#5a4a42', '#e74c3c'], kinds: ['color'], cx: 360, cy: 575, r: 14 }));
  items.push(I(S('M336 600 Q348 616 360 600 Q372 616 384 600', 3), { kinds: ['swap'], swap: () => S('M336 604 Q348 594 360 604 Q372 594 384 604', 3), cx: 360, cy: 605, r: 20 }));
  items.push(S('M360 584 L360 600', 3));
  // whiskers
  const wl = [[250, 580, 165, 560], [250, 592, 160, 595], [252, 604, 168, 630]];
  wl.forEach(([a, b, c, d], i) => {
    items.push(I(L(a, b, c, d, 3), { kinds: i === 1 ? ['hide'] : [], cx: (a + c) / 2, cy: (b + d) / 2, r: 30 }));
    items.push(I(L(720 - a, b, 720 - c, d, 3), { kinds: i === 2 ? ['hide', 'rotate'] : [], rot: 18, cx: 720 - (a + c) / 2, cy: (b + d) / 2, r: 30 }));
  });
  // collar
  items.push(I((fl) => P('M235 638 Q360 700 485 638 L485 664 Q360 726 235 664 Z', fl), { fill: collar, alt: ['#e74c3c', '#3498db', '#9b59b6'], kinds: ['color'], cx: 300, cy: 668, r: 40 }));
  items.push(I((fl) => C(360, 716, 20, fl) + L(360, 720, 360, 734, 3), { fill: '#f2c14e', alt: ['#e6e6e6', '#f28fb0'], kinds: ['color', 'swap'], swap: (fl) => heart(360, 716, 20, fl), cx: 360, cy: 716, r: 26 }));
  // yarn
  const yarn = rng.pick(['#e74c3c', '#5dade2', '#af7ac5']);
  items.push(S('M170 1020 C230 1060 250 1120 200 1140', 3, shade(yarn, -0.2)));
  items.push(I((fl) => C(120, 990, 60, fl), { fill: yarn, alt: ['#e74c3c', '#5dade2', '#af7ac5', '#f2c14e'], kinds: ['color'], cx: 120, cy: 990, r: 60 }));
  items.push(S('M75 960 Q120 1000 170 975 M70 1000 Q120 1040 165 1015 M100 935 Q90 990 120 1048', 3, shade(yarn, -0.3)));
  items.push(I(L(140, 945, 200, 890, 5, '#888') + C(200, 890, 5, '#888', 'stroke-width="0"'), { kinds: ['hide', 'rotate'], rot: 30, cx: 170, cy: 918, r: 30 }));
  // butterfly
  const bfl = rng.pick(['#f6c344', '#5dade2', '#f28fb0']);
  items.push(I((fl) => P('M590 300 C560 260 540 300 588 315 C550 330 570 360 592 320', fl, 'stroke-width="3"') + P('M596 300 C626 260 646 300 598 315 C636 330 616 360 594 320', fl, 'stroke-width="3"') + L(593, 296, 593, 334, 4) + S('M592 298 Q585 282 578 280 M594 298 Q601 282 610 279', 2), { fill: bfl, alt: ['#f6c344', '#5dade2', '#f28fb0'], kinds: ['color', 'scale', 'rotate'], rot: 30, cx: 593, cy: 312, r: 40 }));
  return { W, H, items };
}

// ------------------------------------------------------------------ house
function house(rng) {
  const W = 720, H = 1120;
  const wall = rng.pick(['#f7dc9c', '#f5c6c6', '#c8e2f0', '#e8dccb', '#d5e8c5']);
  const roof = rng.pick(['#c0392b', '#5d6d7e', '#8e5ea2', '#a0522d']);
  const door = rng.pick(['#2e86c1', '#27ae60', '#c0392b', '#7d3c98']);
  const curtain = rng.pick(['#f28fb0', '#f2c14e', '#7fc8f8']);
  const items = [];
  items.push(R(-20, 900, 760, 240, '#9ad27a', 0, 'stroke-width="0"'));
  items.push(L(-20, 900, 740, 900, 4));
  // sun
  for (let i = 0; i < 8; i++) {
    const a = (i * 45 * Math.PI) / 180;
    const s = L(110 + 70 * Math.cos(a), 140 + 70 * Math.sin(a), 110 + 95 * Math.cos(a), 140 + 95 * Math.sin(a), 6, '#f39c12');
    items.push(I(s, { kinds: i === 1 || i === 3 ? ['hide'] : [], cx: 110 + 82 * Math.cos(a), cy: 140 + 82 * Math.sin(a), r: 18 }));
  }
  items.push(I((fl) => C(110, 140, 55, fl), { fill: '#f9d342', alt: ['#f5a742'], kinds: ['color'], cx: 110, cy: 140, r: 50 }));
  // clouds + birds
  const cloud = (x, y) => P(`M${x - 60} ${y + 20} Q${x - 70} ${y - 15} ${x - 30} ${y - 10} Q${x - 20} ${y - 45} ${x + 15} ${y - 30} Q${x + 50} ${y - 40} ${x + 55} ${y - 5} Q${x + 80} ${y + 5} ${x + 60} ${y + 20} Z`, '#ffffff');
  items.push(I(cloud(520, 120), { kinds: ['scale', 'flip'], cx: 520, cy: 110, r: 60 }));
  items.push(I(S('M285 200 Q300 185 312 200 Q324 185 340 200', 4), { kinds: ['hide', 'scale'], cx: 312, cy: 195, r: 22 }));
  items.push(I(S('M360 160 Q372 148 382 160 Q392 148 404 160', 4), { kinds: ['rotate'], rot: 25, cx: 382, cy: 156, r: 22 }));
  // tree
  items.push(R(88, 620, 44, 290, '#8b5a2b'));
  items.push(S('M110 760 L80 720', 6, '#6e4520'));
  items.push(P('M110 330 C30 330 10 420 40 470 C0 520 30 600 90 600 C110 640 170 630 180 600 C230 600 240 520 210 480 C240 420 200 330 110 330 Z', '#4caf50'));
  [[70, 420], [150, 400], [120, 480], [60, 540], [170, 545]].forEach(([x, y], i) => {
    items.push(I((fl) => C(x, y, 12, fl, 'stroke-width="3"'), { fill: '#e74c3c', alt: ['#f2c14e', '#f39c12'], kinds: ['hide', 'color'], cx: x, cy: y, r: 18 }));
  });
  items.push(I(C(185, 470, 12, '#e74c3c', 'stroke-width="3"'), { optional: true, cx: 185, cy: 470, r: 18 }));
  // chimney + smoke
  [[562, 292, 16], [586, 250, 22], [568, 196, 28]].forEach(([x, y, r], i) => {
    items.push(I(C(x, y, r, '#e8e8e8', 'stroke-width="3"'), { kinds: i === 1 ? ['hide', 'scale'] : ['scale'], cx: x, cy: y, r: r + 6 }));
  });
  items.push(R(535, 330, 54, 120, shade(roof, -0.1)));
  items.push(I((fl) => R(528, 318, 68, 18, fl, 2), { fill: '#7f8c8d', alt: [shade(roof, 0.3), '#2c3e50'], kinds: ['color'], cx: 562, cy: 327, r: 20 }));
  // house body
  items.push(R(200, 520, 440, 380, wall));
  // roof
  items.push(`<defs><clipPath id="ID_rf"><path d="M170 530 L420 300 L670 530 Z"/></clipPath></defs>`);
  items.push(P('M170 530 L420 300 L670 530 Z', roof));
  items.push('<g clip-path="url(#ID_rf)">');
  for (const y of [380, 440, 500]) items.push(L(150, y, 690, y, 3, shade(roof, -0.3)));
  items.push('</g>');
  items.push(C(420, 440, 36, '#bfe3ff'));
  items.push(I(L(420, 404, 420, 476, 4) + L(384, 440, 456, 440, 4), { kinds: ['rotate'], rot: 45, cx: 420, cy: 440, r: 34 }));
  // windows
  for (const [x, k] of [[240, 0], [490, 1]]) {
    items.push(R(x, 590, 110, 110, '#bfe3ff'));
    items.push(I(L(x + 55, 590, x + 55, 700, 4) + L(x, 645, x + 110, 645, 4), { kinds: k ? ['hide'] : [], cx: x + 55, cy: 645, r: 30 }));
    items.push(I((fl) => P(`M${x + 4} 594 L${x + 40} 594 Q${x + 18} 640 ${x + 4} 680 Z`, fl, 'stroke-width="3"') + P(`M${x + 106} 594 L${x + 70} 594 Q${x + 92} 640 ${x + 106} 680 Z`, fl, 'stroke-width="3"'), { fill: curtain, alt: ['#f28fb0', '#f2c14e', '#7fc8f8'], kinds: k ? ['color'] : ['color'], cx: x + 55, cy: 615, r: 40 }));
    items.push(R(x - 8, 700, 126, 24, '#8b5a2b'));
    [0, 1, 2, 3].forEach((j) => {
      const fx = x + 10 + j * 30;
      items.push(I((fl) => C(fx, 694, 10, fl, 'stroke-width="3"') + C(fx, 694, 3.5, '#f9d342', 'stroke-width="0"'), { fill: rng.pick(['#e74c3c', '#f28fb0', '#9b59b6']), alt: ['#ffffff', '#f39c12'], kinds: (j === 1 && k === 0) || (j === 2 && k === 1) ? ['hide', 'color'] : [], cx: fx, cy: 694, r: 14 }));
    });
  }
  // door
  items.push(I((fl) => P('M372 900 L372 760 Q420 715 468 760 L468 900 Z', fl), { fill: door, alt: ['#2e86c1', '#27ae60', '#c0392b', '#7d3c98'], kinds: [], cx: 420, cy: 820, r: 50 }));
  items.push(C(420, 775, 14, '#bfe3ff'));
  items.push(I((fl) => C(450, 840, 6, fl, 'stroke-width="3"'), { fill: '#f2c14e', alt: ['#ecf0f1'], kinds: ['color', 'hide', 'swap'], swap: (fl) => C(392, 840, 6, fl, 'stroke-width="3"'), cx: 450, cy: 840, r: 14 }));
  const num = rng.pick(['12', '27', '36', '45', '58']);
  items.push(I(`<text x="420" y="815" font-family="Poppins" font-size="22" text-anchor="middle" fill="#ffffff">${num}</text>`, { kinds: ['swap'], swap: () => `<text x="420" y="815" font-family="Poppins" font-size="22" text-anchor="middle" fill="#ffffff">${num[1]}${num[0]}</text>`, cx: 420, cy: 808, r: 20 }));
  items.push(R(360, 900, 120, 14, '#bdc3c7'));
  // path stones
  [[420, 950, 34], [400, 1000, 30], [430, 1050, 36]].forEach(([x, y, r], i) => {
    items.push(I(E(x, y, r, r * 0.4, '#d5d8dc', 'stroke-width="3"'), { kinds: i === 1 ? ['hide'] : ['scale'], cx: x, cy: y, r: r }));
  });
  // fence
  for (let x = 230; x <= 330; x += 25) {
    items.push(I(P(`M${x} 1000 L${x} 948 L${x + 8} 936 L${x + 16} 948 L${x + 16} 1000 Z`, '#ffffff', 'stroke-width="3"'), { kinds: x === 280 ? ['hide'] : [], cx: x + 8, cy: 970, r: 16 }));
  }
  items.push(R(222, 960, 130, 10, '#ffffff', 2, 'stroke-width="3"'));
  for (let x = 500; x <= 600; x += 25) {
    items.push(I(P(`M${x} 1000 L${x} 948 L${x + 8} 936 L${x + 16} 948 L${x + 16} 1000 Z`, '#ffffff', 'stroke-width="3"'), { kinds: x === 575 ? ['hide', 'scale'] : [], scaleK: 1.35, cx: x + 8, cy: 970, r: 16 }));
  }
  items.push(R(492, 960, 130, 10, '#ffffff', 2, 'stroke-width="3"'));
  // mailbox
  items.push(R(668, 900, 12, 120, '#8b5a2b'));
  items.push(P('M640 860 L708 860 L708 905 L640 905 Z', '#5dade2'));
  items.push(I(L(700, 880, 700, 845, 4) + R(700, 842, 20, 14, '#e74c3c', 1, 'stroke-width="3"'), { kinds: ['rotate'], rot: 80, cx: 700, cy: 868, r: 22 }));
  // flowers on grass
  [[60, 960], [150, 1010], [620, 1060]].forEach(([x, y], i) => {
    items.push(L(x, y, x, y + 30, 4, '#2e7d32'));
    items.push(I((fl) => C(x, y, 11, fl, 'stroke-width="3"') + C(x, y, 4, '#f9d342', 'stroke-width="0"'), { fill: '#f28fb0', alt: ['#ffffff', '#9b59b6'], kinds: i === 2 ? ['color'] : ['hide'], cx: x, cy: y + 10, r: 18 }));
  });
  return { W, H, items };
}

// ------------------------------------------------------------------ cake
function cake(rng) {
  const W = 720, H = 1180;
  const c1 = rng.pick(['#f7c6d9', '#c9e4f5', '#fde2a7', '#d7c4ef']);
  const c2 = rng.pick(['#ffffff', '#fff3e0']);
  const c3 = rng.pick(['#8d5a3b', '#f28fb0', '#7fc8f8', '#a3d9a5']);
  const icing = rng.pick(['#ffffff', '#fbe3ef', '#fff6d6']);
  const sprinkleCols = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6'];
  const items = [];
  // balloons
  const bal = (x, y, fl) => E(x, y, 48, 58, fl) + P(`M${x - 6} ${y + 60} L${x + 6} ${y + 60} L${x} ${y + 70} Z`, fl, 'stroke-width="3"');
  items.push(S('M95 278 Q120 400 90 520 Q70 600 100 640', 3));
  items.push(S('M625 248 Q600 380 640 470', 3));
  items.push(I((fl) => bal(95, 210, fl), { fill: rng.pick(['#e74c3c', '#9b59b6']), alt: ['#e74c3c', '#9b59b6', '#3498db'], kinds: ['color', 'scale'], cx: 95, cy: 210, r: 55 }));
  items.push(I((fl) => bal(625, 180, fl), { fill: rng.pick(['#f1c40f', '#3498db']), alt: ['#f1c40f', '#3498db', '#2ecc71'], kinds: ['color'], cx: 625, cy: 180, r: 55 }));
  items.push(I(E(80, 190, 9, 16, '#fff', 'stroke-width="0" opacity="0.8"'), { kinds: ['hide'], cx: 80, cy: 190, r: 16 }));
  // plate
  items.push(P('M300 1060 L420 1060 L450 1130 L270 1130 Z', '#d5d8dc'));
  items.push(E(360, 1050, 320, 40, '#ecf0f1'));
  // tiers
  const tier = (x, y, w, h, fill, ic, tag) => {
    items.push(R(x, y, w, h, fill, 14));
    let d = `M${x} ${y + 14} Q${x} ${y} ${x + 14} ${y} L${x + w - 14} ${y} Q${x + w} ${y} ${x + w} ${y + 14} L${x + w} ${y + 38}`;
    const n = Math.round(w / 55);
    const seg = w / n;
    for (let i = n - 1; i >= 0; i--) {
      const xa = x + (i + 1) * seg, xb = x + i * seg;
      const dep = 38 + ((i * 37) % 3) * 14;
      d += ` L${f(xa)} ${y + 34} Q${f(xa - seg * 0.1)} ${y + dep + 18} ${f((xa + xb) / 2)} ${y + dep + 18} Q${f(xb + seg * 0.1)} ${y + dep + 18} ${f(xb)} ${y + 34}`;
    }
    d += ' Z';
    items.push(I(P(d, ic), { kinds: [], cx: x + w / 2, cy: y + 30, r: 40, tag }));
  };
  tier(110, 790, 500, 250, c1, icing, 't1');
  tier(180, 580, 360, 220, c2, icing === '#ffffff' ? '#fbe3ef' : icing, 't2');
  tier(250, 400, 220, 190, c3, icing, 't3');
  // bottom tier decorations: hearts / dots row
  for (let i = 0; i < 6; i++) {
    const x = 160 + i * 80, y = 960;
    const live = i === 1 || i === 4;
    items.push(I((fl) => heart(x, y, 15, fl), { fill: '#e74c3c', alt: ['#f1c40f', '#ffffff'], kinds: live ? ['color', 'hide', 'swap'] : [], swap: (fl) => star(x, y, 18, 8, fl), cx: x, cy: y, r: 20 }));
  }
  // ribbon on middle tier
  items.push(R(180, 720, 360, 26, shade(c3, 0.1), 0));
  items.push(I((fl) => bow(360, 733, 26, fl), { fill: '#e74c3c', alt: ['#9b59b6', '#f1c40f'], kinds: ['color', 'scale'], cx: 360, cy: 733, r: 30 }));
  // dots on middle tier
  for (let i = 0; i < 5; i++) {
    const x = 220 + i * 70, y = 670 + (i % 2) * 14;
    items.push(I((fl) => C(x, y, 8, fl, 'stroke-width="3"'), { fill: sprinkleCols[i], alt: sprinkleCols, kinds: i % 2 ? ['hide', 'color'] : [], cx: x, cy: y, r: 14 }));
  }
  // sprinkles on bottom tier + top tier
  const sprinkles = [];
  for (let i = 0; i < 26; i++) sprinkles.push([rng.range(135, 585), rng.range(880, 1015), rng.range(0, 180), rng.pick(sprinkleCols)]);
  for (let i = 0; i < 12; i++) sprinkles.push([rng.range(270, 450), rng.range(470, 570), rng.range(0, 180), rng.pick(sprinkleCols)]);
  sprinkles.forEach(([x, y, a, col], i) => {
    if (Math.abs(y - 960) < 26 && sprinkles.length) return; // keep the hearts row clean
    const live = i % 5 === 0;
    items.push(I((fl) => `<rect x="${f(x - 10)}" y="${f(y - 3)}" width="20" height="6" rx="3" fill="${fl}" transform="rotate(${f(a)} ${f(x)} ${f(y)})"/>`, { fill: col, alt: sprinkleCols, kinds: live ? ['rotate', 'color', 'hide'] : [], rot: 70, cx: x, cy: y, r: 14 }));
  });
  // cherries
  [[290, 430], [430, 430]].forEach(([x, y], i) => {
    items.push(I((fl) => S(`M${x} ${y - 16} Q${x + 6} ${y - 36} ${x + 18} ${y - 42}`, 3, '#2e7d32') + C(x, y, 15, fl), { fill: '#c0392b', alt: ['#8e44ad'], kinds: i ? ['color', 'flip'] : ['flip'], cx: x + 4, cy: y - 12, r: 26 }));
  });
  // candles
  const flameCol = '#f9a825';
  [300, 360, 420].forEach((x, i) => {
    const h = i === 1 ? 110 : 90;
    const top = 400 - h;
    items.push(R(x - 11, top, 22, h, '#ffffff'));
    const stripeCol = rng.pick(['#e74c3c', '#3498db', '#9b59b6']);
    for (let s = 0; s < 3; s++) {
      const sy = top + 14 + s * 26;
      items.push(I(`<path d="M${x - 9} ${sy + 8} L${x + 9} ${sy}" stroke="${stripeCol}" stroke-width="6"/>`, { kinds: i === 0 && s === 1 ? ['flip'] : i === 2 && s === 2 ? ['hide'] : [], cx: x, cy: sy + 4, r: 14 }));
    }
    items.push(L(x, top, x, top - 10, 3));
    items.push(I((fl) => P(`M${x} ${top - 52} Q${x + 18} ${top - 26} ${x} ${top - 10} Q${x - 18} ${top - 26} ${x} ${top - 52} Z`, fl, 'stroke-width="3"') + E(x, top - 22, 5, 8, '#fff59d', 'stroke-width="0"'), { fill: flameCol, alt: ['#4fc3f7', '#ef5350'], kinds: i === 1 ? ['color', 'scale'] : i === 0 ? ['hide', 'scale'] : ['scale', 'color'], cx: x, cy: top - 30, r: 24 }));
  });
  // little gift box on plate
  items.push(I((fl) => R(560, 980, 70, 60, fl, 4) + R(588, 980, 14, 60, '#f1c40f', 0, 'stroke-width="3"') + bow(595, 976, 16, '#f1c40f'), { fill: '#3498db', alt: ['#2ecc71', '#e74c3c'], kinds: ['color'], cx: 595, cy: 1010, r: 40 }));
  return { W, H, items };
}

// ------------------------------------------------------------------ snowman
function snowman(rng) {
  const W = 720, H = 1320;
  const scarf = rng.pick(['#e74c3c', '#3498db', '#27ae60', '#8e44ad']);
  const stripe = rng.pick(['#ffffff', '#f1c40f']);
  const snow = '#ffffff';
  const items = [];
  // flakes background
  [[80, 120, 26], [640, 90, 22], [90, 520, 20], [640, 420, 26], [600, 700, 18], [70, 820, 22], [190, 260, 16]].forEach(([x, y, r], i) => {
    items.push(I(flake(x, y, r), { kinds: i % 2 ? ['hide', 'scale'] : ['rotate'], rot: 30, cx: x, cy: y, r: r + 8 }));
  });
  items.push(I(flake(560, 260, 18), { optional: true, cx: 560, cy: 260, r: 26 }));
  items.push(P('M-20 1180 Q200 1130 360 1150 Q540 1130 740 1180 L740 1340 L-20 1340 Z', '#eaf4fb'));
  // tree
  items.push(R(608, 1100, 26, 60, '#8b5a2b'));
  items.push(P('M621 880 L700 1110 L542 1110 Z', '#2e8b57'));
  [[600, 1000, '#e74c3c'], [645, 1050, '#f1c40f'], [622, 950, '#3498db'], [580, 1080, '#f28fb0']].forEach(([x, y, c], i) => {
    items.push(I((fl) => C(x, y, 9, fl, 'stroke-width="3"'), { fill: c, alt: ['#e74c3c', '#f1c40f', '#3498db', '#ffffff'], kinds: i % 2 ? ['color', 'hide'] : ['hide'], cx: x, cy: y, r: 14 }));
  });
  items.push(I((fl) => star(621, 878, 18, 8, fl), { fill: '#f1c40f', alt: ['#e74c3c'], kinds: ['color', 'scale'], cx: 621, cy: 878, r: 20 }));
  // arms
  items.push(I(S('M200 690 L80 600 M120 630 L95 590 M120 630 L80 640', 7, '#6e4520'), { kinds: ['rotate'], rot: 18, cx: 140, cy: 640, r: 50 }));
  items.push(S('M520 690 L640 610', 7, '#6e4520'));
  items.push(I(S('M600 636 L630 590', 7, '#6e4520'), { kinds: ['hide'], cx: 615, cy: 612, r: 22 }));
  items.push(S('M600 636 L650 650', 7, '#6e4520'));
  // body
  items.push(C(360, 1030, 210, snow));
  items.push(C(360, 720, 155, snow));
  items.push(S('M250 1080 Q260 1180 360 1205', 4, '#d6e9f7'));
  [[1000, 0], [1080, 1]].forEach(([y, i]) => items.push(I(C(360, y, 12, '#2d2d2d', 'stroke-width="0"'), { kinds: i ? ['hide'] : ['scale'], cx: 360, cy: y, r: 16 })));
  [650, 720, 790].forEach((y, i) => {
    items.push(I((fl) => C(360, y, 13, fl, 'stroke-width="0"'), { fill: '#2d2d2d', alt: ['#e74c3c', '#3498db'], kinds: i === 1 ? ['color', 'hide'] : i === 2 ? ['hide'] : ['scale'], cx: 360, cy: y, r: 18 }));
  });
  // head
  items.push(C(360, 450, 112, snow));
  [[322, 0], [398, 1]].forEach(([x, i]) => items.push(I(C(x, 425, 11, '#2d2d2d', 'stroke-width="0"') + C(x + 3, 421, 3, '#fff', 'stroke-width="0"'), { kinds: i ? ['scale'] : [], cx: x, cy: 425, r: 14 })));
  for (let i = 0; i < 5; i++) {
    const t = i / 4, x = 320 + t * 80, y = 490 + Math.sin(t * Math.PI) * 20;
    items.push(I(C(x, y, 5.5, '#2d2d2d', 'stroke-width="0"'), { kinds: i === 1 || i === 3 ? ['hide'] : [], cx: x, cy: y, r: 12 }));
  }
  items.push(I(P('M356 448 L436 470 L356 470 Z', '#f39c12', 'stroke-width="3"') + L(380, 456, 380, 470, 2, '#c0611b') + L(404, 462, 404, 470, 2, '#c0611b'), { kinds: ['rotate', 'flip'], rot: 25, cx: 380, cy: 462, r: 30, flipNote: 1 }));
  items.push(I(C(300, 470, 12, '#f8c3cc', 'stroke-width="0"'), { kinds: ['hide'], cx: 300, cy: 470, r: 14 }));
  items.push(C(420, 470, 12, '#f8c3cc', 'stroke-width="0"'));
  // hat
  const hat = rng.pick(['#2d2d2d', '#34495e', '#6d4c41']);
  items.push(R(285, 240, 150, 120, hat, 8));
  items.push(E(360, 360, 110, 18, hat));
  items.push(I((fl) => R(285, 318, 150, 24, fl, 0), { fill: rng.pick(['#e74c3c', '#27ae60']), alt: ['#e74c3c', '#27ae60', '#3498db'], kinds: ['color'], cx: 330, cy: 330, r: 20 }));
  items.push(I(P('M400 320 Q420 300 440 318 Q420 330 400 320 Z', '#2e7d32', 'stroke-width="3"') + P('M400 320 Q392 296 410 286 Q414 310 400 320 Z', '#2e7d32', 'stroke-width="3"'), { kinds: ['flip'], cx: 415, cy: 308, r: 22 }));
  [[396, 326], [408, 334]].forEach(([x, y], i) => items.push(I((fl) => C(x, y, 6, fl, 'stroke-width="2"'), { fill: '#e74c3c', alt: ['#f1c40f'], kinds: i ? ['hide'] : ['color'], cx: x, cy: y, r: 10 })));
  // scarf
  items.push(I((fl) => P('M248 535 Q360 600 472 535 L478 572 Q360 640 242 572 Z', fl), { fill: scarf, alt: [], kinds: [], cx: 360, cy: 575, r: 50 }));
  items.push(P('M410 585 L455 585 L470 760 L425 760 Z', scarf));
  [630, 680, 725].forEach((y, i) => {
    const xa = 410 + ((y - 585) / 175) * 15;
    items.push(I((fl) => `<rect x="${f(xa)}" y="${y}" width="46" height="12" fill="${fl}" transform="skewY(4)"/>`, { fill: stripe, alt: [stripe === '#ffffff' ? '#f1c40f' : '#ffffff'], kinds: i === 1 ? ['hide', 'color'] : i === 2 ? ['color'] : [], cx: xa + 23, cy: y + 30, r: 20 }));
  });
  for (let i = 0; i < 4; i++) {
    const x = 430 + i * 12;
    items.push(I(L(x, 760, x, 785, 4, scarf), { kinds: i === 2 ? ['hide'] : [], cx: x, cy: 772, r: 14 }));
  }
  // bird on arm
  items.push(I(E(105, 585, 26, 20, '#e74c3c') + C(122, 570, 13, '#e74c3c') + P('M134 568 L146 572 L134 576 Z', '#f39c12', 'stroke-width="2"') + C(124, 566, 2.5, '#111', 'stroke-width="0"'), { kinds: ['flip', 'hide'], cx: 112, cy: 578, r: 34 }));
  return { W, H, items };
}

// ------------------------------------------------------------------ robot
function robot(rng) {
  const W = 720, H = 1360;
  const body = rng.pick(['#9ec5e8', '#c9d6df', '#f6c89f', '#b8e0c2', '#d7bde2']);
  const dark = shade(body, -0.3);
  const btn = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db'];
  const items = [];
  // antenna
  items.push(L(360, 120, 360, 70, 6));
  items.push(I((fl) => C(360, 58, 17, fl), { fill: '#e74c3c', alt: ['#2ecc71', '#f1c40f'], kinds: ['color', 'scale'], cx: 360, cy: 58, r: 20 }));
  // ears
  for (const [x, k] of [[196, 0], [500, 1]]) {
    items.push(R(x, 190, 24, 80, dark, 6));
    items.push(I(L(x + 12, 200, x + 12, 260, 3), { kinds: k ? ['hide'] : [], cx: x + 12, cy: 230, r: 20 }));
  }
  // head
  items.push(R(220, 120, 280, 220, body, 28));
  for (let i = 0; i < 3; i++) {
    const x = 330 + i * 30;
    items.push(I((fl) => C(x, 142, 7, fl, 'stroke-width="3"'), { fill: btn[i], alt: btn, kinds: i === 1 ? ['color'] : i === 2 ? ['hide'] : [], cx: x, cy: 142, r: 12 }));
  }
  for (const [x, k] of [[300, 0], [420, 1]]) {
    items.push(C(x, 215, 38, '#ffffff'));
    items.push(I((fl) => C(x, 215, 18, fl, 'stroke-width="0"') + C(x, 215, 8, '#111', 'stroke-width="0"'), { fill: k ? '#3498db' : '#3498db', alt: ['#2ecc71', '#e67e22'], kinds: k ? ['color', 'scale'] : ['swap'], swap: (fl) => C(x + 12, 215, 18, fl, 'stroke-width="0"') + C(x + 12, 215, 8, '#111', 'stroke-width="0"'), scaleK: 0.6, cx: x, cy: 215, r: 30 }));
  }
  items.push(R(300, 278, 120, 38, '#ffffff', 8));
  for (let i = 1; i < 6; i++) {
    const x = 300 + i * 20;
    items.push(I(L(x, 280, x, 314, 3), { kinds: i === 2 || i === 4 ? ['hide'] : [], cx: x, cy: 297, r: 12 }));
  }
  // neck
  items.push(R(325, 340, 70, 44, dark));
  items.push(L(325, 355, 395, 355, 3));
  items.push(I(L(325, 370, 395, 370, 3), { kinds: ['hide'], cx: 360, cy: 370, r: 18 }));
  // arms
  for (const [x, k] of [[120, 0], [560, 1]]) {
    items.push(R(x, 420, 40, 300, body, 18));
    items.push(I(C(x + 20, 520, 14, dark), { kinds: k ? ['scale'] : [], cx: x + 20, cy: 520, r: 18 }));
    items.push(I(C(x + 20, 620, 14, dark), { kinds: k ? [] : ['hide'], cx: x + 20, cy: 620, r: 18 }));
    items.push(I(P(`M${x - 6} 720 L${x + 46} 720 L${x + 46} 760 L${x + 30} 760 L${x + 30} 740 L${x + 10} 740 L${x + 10} 760 L${x - 6} 760 Z`, dark), { kinds: k ? ['rotate'] : [], rot: 25, cx: x + 20, cy: 740, r: 30 }));
  }
  // body
  items.push(R(170, 384, 380, 430, body, 30));
  items.push(R(225, 440, 270, 230, '#3d4a5c', 18));
  // screen with heart
  items.push(R(250, 462, 120, 80, '#a8e6cf', 8));
  items.push(I((fl) => heart(310, 502, 22, fl), { fill: '#e74c3c', alt: ['#f1c40f', '#3498db'], kinds: ['color', 'swap', 'scale'], swap: (fl) => star(310, 502, 24, 10, fl), scaleK: 0.62, cx: 310, cy: 502, r: 28 }));
  // dial
  items.push(C(437, 502, 38, '#ffffff'));
  items.push(I(L(437, 502, 462, 480, 4, '#e74c3c') + C(437, 502, 5, '#111', 'stroke-width="0"'), { kinds: ['rotate'], rot: 70, cx: 437, cy: 502, r: 34 }));
  // buttons
  btn.forEach((c, i) => {
    const x = 265 + i * 63;
    items.push(I((fl) => C(x, 590, 16, fl), { fill: c, alt: btn, kinds: i === 1 || i === 3 ? ['color', 'hide'] : ['scale'], scaleK: 1.4, cx: x, cy: 590, r: 20 }));
  });
  // toggles
  [0, 1, 2].forEach((i) => {
    const x = 280 + i * 80;
    items.push(R(x - 20, 630, 40, 24, '#ffffff', 12, 'stroke-width="3"'));
    items.push(I(C(x - 8, 642, 9, '#2ecc71', 'stroke-width="3"'), { kinds: i === 1 ? ['swap'] : [], swap: () => C(x + 8, 642, 9, '#e74c3c', 'stroke-width="3"'), cx: x, cy: 642, r: 22 }));
  });
  // vents
  for (let i = 0; i < 4; i++) items.push(I(L(270, 710 + i * 20, 450, 710 + i * 20, 5, dark), { kinds: i === 2 ? ['hide'] : [], cx: 360, cy: 710 + i * 20, r: 20 }));
  // bolts
  [[200, 414], [520, 414], [200, 784], [520, 784]].forEach(([x, y], i) => {
    items.push(C(x, y, 10, '#d5d8dc', 'stroke-width="3"'));
    items.push(I(L(x - 6, y, x + 6, y, 3), { kinds: i === 1 || i === 2 ? ['rotate'] : [], rot: 90, cx: x, cy: y, r: 16 }));
  });
  // legs
  for (const [x, k] of [[250, 0], [410, 1]]) {
    items.push(R(x, 814, 60, 330, body, 10));
    items.push(I(R(x + 8, 900, 44, 14, dark, 4), { kinds: k ? ['hide'] : [], cx: x + 30, cy: 907, r: 22 }));
    items.push(R(x + 8, 960, 44, 14, dark, 4));
    items.push(I((fl) => P(`M${x - 20} 1190 L${x - 20} 1160 Q${x - 20} 1140 ${x} 1140 L${x + 60} 1140 Q${x + 90} 1140 ${x + 90} 1170 L${x + 90} 1190 Z`, fl), { fill: '#3d4a5c', alt: ['#e74c3c', dark], kinds: k ? ['color'] : ['flip'], cx: x + 35, cy: 1166, r: 40 }));
  }
  // little companion: wrench on floor
  items.push(L(60, 1240, 660, 1240, 4));
  items.push(I(P('M560 1220 L630 1205 L634 1220 L564 1234 Z', '#95a5a6', 'stroke-width="3"') + C(640, 1212, 14, '#95a5a6', 'stroke-width="3"') + C(646, 1210, 6, '#ffffff', 'stroke-width="0"'), { kinds: ['flip', 'hide'], cx: 600, cy: 1218, r: 40 }));
  items.push(I(star(90, 210, 18, 8, '#f1c40f'), { optional: true, cx: 90, cy: 210, r: 22 }));
  return { W, H, items };
}

// ------------------------------------------------------------------ flowers
function flowers(rng) {
  const W = 720, H = 1320;
  const vase = rng.pick(['#5dade2', '#e59866', '#a569bd', '#48c9b0', '#f1948a']);
  const vpat = rng.pick(['#ffffff', '#f9e79f']);
  const items = [];
  items.push(`<defs><clipPath id="ID_vs"><path d="M270 820 Q200 950 230 1110 Q250 1180 360 1180 Q470 1180 490 1110 Q520 950 450 820 Z"/></clipPath></defs>`);
  // table
  items.push(R(40, 1180, 640, 30, '#c8a27a', 6));
  items.push(R(80, 1210, 30, 100, '#a47148'));
  items.push(R(610, 1210, 30, 100, '#a47148'));
  // stems and leaves
  const heads = [
    [360, 330, '#e74c3c'],
    [220, 470, '#f28fb0'],
    [500, 450, '#f1c40f'],
    [290, 620, '#9b59b6'],
    [450, 640, '#ff8c42'],
  ].map(([x, y, c]) => [x, y, rng.pick(['#e74c3c', '#f28fb0', '#f1c40f', '#9b59b6', '#ff8c42', '#5dade2'])]);
  heads.forEach(([x, y]) => items.push(S(`M${x} ${y} Q${(x + 360) / 2} ${(y + 820) / 2 + 20} 360 820`, 6, '#2e7d32')));
  [[300, 720, -35], [430, 740, 35], [255, 560, -50], [470, 560, 40]].forEach(([x, y, a], i) => {
    items.push(I(E(x, y, 34, 14, '#4caf50', `transform="rotate(${a} ${x} ${y})"`), { kinds: i === 1 ? ['hide'] : i === 2 ? ['flip'] : [], cx: x, cy: y, r: 28 }));
  });
  items.push(I(E(400, 600, 30, 12, '#4caf50', 'transform="rotate(30 400 600)"'), { optional: true, cx: 400, cy: 600, r: 26 }));
  // flower heads
  heads.forEach(([x, y, c], fi) => {
    const n = fi % 2 ? 6 : 5;
    const pr = 26, dist = 36;
    const missing = fi === 1 || fi === 3;
    for (let p = 0; p < n; p++) {
      const a = ((p * 360) / n - 90) * Math.PI / 180;
      const px = x + dist * Math.cos(a), py = y + dist * Math.sin(a);
      items.push(I((fl) => C(px, py, pr, fl), { fill: c, alt: [], kinds: missing && p === 2 ? ['hide'] : [], cx: px, cy: py, r: 22 }));
    }
    items.push(I((fl) => C(x, y, 20, fl), { fill: '#f9d342', alt: ['#6e4520', '#ffffff'], kinds: fi === 0 || fi === 4 ? ['color', 'scale'] : [], scaleK: 1.45, cx: x, cy: y, r: 22 }));
    items.push(C(x - 6, y - 5, 3, '#6e4520', 'stroke-width="0"') + C(x + 6, y + 4, 3, '#6e4520', 'stroke-width="0"'));
  });
  // vase
  items.push(P('M270 820 Q200 950 230 1110 Q250 1180 360 1180 Q470 1180 490 1110 Q520 950 450 820 Z', vase));
  items.push('<g clip-path="url(#ID_vs)">');
  const vstyle = rng.pick(['dots', 'zig']);
  if (vstyle === 'dots') {
    let row = 0;
    for (let y = 900; y < 1180; y += 50, row++)
      for (let x = 230 + (row % 2) * 25; x < 500; x += 50) {
        const live = (row === 2 && x > 330 && x < 400) || (row === 4 && x > 400 && x < 450);
        items.push(I((fl) => `<circle cx="${x}" cy="${y}" r="9" fill="${fl}"/>`, { fill: vpat, alt: ['#f1948a', '#2c3e50'], kinds: live ? ['hide', 'color'] : [], cx: x, cy: y, r: 14 }));
      }
  } else {
    [930, 1010, 1090].forEach((y, i) => {
      let d = `M200 ${y}`;
      for (let x = 200; x < 520; x += 40) d += ` L${x + 20} ${y - 20} L${x + 40} ${y}`;
      items.push(I(`<path d="${d}" fill="none" stroke="${vpat}" stroke-width="8" stroke-linejoin="round"/>`, { kinds: i === 1 ? ['flip'] : [], cx: 360, cy: y - 10, r: 40 }));
    });
    items.push(I(`<circle cx="300" cy="1050" r="8" fill="${vpat}"/>`, { optional: true, cx: 300, cy: 1050, r: 14 }));
  }
  items.push('</g>');
  items.push(`<path d="M270 820 Q200 950 230 1110 Q250 1180 360 1180 Q470 1180 490 1110 Q520 950 450 820 Z" fill="none" ${st}/>`);
  items.push(E(360, 820, 95, 18, shade(vase, -0.2)));
  items.push(I(S('M262 900 Q245 980 258 1060', 6, '#ffffff'), { kinds: ['hide'], cx: 255, cy: 980, r: 30 }));
  // ladybug on leaf area / table
  items.push(I(E(150, 1160, 30, 22, '#e74c3c') + L(150, 1140, 150, 1182, 3) + C(122, 1160, 12, '#2d2d2d') + C(140, 1152, 4, '#111', 'stroke-width="0"') + C(162, 1166, 4, '#111', 'stroke-width="0"'), { kinds: ['flip', 'scale'], cx: 148, cy: 1160, r: 34 }));
  // butterfly
  const bc = rng.pick(['#5dade2', '#f6c344', '#af7ac5']);
  items.push(I((fl) => P('M590 250 C560 210 540 250 588 265 C550 280 570 310 592 270', fl, 'stroke-width="3"') + P('M596 250 C626 210 646 250 598 265 C636 280 616 310 594 270', fl, 'stroke-width="3"') + L(593, 246, 593, 284, 4) + S('M592 248 Q585 232 578 230 M594 248 Q601 232 610 229', 2), { fill: bc, alt: ['#5dade2', '#f6c344', '#af7ac5'], kinds: ['color', 'rotate'], rot: 30, cx: 593, cy: 262, r: 40 }));
  // falling petal
  items.push(I(E(560, 1150, 16, 9, heads[2][2], 'transform="rotate(20 560 1150)"'), { kinds: ['hide', 'rotate'], rot: 70, cx: 560, cy: 1150, r: 20 }));
  return { W, H, items };
}

// ------------------------------------------------------------------ rocket
function rocket(rng) {
  const W = 720, H = 1400;
  const hull = rng.pick(['#ecf0f1', '#f5f5dc', '#dfe6e9']);
  const accent = rng.pick(['#e74c3c', '#3498db', '#8e44ad', '#16a085']);
  const items = [];
  // stars
  [[80, 100], [650, 160], [120, 420], [600, 520], [70, 780], [650, 860], [240, 220], [520, 300]].forEach(([x, y], i) => {
    const r = 12 + (i % 3) * 4;
    items.push(I((fl) => star(x, y, r, r * 0.45, fl, -90, 'stroke-width="3"'), { fill: '#f9d342', alt: ['#ffffff', '#f5a742'], kinds: i % 3 === 0 ? ['hide', 'rotate'] : i % 3 === 1 ? ['scale', 'color'] : [], rot: 36, cx: x, cy: y, r: r + 6 }));
  });
  items.push(I(star(170, 620, 12, 5, '#f9d342', -90, 'stroke-width="3"'), { optional: true, cx: 170, cy: 620, r: 18 }));
  // planet
  items.push(I((fl) => C(130, 1080, 70, fl), { fill: '#f5b041', alt: ['#af7ac5', '#76d7c4'], kinds: ['color'], cx: 130, cy: 1080, r: 60 }));
  items.push(I(S('M40 1100 Q130 1040 225 1060', 6, '#6e2c00') , { kinds: ['rotate'], rot: 20, cx: 130, cy: 1075, r: 40 }));
  items.push(I(C(110, 1110, 10, shade('#f5b041', -0.2), 'stroke-width="3"'), { kinds: ['hide'], cx: 110, cy: 1110, r: 14 }));
  // moon
  items.push(P('M630 1010 A70 70 0 1 0 630 1150 A55 55 0 1 1 630 1010 Z', '#f7f1c6'));
  items.push(I(C(588, 1060, 9, '#e8dfa3', 'stroke-width="3"'), { kinds: ['hide', 'scale'], cx: 588, cy: 1060, r: 14 }));
  items.push(C(598, 1110, 6, '#e8dfa3', 'stroke-width="3"'));
  // flame
  items.push(I(P('M300 1040 Q360 1300 420 1040 Z', '#f39c12') + P('M325 1040 Q360 1210 395 1040 Z', '#f9d342', 'stroke-width="3"'), { kinds: ['scale'], scaleK: 0.78, cx: 360, cy: 1120, r: 60 }));
  // fins
  const fin = (fl) => P('M250 830 Q160 900 170 1040 L262 980 Z', fl);
  items.push(I(fin, { fill: accent, alt: ['#e74c3c', '#3498db', '#8e44ad', '#16a085'].filter((c) => c !== accent), kinds: ['color'], cx: 215, cy: 940, r: 50 }));
  items.push(mirror(fin(accent)));
  // body
  items.push(`<defs><clipPath id="ID_rb"><path d="M360 160 Q520 360 470 1040 L250 1040 Q200 360 360 160 Z"/></clipPath></defs>`);
  items.push(P('M360 160 Q520 360 470 1040 L250 1040 Q200 360 360 160 Z', hull));
  items.push('<g clip-path="url(#ID_rb)">');
  items.push(R(150, 150, 420, 200, accent, 0, 'stroke-width="0"'));
  items.push(L(150, 350, 570, 350, 4));
  items.push(I((fl) => R(150, 760, 420, 40, fl, 0, 'stroke-width="0"'), { fill: accent, alt: ['#f1c40f', '#2c3e50'], kinds: ['color'], cx: 300, cy: 780, r: 30 }));
  items.push(I(R(150, 820, 420, 14, accent, 0, 'stroke-width="0"'), { kinds: ['hide'], cx: 400, cy: 827, r: 20 }));
  items.push('</g>');
  items.push(`<path d="M360 160 Q520 360 470 1040 L250 1040 Q200 360 360 160 Z" fill="none" ${st}/>`);
  items.push(R(240, 1030, 240, 30, '#7f8c8d', 6));
  // window
  items.push(C(360, 500, 78, '#bdc3c7'));
  items.push(C(360, 500, 58, '#5dade2'));
  items.push(I(S('M325 470 Q340 450 362 448', 6, '#ffffff'), { kinds: ['flip', 'hide'], cx: 340, cy: 458, r: 22 }));
  for (let i = 0; i < 8; i++) {
    const a = (i * 45 * Math.PI) / 180;
    const x = 360 + 68 * Math.cos(a), y = 500 + 68 * Math.sin(a);
    items.push(I(C(x, y, 4.5, '#2d2d2d', 'stroke-width="0"'), { kinds: i === 1 || i === 6 ? ['hide'] : [], cx: x, cy: y, r: 10 }));
  }
  // rivets / small portholes
  [640, 700].forEach((y, i) => {
    items.push(C(360, y, 20, '#bdc3c7', 'stroke-width="3"'));
    items.push(I((fl) => C(360, y, 12, fl, 'stroke-width="0"'), { fill: '#5dade2', alt: ['#f9d342', '#2c3e50'], kinds: i ? ['color'] : ['color', 'scale'], cx: 360, cy: y, r: 22 }));
  });
  // name
  const nm = rng.pick(['SKY-7', 'ORBIT', 'NOVA', 'STAR-3', 'LUNA']);
  const altNm = { 'SKY-7': 'SKY-1', ORBIT: 'ORBlT', NOVA: 'NOUA', 'STAR-3': 'STAR-8', LUNA: 'LUMA' }[nm];
  const txt = (s) => `<text x="360" y="920" font-family="Poppins" font-size="36" text-anchor="middle" fill="${accent}" transform="rotate(-90 360 900)">${s}</text>`;
  items.push(I(txt(nm), { kinds: ['swap'], swap: () => txt(altNm), cx: 360, cy: 900, r: 50 }));
  // satellite / comet
  items.push(I(C(560, 680, 14, '#f9d342', 'stroke-width="3"') + S('M572 690 L630 730 M566 700 L615 745', 4, '#f5a742'), { kinds: ['flip', 'hide'], cx: 590, cy: 708, r: 40 }));
  return { W, H, items };
}

// colour utility
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const t = amt < 0 ? 0 : 255, p = Math.abs(amt);
  r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

module.exports = { girl, cat, house, cake, snowman, robot, flowers, rocket };
