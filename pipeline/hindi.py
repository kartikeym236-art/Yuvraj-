"""Hindi (Devanagari) support for the English pocketsphinx aligner.

    python pipeline/hindi.py projects/<name>/transcript.txt

Writes projects/<name>/script.txt, wrapping every Devanagari word as
{देवनागरी|hxkey} (caption shows Devanagari, aligner uses the key), and adds
an approximate CMU-phone pronunciation for each key to pipeline/extra_dict.txt.
Latin words are left as they are. Numbers use {1,72,000|एक लाख ...}.
"""
import re, sys
from pathlib import Path

HERE = Path(__file__).parent
V = {"अ": "AH", "आ": "AA", "इ": "IH", "ई": "IY", "उ": "UH", "ऊ": "UW", "ऋ": "R IH", "ए": "EY",
     "ऐ": "AE", "ओ": "OW", "औ": "AO", "ऑ": "AO", "ऍ": "AE"}
M = {"ा": "AA", "ि": "IH", "ी": "IY", "ु": "UH", "ू": "UW", "ृ": "R IH", "े": "EY", "ै": "AE",
     "ो": "OW", "ौ": "AO", "ॉ": "AO", "ॅ": "AE"}
C = {"क": "K", "ख": "K", "ग": "G", "घ": "G", "ङ": "NG", "च": "CH", "छ": "CH", "ज": "JH", "झ": "JH",
     "ञ": "N", "ट": "T", "ठ": "T", "ड": "D", "ढ": "D", "ण": "N", "त": "T", "थ": "T", "द": "D",
     "ध": "D", "न": "N", "प": "P", "फ": "F", "ब": "B", "भ": "B", "म": "M", "य": "Y", "र": "R",
     "ल": "L", "व": "V", "श": "SH", "ष": "SH", "स": "S", "ह": "HH", "ळ": "L"}
NUKTA = {"क": "K", "ख": "K", "ग": "G", "ज": "Z", "ड": "R", "ढ": "R", "फ": "F", "य": "Y"}
ROMAN = {"AH": "a", "AA": "aa", "IH": "i", "IY": "ii", "UH": "u", "UW": "uu", "EY": "e", "AE": "ai",
         "OW": "o", "AO": "au", "K": "k", "G": "g", "NG": "ng", "CH": "ch", "JH": "j", "N": "n",
         "T": "t", "D": "d", "P": "p", "F": "f", "B": "b", "M": "m", "Y": "y", "R": "r", "L": "l",
         "V": "v", "SH": "sh", "S": "s", "HH": "h", "Z": "z"}


def phones(word):
    out, chars, i = [], list(word), 0
    while i < len(chars):
        ch = chars[i]
        if ch in V:
            out.append(V[ch]); i += 1
        elif ch in C:
            p = C[ch]; i += 1
            if i < len(chars) and chars[i] == "़":
                p = NUKTA.get(ch, p); i += 1
            out += p.split()
            if i < len(chars) and chars[i] in M:
                out += M[chars[i]].split(); i += 1
            elif i < len(chars) and chars[i] == "्":
                i += 1
            else:
                out.append("AH*")                      # inherent vowel, maybe deleted
        elif ch in ("ं", "ँ"):
            nxt = chars[i + 1] if i + 1 < len(chars) else ""
            out.append("M" if nxt in ("प", "ब", "भ", "म") else "N"); i += 1
        elif ch == "ः":
            out.append("HH"); i += 1
        else:
            i += 1
    if out and out[-1] == "AH*" and len([p for p in out if p != "AH*"]) > 1:
        out.pop()                                       # word-final schwa deletion
    out = [p.rstrip("*") for p in out]
    return [p for p in out if p]


def key(ph):
    return "hx" + "".join(ROMAN.get(p, p.lower()) for p in ph)


def convert(text):
    entries = {}
    def word(w):
        lead, core, trail = re.match(r"^([^\u0900-\u0963\u0966-\u097F]*)([\u0900-\u0963\u0966-\u097F]+)(.*)$", w).groups()
        ph = phones(core); k = key(ph)
        if entries.get(k, ph) != ph:
            k += str(len(entries))
        entries[k] = ph
        return f"{lead}{{{core}|{k}}}{trail}"
    def number(m):
        sp = " ".join(re.sub(r"[{}]", "", word(w)).split("|")[1] for w in m.group(2).split())
        return "{" + m.group(1) + "|" + sp + "}"
    text = re.sub(r"\{([^|{}]+)\|([^{}]+)\}", number, text)
    out = []
    for tok in re.split(r"(\s+)", text):
        if re.search(r"[\u0900-\u0963\u0966-\u097F]", tok) and not tok.startswith("{"):
            tok = word(tok)
        out.append(tok)
    return "".join(out), entries


if __name__ == "__main__":
    src = Path(sys.argv[1])
    script, entries = convert(src.read_text(encoding="utf-8"))
    (src.parent / "script.txt").write_text(script, encoding="utf-8")
    d = HERE / "extra_dict.txt"
    have = {l.split()[0] for l in d.read_text().splitlines() if l.strip() and not l.startswith("#")}
    with d.open("a") as f:
        for k, ph in entries.items():
            if k not in have:
                f.write(f"{k} {' '.join(ph)}\n")
    print(f"{len(entries)} Hindi words; script written")
