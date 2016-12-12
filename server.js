const express = require('express');
const fs = require('fs');

const xray = require('x-ray');
const xr = xray();


					// IMPORTANT URLS //
//--------------------------------------------------------------------------------------------------------//
const base = 'http://www.barnesandnoble.com/b/';
const sort = '/_/N-1fZ29Zsoc?Ns=P_Sales_Rank';
const url = 'http://www.barnesandnoble.com/b/biography/_/N-1fZ29Zsoc?Ns=P_Sales_Rank';
const business = 'http://www.barnesandnoble.com/b/books/business/_/N-1fZ29Zsoc?Nrpp=20&Ns=P_Sales_Rank';
const religion = 'www.barnesandnoble.com/b/religion/_/N-1fZ29Z17d6?Ns=P_Sales_Rank';
const fiction = 'www.barnesandnoble.com/b/fiction/_/N-29Z10h8?Ns=P_Sales_Rank';
//--------------------------------------------------------------------------------------------------------//
					// remove the 8q8z //


const app = express();
app.use(express.static(__dirname+'/client'));

/* 
 * scrapes all books on page and repeats by
 * n number of pages on each visited page
 */
function getBooks(url, pages){

    console.log("### scraping barnes and nobles ###");

     xr('http://www.barnesandnoble.com/b/new-releases/_/N-1oyg', '.resultsListContainer li.clearer > ul > li', [{
	img: '.product-image img @src',
	title: '.product-info-title a',
	author: '.contributors a',
	description: xr('.product-info-title a@href', '#truncatedOverview p'),
        pages: xr('.product-info-title a@href', 'div[id=ProductDetailsTab] dl :nth-child(8)'),
        price: xr('.product-info-title a@href', 'p[class=price] span'),
	rating: 'span[class=gig-rating-stars]@title', 
        book_url: '.product-info-title a@href',
    }])(console.log) 
	.paginate('.search-pagination li:last-child a@href')
	.limit(1)
}

// debuging => getBooks('www.barnesandnoble.com/b/religion/_/N-1fZ29Z17d6?Ns=P_Sales_Rank', 2);

/*
 * returns all dictionary of all subjects and their unique url
 */
(function getGenres(){

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

  })
	//book.pipe(process.stdout)
});


/////////////////////////////////////// API ENDPOINTS /////////////////////////////////////////////////

app.get('/', (req, res) => {
	res.render("index.html");
});


app.get('/recent', (req, res) => {

    var genre = req.params.genre;   

     var dbooks = xr('http://www.barnesandnoble.com/b/new-releases/_/N-1oyg', '.resultsListContainer li.clearer > ul > li', [{
	img: '.product-image img @src',
	title: '.product-info-title a',
	author: '.contributors a',
	description: xr('.product-info-title a@href', '#truncatedOverview p'),
        pages: xr('.product-info-title a@href', 'div[id=ProductDetailsTab] dl :nth-child(8)'),
        price: xr('.product-info-title a@href', 'p[class=price] span'),
	rating: 'span[class=gig-rating-stars]@title', 
        book_url: '.product-info-title a@href',
    }]) 
	.paginate('.search-pagination li:last-child a@href')
	.limit(1)
	.stream()

    dbooks.pipe(res);

});


app.get('/:genre/:pages', (req, res) => {

    var genre = req.params.genre;   
    var pages = req.params.pages;
    if(pages == undefined) pages = 1;


     var nbooks = xr('http://www.barnesandnoble.com/b/religion/_/N-1fZ29Z17d6?Ns=P_Sales_Rank' , '.resultsListContainer li.clearer > ul > li', [{
	img: '.product-image img @src',
	title: '.product-info-title a',
	author: '.contributors a',
	description: xr('.product-info-title a@href', '#truncatedOverview p'),
        pages: xr('.product-info-title a@href', 'div[id=ProductDetailsTab] dl :nth-child(8)'),
        price: xr('.product-info-title a@href', 'p[class=price] span'),
	rating: 'span[class=gig-rating-stars]@title', 
        book_url: '.product-info-title a@href',
    }]) 
	.paginate('.search-pagination li:last-child a@href')
	.limit(pages)
	.stream()

    nbooks.pipe(res);

});

app.get('/genres', (req, res) => {

    var genres = xr('http://www.barnesandnoble.com/h/books/browse', '.links-container.browse.clearer ul li ul li', [{
	subject: 'a',
	url: 'a@href',
    }])
	.stream()

    genres.pipe(res);

});

app.listen(3000);
console.log("running on port 3000...");
