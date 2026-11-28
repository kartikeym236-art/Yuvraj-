import re
Y={"2008":"two thousand eight","2009":"two thousand nine","2010":"twenty ten","2011":"twenty eleven","2012":"twenty twelve","2013":"twenty thirteen",
"2014":"twenty fourteen","2016":"twenty sixteen","2017":"twenty seventeen","2020":"twenty twenty","2021":"twenty twenty one","2022":"twenty twenty two",
"2024":"twenty twenty four","2025":"twenty twenty five","2140":"twenty one forty"}
def notate(t):
    t=re.sub(r"\b(\d{4})\b",lambda m:"{%s|%s}"%(m[1],Y[m[1]]),t)
    t=re.sub(r"\b([A-Za-z]+(?:-[A-Za-z]+)+)\b",lambda m:"{%s|%s}"%(m[1],m[1].replace("-"," ")),t)
    t=t.replace("Mt. Gox","{Mt. Gox|mount gox}")
    return t
