const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');

const mongojs = require('mongojs');
const db = mongojs("mongodb://barnesadmin:barnes123@ds129018.mlab.com:29018/barnes-api", ["classics"]);

var app = express();

const url =  "http://www.barnesandnoble.com/b/barnes-noble-classics/books/_/N-rqvZ8q8?Ns=P_Sales_Rank";


request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {

	//--------------------------//
	var $ = cheerio.load(body);
	//-------------------------//

	var classic_books = $("li.clearer > ul > li");
 

	classic_books.each( function(i, cat){

            var productImage =  $(this).find(".product-image img").attr("src");
            var classicTitle =  $(this).find(".product-info-title a").text();
            var classicAuthor = $(this).find(".contributors a").text();

	    var myJson = {
		product_image: productImage,
 	   	classic_title: classicTitle,
		classic_author: classicAuthor,
	    }
            db.classics.insert(myJson);
	   
	});

    }
})

/// API ENDPOINTS ///

app.get('/classics', (req, res) => {
    db.classics.find(function (err, docs) {
      res.json(docs);
})
});

app.get('/newreleases', (req, res) => {
    db.news.find(function (err, docs){
	res.json(docs);
    })
});

app.listen(3000);
console.log("running on port 3000...");
