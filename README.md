# barnes-nobles-api
an api for barnes and nobles; base url: http://barnesandnobles.herokuapp.com/api/* your_end_point_here*
You need to use the following endpoints to use this api otherwise you will be greeted to a 404 page.

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
  [  {
    "img": "http://prodimage.images-bn.com/pimages/9780385541190_p0_v4_s118x184.jpg",
    "title": "The Whistler",
    "author": "John Grisham",
    "rating": "3.4",
    "book_url": "http://www.barnesandnoble.com/w/the-whistler-john-grisham/1123556270;jsessionid=1B0E2465679180C850456174BC030C56.prodny_store01-va08?ean=9780385541190",
    "sales_rank": "8",
    "price": "$17.43",
    "pages": "384",
    "description": "From John Grisham, America’s #1 bestselling author, comes the most electrifying novel of the year, a high-stakes thrill ride through the darkest corners of the Sunshine State.   We expect our judges to be honest and wise. Their integrity and impartiality are the bedrock of the entire judicial system. We trust them to ensure fair",
    "isbn": "9780385541190"
  }]
```

## /recent/:pages
returns json with number of pages specified in new releases 

```json
  [  {
    "img": "http://prodimage.images-bn.com/pimages/9780385541190_p0_v4_s118x184.jpg",
    "title": "The Whistler",
    "author": "John Grisham",
    "rating": "3.4",
    "book_url": "http://www.barnesandnoble.com/w/the-whistler-john-grisham/1123556270;jsessionid=1B0E2465679180C850456174BC030C56.prodny_store01-va08?ean=9780385541190",
    "sales_rank": "8",
    "price": "$17.43",
    "pages": "384",
    "description": "From John Grisham, America’s #1 bestselling author, comes the most electrifying novel of the year, a high-stakes thrill ride through the darkest corners of the Sunshine State.   We expect our judges to be honest and wise. Their integrity and impartiality are the bedrock of the entire judicial system. We trust them to ensure fair",
    "isbn": "9780385541190"
  }
  ... 
  ]
```
## /search/:search/:pages
the default number of pages the api returns is one; if you add `/fiction/30` it will return 
30 pages worth of books in fiction *(about 600 books)*. This is scraping data so large requests will take time, but it will eventually scrape the data.  Below is a search for `/random/1`: 

``` json
 [{
    "img": "http://prodimage.images-bn.com/pimages/9781101940624_p0_v1_s118x184.jpg",
    "title": "Supergirl at Super Hero High…",
    "author": "Lisa Yee",
    "rating": "0.0",
    "book_url": "http://www.barnesandnoble.com/w/supergirl-at-super-hero-high-lisa-yee/1123385564;jsessionid=BEA6C7A69DF9E82445BD23FFBD242580.prodny_store01-va09?ean=9781101940624",
    "sales_rank": "18,135",
    "description": "Get your cape on with the DC Super Hero Girls™—the unprecedented new Super Hero universe especially for girls! Readers of all ages can fly high with the all-new adventures of Wonder Woman™, Supergirl™, Batgirl™, and some of the world’s most iconic female super heroes as high schoolers!   Supergirl is the new girl in",
    "isbn": "9781101940624",
    "price": "$8.61",
    "pages": "240"
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
