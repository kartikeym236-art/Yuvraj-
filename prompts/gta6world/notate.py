import re
R={"2002":"two thousand two","2026":"twenty twenty six","R34":"r thirty four","GR86":"g r eighty six","C8":"c eight","CL65":"c l sixty five","E30":"e thirty","M2":"m two","GT-R":"g t r","F-150":"f one fifty","3":"three"}
def notate(t):
    for k in sorted(R,key=len,reverse=True): t=re.sub(r"(?<![\w{|-])"+re.escape(k)+r"(?![\w}-])","{%s|%s}"%(k,R[k]),t)
    t=re.sub(r"(?<![{|\w])([A-Za-z]+(?:-[A-Za-z]+)+)(?![\w}|])",lambda m:"{%s|%s}"%(m[1],m[1].replace("-"," ")),t)
    return t
