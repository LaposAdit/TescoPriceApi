// src/common/headers.ts
export const defaultHeaders = {
    'accept': 'application/json',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'cookie': 'consumer=default; DCO=wdc; _csrf=EHf5bWli1LRJuls0THrXe34v; itemsPerPage=24; atrc=7fce29a1-8065-43d3-85dc-f8fb26251f7a; cookiePreferences=%7B%22experience%22%3Atrue%2C%22advertising%22%3Atrue%7D; referrer=d3d3Lmdvb2dsZS5jb20-L19zZWMvY2hhbGxlbmdl; _csrf=ke4L4GHjFbGnmGJs640lmNwX; _abck=6A6626BE91AE2D4A96FA5505F56C4D58~0~YAAQBk4SAhwxrryPAQAA4fyzAwxZPLHwop/u8w5NZVbHN7U4A+K+pmDrp6iornee0mMEvK7TtHFwt0rk4Tnf6JTEM/k7bvJ327ZcQ8qUFGQONvFGZ9niN5mDCX+7E4gAk8rlRyI2KJE3wgMXxQgzEu7ZHBLloz7gkQ+Su4ZRPBJkc0d9CtD6t+8jR2tUkg8GNGtkjxXow3seEJtrR/mSUpJaf5NhqSnqx9etcfu7aLx+Qli/UbTtPJa65SS2OCFVJowSdYHbBz8tMr540SEfSajtKRGW0aLd0kpXox71FX0FUCDTt1nh0iWfdSgPexVFm/f8OUGHl83LhDyKk+g6TFvdPiXp0IfW4O1k5+E63TRFxJkXDeB8+T1ukTnXxfpOeEf1xjry6i9Z99VEJMYmYg55+NXMMpE=~-1~-1~-1; ak_bmsc=2C6FAD667E6EDFD48954B33E3F549858~000000000000000000000000000000~YAAQBk4SAh0xrryPAQAA4fyzAxgMml3JV25vpwWnzwB9tQEJ9LHSdKeSzIGbaxdtLAcb7nyYqLe/XQxvRxObT4BfhBTVUPVPpqd3hyjRacy4AuMPy/v5v6jYzcp2qNPyDCacRdGvZmCxDhVzjYzgHJIYd1CU6OMIczE2DexbEUPWpp6P2RH+FTqc3VnExFTzmSUzFUknZkfmMBe93U1kpQdW+WrOO0uRCZ0blKOyC7LhYntDYh1qJJ6Onz6vULiilRqfPNgRNDFl95EDXomYcqJ8gpngpSAL0g4T4j9an3Zfbs3vD5IwSz+h2L6veDcfv4rCs5vRRchN2vhnXOIrDSlNdxL/8sEkpbQahxTEU6uho/8MP5M4UDhlsBTzGONs2kGe4xxIIVvuiw==; bm_mi=B060E68CC009F8D506ED9DD957239090~YAAQBk4SAtcxrryPAQAAOAi0Axhwf2n8tqwMAos28srDrHkV1JSSYjZzayk6xg9y2qJaoi9IyqkU74eIOQKiwq/FfgEcS0zy+B5KXJgi5dYknLqhwzmGkg/CD6JSw5YmxxlT4AHjr6l40OJkWS8Kvq88wamSwfQnBEF+9R9VsMdfaaUNcd67nauszX1cTAEhlj6QrlLsNdV2ZgH2dyR69rFHFCn1umddHfG4lYfcHZ+F+pBJb39r1fS7EE8Nm0XZCvwaoLZ7hj9A2V+BDcGXqQ//d6Qn66LllQE193P5IoHBN3ufNviuKI7fj7xzdsm67WCAuB15gqv1fpDZ~1; bm_sz=F2EABBE9C36A14F884D1EE4F7A828D89~YAAQBk4SAtkxrryPAQAAOAi0AxiowJaOrhpMwOfO3EU98KtVRoFtk4Nq2bRKUnGBMrnY46a0VKuFVDlag5HhXsJvYXo04vVlNmjmLAAn0yrmZrh/EAPERtMXqpy9K4L3spGYOK64XD4J6B32XYsb5W9SWQNtZU+IZmQ1ngKv21b2aT+lGjSqVTb2mFILqjVM1kkl3vFGjEA0FqYVfOmdT94TogQe8sGpu4gYT8E4J1pq86Pbim6rPdW6UBLTixQ+5bHlaZnARMkjL2yQNu3jgkFTfwYsCNVPUHjn2q/c25XjMe+WQ3hrjmaNjHYZ2jMx3bGfAtUcKit6HMupR44APDzOn5z5oS+zsmXFsM14o7MrYa8bfgJXpPvBnyJfkZVKu6Ac8ae+GWPhT3UyCOYB/0ZnVg==~3227952~3686707; ighs-sess=eyJzdG9yZUlkIjoiMjEwMDQiLCJsb2NhdGlvblV1aWQiOiI0MDkxNWFhYy1iY2Q5LTRjMjktODVmNy1mMWNiODgyNDFmNmQiLCJhbmFseXRpY3NTZXNzaW9uSWQiOiJlNmQzNTdmNmYzMWYwOWM3ZWU5ZjE2MjVmMWI2NjI5ZiIsInJlcXVlc3RCYWNrdXBzIjpbeyJpZCI6Ijc2MWRjOTM3LTViN2ItNDJjNi1iMzgyLTNhMTlkOGZiYTljYyIsIm1ldGhvZCI6IlBPU1QiLCJ1cmwiOiIvZ3JvY2VyaWVzL2NiZC1ycHQiLCJib2R5Ijp7ImVsIjoidHJ1ZSIsIl9jc3JmIjoiajEyWGdGbzgtUHQ1bW1fYlhfcU40MVk4Q2RQcmRIbUZiMk1NIn0sInRpbWVzdGFtcCI6MTcxODA0OTA0OTU2MH1dfQ==; ighs-sess.sig=rbv5csavYFLJC_1DsTUBOB33_P0; akavpau_slovakia_vp=1718049356~id=ac22abb3f5acec1bbb7b1145e9e14aba; bm_sv=F87FBFDD2197D02A5E1436AB5BA8AD74~YAAQBk4SAn8zrryPAQAANSW0AxiSY8BYkPduiXl+/PvLsPBRL2aMbm72PIbb3KQT7Zn2oRIUtQYIymQq95v+0s38Gh89k2fK2RVZFq7JREPfB0rR6wETokWe6OQlfw7gRpkzRqbVor6NpYb7OD/boWBVaX39CIYjryLoL0Kcri1eIDtP8/IRUDnU3YuRVNbPnHrCvtao++NcNV3iSvSJvTRmYz0O9RYhzLLiDAqYQDZuaUenjzPStL5YjDjUfXM=~1',
    'origin': 'https://potravinydomov.itesco.sk',
    'pragma': 'no-cache',
    'referer': 'https://potravinydomov.itesco.sk/groceries/sk-SK/shop/ovocie-zelenina-a-kvety/all?viewAll=promotion&promotion=4294967272',
    'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'traceparent': '00-bb0414a40d7b2848f2335f9afc7e797b-c21551b32ff1b1ca-01',
    'tracestate': '3296235@nr=0-1-3512954-1134246125-c21551b32ff1b1ca----1717157111146',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'x-csrf-token': 'j12XgFo8-Pt5mm_bX_qN41Y8CdPrdHmFb2MM',
    'x-queueit-ajaxpageurl': 'false',
    'x-requested-with': 'XMLHttpRequest'
};

