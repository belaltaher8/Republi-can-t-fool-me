var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var json = {}
var index = 'article';

var listOfUrls = [];

//Republican training set
listOfUrls[0] = 'http://www.foxnews.com/politics/2017/09/04/haley-says-north-korea-is-begging-for-war-calls-for-strongest-possible-un-sanctions.html';
listOfUrls[1] = 'http://www.foxnews.com/politics/2017/09/04/hill-gop-conservatives-not-backing-trump-plan-to-tie-harvey-money-to-debt-ceiling-vote.html';
listOfUrls[2] = 'http://www.foxnews.com/politics/2017/09/03/trump-calls-north-korea-dangerous-and-great-threat-after-overnight-nuclear-test.html';

//Democrat training set

for(var i = 0; i < listOfUrls.length-1; i++){

    app.get('/scrape', function(req, res){
        url = listOfUrls[i];

        request(url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);

                var article = '';


                $('article p').filter(function(){
                    var data = $(this);
                    article = article + data.text();  
                })
                var thisIndex = index + i;
                json[thisIndex] = article;
            }


            fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
               console.log('File successfully written! - Check your project directory for the output.json file');
          
            })

        
            res.send('Check your console!')

        });
    })
}


app.listen('8081') 
console.log('wow i hope this works'); 
exports = module.exports = app;