const express = require('express');
const fs = require('fs');

const xray = require('x-ray');
const xr = xray();

const base = 'http://www.barnesandnoble.com/b/';
const sort = '/_/N-1fZ29Zsoc?Ns=P_Sales_Rank';

const url = 'http://www.barnesandnoble.com/b/biography/_/N-1fZ29Zsoc?Ns=P_Sales_Rank';
const business = 'http://www.barnesandnoble.com/b/books/business/_/N-1fZ29Zsoc?Nrpp=20&Ns=P_Sales_Rank';
const religion = 'www.barnesandnoble.com/b/religion/_/N-1fZ29Z17d6?Ns=P_Sales_Rank';
const fiction = 'www.barnesandnoble.com/b/fiction/_/N-29Z10h8?Ns=P_Sales_Rank';

// remove the 8q8z

const app = express();

(function getBiographies(url, pages){

    console.log("scraping barnes and nobles .... ");

    book: xr(url, '.resultsListContainer li.clearer > ul > li', [{
	img: '.product-image img @src',
	title: '.product-info-title a',
	author: '.contributors a',
	rating: 'span[class=gig-rating-stars]@title', 
    }]) 
	.paginate('.search-pagination li:last-child a@href')
	.limit(pages)
	.write("data.json")
})


/// API ENDPOINTS ////

app.get('/:genre', (req, res) => {

    var genre = req.params.genre;   
    var searchFor = base + genre + sort;
    console.log(searchFor);


    var json = xr('http://www.barnesandnoble.com/b/religion/_/N-1fZ29Z17d6?Ns=P_Sales_Rank', '.resultsListContainer li.clearer > ul > li', [{
	img: '.product-image img @src',
	title: '.product-info-title a',
	author: '.contributors a',
	rating: 'span[class=gig-rating-stars]@title', 
    }]) 
	.paginate('.search-pagination li:last-child a@href')
	.limit(1)
	.stream()

    json.pipe(res);
});

app.listen(3000);
console.log("running on port 3000...");

