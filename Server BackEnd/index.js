//makes all necessary imports for scraping, classifying, and communication with chrome extension
var express = require('express');
var app = express();
var synaptic = require('synaptic');
var fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var sw = require('stopword');
var stem = require('stem-porter');
var request = require('request');
var cheerio = require('cheerio');

app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files TODO: REMOVE THIS
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Main page TODO: remove this 
app.get('/', function(request, response) {
  response.render('pages/index');
});

//Port
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//Listens for the chrome extension
app.post('/classify', function(req, resp) {
  var myDict = req.body.myUrl;
  var article = "";
  var url = "";
  url = myDict;
  var globalListOfBigrams = {};
  var globalListString = "";

  request(url, function(error, response, html){
        if(!error){
          var $ = cheerio.load(html);
            //Generally will work
            $("article p").filter(function(){
                var data = $(this);
                article = article + " " + data.text();  
            })
            //MSNBC weird formatting
            if(article.length < 20){
                $("article div:not([class])").filter(function(){
                  var data = $(this);
                  article = article + " " + data.text(); 
                }) 
            }

            //Last resort
            if(article.length < 20){
                $("p").filter(function(){
                    data = $(this);
                    article = article + " " + data.text();
                })    
            }

            fs.readFile('./globalList.json', function read(err, data){
              if(err){
                throw err;
              }

              globalListString = data;
              globalListOfBigrams = JSON.parse(globalListString);

              //tokenizes list
              var tokenizedList = tokenizer.tokenize(article);

              //removes special characters '\n' and '\t'
              for(var i = 0; i < tokenizedList.length; i++){
                if(tokenizedList[i] === '\n' || tokenizedList[i] === '\t'){
                  tokenizedList.splice(i,1);
                }
              }

              //Removes stop words
              var newList = sw.removeStopwords(tokenizedList);

              var personalListOfBigrams = {};
              //Adds all the bigrams found in the current article to the global list of bigrams
              for(var i = 0; i < newList.length-1; i++){
                var newBigram = newList[i] + ', ' + newList[i+1];
                //If the bigram hasn't been added to the personal list yet, add it
                if(!(newBigram in personalListOfBigrams)){
                  personalListOfBigrams[newBigram] = 1;
                }
              }

              var featureVector = Array.apply(null, Array(702)).map(Number.prototype.valueOf,0);
              var counter = 0;

              globalListOfBigrams.forEach(function(key) {
                if(key in personalListOfBigrams){
                  featureVector[counter] = 1;
                }
                counter = counter + 1;
              });

              var jsonString;

              fs.readFile('./classifier.json', function read(err, data){
                if(err){
                  throw err;
                }

                jsonString = data;
                var classifierJSON = JSON.parse(jsonString);
                var classifier = synaptic.Network.fromJSON(classifierJSON);
                var answer = classifier.activate(featureVector);
                var myDict = {};
                myDict["Answer"] = "" + answer;

                if(article.length < 20){
                  myDict["Answer"] = "" + 1.1;
                }

                resp.json(myDict);
              });
            });     
        }
        else{
          myDict["Answer"] = "" + 1.1;
          resp.json(myDict);
        }
    });
});
 