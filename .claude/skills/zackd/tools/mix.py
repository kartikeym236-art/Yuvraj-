"""Soundtrack: narration + soft procedural sound effects + a quiet music bed, all made here with numpy.
No samples, no AI audio, no downloads.

  python tools/mix.py [project=.]                    -> data/mix.wav (48 kHz stereo)
  python tools/mix.py --test <outdir> [narration.wav] -> every effect + bed as WAVs, prints peak/RMS levels

Reads data/cues.json (node tools/capture.mjs cues), data/narration.wav if it exists (voice.py or words.py --audio),
and script.json "music": "paris" (default: the user's track "Else - Paris" from 0:08) . "bed" (bright pluck score) . "bed_documentary" (warm pad + soft pulse, the ZackD
look) . "tension" . "none" . "audio/your-track.mp3" (your own royalty-free track). The music ducks under the voice.

Sound rules: every effect is soft and rounded, nothing above ~5 kHz, no harsh beeps.
Cue types (+ gain, dur, pan; extra params pass straight through, e.g. "bpm"):
  whoosh slide pop plop gulp boing bubbles sizzle sparkle thud slam tock zip alarm inhale heartbeat
  sip pour(dur) swallow rumble(dur) heartbeat_fast(dur, bpm) molecule shimmer(dur) whoosh_soft(dur) tick(dur)
"""
import json, subprocess, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent
import numpy as np
from scipy import signal
from scipy.io import wavfile

SR = 48000
rng = np.random.default_rng(11)
DUR = 40.0
N = int(DUR * SR) + SR // 10


def lp(x, f, o=2): b, a = signal.butter(o, min(f, SR / 2 - 100) / (SR / 2), 'low'); return signal.lfilter(b, a, x)
def hp(x, f, o=2): b, a = signal.butter(o, f / (SR / 2), 'high'); return signal.lfilter(b, a, x)
def bp(x, f0, f1, o=2): b, a = signal.butter(o, [f0 / (SR / 2), f1 / (SR / 2)], 'band'); return signal.lfilter(b, a, x)
def db(x): return 10 ** (x / 20)
def tt(d): return np.arange(int(d * SR)) / SR
def env(n, a=0.005, r=None):
    """attack a seconds then exponential release over the rest"""
    e = np.ones(n); na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na)
    rest = n - na; e[na:] = np.exp(-np.linspace(0, r or 5, rest)) if rest > 0 else 1; return e
def sweep(f0, f1, d, shape='exp'):
    t = tt(d); f = f0 * (f1 / f0) ** (t / d) if shape == 'exp' else f0 + (f1 - f0) * t / d
    return np.sin(2 * np.pi * np.cumsum(f) / SR)
def noise(d): return rng.standard_normal(int(d * SR))
def norm(x, p=1.0): return x / (np.abs(x).max() + 1e-9) * p
def bell(n, p=1.0): return np.sin(np.pi * np.linspace(0, 1, n)) ** p
def fade_edges(x, a=0.004, r=0.02):
    """tiny raised-cosine in/out so nothing clicks"""
    na, nr = max(1, int(a * SR)), max(1, int(r * SR)); x = x.copy()
    x[:na] *= 0.5 - 0.5 * np.cos(np.linspace(0, np.pi, na)); x[-nr:] *= 0.5 + 0.5 * np.cos(np.linspace(0, np.pi, nr)); return x
def place(buf, st, x):
    st = int(st); n = min(len(x), len(buf) - st)
    if n > 0 and st >= 0: buf[st:st + n] += x[:n]
def chirp_drop(f0, f1, d, r=6):
    """one liquid bubble: short rising sine with fast decay (Minnaert-style resonance)"""
    return sweep(f0, f1, d) * env(int(d * SR), 0.0015, r)


# ---------- the effects (originals) ----------
def whoosh(d=0.38, **_):
    n = noise(d); lo, hi = lp(n, 500), lp(n, 2200)
    k = np.sin(np.pi * np.linspace(0, 1, len(n))); x = (lo * (1 - k) + hi * k) * k ** 1.5
    return x / (np.abs(x).max() + 1e-9) * 0.5
def slide(d=1.0, **_):
    n = lp(noise(d), 700); e = np.sin(np.pi * np.linspace(0, 1, len(n))) ** 2
    return n / (np.abs(n).max() + 1e-9) * e * 0.35 + sweep(260, 120, d) * e * 0.08
def pop(**_): x = sweep(560, 240, 0.11) * env(int(0.11 * SR), 0.002, 6); return lp(x, 3000) * 0.7
def plop(**_): x = sweep(700, 180, 0.14) * env(int(0.14 * SR), 0.002, 5); return lp(x, 2500) * 0.6
def gulp(**_):
    a = sweep(320, 140, 0.16) * env(int(0.16 * SR), 0.01, 4); b = sweep(240, 90, 0.2) * env(int(0.2 * SR), 0.01, 4)
    x = np.concatenate([a, np.zeros(int(0.04 * SR)), b]); return lp(x, 1800) * 0.8
def boing(**_):
    d = 0.42; t = tt(d); f = 200 * (1 + 0.6 * t / d) * (1 + 0.08 * np.sin(2 * np.pi * 18 * t))
    return lp(np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.004, 4), 2000) * 0.55
def bubbles(d=2.0, **_):
    x = np.zeros(int(d * SR))
    for _ in range(int(d * 7)):
        st = rng.integers(0, max(1, len(x) - int(0.08 * SR))); f = rng.uniform(380, 900); b = sweep(f, f * 1.6, 0.06) * env(int(0.06 * SR), 0.003, 5)
        x[st:st + len(b)] += b * rng.uniform(0.2, 0.5)
    return lp(x, 2500) * 0.5
def sizzle(d=1.0, **_):
    n = bp(noise(d), 1800, 4500); crack = (rng.random(len(n)) < 0.002).astype(float); crack = lp(crack, 300) * 40
    e = np.minimum(1, np.linspace(0, 6, len(n))) * np.linspace(1, 0.2, len(n)); return n * (0.4 + crack) * e * 0.12
def sparkle(d=1.2, **_):
    notes = [784, 880, 1047, 1175, 1319, 1568]; x = np.zeros(int(d * SR) + SR // 2)
    for k, f in enumerate(notes):
        st = int(k * d / len(notes) * SR); n = int(0.4 * SR); t = tt(0.4)
        x[st:st + n] += (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t)) * env(n, 0.004, 6) * 0.22
    return lp(x, 4500)
def thud(**_):
    d = 0.35; t = tt(d); x = np.sin(2 * np.pi * (70 + 40 * np.exp(-t * 30)) * t) * env(len(t), 0.002, 7)
    return x * 0.9 + lp(noise(d), 220) * env(len(t), 0.001, 12) * 0.3
def slam(**_):
    d = 0.5; t = tt(d); x = np.sin(2 * np.pi * (60 + 60 * np.exp(-t * 25)) * t) * env(len(t), 0.002, 6)
    return np.tanh(1.6 * (x + lp(noise(d), 1200) * env(len(t), 0.001, 10) * 0.6)) * 0.9
def tock(**_): d = 0.09; t = tt(d); return (np.sin(2 * np.pi * 420 * t) + 0.3 * np.sin(2 * np.pi * 840 * t)) * env(len(t), 0.001, 9) * 0.35
def zip_(**_):
    d = 0.32; n = bp(noise(d), 400, 3000); k = np.linspace(0, 1, len(n))
    return (n / (np.abs(n).max() + 1e-9) * 0.35 + sweep(300, 1100, d) * 0.12) * np.sin(np.pi * k) ** 1.2
def alarm(d=2.0, **_):
    x = np.zeros(int(d * SR)); one = np.sin(2 * np.pi * 150 * tt(0.22)) * env(int(0.22 * SR), 0.02, 5)
    for st in np.arange(0, d - 0.25, 0.5): i = int(st * SR); x[i:i + len(one)] += one
    return lp(x, 900) * 0.55
def inhale(d=1.0, **_):
    n = bp(noise(d), 300, 2600); k = np.linspace(0, 1, len(n)); e = np.sin(np.pi * np.minimum(1, k * 1.15)) ** 1.5 * (0.6 + 0.4 * k)
    return n / (np.abs(n).max() + 1e-9) * e * 0.5
def heartbeat(**_):
    one = lambda d, f: np.sin(2 * np.pi * f * tt(d)) * env(int(d * SR), 0.004, 7)
    x = np.concatenate([one(0.16, 58), np.zeros(int(0.09 * SR)), one(0.2, 52) * 0.75]); return lp(x, 300) * 1.0


# ---------- new effects (coffee / body explainers) ----------
def sip(d=0.6, **_):
    """short slurp: turbulent air through liquid (fluttering band noise whose formant rises) + a few tiny droplets"""
    n = len(tt(d)); t = tt(d)
    nz = noise(d)
    lo = bp(nz, 500, 1100); hi = bp(nz, 1100, 2600)
    k = np.linspace(0, 1, n) ** 0.8                                   # formant moves up as air is drawn in
    air = lo * (1 - k) + hi * k
    flutter = 0.55 + 0.45 * np.abs(np.sin(2 * np.pi * (28 + 10 * k) * t + 2.0 * np.sin(2 * np.pi * 7 * t)))  # 'slrrp' ripple
    shape = np.minimum(1, t / 0.06) * np.exp(-np.maximum(0, t - d * 0.55) * 9)   # quick swell, soft tail
    x = norm(air) * flutter * shape * 0.55
    for _ in range(5):                                                # liquid droplets riding on the slurp
        st = rng.uniform(0.08, d * 0.7); f = rng.uniform(600, 1300)
        place(x, st * SR, chirp_drop(f, f * 1.5, 0.05, 7) * rng.uniform(0.12, 0.25))
    return fade_edges(lp(x, 3200))

def pour(d=1.5, **_):
    """liquid pour into a cup: steady low stream + a crowd of bubble resonances whose pitch rises as the cup fills"""
    n = len(tt(d)); k = np.linspace(0, 1, n)
    stream = lp(bp(noise(d), 180, 1400), 1600)
    stream = norm(stream) * (0.6 + 0.25 * np.sin(2 * np.pi * 5.3 * tt(d)) * np.sin(2 * np.pi * 1.7 * tt(d)))
    x = stream * 0.35
    nb = int(d * 55)
    for _ in range(nb):
        u = rng.random(); st = u * (d - 0.06)
        base = 260 * (1 + 1.6 * u)                                    # filling cup -> higher bubble pitch
        f = base * rng.uniform(0.75, 1.35)
        place(x, st * SR, chirp_drop(f, f * rng.uniform(1.3, 1.8), rng.uniform(0.025, 0.06), 6) * rng.uniform(0.15, 0.4))
    e = np.minimum(1, k * d / 0.12) * np.minimum(1, (1 - k) * d / 0.25)
    return fade_edges(lp(x, 3500) * e)

def swallow(**_):
    """tongue press (soft wet click) -> low throat gulp that sinks -> faint release"""
    press = lp(bp(noise(0.05), 300, 1500), 1500) * env(int(0.05 * SR), 0.003, 6) * 0.35
    g1 = sweep(210, 95, 0.22) * env(int(0.22 * SR), 0.015, 3.5)
    g1 = g1 + lp(noise(0.22), 400) * env(int(0.22 * SR), 0.01, 5) * 0.25
    rel = chirp_drop(420, 640, 0.07, 6) * 0.18
    x = np.concatenate([press, np.zeros(int(0.03 * SR)), g1, np.zeros(int(0.05 * SR)), rel, np.zeros(int(0.05 * SR))])
    return fade_edges(lp(x, 1800))

def rumble(d=1.5, **_):
    """low gut rumble: sub noise bed + wandering gurgle tone + a few deep bubbles"""
    t = tt(d); n = len(t)
    bed = norm(lp(hp(noise(d), 30), 160, 4)) * 0.5
    wob = np.cumsum(rng.standard_normal(n)) ; wob = lp(wob - wob.mean(), 3, 1); wob = wob / (np.abs(wob).max() + 1e-9)
    f = 110 + 55 * wob                                                # pitch drifts 55-165 Hz
    gur = np.sin(2 * np.pi * np.cumsum(f) / SR) * (0.5 + 0.5 * np.abs(np.sin(2 * np.pi * 3.1 * t + np.sin(2 * np.pi * 0.7 * t))))
    x = bed + lp(gur, 400) * 0.45
    for _ in range(int(d * 4)):
        st = rng.uniform(0, max(0.01, d - 0.12)); f0 = rng.uniform(140, 260)
        place(x, st * SR, chirp_drop(f0, f0 * 1.4, 0.1, 5) * rng.uniform(0.2, 0.4))
    return fade_edges(lp(x, 700) * bell(n, 0.7), 0.05, 0.15)

def heartbeat_fast(d=2.0, bpm=110, **_):
    """repeating lub-dub at bpm, with the dub closer when the heart is racing"""
    beat = 60.0 / float(bpm); x = np.zeros(int(d * SR) + int(0.4 * SR))
    gap = max(0.05, min(0.12, beat * 0.22))
    one = lambda dd, f: np.sin(2 * np.pi * (f + 25 * np.exp(-tt(dd) * 40)) * tt(dd)) * env(int(dd * SR), 0.004, 7)
    hb = np.concatenate([one(0.14, 60), np.zeros(int(gap * SR)), one(0.17, 52) * 0.7])
    hb = hb + lp(noise(len(hb) / SR), 120) * env(len(hb), 0.003, 9) * 0.15
    for st in np.arange(0, d, beat): place(x, st * SR, hb)
    return fade_edges(lp(x, 280))

def molecule(**_):
    """small glassy click/pop for a molecule docking: rounded body + inharmonic glass partials, fast decay"""
    d = 0.22; t = tt(d); n = len(t)
    body = sweep(520, 300, d) * env(n, 0.0015, 14) * 0.5
    glass = sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t * dk) for f, a, dk in [(1320, 0.45, 26), (1320 * 2.32, 0.22, 38), (1320 * 4.1, 0.08, 55)])
    x = body + glass * np.minimum(1, t / 0.0015)
    return fade_edges(lp(x, 4800), 0.001, 0.03)

def shimmer(d=1.5, **_):
    """soft rising sparkle: random sine glints whose pitch rises over the cue, gentle tremolo, swell then fade"""
    out = np.zeros(int(d * SR) + int(0.6 * SR)); k_n = int(d * 26)
    scale = [1.0, 9 / 8, 5 / 4, 3 / 2, 5 / 3]                         # pentatonic, never clashes
    for _ in range(k_n):
        u = rng.random() ** 0.9; st = u * d
        f = 620 * 2 ** (u * 1.6) * scale[rng.integers(0, 5)]          # 620 -> ~2400 Hz
        f = min(f, 3600); gl = rng.uniform(0.25, 0.5); g = tt(gl)
        tone = (np.sin(2 * np.pi * f * g) + 0.15 * np.sin(4 * np.pi * f * g)) * env(len(g), 0.01, 5)
        place(out, st * SR, tone * rng.uniform(0.08, 0.18) * (0.5 + 0.5 * u))
    tt_ = tt(len(out) / SR); out *= 1 + 0.15 * np.sin(2 * np.pi * 5 * tt_)
    air = lp(hp(noise(len(out) / SR), 2000), 4000) * 0.02           # breath of air under it
    sw = np.minimum(1, tt_ / (d * 0.7)) * np.exp(-np.maximum(0, tt_ - d) * 6)
    return fade_edges(lp((out + air) * sw, 4200), 0.02, 0.1)

def whoosh_soft(d=0.6, **_):
    """gentler camera whoosh: dark band noise, slow bell, slight upward air"""
    n = noise(d); k = np.linspace(0, 1, len(n))
    lo, hi = lp(n, 350, 2), lp(n, 1200, 2)
    x = lo * (1 - k * 0.6) + hi * k * 0.6
    x = norm(x) * bell(len(n), 2.2) * 0.45
    return fade_edges(lp(x, 1800), 0.01, 0.05)

def tick(d=None, **_):
    """soft wooden clock tick; with dur, a tick-tock at 1 per second (alternating pitch)"""
    def one(f):
        dd = 0.06; t = tt(dd)
        x = (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * f * 2.7 * t)) * env(len(t), 0.0008, 10)
        x += lp(noise(dd), 2500) * env(len(t), 0.0005, 18) * 0.25
        return fade_edges(lp(x, 4000), 0.0005, 0.01)
    if not d: return np.concatenate([one(1150), np.zeros(int(0.02 * SR))])
    x = np.zeros(int(d * SR) + int(0.1 * SR))
    for k, st in enumerate(np.arange(0, d, 1.0)): place(x, st * SR, one(1150 if k % 2 == 0 else 930) * (1 if k % 2 == 0 else 0.85))
    return x


FX = dict(inhale=inhale, heartbeat=heartbeat, whoosh=whoosh, slide=slide, pop=pop, plop=plop, gulp=gulp, boing=boing, bubbles=bubbles, sizzle=sizzle,
          sparkle=sparkle, thud=thud, slam=slam, tock=tock, zip=zip_, alarm=alarm,
          sip=sip, pour=pour, swallow=swallow, rumble=rumble, heartbeat_fast=heartbeat_fast, molecule=molecule, shimmer=shimmer,
          whoosh_soft=whoosh_soft, tick=tick)
# peak level (dBFS) of each effect at gain 1.0, before the master. Voice sits at -19 dBFS RMS (~-7 dBFS peaks).
LEVEL = dict(inhale=-15, heartbeat=-8, whoosh=-17, slide=-19, pop=-14, plop=-15, gulp=-11, boing=-15, bubbles=-21, sizzle=-18, sparkle=-17,
             thud=-11, slam=-9, tock=-18, zip=-14, alarm=-17,
             sip=-14, pour=-16, swallow=-11, rumble=-9, heartbeat_fast=-8, molecule=-15, shimmer=-17, whoosh_soft=-15, tick=-17)


# ---------- music beds ----------
def music_bed():
    """bright pad + plucked arpeggio, 100 BPM, I-vi-IV-V"""
    bpm = 100; beat = 60 / bpm; bar = beat * 4
    chords = [[261.6, 329.6, 392.0], [220.0, 261.6, 329.6], [174.6, 220.0, 261.6], [196.0, 246.9, 293.7]]
    x = np.zeros(N)
    nb = int(np.ceil(DUR / bar)) + 1
    for b in range(nb):
        ch = chords[b % 4]; st = int(b * bar * SR); n = int(bar * SR)
        if st >= N: break
        t = tt(bar); e = np.minimum(1, t / 0.4) * np.minimum(1, (bar - t) / 0.4)
        pad = sum(np.sin(2 * np.pi * f / 2 * t) + 0.25 * np.sin(2 * np.pi * f * t) for f in ch) * e * 0.10
        x[st:st + n] += pad[:max(0, min(n, N - st))]
        for k in range(8):
            f = ch[[0, 1, 2, 1, 2, 0, 1, 2][k]] * (2 if k % 4 == 2 else 1); ps = st + int(k * beat / 2 * SR); pn = int(0.5 * SR)
            if ps + pn >= N: continue
            pt = tt(0.5); pl = (np.sin(2 * np.pi * f * pt) + 0.35 * np.sin(4 * np.pi * f * pt)) * env(pn, 0.003, 7) * 0.12
            x[ps:ps + pn] += pl
    x = lp(x, 3200)
    fade = np.ones(N); fo = int(1.2 * SR); fade[-fo:] = np.linspace(1, 0, fo)
    return x / (np.abs(x).max() + 1e-9) * fade

def music_documentary():
    """warm cinematic bed, 100 BPM: detuned low pad (vi-IV-I-V in A minor colour), soft sub pulse on every beat,
    felt-piano motif on the off-beats, slow filter breathing. Curious, calm, science-documentary."""
    bpm = 100; beat = 60 / bpm; bar = beat * 4
    # Am(add9) - Fmaj7 - C(add9) - G6  : each chord: bass + 3 voices
    chords = [(110.0, [220.0, 261.6, 329.6, 493.9]), (87.3, [174.6, 220.0, 261.6, 329.6]),
              (130.8, [196.0, 261.6, 329.6, 293.7]), (98.0, [196.0, 246.9, 293.7, 329.6])]
    t_all = np.arange(N) / SR; x = np.zeros(N)
    nb = int(np.ceil(DUR / bar)) + 2
    for b in range(nb):
        bass, ch = chords[b % 4]; st = int(b * bar * SR)
        if st >= N: break
        L = bar + 0.6; t = tt(L); n = len(t)                           # overlap 0.6 s into the next chord
        e = np.minimum(1, t / 0.7) * np.minimum(1, np.maximum(0, (L - t)) / 0.8)
        pad = np.zeros(n)
        for f in ch:                                                  # two detuned voices per note = warmth
            for dt in (-0.18, 0.18):
                ff = f * 2 ** (dt / 12)
                pad += np.sin(2 * np.pi * ff * t + rng.uniform(0, 6.28)) + 0.18 * np.sin(4 * np.pi * ff * t) + 0.06 * np.sin(6 * np.pi * ff * t)
        pad = pad * e * 0.045
        sub = (np.sin(2 * np.pi * bass * t) + 0.3 * np.sin(4 * np.pi * bass * t)) * e * 0.12
        place(x, st, pad + sub)
        for k in range(4):                                            # soft pulse: felt kick-like sub on each beat
            ps = st + int(k * beat * SR); pt = tt(0.32)
            thump = np.sin(2 * np.pi * (bass * 0.5 + 30 * np.exp(-pt * 30)) * pt) * env(len(pt), 0.006, 7) * (0.22 if k % 2 == 0 else 0.15)
            place(x, ps, thump)
        motif = [ch[3], ch[2], ch[1], ch[2]] if b % 2 == 0 else [ch[2], ch[3], ch[2], ch[1]]
        for k, f in enumerate(motif):                                 # felt piano on the off-beats (eighths "and")
            ps = st + int((k + 0.5) * beat * SR); pt = tt(1.1); pn = len(pt)
            felt = (np.sin(2 * np.pi * f * 2 * pt) + 0.25 * np.sin(4 * np.pi * f * 2 * pt) + 0.05 * np.sin(6 * np.pi * f * 2 * pt))
            felt = lp(felt * env(pn, 0.012, 6), 1800) * 0.07 * (1.0 if k == 0 else 0.75)
            place(x, ps, felt)
    breathe = 0.5 + 0.5 * np.sin(2 * np.pi * t_all / (bar * 2) - np.pi / 2)  # slow filter breathing
    x = lp(x, 1400) * (1 - 0.35 * breathe) + lp(x, 2600) * 0.35 * breathe
    air = lp(hp(rng.standard_normal(N), 1500), 3500) * 0.004           # faint room air so it never goes dead
    x = x + air
    fade = np.ones(N); fi = int(0.6 * SR); fo = int(1.5 * SR); fade[:fi] = np.linspace(0, 1, fi); fade[-fo:] = np.linspace(1, 0, fo)
    return x / (np.abs(x).max() + 1e-9) * fade

def music_tension():
    """low drone + slow minor pulse, for mysterious / tense explainers (script.json "music": "tension")"""
    t = np.arange(N) / SR; x = np.zeros(N)
    for f, g in [(55, 0.5), (82.4, 0.3), (110, 0.2), (130.8, 0.12)]: x += np.sin(2 * np.pi * f * t + np.sin(t * 0.3) * 0.5) * g
    x *= 0.55 + 0.45 * np.sin(2 * np.pi * t / 8) ** 2
    beat = 60 / 84; ping = lambda f: (np.sin(2 * np.pi * f * tt(1.2)) + 0.3 * np.sin(4 * np.pi * f * tt(1.2))) * env(int(1.2 * SR), 0.01, 5)
    seq = [220.0, 261.6, 196.0, 174.6]
    for k in range(int(DUR / (beat * 2))):
        i = int(k * beat * 2 * SR); pg = ping(seq[(k // 2) % 4]) * 0.35
        if i + len(pg) < N: x[i:i + len(pg)] += pg
    x = lp(x, 2200); fade = np.ones(N); fo = int(1.5 * SR); fade[-fo:] = np.linspace(1, 0, fo); fi = int(0.8 * SR); fade[:fi] *= np.linspace(0, 1, fi)
    return x / (np.abs(x).max() + 1e-9) * fade

VOICE_RMS_DB = -19
SONG_UNDER_DB = 9      # song RMS this far under the voice before ducking (~16 dB under while he speaks, audible in gaps)
TRACKS = {'paris': {'file': 'assets/shared/music/paris.mp3', 'start': 8}}   # user's track, starts at its 0:08
DOC_UNDER_DB = 13      # documentary bed RMS this far under the voice before ducking; ducking adds ~5 dB in speech -> ~18 dB under (measured)

def load_audio(f):
    out = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(f), '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    a = np.frombuffer(out, dtype=np.float32).reshape(-1, 2).astype(np.float64); return a

def make_music(mus, P, voice):
    if not mus or mus == 'none': return None
    if mus == 'bed_documentary':
        m = music_documentary()
        m = m / (np.sqrt(np.mean(m ** 2)) + 1e-12) * db(VOICE_RMS_DB - DOC_UNDER_DB - (0 if voice is not None else -4))
        m = np.stack([m, m], 1)
    elif mus in TRACKS or isinstance(mus, dict):
        # a real song: the user's standing default is "Else - Paris" from 0:08 (script.json "music": "paris")
        spec = TRACKS.get(mus, mus) if isinstance(mus, str) else mus
        f = Path(spec['file']); f = f if f.is_absolute() else (HERE.parent / f if not P or not (P / f).exists() else P / f)
        a = load_audio(f)[int(spec.get('start', 0) * SR):]
        while len(a) < N: a = np.concatenate([a, a])                            # loop if the reel is longer than the song
        m = a[:N].copy(); rms = np.sqrt(np.mean(m ** 2)) + 1e-12
        m *= db(VOICE_RMS_DB - spec.get('under_db', SONG_UNDER_DB) + (0 if voice is not None else 6)) / rms
        fi = int(0.4 * SR); fo = int(2.0 * SR); m[:fi] *= np.linspace(0, 1, fi)[:, None]; m[-fo:] *= np.linspace(1, 0, fo)[:, None]
    else:
        m = music_bed() if mus == 'bed' else music_tension() if mus == 'tension' else None
        if m is None:
            a = load_audio(P / mus)[:N]; m = np.zeros(N); m[:len(a)] = a.mean(1); m /= np.abs(m).max() + 1e-9
        m = np.stack([m, m], 1) * db(-24 if voice is not None else -20)
    if voice is not None:                                                        # duck under the voice
        lev = np.abs(voice.mean(1)); lev = signal.lfilter([1 - 0.9995], [1, -0.9995], lev); lev /= lev.max() + 1e-9
        m *= (1 - 0.55 * np.clip(lev * 3, 0, 1))[:, None]
    return m

def crinkle(d=0.8, **_):
    """plastic candy-bag crinkle: dense random crackle bursts in a high band, swelling then fading"""
    n = int(d * SR); x = np.zeros(n)
    for _ in range(int(d * 140)):
        st = int(rng.uniform(0, d * 0.92) * SR); L = int(rng.uniform(0.002, 0.012) * SR)
        b = rng.standard_normal(L) * np.exp(-np.linspace(0, 6, L)) * rng.uniform(0.2, 1.0)
        m = max(0, min(L, n - st)); x[st:st + m] += b[:m]
    x = bp(x, 1800, 7000) * bell(n, 0.6)
    return fade_edges(x)

def rattle(d=0.9, **_):
    """hard candies tumbling out of a bag: many small bright clicks, denser in the middle"""
    n = int(d * SR); x = np.zeros(n + SR // 10)
    for _ in range(int(d * 45)):
        u = rng.beta(2, 2); st = int(u * d * SR); f = rng.uniform(1800, 4200); dd = 0.03
        t = tt(dd); c = (np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 2.7 * t)) * np.exp(-t * rng.uniform(90, 160))
        place(x, st, c * rng.uniform(0.3, 1.0))
    return fade_edges(hp(x, 900))

def crunch(d=0.7, **_):
    """chewing crunch: 3-4 low crackly bites"""
    n = int(d * SR); x = np.zeros(n + SR // 10)
    for k in range(4):
        st = int((0.04 + k * d / 4.2) * SR); L = int(0.09 * SR)
        b = bp(rng.standard_normal(L), 300, 3500) * np.exp(-np.linspace(0, 7, L)) * (1 - 0.15 * k)
        place(x, st, b)
    return fade_edges(lp(x, 4000))

FX.update(crinkle=crinkle, rattle=rattle, crunch=crunch)
LEVEL.update(crinkle=-20, rattle=-18, crunch=-14)

def can_open(d=0.7, **_):
    """drink can opening: a sharp metal crack, then a short gas hiss that fades"""
    n = int(d * SR); x = np.zeros(n + SR // 10)
    t = tt(0.025); crack = (bp(rng.standard_normal(len(t)), 1500, 6000) + 0.6 * np.sin(2 * np.pi * 2300 * t)) * np.exp(-t * 180)
    place(x, int(0.01 * SR), crack * 1.4)
    L = int(0.55 * d * SR); hiss = bp(rng.standard_normal(L), 2500, 7500) * np.exp(-np.linspace(0, 4, L)) * 0.55
    place(x, int(0.03 * SR), hiss)
    return fade_edges(x)

def fizz(d=1.2, **_):
    """carbonation fizz: a soft bed of tiny pops over a faint hiss"""
    n = int(d * SR); x = bp(rng.standard_normal(n), 3000, 8000) * 0.12
    for _ in range(int(d * 220)):
        st = int(rng.uniform(0, d * 0.97) * SR); L = int(0.002 * SR)
        place(x, st, rng.standard_normal(L) * np.exp(-np.linspace(0, 5, L)) * rng.uniform(0.2, 0.9))
    return fade_edges(hp(x, 1800) * bell(n, 0.4))

FX.update(can_open=can_open, fizz=fizz)
LEVEL.update(can_open=-14, fizz=-22)


def render_fx(c):
    fn = FX.get(c['type'])
    if not fn: return None
    kw = {k: v for k, v in c.items() if k not in ('t', 'type', 'gain', 'pan', 'dur')}
    if c.get('dur'): kw['d'] = c['dur']
    x = fn(**kw)
    return lp(x, 5000) * db(LEVEL[c['type']]) * c.get('gain', 1.0) / (np.abs(x).max() + 1e-9) * 0.9


def main(P):
    global DUR, N
    cj = json.loads((P / 'data/cues.json').read_text())
    script = json.loads((P / 'script.json').read_text())
    DUR = float(cj['duration']); N = int(DUR * SR) + SR // 10
    mix = np.zeros((N, 2))
    vf = P / 'data/narration.wav'; voice = None
    if vf.exists():
        v = load_audio(vf)[:N]; voice = np.zeros((N, 2)); voice[:len(v)] = v
        rms = np.sqrt(np.mean(voice ** 2) + 1e-12); voice *= db(VOICE_RMS_DB) / rms
        mix += voice
    mus = script.get('music', 'paris')   # user's standing choice (2026-11-28): Paris from 0:08 on every reel
    m = make_music(mus, P, voice)
    if m is not None: mix += m
    for c in cj['cues']:
        x = render_fx(c)
        if x is None: print('unknown cue type, skipped:', c['type']); continue
        i = int(c['t'] * SR); n = min(len(x), N - i)
        if n > 0 and i >= 0: pan = c.get('pan', 0.0); mix[i:i + n, 0] += x[:n] * (1 - max(0, pan)); mix[i:i + n, 1] += x[:n] * (1 + min(0, pan))
    mix = np.tanh(mix * 1.2) / 1.2                                               # master: gentle soft-clip, peak -1 dBFS
    mix *= db(-1) / (np.abs(mix).max() + 1e-9)
    wavfile.write(P / 'data/mix.wav', SR, (mix * 32767).astype(np.int16))
    print(f"data/mix.wav: {DUR:.2f} s . voice: {'yes' if voice is not None else 'NO (captions-only)'} . music: {mus} . {len(cj['cues'])} cues")


def dbfs(x): return 20 * np.log10(np.abs(x).max() + 1e-12), 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-12)

def selftest(out, narr=None):
    """synthesise every cue type at gain 0.3 / 0.6 the way the mixer does, write WAVs, print peak / RMS (dBFS)."""
    global DUR, N
    out.mkdir(parents=True, exist_ok=True)
    tests = [('sip', {}), ('pour', {'dur': 1.5}), ('swallow', {}), ('rumble', {'dur': 1.5}), ('heartbeat_fast', {'dur': 2.0, 'bpm': 110}),
             ('heartbeat_fast', {'dur': 2.0, 'bpm': 140}), ('molecule', {}), ('shimmer', {'dur': 1.5}), ('whoosh_soft', {'dur': 0.6}),
             ('tick', {}), ('tick', {'dur': 4.0}), ('heartbeat', {}), ('whoosh', {}), ('pop', {})]
    print(f"{'cue':28s} {'len s':>6s} {'g.3 pk':>7s} {'g.3 rms':>8s} {'g.6 pk':>7s} {'g.6 rms':>8s} {'>5k %':>6s}")
    for name, kw in tests:
        rows = []
        for g in (0.3, 0.6):
            x = render_fx(dict(type=name, t=0, gain=g, **kw)); rows.append(dbfs(x))
        spec = np.abs(np.fft.rfft(x)) ** 2; fr = np.fft.rfftfreq(len(x), 1 / SR); hi = 100 * spec[fr > 5000].sum() / (spec.sum() + 1e-12)
        tag = name + ''.join(f"_{k}{v}" for k, v in kw.items())
        wavfile.write(out / f'{tag}.wav', SR, (x / (np.abs(x).max() + 1e-9) * 0.7 * 32767).astype(np.int16))  # files normalised to -3 dB for listening
        print(f"{tag:28s} {len(x)/SR:6.2f} {rows[0][0]:7.1f} {rows[0][1]:8.1f} {rows[1][0]:7.1f} {rows[1][1]:8.1f} {hi:6.2f}")
    # music beds vs the voice
    voice = None
    if narr and Path(narr).exists():
        v = load_audio(narr); DUR = len(v) / SR; N = len(v)
        voice = v * db(VOICE_RMS_DB) / (np.sqrt(np.mean(v ** 2)) + 1e-12)
    else:
        DUR = 40.0; N = int(DUR * SR)
    for mus in ('bed_documentary', 'bed'):
        m = make_music(mus, None, voice)
        wavfile.write(out / f'music_{mus}.wav', SR, (m / (np.abs(m).max() + 1e-9) * 0.7 * 32767).astype(np.int16))
        pk, rms = dbfs(m)
        line = f"music {str(mus):16s} peak {pk:6.1f}  rms {rms:6.1f} dBFS"
        if voice is not None:
            vm = voice.mean(1); w = int(0.05 * SR); nw = len(vm) // w
            vr = np.sqrt((vm[:nw * w].reshape(nw, w) ** 2).mean(1)); mr = np.sqrt((m.mean(1)[:nw * w].reshape(nw, w) ** 2).mean(1))
            speech = vr > db(VOICE_RMS_DB - 12)
            vs = 20 * np.log10(np.sqrt(np.mean(vr[speech] ** 2))); ms = 20 * np.log10(np.sqrt(np.mean(mr[speech] ** 2)))
            mg = 20 * np.log10(np.sqrt(np.mean(mr[~speech] ** 2)) + 1e-12)
            line += f"  | in speech: voice {vs:6.1f}, music {ms:6.1f} -> {vs - ms:4.1f} dB under | in gaps: music {mg:6.1f}"
            mixw = voice + m; wavfile.write(out / f'voice_plus_{mus}.wav', SR, (np.tanh(mixw * 1.2) / 1.2 / (np.abs(mixw).max() + 1e-9) * 0.89 * 32767).astype(np.int16))
        print(line)
        spec = np.abs(np.fft.rfft(m.mean(1))) ** 2; fr = np.fft.rfftfreq(N, 1 / SR)
        print(f"    energy share: <120 Hz {100*spec[fr<120].sum()/spec.sum():.0f}%  120-1k {100*spec[(fr>=120)&(fr<1000)].sum()/spec.sum():.0f}%  >1k {100*spec[fr>=1000].sum()/spec.sum():.1f}%")


if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--test':
        selftest(Path(sys.argv[2]), sys.argv[3] if len(sys.argv) > 3 else None)
    else:
        main(Path(sys.argv[1] if len(sys.argv) > 1 else '.'))

