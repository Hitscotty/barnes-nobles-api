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

/* 
 * scrapes all books on page and repeats by
 * n number of pages on each visited page
 */
(function getBooks(url, pages){

    console.log("### scraping barnes and nobles ###");

    book: xr(url, '.resultsListContainer li.clearer > ul > li', [{
	img: '.product-image img @src',
	title: '.product-info-title a',
	author: '.contributors a',
	rating: 'span[class=gig-rating-stars]@title', 
    }]) 
	.paginate('.search-pagination li:last-child a@href')
	.limit(pages)
	.write("data.json")
});

/*
 * returns all dictionary of all subjects and their unique url
 */
function getSubjects(){

    console.log("### scraping subjects of barnes and nobles ###");

    var hash = {};
    xr('http://www.barnesandnoble.com/h/books/browse', '.links-container.browse.clearer ul li ul li', [{
	subject: 'a',
	url: 'a@href',
    }])((err, obj) => {
	
	

	for(var i = 0; i < obj.length; i++) {
		console.log(obj[i].subject);
                console.log(obj[i].url);
	    }

	console.log(hash);
  })
	//book.pipe(process.stdout)
}

getSubjects();

/// API ENDPOINTS ////

app.get('/:genre', (req, res) => {

    var genre = req.params.genre;   
    var searchFor = base + genre + sort;


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

app.get('/:subjects', (req, res) => {

    var json = xr(url, '.links-container.browse.clearer ul li ul li', [{
	subject: 'a',
	url: 'a@href',
    }])
	.write()

    json.json(JSON.parse(res));

});

app.listen(3000);
console.log("running on port 3000...");

