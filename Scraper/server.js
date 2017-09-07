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
listOfUrls[40] = 'http://www.foxnews.com/opinion/2017/08/09/obama-administration-knew-about-north-koreas-miniaturized-nukes.html';
listOfUrls[41] = 'http://www.foxnews.com/opinion/2017/08/02/second-amendment-has-won-again-in-washington-so-why-wont-supreme-court-fully-enforce-it.html';
listOfUrls[42] = 'http://www.foxnews.com/opinion/2017/07/24/sarah-huckabee-sanders-called-butch-queen-by-daily-beast-writer-and-left-is-silent.html';
listOfUrls[43] = 'http://www.foxnews.com/opinion/2017/07/23/vice-president-mike-pence-trumps-triumphs-are-many-after-only-six-months-and-hes-just-getting-started.html';
listOfUrls[44] = 'http://www.foxnews.com/opinion/2017/07/24/gregg-jarrett-donald-trump-jr-did-not-violate-campaign-laws-pelosi-and-others-are-wrong.html';
listOfUrls[45] = 'http://www.breitbart.com/big-government/2017/09/06/meet-the-swamp-donald-trump-plans-agenda-with-pelosi-ryan-mcconnell-and-schumer/';
listOfUrls[46] = 'http://www.breitbart.com/big-government/2017/09/06/donald-trump-wants-permanent-daca-deal-where-everybody-is-happy/';
listOfUrls[47] = 'http://www.breitbart.com/big-government/2017/09/06/trumps-deal-democrats-warning-republicans-establishment-conservative-alike/';
listOfUrls[48] = 'http://www.breitbart.com/big-government/2017/09/05/ttrump-to-congress-legalize-daca-or-i-will-revisit/';
listOfUrls[49] = 'http://www.breitbart.com/big-government/2017/09/06/donald-trump-on-deal-with-democrats-everyone-was-happy-not-too-happy/';
listOfUrls[50] = 'http://www.breitbart.com/radio/2017/09/06/angel-mom-mendoza-politicians-fighting-illegal-immigrants-not-american-citizens/';
listOfUrls[51] = 'http://www.breitbart.com/big-government/2017/09/06/donald-trump-warning-hurricane-irma-looks-like-largest-ever-recorded-in-the-atlantic/';
listOfUrls[52] = 'http://www.breitbart.com/big-hollywood/2017/09/06/modern-family-producer-christians-oppose-daca-amnesty-fk/';
listOfUrls[53] = 'http://www.breitbart.com/big-government/2017/09/05/punish-americans-heritage-reward-dreamers-daca-outrage-exposes-left/';
listOfUrls[54] = 'http://www.breitbart.com/big-journalism/2017/09/04/houston-proves-everything-msm-says-divided-country-lie/';
listOfUrls[55] = 'http://www.breitbart.com/big-government/2017/09/04/delingpole-trump-appoints-conservative-ex-navy-flier-to-run-nasa-liberal-heads-explode/';
listOfUrls[56] = 'http://www.breitbart.com/big-government/2017/09/02/wsj-trump-administration-weighs-withdrawal-south-korea-trade-pact/';
listOfUrls[57] = 'http://www.breitbart.com/big-government/2017/08/29/liberal-journalist-shields-man-from-antifa-attackers-i-thought-they-were-going-to-kill-him/';
listOfUrls[58] = 'http://www.breitbart.com/big-journalism/2017/08/29/cnn-republican-ana-navarro-contributed-thousands-and-thousands-of-dollars-to-democrats/';
listOfUrls[59] = 'http://www.breitbart.com/big-journalism/2017/08/29/nolte-leftists-and-media-cheer-as-mega-corporations-strip-away-free-speech-rights/';
listOfUrls[60] = 'http://www.breitbart.com/big-government/2017/08/26/report-west-wing-dems-fear-don-jr-will-give-potus-articles-conservative-media/';
listOfUrls[61] = 'http://www.breitbart.com/london/2017/08/26/antifa-warns-will-attack-canadian-journalists-protests/';
listOfUrls[62] = 'http://www.breitbart.com/big-journalism/2017/08/25/hillary-book-excerpt-reinforces-her-greatest-weaknesses/';
listOfUrls[63] = 'http://www.breitbart.com/big-government/2017/08/23/trump-supporters-roar-cnn-sucks-live-on-cnn/';
listOfUrls[64] = 'http://www.breitbart.com/big-journalism/2017/08/23/los-angeles-times-trumps-call-law-order-racist/';
listOfUrls[65] = 'http://www.breitbart.com/tech/2017/08/23/new-york-times-vox-declare-corporations-the-moral-voice-of-america/';
listOfUrls[66] = 'http://www.breitbart.com/big-government/2017/08/20/liberal-historian-praises-brave-corker-for-questioning-trump-stability/';
listOfUrls[67] = 'http://www.breitbart.com/big-journalism/2017/08/20/cnn-daily-beast-matt-lewis-trump-voters-asses-bunch-of-idiots/';
listOfUrls[68] = 'http://www.breitbart.com/big-government/2017/08/19/cnn-smears-again-don-lemon-implies-breitbart-platform-for-nazis/';
listOfUrls[69] = 'http://www.breitbart.com/big-government/2017/08/19/cnn-normalizes-antifa-leftists-seek-peace-through-violence/';
listOfUrls[70] = 'http://www.breitbart.com/big-government/2017/09/02/nancy-pelosi-the-voters-dont-want-to-hear-us-criticizing-the-president/';
listOfUrls[71] = 'http://www.breitbart.com/big-journalism/2017/09/01/as-its-influence-wanes-increasingly-militant-msm-promotes-violence-and-censorship/';
listOfUrls[72] = 'http://www.breitbart.com/big-journalism/2017/09/01/leftists-apoplectic-smear-kris-kobach-as-nazi-for-paid-breitbart-column/';
listOfUrls[73] = 'http://www.breitbart.com/video/2017/09/01/tucker-carlson-rips-cnns-kamau-bell-for-inciting-rage-at-berkeley-rally-you-are-peddling-hate/';
listOfUrls[74] = 'http://www.breitbart.com/big-journalism/2017/08/30/cnn-reporter-exits-bubble-discovers-just-how-much-texas-hates-cnn/';
listOfUrls[75] = 'http://www.breitbart.com/tech/2017/08/17/cnn-jim-sciutto-charlottesville-terror-attacks-europe/';
listOfUrls[76] = 'http://www.breitbart.com/big-journalism/2017/08/17/joe-scarborough-trump-a-racist-or-bigot/';
listOfUrls[77] = 'http://www.breitbart.com/big-government/2017/08/17/busted-morning-joe-caught-lying-about-steve-bannon/';
listOfUrls[78] = 'http://www.breitbart.com/radio/2017/08/17/paris-dennard-liberals-shut-down-black-conservative-speech-personal-attacks/';
listOfUrls[79] = 'http://www.breitbart.com/big-government/2017/08/17/hit-list-cnn-publishes-map-confederate-monuments-u-s/';
listOfUrls[80] = 'http://www.breitbart.com/big-government/2017/08/17/new-york-times-charlottesville-protesters-not-white-supremacists-nazis/';
listOfUrls[81] = 'http://www.breitbart.com/big-government/2017/08/16/delingpole-actually-no-d-day-wasnt-won-by-masked-leftist-thugs/';
listOfUrls[82] = 'http://www.breitbart.com/radio/2017/08/16/dsouza-racist-democrat-woodrow-wilson-a-pretty-good-candidate-to-have-his-statue-pulled-down/';
listOfUrls[83] = 'http://www.breitbart.com/big-government/2017/08/16/safe-space-history-left-wing-activists-complacent-governments-destroy-confederate-monuments-across-nation/';
listOfUrls[84] = 'http://www.breitbart.com/big-journalism/2017/08/15/media-shaken-trump-press-conference-comments-charlottesville/';
listOfUrls[85] = 'http://www.breitbart.com/big-government/2017/08/15/donald-trump-reporters-charlottesville-violence/';
listOfUrls[86] = 'http://www.breitbart.com/tech/2017/08/15/new-york-times-column-omits-violent-remarks-by-leftist-professors/';
listOfUrls[87] = 'http://www.breitbart.com/big-government/2017/08/15/yahoo-news-antifa-glowing-profile/';
listOfUrls[88] = 'http://www.breitbart.com/radio/2017/08/15/corey-stewart-violent-left-antifa-emboldened-charlottesville/';
listOfUrls[89] = 'http://www.breitbart.com/video/2017/08/14/watch-cnn-contributor-hurls-racial-epithet-black-republican-air/';
listOfUrls[90] = 'http://www.breitbart.com/big-government/2017/08/12/female-reporter-for-the-hill-allegedly-punched-by-antifa-protester-in-charlottesville/';
listOfUrls[91] = 'http://www.breitbart.com/big-government/2017/08/10/fivethirtyeight-dems-could-lose-five-senate-seats-remain-house-minority-in-one-of-most-positive-2018-outcomes/';
listOfUrls[92] = 'http://www.breitbart.com/video/2017/08/09/scarborough-calls-trump-reading-conservative-news-calls-sick/';
listOfUrls[93] = 'http://www.breitbart.com/big-government/2017/08/09/ann-coulter-trump-got-tongue-media/';
listOfUrls[94] = 'http://www.breitbart.com/big-journalism/2017/08/09/media-triggered-after-new-york-times-leaker-cultivation-process-exposed/';
listOfUrls[95] = 'http://www.breitbart.com/big-journalism/2017/08/08/mcmaster-msm-allies-panic-claim-breitbarts-jewish-jerusalem-editor-anti-jew/';
listOfUrls[96] = 'http://www.breitbart.com/tech/2017/08/08/cnn-spreads-fake-news-about-google-viewpoint-diversity-manifesto/';
listOfUrls[97] = 'http://www.breitbart.com/big-government/2017/08/06/cnn-jim-acosta-admits-still-clueless-about-immigration-policy/';
listOfUrls[98] = 'http://www.breitbart.com/big-government/2017/08/06/liberal-anti-trump-media-group-goes-embattled-gen-mcmaster/';
listOfUrls[99] = 'http://www.breitbart.com/big-government/2017/08/05/cnn-ana-navarro-trump-immigration-plan-racist/';
listOfUrls[100] = 'http://www.breitbart.com/big-government/2017/08/05/more-leftist-hysteria-mag-says-gorka-bannon-worse-for-jews-than-anti-israel-radical-sarsour/';
listOfUrls[101] = 'http://www.breitbart.com/big-government/2017/08/03/trump-transcripts-reveal-man-committed-private-public-maga/';
listOfUrls[102] = 'http://www.breitbart.com/big-government/2017/07/31/morning-joe-begs-wh-chief-kelly-sideline-nationalist-bannon-encouraging-trump-attack-opposition-media/';


//Democrat training set


for(var i = 0; i < listOfUrls.length-1; i++){
    //TODO: add promises
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