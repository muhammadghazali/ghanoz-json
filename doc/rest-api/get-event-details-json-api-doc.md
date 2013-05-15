### API URL
http://ghanozjson.ap01.aws.af.cm/event/1

### Request Header
```sh
Accept: application/json
User-Agent: Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.63 Safari/537.31
Accept-Encoding: gzip,deflate,sdch
Accept-Language: en-US,en;q=0.8
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3
```

### Response

#### Response Header
```sh
Accept-Ranges: bytes 
Age: 0 
Content-Type: application/json 
Date: Mon, 22 Apr 2013 19:01:40 GMT 
Server: nginx 
Vary: Accept 
Via: 1.1 varnish 
X-Powered-By: Express
X-Varnish: 305927378
Content-Length: 339 
Connection: keep-alive
```

#### Response Body

```json
{
    "url": "http://localhost:3000/event1",
    "data": {
        "_id": 1,
        "title": "Free event",
        "shortDescription": "Free event for students",
        "times": [
            {
                "milliseconds": 1613028781634,
                "fullFormat": "Thu Feb 11 2021 14:33:01 GMT+0700 (WIT)",
                "year": 2021,
                "month": 1,
                "date": 11,
                "day": 1
            }
        ],
        "isPassed": false,
        "rating": 3,
        "lastUpdated": 1612928781634,
        "timestamp": 1612928781634
    }
}
```