// src/common/headers.ts
export const defaultHeaders = {
    'accept': 'application/json',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'cookie': 'consumer=default; DCO=wdc; _csrf=EHf5bWli1LRJuls0THrXe34v; itemsPerPage=24; atrc=7fce29a1-8065-43d3-85dc-f8fb26251f7a; cookiePreferences=%7B%22experience%22%3Atrue%2C%22advertising%22%3Atrue%7D; referrer=d3d3Lmdvb2dsZS5jb20-L19zZWMvY2hhbGxlbmdl; _csrf=ke4L4GHjFbGnmGJs640lmNwX; _abck=6A6626BE91AE2D4A96FA5505F56C4D58~0~YAAQBk4SAhwxrryPAQAA4fyzAwxZPLHwop/u8w5NZVbHN7U4A+K+pmDrp6iornee0mMEvK7TtHFwt0rk4Tnf6JTEM/k7bvJ327ZcQ8qUFGQONvFGZ9niN5mDCX+7E4gAk8rlRyI2KJE3wgMXxQgzEu7ZHBLloz7gkQ+Su4ZRPBJkc0d9CtD6t+8jR2tUkg8GNGtkjxXow3seEJtrR/mSUpJaf5NhqSnqx9etcfu7aLx+Qli/UbTtPJa65SS2OCFVJowSdYHbBz8tMr540SEfSajtKRGW0aLd0kpXox71FX0FUCDTt1nh0iWfdSgPexVFm/f8OUGHl83LhDyKk+g6TFvdPiXp0IfW4O1k5+E63TRFxJkXDeB8+T1ukTnXxfpOeEf1xjry6i9Z99VEJMYmYg55+NXMMpE=~-1~-1~-1; ak_bmsc=7ADDFFC1CECF316E48C02A0C6C8476F0~000000000000000000000000000000~YAAQBk4SAhtTtryPAQAAHg0+BBjztRuFqkLDWzikG9ySHzNxdT2+tenYwG7e2JPxxfv2QBJJwKfzWl/Dt4WylIKpQ3vo7cICvm7cdpcN9xPDH3L/3Hj17cV+zZ4pZ3oQRjxaZTTaY+nZEedJVQRb2UqSa52xXyxUbQHF84Kh71OsIBIf/+cJsuVkJplb7ygJTQ2725c+X6fXo6paxCkJ/nEAkQuyEUWCr7Z9ytVEeVFzqWe5v8XSe3Vzc+hg3M5KgNoPN9TpLRcIrm7Y4/KXDK5SheAU/SX71+MSlbUacVpXh1Evr75jrEMw1d54wpzkcvTaYvgYUpThWCoeKOS05oh7tCQwmuZey8mVPZjyyjGKZ5bDf8TYhi+bzFdfK/RRWOwYuNUo59dyLQ==; bm_mi=6B2B3EE626F93B4DA8AC5434AEEC3C51~YAAQBk4SAsJTtryPAQAATh8+BBiFhkNNPQJCcNHyWjwCnkPIH+C57JTfQD852lf+kMCQIx0PN/RjB1ysePVmq3ZUJUFBFyDO9ouCVV0Q0Glbyb6PhKHHIjHBW4c2xHUknW1WKjeRZj0A7hc1N7nyNwg0hckGrr2MEQnL6RvQBA1LodFu9KilLSehhZltSz7P/x5nyrsLFX0pcqxwTgtLD3cI40AQ4XZ84wBUfFH2h/jh2TAVGAmdxniTHWlPj+nSEnqmBMTRVd1zUsaCjJIjV5ElhFaFodGlTgNfCAYk8GbcEJORnSLJlfKCM6CLHLrkK6iIfy4YEkYb/fMB~1; bm_sz=F2EABBE9C36A14F884D1EE4F7A828D89~YAAQBk4SAsRTtryPAQAATh8+BBiOzSayjcSXNBDYRYgs7WO4zJCAQnXmFeFTxDuTpH+oHnSh4D8raY+0s62zVrxC1pfTRFnlK3UwYdTc7qsM9vpDLsE9pOueY9B1vWPCXx8f9kvT46R4K6vbAvMnjLzNZXSKeNZig94NHu/bMEHWUEpiC6tlFenbIIJpQE8RvX8gck+pwHrJLX6Z01l9PeA//8touT1lTeJ8vGH+w0Tyt+g43vPrsEsBDfyVX4DcMZQes/OOWWzGb+RKwwPo2j/ksL+lfHLX6k8rfFiKERtFfBUoYxLj0xqBNsQgCdzAH6TJwxDyrJjDxpdw7b/aKY8jPImyF8fcwcy81/qa/nAsL9OWW8uj7yKD2JIMAlEw8zK9xoIu2m8FbQyDeZ0oR4w8JU3KUhbdG3TGDErqq7hN/oY=~3227952~3686707; ighs-sess=eyJzdG9yZUlkIjoiMjEwMDQiLCJsb2NhdGlvblV1aWQiOiI0MDkxNWFhYy1iY2Q5LTRjMjktODVmNy1mMWNiODgyNDFmNmQiLCJhbmFseXRpY3NTZXNzaW9uSWQiOiJiNDRjOGRiYjk3ZTIzY2E3NDliYTFhMWU1MjIzMTI0MSIsInJlcXVlc3RCYWNrdXBzIjpbeyJpZCI6ImUwN2Y4NjFhLTI4MDEtNGI5Yy1iMjkxLWZjNzk5OTYxOWE0ZCIsIm1ldGhvZCI6IlBPU1QiLCJ1cmwiOiIvZ3JvY2VyaWVzL2NiZC1ycHQiLCJib2R5Ijp7ImVsIjoidHJ1ZSIsIl9jc3JmIjoiNWx4aWFqbEgtSk8xOEJLVEg0ajVMdWVQLVUzVHVHM05qS3djIn0sInRpbWVzdGFtcCI6MTcxODA1ODA5OTgyNX1dfQ==; ighs-sess.sig=K8rDU1g9pAZgRSe9L9eNPfcoMRE; akavpau_slovakia_vp=1718058405~id=8497635143067e89fca5b4585f59c79e; bm_sv=356769854E2EB3251AC1B62D0BCCCDE8~YAAQBk4SAsdUtryPAQAAszg+BBjO9QqugwQHbGE8nf+l6zb75OsdHCtRlrzDE4//ugW1WiHDwutrwQ/kTOBOBT8dnBsQOS6hd6kKyEohaFI9+VLIdzEbBLxC4ireWUcvUy+Z5xO98kTD8x7Zn4FA3cO3cNvTwDzpGe4+nxISxummnOP/R9U/s8BplI/8KQDjxoyDAi2aIY1IcWBAkzW4pTvooaNI3GQlMthI1BeDq/r/i/yFz6EHoq+1E7UV/3U=~1',
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
    'x-csrf-token': '5lxiajlH-JO18BKTH4j5LueP-U3TuG3NjKwc',
    'x-queueit-ajaxpageurl': 'false',
    'x-requested-with': 'XMLHttpRequest'
};

