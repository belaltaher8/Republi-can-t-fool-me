var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var json = {}
var index = 'article';

var listOfUrls = [];

//Republican training set
listOfUrls[0] = 'http://www.foxnews.com/opinion/2017/09/06/senate-democrats-attack-trump-judicial-nominees-catholic-faith.html';
listOfUrls[1] = 'http://www.foxnews.com/opinion/2017/09/06/trump-must-confront-iran-not-just-north-korea-as-tackles-nuclear-threat.html';
listOfUrls[2] = 'http://www.foxnews.com/opinion/2017/09/06/michael-goodwin-trumps-daca-decision-reveals-immigration-cowards-in-both-parties-can-congress-man-up-in-2017.html';
listOfUrls[3] = 'http://www.foxnews.com/opinion/2017/09/05/trump-acted-on-daca-now-its-time-for-congress-to-show-heart-and-smarts-on-immigration.html'
listOfUrls[4] = 'http://www.foxnews.com/opinion/2017/09/05/hillary-clinton-ready-to-pick-up-big-bucks-for-explaining-why-s-big-loser.html';
listOfUrls[5] = 'http://www.foxnews.com/opinion/2017/09/05/daca-if-trump-plays-his-cards-right-hes-just-made-brilliant-move-on-immigration.html';
listOfUrls[6] = 'http://www.foxnews.com/opinion/2017/09/04/rep-lamar-smith-its-time-for-gop-to-go-on-offensive-ignore-liberal-media-and-speak-directly-to-american-people.html';
listOfUrls[7] = 'http://www.foxnews.com/opinion/2017/09/03/north-korea-nuclear-nightmare-trump-has-strong-options-can-use-against-kim-but-hes-got-to-act-quickly.html';
listOfUrls[8] = 'http://www.foxnews.com/opinion/2017/09/02/comey-and-clinton-rigged-from-beginning.html';
listOfUrls[9] = 'http://www.foxnews.com/opinion/2017/09/02/trump-wants-to-make-reagan-style-tax-reform-great-again-gop-should-pay-attention.html';
listOfUrls[10] = 'http://www.foxnews.com/opinion/2017/09/02/liberal-media-exploits-hurricane-harvey-to-attack-president-trump.html';
listOfUrls[11] = 'http://www.foxnews.com/opinion/2017/09/02/big-opportunity-for-scott-pruitt-and-team-trump-to-demonstrate-its-support-for-american-ingenuity-and-innovation.html';
listOfUrls[12] = 'http://www.foxnews.com/opinion/2017/09/01/open-letter-to-hatemongers-antifa.html';
listOfUrls[13] = 'http://www.foxnews.com/opinion/2017/08/31/newt-gingrich-why-doesnt-media-condemn-left-wing-violence.html';
listOfUrls[14] = 'http://www.foxnews.com/opinion/2017/08/30/washington-post-antifa-is-violent-will-rest-media-finally-tell-truth-too.html';
listOfUrls[15] ='http://www.foxnews.com/opinion/2017/08/30/houston-reminds-us-who-americans-really-are-not-parade-deplorables-portrayed-by-media-and-left.html';
listOfUrls[16] = 'http://www.foxnews.com/opinion/2017/08/29/splc-smear-machine-is-being-funded-by-liberal-billionaires-why.html';
listOfUrls[17] = 'http://www.foxnews.com/opinion/2017/08/29/why-should-anyone-condemn-white-nationalists-if-left-wont-condemn-antifa.html';
listOfUrls[18] = 'http://www.foxnews.com/opinion/2017/08/27/trump-and-approval-ratings-what-elite-media-wont-tell.html';
listOfUrls[19] = 'http://www.foxnews.com/opinion/2017/08/29/why-left-cant-let-go-racism.html';
listOfUrls[20] = 'http://www.foxnews.com/opinion/2017/08/25/time-for-trump-to-keep-his-promises-daca-is-unconstitutional-and-bad-for-american-workers.html';
listOfUrls[21] = 'http://www.foxnews.com/opinion/2017/08/04/debbie-wasserman-schultz-house-democrats-and-incredible-scandal-mainstream-media-wants-to-ignore.html';
listofUrls[22] = 'http://www.foxnews.com/opinion/2017/08/14/trump-is-our-president-and-washington-still-cant-wrap-its-mind-around-that-fact.html';
listOfUrls[23] = 'http://www.foxnews.com/opinion/2017/08/11/ny-times-front-page-screw-up-is-global-warming-disaster-and-other-truly-awful-media-moments.html';
listOfUrls[24] = 'http://www.foxnews.com/opinion/2017/08/25/what-clueless-nancy-pelosi-doesnt-seem-to-understand-about-free-speech.html';
listOfUrls[25] = 'http://www.foxnews.com/opinion/2017/08/24/poor-hillary-intimidated-in-debates-by-big-bad-donald-trump.html';
listOfUrls[26] = 'http://www.foxnews.com/opinion/2017/08/24/newt-gingrich-time-for-republicans-to-wise-up-and-quit-giving-liberal-media-cannibalism-crave.html';
listOfUrls[27] = 'http://www.foxnews.com/opinion/2017/08/23/president-trump-deserves-benefit-doubt-on-afghanistan-our-soldiers-deserve-closure.html';
listOfUrls[28] = 'http://www.foxnews.com/opinion/2017/08/09/trump-must-go-on-offense.html';
listOfUrls[29] = 'http://www.foxnews.com/opinion/2017/08/09/liberal-media-wrong-about-2020.html';
listOfUrls[30] = 'http://www.foxnews.com/opinion/2017/08/06/do-transgender-rights-trump-womens-rights-left-needs-to-decide.html';
listOfUrls[31] = 'http://www.foxnews.com/opinion/2017/07/31/im-democrat-but-nancy-pelosi-is-totally-clueless-about-what-democrats-need-to-do-to-win.html';
listOfUrls[32] = 'http://www.foxnews.com/opinion/2017/07/31/jeff-sessions-is-making-america-safer-should-stay-in-job-as-attorney-general.html';
listOfUrls[33] = 'http://www.foxnews.com/opinion/2017/07/31/how-liberal-blitzkrieg-from-hollywood-and-press-got-boy-scouts-to-surrender.html';
listOfUrls[34] = 'http://www.foxnews.com/opinion/2017/07/29/liberal-news-outlets-work-overtime-to-hide-huge-democratic-scandal-and-more-crazy-media-misses-this-week.html';
listOfUrls[35] = 'http://www.foxnews.com/opinion/2017/07/28/hillary-clinton-wants-to-tell-what-happened-in-her-new-book-which-wont-actually-tell-what-happened.html';
listOfUrls[36] = 'http://www.foxnews.com/opinion/2017/07/28/how-trump-can-win-obamacare-fight-end-friends-and-cronies-exemption-for-congress.html';
listOfUrls[37] = 'http://www.foxnews.com/opinion/2017/07/24/democrats-new-slogan-like-bad-pizza-slice-slathered-with-40-year-old-ingredients-and-almost-no-meat.html';
listOfUrls[38] = 'http://www.foxnews.com/opinion/2017/07/24/jared-kushners-meetings-were-both-legal-and-beneficial.html';
listOfUrls[39] = 'http://www.foxnews.com/opinion/2017/07/24/lewandowski-daily-beast-should-not-be-allowed-to-be-publication.html';
listOfUrls[40] =

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