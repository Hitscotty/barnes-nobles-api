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
    "rating": "3.4",
    "book_url": "http://www.barnesandnoble.com/w/the-whistler-john-grisham/1123556270?ean=9780385541190",
    "price": "$17.71",
    "description": "From John Grisham, America’s #1 bestselling author, comes the most electrifying novel of the year, a high-stakes thrill ride through the darkest corners of the Sunshine State.   We expect our judges to be honest and wise. Their integrity and impartiality are the bedrock of the entire judicial system. We trust them to ensure fair",
    "pages": "384"
  }]
```

## /recent/:pages
returns json with number of pages specified in new releases 

```json
  [{
    "img": "http://prodimage.images-bn.com/pimages/9780385541190_p0_v4_s118x184.jpg",
    "title": "The Whistler",
    "author": "John Grisham",
    "rating": "3.4",
    "book_url": "http://www.barnesandnoble.com/w/the-whistler-john-grisham/1123556270?ean=9780385541190",
    "price": "$17.71",
    "description": "From John Grisham, America’s #1 bestselling author, comes the most electrifying novel of the year, a high-stakes thrill ride through the darkest corners of the Sunshine State.   We expect our judges to be honest and wise. Their integrity and impartiality are the bedrock of the entire judicial system. We trust them to ensure fair",
    "pages": "384"
  }
  ... 
  ]
```
## /:genre/:pages
the default number of pages the api returns is one; if you add `/fiction/30` it will return 
30 pages worth of books in fiction *(about 600 books)*. This is scraping data so large requests will take time, but it will eventually scrape the data.

``` json
 [{
    "img": "http://prodimage.images-bn.com/pimages/9780735289864_p0_v2_s118x184.jpg",
    "title": "Shaken: Discovering Your True…",
    "author": "Tim Tebow",
    "rating": "4.6",
    "book_url": "http://www.barnesandnoble.com/w/shaken-tim-tebow/1123805734?ean=9780735289864",
    "pages": "224",
    "description": "Who are you when life is steady?  Who are you when storms come?   Most of us have been on the receiving end of rejection, a broken dream, or heartbreak. And while this is not an easy space to go through, when we are grounded in the truth, we can endure the tough times.   In this powerful book, Heisman Trophy winner",
    "price": "$15.50"
  },
  ...
  ]
 
```

## local testing

``` bash

git clone https://github.com/Hitscotty/barnes-nobles-api
cd barnes-nobles-api
npm install
npm start

```
