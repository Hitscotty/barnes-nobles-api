# barnes-nobles-api
an api for barnes and nobles

# endpoints

## /genres
returns json of all genres retrievable and unique urls to each of them on B&N

```json
  [{
    "subject": "Fiction",
    "url": "http://www.barnesandnoble.com/b/books/fiction/_/N-29Z8q8Z10h8"
  }]
```

## /recent
returns json of the most recent book releases on B&N

```json
  [{
    "img": "http://prodimage.images-bn.com/pimages/9780385541190_p0_v4_s118x184.jpg",
    "title": "The Whistler",
    "author": "John Grisham",
    "rating": "3.4"
  }]
```

## /recent/:pages
returns json with number of pages specified in new releases 

```json
  [{
    "img": "http://prodimage.images-bn.com/pimages/9780385541190_p0_v4_s118x184.jpg",
    "title": "The Whistler",
    "author": "John Grisham",
    "rating": "3.4"
  },
  ... 
  ]
```
## /:genre/:pages
the default number of pages the api returns is one; if you add `/fiction/30` it will return 
30 pages worth of books in fiction *(about 600 books)*

``` json
  [{
    "img": "http://prodimage.images-bn.com/pimages/9780735289864_p0_v2_s118x184.jpg",
    "title": "Shaken: Discovering Your True…",
    "author": "Tim Tebow",
    "rating": "4.6"
  }]
 
```

## local testing

``` bash

git clone https://github.com/Hitscotty/barnes-nobles-api
cd barnes-nobles-api
npm install
npm start

```
