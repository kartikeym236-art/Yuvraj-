import re,json,sys
from pocketsphinx import Decoder
text=open(sys.argv[1]).read().lower()
words=re.findall(r"[a-z']+",text)
d=Decoder(samprate=16000)
miss=[w for w in set(words) if d.lookup_word(w) is None]
print("OOV:",miss)
d.set_align_text(" ".join(words))
d.start_utt(); d.process_raw(open("vo.raw","rb").read(),full_utt=True); d.end_utt()
d.set_alignment(); d.start_utt(); d.process_raw(open("vo.raw","rb").read(),full_utt=True); d.end_utt()
al=d.get_alignment()
out=[(w.name,w.start/100,(w.start+w.duration)/100) for w in al]
json.dump(out,open("align.json","w"))
print(len(out),"aligned of",len(words))
print(" ".join(f"{n}@{s:.2f}" for n,s,e in out))
