var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var listOfUrls = [];

//Republican training set
listOfUrls[0] = ''; // bad data removed this
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
listOfUrls[22] = 'http://www.foxnews.com/opinion/2017/08/14/trump-is-our-president-and-washington-still-cant-wrap-its-mind-around-that-fact.html';
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

listOfUrls[103] = 'http://www.msnbc.com/rachel-maddow-show/trump-keeps-taking-credit-obama-era-economic-news';
listOfUrls[104] = 'http://www.msnbc.com/rachel-maddow-show/trump-admin-tax-cuts-the-wealthy-will-pay-themselves';
listOfUrls[105] = 'http://www.msnbc.com/rachel-maddow-show/the-problem-trumps-massive-corporate-tax-cut';
listOfUrls[106] = 'http://www.msnbc.com/rachel-maddow-show/trumps-latest-jobs-boast-falls-apart-almost-immediately';
listOfUrls[107] = 'http://www.msnbc.com/rachel-maddow-show/trumps-boasts-about-jobs-saved-carrier-start-evaporate';
listOfUrls[108] = 'http://www.msnbc.com/rachel-maddow-show/trumps-brand-populism-goes-out-its-way-help-wall-street';
listOfUrls[109] = 'http://www.msnbc.com/rachel-maddow-show/tax-reform-deck-gop-unprepared-its-next-big-fight';
listOfUrls[110] = 'http://www.msnbc.com/rachel-maddow-show/trumps-policy-illiteracy-includes-the-basics-economic-data';
listOfUrls[111] = 'http://www.msnbc.com/rachel-maddow-show/touting-job-numbers-rnc-forgets-what-unprecedented-means';
listOfUrls[112] = 'http://www.msnbc.com/rachel-maddow-show/the-fatal-flaw-trumps-vision-improving-race-relations';
listOfUrls[113] = 'http://www.msnbc.com/rachel-maddow-show/trump-finding-new-ways-bungle-the-tax-reform-fight';
listOfUrls[114] = 'http://www.msnbc.com/rachel-maddow-show/trumps-economic-illiteracy-isnt-getting-any-better';
listOfUrls[115] = 'http://www.msnbc.com/rachel-maddow-show/trumps-case-tax-reform-rests-false-foundation';
listOfUrls[116] = 'http://www.msnbc.com/rachel-maddow-show/the-most-outrageous-donald-trumps-bogus-employment-statistics';
listOfUrls[117] = 'http://www.msnbc.com/rachel-maddow-show/republicans-dont-want-talk-about-their-health-plans-tax-cuts';
listOfUrls[118] = 'http://www.msnbc.com/rachel-maddow-show/white-house-job-totals-were-phony-theyre-very-real-now';
listOfUrls[119] = 'http://www.msnbc.com/rachel-maddow-show/obtained-tax-documents-shed-new-light-donald-trumps-finances';
listOfUrls[120] = 'http://www.msnbc.com/rachel-maddow-show/republicans-shouldnt-count-the-economy-bolster-trump';
listOfUrls[121] = 'http://www.msnbc.com/rachel-maddow-show/the-wake-failure-republicans-eager-push-tax-cuts';
listOfUrls[122] = 'http://www.msnbc.com/rachel-maddow-show/trump-bans-transgender-americans-military-service';
listOfUrls[123] = 'http://www.msnbc.com/rachel-maddow-show/white-house-struggles-defend-trumps-ban-transgender-troops';
listOfUrls[124] = 'http://www.msnbc.com/rachel-maddow-show/trump-announces-support-plan-cut-legal-immigration-too';
listOfUrls[125] = 'http://www.msnbc.com/rachel-maddow-show/donald-trump-cant-stop-failing-tests-moral-leadership';
listOfUrls[126] = 'http://www.msnbc.com/rachel-maddow-show/gop-senator-racist-groups-think-they-have-friend-trump';
listOfUrls[127] = 'http://www.msnbc.com/rachel-maddow-show/the-awkward-timing-the-rncs-african-american-outreach-efforts';
listOfUrls[128] = 'http://www.msnbc.com/rachel-maddow-show/trump-clings-misguided-idea-mexico-will-pay-border-wall';
listOfUrls[129] = 'http://www.msnbc.com/rachel-maddow-show/sessions-trump-admin-has-rescinded-protections-dreamers';
listOfUrls[130] = 'http://www.msnbc.com/rachel-maddow-show/obama-speaks-trump-targets-dreamers';
listOfUrls[131] = 'http://www.msnbc.com/rachel-maddow-show/how-committed-trump-his-plan-punish-dreamers';
listOfUrls[132] = 'http://www.msnbc.com/rachel-maddow-show/some-republicans-ready-use-dreamers-bargaining-chip';
listOfUrls[133] = 'http://www.msnbc.com/rachel-maddow-show/white-house-blames-democrats-trumpcares-collapse';
listOfUrls[134] = 'http://www.msnbc.com/rachel-maddow-show/warren-throws-support-behind-sanders-single-payer-plan';
listOfUrls[135] = 'http://www.msnbc.com/rachel-maddow-show/avoid-shutdown-congress-ignores-trumps-demands';
listOfUrls[136] = 'http://www.msnbc.com/rachel-maddow-show/anti-populist-push-republicans-inadvertently-help-dems';
listOfUrls[137] = 'http://www.msnbc.com/rachel-maddow-show/dems-host-town-hall-meetings-health-care-gop-districts';
listOfUrls[138] = 'http://www.msnbc.com/morning-joe/excerpt-giant-the-senate';
listOfUrls[139] = 'http://www.msnbc.com/rachel-maddow-show/the-underappreciated-detail-about-nancy-pelosis-public-standing';
listOfUrls[140] = 'http://www.msnbc.com/rachel-maddow-show/republicans-see-bipartisan-policymaking-the-worst-case-scenario';
listOfUrls[141] = 'http://www.msnbc.com/msnbc/us-gives-sweeping-guidance-schools-transgender-students';
listOfUrls[142] = 'http://www.msnbc.com/msnbc/trump-defends-misconstrued-attacks-judge';
listOfUrls[143] = 'http://www.msnbc.com/rachel-maddow-show/ties-profit-colleges-trip-several-gop-senators';
listOfUrls[144] = 'http://www.msnbc.com/msnbc/op-ed-education-policy-represents-top-issue-latino-voters';
listOfUrls[145] = 'http://www.msnbc.com/rachel-maddow-show/gop-makes-history-confirming-betsy-devos-education-secretary';
listOfUrls[146] = 'http://www.msnbc.com/rachel-maddow-show/betsy-devos-hasnt-changed-her-mind-about-education';
listOfUrls[147] = 'http://www.msnbc.com/rachel-maddow-show/betsy-devos-struggles-defend-taxpayer-subsidized-discrimination';
listOfUrls[148] = 'http://www.msnbc.com/rachel-maddow-show/white-house-looking-changing-laws-protect-us-press';
listOfUrls[149] = 'http://www.msnbc.com/rachel-maddow-show/dc-area-shooting-delays-congress-consideration-silencers-bill';
listOfUrls[150] = 'http://www.msnbc.com/rachel-maddow-show/church-politicking-measure-advances-creating-unintended-risks';
listOfUrls[151] = 'http://www.msnbc.com/rachel-maddow-show/the-nras-core-message-takes-turn-towards-culture-war-zealotry';
listOfUrls[152] = 'http://www.msnbc.com/rachel-maddow-show/one-trumps-favorite-pastors-god-backs-attack-north-korea';
listOfUrls[153] = 'http://www.msnbc.com/rachel-maddow-show/trumps-favorite-tabloid-takes-aim-manafort-key-moment';
listOfUrls[154] = 'http://www.msnbc.com/rachel-maddow-show/one-member-trumps-evangelical-advisory-board-has-seen-enough';
listOfUrls[155] = 'http://www.msnbc.com/rachel-maddow-show/trump-has-little-success-turning-public-against-the-free-press';
listOfUrls[156] = 'http://www.msnbc.com/rachel-maddow-show/kobach-finds-time-side-gig-right-wing-website';
listOfUrls[157] = 'http://www.msnbc.com/rachel-maddow-show/identifying-trumps-primary-source-information-gathering';
listOfUrls[158] = 'https://slate.com/business/2017/09/the-new-republican-plan-to-repeal-obamacare-is-even-more-vicious-than-the-old-plan.html';
listOfUrls[159] = 'http://www.slate.com/blogs/the_slatest/2017/09/09/eric_bolling_becomes_latest_fox_news_host_to_leave_amid_sexual_harassment.html';
listOfUrls[160] = 'http://www.slate.com/blogs/the_slatest/2017/09/06/trump_impeachment_chances_facebook_troll_edition.html';
listOfUrls[161] = 'http://www.slate.com/blogs/the_slatest/2017/09/06/rolling_daca_cancellations_will_dog_the_trump_administration.html';
listOfUrls[162] = 'http://www.slate.com/blogs/the_slatest/2017/09/06/hillary_clinton_s_book_unsettles_scores_from_2016.html';
listOfUrls[163] = 'http://www.slate.com/blogs/the_slatest/2017/09/06/trump_lawyer_s_leaked_email_is_funny.html';
listOfUrls[164] = 'http://www.slate.com/blogs/the_slatest/2017/09/05/trump_could_kill_the_iran_deal_by_kicking_it_to_congress.html';
listOfUrls[165] = 'http://www.slate.com/blogs/the_slatest/2017/09/05/can_congress_finally_pass_the_dream_act.html';
listOfUrls[166] = 'http://www.slate.com/blogs/the_slatest/2017/09/05/jeff_sessions_praise_of_1924_eugenics_immigration_law_remains_insane.html';
listOfUrls[167] = 'http://www.slate.com/blogs/the_slatest/2017/09/05/sessions_daca_speech_was_full_of_nativist_lies.html';
listOfUrls[168] = 'http://www.slate.com/blogs/the_slatest/2017/09/05/jeff_sessions_announces_daca_termination.html';
listOfUrls[169] = 'http://www.slate.com/blogs/the_slatest/2017/09/04/trump_likely_to_nix_dreamers_program_give_congress_six_months_to_act.html';
listOfUrls[170] = 'http://www.slate.com/blogs/the_slatest/2017/09/02/trump_gets_a_chance_at_a_harvey_do_over_we_saw_a_lot_of_happiness.html';
listOfUrls[171] = 'http://www.slate.com/blogs/the_slatest/2017/09/02/justice_department_confirms_there_s_no_evidence_obama_wiretapped_trump_tower.html';
listOfUrls[172] = 'http://www.slate.com/blogs/the_slatest/2017/09/02/even_trump_s_longtime_bodyguard_keith_schiller_is_leaving_him.html';
listOfUrls[173] = 'http://www.slate.com/blogs/the_slatest/2017/09/01/tennessee_attorney_general_herbert_slatery_urges_trump_to_keep_daca.html';
listOfUrls[174] = 'http://www.slate.com/blogs/the_slatest/2017/08/31/trump_is_sabotaging_obamacare_cuts_ad_budget_by_90_percent.html';
listOfUrls[175] = 'http://www.slate.com/blogs/the_slatest/2017/08/31/trump_impeachment_chances_daca_polling_edition.html';
listOfUrls[176] = 'http://www.slate.com/blogs/the_slatest/2017/08/28/trump_era_continues_to_work_out_just_great_for_iran_nbsp.html';
listOfUrls[177] = 'http://www.slate.com/blogs/the_slatest/2017/08/26/trump_orders_military_to_start_rejecting_transgender_recruits.html';
listOfUrls[178] = 'http://www.slate.com/blogs/the_slatest/2017/08/25/trump_pardons_joe_arpaio_sends_a_message_to_his_anti_immigrant_base.html';
listOfUrls[179] = 'http://www.slate.com/blogs/the_slatest/2017/08/24/trump_impeachment_chances_post_charlottesville_approval_rating_edition.html';
listOfUrls[180] = 'http://www.slate.com/blogs/the_slatest/2017/08/24/will_republicans_break_from_trump_over_wall_funding.html';
listOfUrls[181] = 'http://www.slate.com/blogs/the_slatest/2017/08/24/charlottesville_city_council_appoints_independent_board_to_assess_police.html';
listOfUrls[182] = 'http://www.slate.com/blogs/the_slatest/2017/08/23/trump_administration_is_reportedly_about_to_issue_its_transgender_ban_to.html';
listOfUrls[183] = 'http://www.slate.com/blogs/the_slatest/2017/08/23/congress_surreptitiously_plans_reasonable_bipartisan_health_care_legislation.html';
listOfUrls[184] = 'http://www.slate.com/blogs/the_slatest/2017/08/23/trump_administration_suspends_aid_to_egypt_in_unexpected_move.html';
listOfUrls[185] = 'http://www.slate.com/blogs/the_slatest/2017/08/23/trump_may_still_pardon_joe_arpaio.html';
listOfUrls[186] = 'http://www.slate.com/blogs/the_slatest/2017/08/23/phoenix_police_use_tear_gas_pepper_spray_on_trump_protesters.html';
listOfUrls[187] = 'http://www.slate.com/blogs/the_slatest/2017/08/22/new_poll_shows_most_arizona_voters_don_t_approve_of_trump_presidency.html';
listOfUrls[188] = 'http://www.slate.com/blogs/the_slatest/2017/08/21/trump_impeachment_chances_rinat_akhmetshin_edition.html';
listOfUrls[189] = 'http://www.slate.com/blogs/the_slatest/2017/08/21/bill_o_reilly_thinks_trump_doesn_t_know_about_the_holocaust.html';
listOfUrls[190] = 'http://www.slate.com/blogs/the_slatest/2017/08/20/trump_approval_rating_is_below_40_percent_in_michigan_wisconsin_and_pennsylvania.html';
listOfUrls[191] = 'http://www.slate.com/blogs/the_slatest/2017/08/19/trump_describes_boston_protesters_as_anti_police_agitators_misspells_heal.html';
listOfUrls[192] = 'http://www.slate.com/blogs/the_slatest/2017/08/18/bannon_s_exit_gave_trump_a_perfect_opening_to_distance_himself_from_white.html';
listOfUrls[193] = 'http://www.slate.com/blogs/the_slatest/2017/08/18/bannon_out_bannon_out.html';
listOfUrls[194] = 'http://www.slate.com/blogs/the_slatest/2017/08/16/trump_impeachment_chances_ceo_rebellion_edition.html';


    app.get('/scrape', function(req, res){
        url = listOfUrls[37];

        request(url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
                var article = "";

                var json = { article: ""};


                $("article p").filter(function(){
                    var data = $(this);
                    article = article + " " + data.text();  
                })

                if(article === ""){
                    $("p").filter(function(){
                        data = $(this);
                        article = article + data.text();
                    })    
                }

                json.article = article;
            }


            fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
               console.log('File successfully written! - Check your project directory for the output.json file');
          
            })

        
            res.send('Check your console!')

        });
    })


app.listen('8081') 
console.log('wow i hope this works'); 
exports = module.exports = app;