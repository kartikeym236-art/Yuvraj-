# Reference style (from the user's 3 reference Shorts, 2026-11-28) — apply to EVERY video

The user sent three references and asked for: **more realistic visuals, better-timed camera movement, and simplicity so
the audience follows easily.** Two looks, one grammar:

| | "Story" look (Turkey in the fridge, Potter and the mug) | "Map" look (geopolitics explainer, Bangladesh) |
|---|---|---|
| World | Believable interiors / gardens: sky-blue walls, warm wood, white cove light, big window daylight, real props | Extruded country map (orange land, thick white coast rim, focus country green/raised) on a dark glossy grid floor |
| People | Realistic, normally proportioned humans that *act* (hold, hesitate, cry, laugh, look) | Small realistic figures standing on the map; portrait discs / name banners for real people |
| Emphasis | Physical: labelled tins ("BASIC" / "SPECIAL"), dimension brackets ("3 in", "6 in"), whiteboard doodle, a clock close-up, thought bubble with another scene inside, flashback as a double-exposure dissolve | Bobbing red 3D arrows, bold red labels with white outline, dashed yellow curved routes that draw on, big red numbers ("1400"), date slams ("17 Nov 2025"), dioramas on the map (gallows, court, cage, helicopter) |

## Engine pieces (engine/src/core)
- `actors.js` — `actor('rpm'|'michelle'|'soldier'|'xbot', {shirt, pants, skin})`: real rigged humans (Mixamo skeleton);
  clips idle / walk / run / agree / headshake / sad_pose / sneak_pose / sambadance shared by all bodies;
  `.play(clip, t)`, `.blend(a, b, k, t)`, `.pose({head, spine, armL, armR, foreL, foreR})`, `.lookAt(p, k)`, `.talk(k)`,
  `.at('RightHand')` to attach props. Pure function of time.
- `rooms.js` — `room(E, {wall, floor:'wood', window})` + `.counter()`, `.shelf()`: the reference interiors.
- `camera.js` — `SHOT(feet, face)` framings (wide / full / medium / close / ecu / low / high / ots / top),
  `shot(cam, A, B, lt, d, t)` = eased move + handheld sway, returns the focus distance for shallow DOF.
- `devices.js` — `thoughtBubble(E)` (renders a second camera into the bubble), `measure(len, '3 in')`,
  `labelCan('BASIC')`, `whiteboard(w, h, {strokes, texts}).draw(k)`, `nameTag('Name')`.
- `map3d.js` — `mapKit(geo, {center, span, k, colors})` + `.raise`, `.dim`, `.arrow`, `.label`, `.route`, `.pin`,
  `.place`, `.xyz`. Data: `assets/earth/map_countries_50m.geojson` (all countries), `map_countries_10m.geojson`
  (close-ups of small countries / coasts), `map_states_10m.geojson` (provinces / states). Flags: `assets/flags/<iso2>.svg`
  (all 271).
- Models: `assets/models/people/*.glb`, `assets/models/props/*.glb` (coffee mug, chair, car).
- Old stylised `people.js` figurines are for diagrams only now; any person who acts should be an `actor()`.

## Camera grammar (the main thing the user asked for)
1. **One idea per shot, one move per shot.** A shot lasts one caption phrase: ~1.2–2.5 s (story), ~2–4 s (map).
   Cut ON the phrase change, never in the middle of a word group.
2. **Always moving, always slow.** Every shot is an eased move between two framings: push-in 10–20 % of distance,
   or a 5–15° arc, or a small pedestal. Never static, never a whip inside a shot. Add `handheld()` sway (1 = reference).
3. **Motivated framing.** Wide/full to establish the place, medium for the action, close/ECU for the emotion
   (eyes, hesitation, tears, smile), insert for the object the voice names (mug, axe, tin, clock, passport).
   Low angle = power / threat / the big moment; high angle = small, alone, losing.
4. **Eye-level, 28–34° vertical FOV, shallow focus.** Subject sharp, background soft (`aperture` 0.0012–0.004 on
   close-ups, `focus` = distance returned by `shot()`). Rack focus between two objects when the voice moves from one
   to the other.
5. **Show, don't print.** Text on screen only as captions — plus *physical* labels (tins, bracket "3 in", map labels,
   red numbers). The picture must explain the sentence with the sound off.
6. **Simple screens.** One subject in focus, max 2–3 elements on screen; colour tells the story (focus country
   green/raised, the rest orange/grey; arrow always red).
7. **Map shots**: camera ~45–55° down (pitch -0.8…-1.0), slow push toward the point of interest or a slow pan
   along a route while it draws; the arrow bobs, labels slam in with the word, pins pop with overshoot.
8. **Transitions**: hard cuts within a scene; `dissolve` (double exposure) for memories / "years later";
   `zoomblur` into the map; `flip`/`whip` only between topics.
9. **Story beats**: an emotion close-up after every plot turn, an insert for every named object, a thought bubble
   for "he thought about…", a measured comparison for sizes/amounts.

## Production checklist
- [ ] Each caption phrase has its own shot with a start and end framing (no shot > 3 s on the story look).
- [ ] Every named object gets an insert; every named person a close-up (or a portrait pin on the map).
- [ ] Every number / date gets a slam or counter; every place gets the arrow + label on the map.
- [ ] Sound off test: the contact sheet alone tells the story.
- [ ] Music: "paris" from 0:08 (default in mix.py).

## Lessons from the style test (user feedback 2026-11-28)
- **Hands looked glitchy** (open, twisted palm "holding" the mug). Next time: never rely on the idle clip for a held
  prop. Pose the arm + fingers explicitly (curl the Index/Middle/Ring/Pinky 1-3 bones ~0.9-1.3 rad, thumb opposed),
  attach the prop to the hand bone with an offset tuned on a still frame, and check every hand in close-ups on the
  contact sheet BEFORE the full render. If a grip still looks wrong, frame the insert so the hand is soft/out of shot
  or have the prop rest on the counter.
- Thought bubble content must be bright and big enough to read (light the inner scene, frame its subject tightly).
- **Arms looked "paralysed"** (user, barbers reel): the borrowed Mixamo idle leaves arms stiff, elbows out, palms
  forward. Fix (now default in actors.js): every idle gets `relax()` - arms aimed down by the sides, soft elbows,
  palms to the thighs, relaxed fingers, breathing sway. For any action pose use `actor.aim(side, {upper, fore, palm})`
  with directions in the character frame (x = his left, y = up, z = forward) - rig-independent, readable. Tested poses:
    cutting hair  R {upper:[-0.55,-0.5,0.7], fore:[0.55,0.05,0.85], palm:[0.2,-1,0]}  L mirrored (x sign flipped)
    hand to own head  R {upper:[-0.5,0.55,0.25], fore:[0.55,0.45,-0.5], palm:[0,-0.5,-1]}
    carry a bag  R {upper:[-0.12,-1,0.02], fore:[-0.05,-1,0.04], palm:[1,0,0]} + grip 0.85
  ALWAYS look at a front + side test frame of every new pose by eye before using it in a shot.
