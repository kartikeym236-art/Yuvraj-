import re
Y={"1930s":"nineteen thirties","1980s":"nineteen eighties","1997":"nineteen ninety seven","2001":"two thousand one","2013":"twenty thirteen",
"2022":"twenty twenty two","2023":"twenty twenty three","2025":"twenty twenty five","2026":"twenty twenty six","3D":"three d"}
def notate(t):
    t=re.sub(r"\b(1930s|1980s|3D|\d{4})\b",lambda m:"{%s|%s}"%(m[1],Y[m[1]]),t)
    t=re.sub(r"\b([A-Za-z]+(?:-[A-Za-z]+)+)\b",lambda m:"{%s|%s}"%(m[1],m[1].replace("-"," ")),t)
    return t
