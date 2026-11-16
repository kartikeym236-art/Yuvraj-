import re
M={"1993":"nineteen ninety three","1963":"nineteen sixty three","1995":"nineteen ninety five","1997":"nineteen ninety seven",
"1999":"nineteen ninety nine","2000":"two thousand","2000s":"two thousands","2006":"two thousand six","2007":"two thousand seven",
"2008":"two thousand eight","2010s":"twenty tens","2012":"twenty twelve","2016":"twenty sixteen","2018":"twenty eighteen",
"2020":"twenty twenty","2022":"twenty twenty two","2023":"twenty twenty three","2024":"twenty twenty four","2025":"twenty twenty five",
"128":"one twenty eight","256":"two fifty six","3D":"three d","3dfx":"three d f x","H100":"h one hundred","NV1":"n v one","DGX-1":"d g x one"}
def notate(t):
    return re.sub(r"\b(DGX-1|[A-Za-z]*\d[A-Za-z0-9]*)\b",lambda m:"{%s|%s}"%(m[1],M[m[1]]) if m[1] in M else m[1],t)
