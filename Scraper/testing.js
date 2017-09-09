//Imports
var sw = require('stopword');
var stem = require('stem-porter');

//Articles
var article1 = "\n                                     \n                                Though North Korea’s Kim Jong Un is grabbing headlines, the nuclear weapons evil facing the United States has multiple horns – and available responses. Undoing the harm done by the Iran nuclear deal needs to share the top of the agenda.In mid-October President Trump will bump up against a “certification” deadline imposed by the Iran Nuclear Agreements Review Act. The prompt was intended to ensure a much closer look at Iranian behavior and the Iran nuclear deal known as the “JCPOA.” Instead of sloughing off a threat that makes Hurricane Harvey look like an overflowing bathtub, this oversight duty must be taken far more seriously.Obama’s JCPOA is trumpeted primarily for one alleged achievement: it bought us time. In reality, it did precisely the opposite.  It bought Iran time. Instead of ratcheting up the pressure on Tehran on our terms and our timetable, Americans paid to give Iran time to hone missile delivery systems (Obama omitted from the deal) and get itself to the brink of acquiring a nuclear weapon before the JCPOA’s terrifying hourglass runs out.On August 3, 2017 Iranian President Rouhani said Iran will be able to start enriching uranium to 20% in the Fordo facility in only five days, and reactivate the reactor in Arak because cement was never poured into its core. His remarks were repeated on August 22, 2017 by the head of Iran’s Atomic Energy Organization, Ali Akbar Salehi.The Iran deal was exceptional for one other characteristic: it claims to put vital aspects of U.S. national security in the hands of non-Americans, the UN Security Council, the International Atomic Energy Agency, and our negotiation partners China, France, Germany, Russia, the United Kingdom, the European Union and Iran.After all, President Obama went to the Security Council to adopt the Iran deal formally, and purportedly bind the United States in international law, before he took the deal to Congress. The complex regime for reinstating the sanctions that Obama tore up is intended to put American foreign relations in serious jeopardy should we calculate the necessities of our well-being deviate from the calculations of others.President Trump and Congress need to exercise their constitutional responsibility to move the center of gravity back where it belongs.In August, former U.N. Ambassador John Bolton (and Fox News contributor) publicly provided the administration with options.  In July Senators Cotton, Cruz, Perdue and Rubio called for “a sober accounting of Iran's JCPOA violations as well as the regime's aggressive and destabilizing behavior.” So where is it?A third rubber stamp of what candidate Trump called the “worst deal ever” is indefensible. Outsourcing our national security to the U.N. is not a plan.The IAEA has so far produced six reports on Iran’s implementation of the JCPOA. The agency has been careful to indicate, however, its reports are limited by “the modalities set out in the JCPOA.”Moreover, in late August U.N. Ambassador Haley pointed to “military sites” and “undeclared sites” which the IAEA had not asked to inspect – and to which, therefore, it had not been denied access.  Even IAEA Director General Yukiya Amano said in March that he has no idea how many years it will take to conclude that Iran has no undeclared nuclear material and activities – because “it depends very much on the level of cooperation from Iran.”  As recently as August 29, 2017, Iran’s government spokesman Mohammad Bagher Nobakht unilaterally declared military sites off limits.Step back and recall where Obama left off with “certifying” Iran’s good behavior. In November and December 2015 the IAEA issued its final pre-JCPOA reports and found: \"...the Agency is not in a position to provide credible assurance about the absence of undeclared nuclear material and activities in Iran, and therefore to conclude that all nuclear material in Iran is in peaceful activities.\" Obama responded by simply shutting down any further investigation of Iran’s pre-JCPOA activities.So now, as then, we still don’t know what we don’t know. What we do know is that the IAEA had already specifically itemized, in 2011 and 2015, Iranian “activities that are relevant to the development of a nuclear explosive device…” and “specific to nuclear weapons.”And we also know that the pre-JCPOA certification scam consisted of Iran self-reporting. It reads, for instance: “Iran will provide to the Agency [IAEA] photos…Iran will provide to the Agency videos…Iran will provide to the Agency seven environmental samples…”Moreover, the JCPOA continues to give Iran far more than it does the United States and its allies, since it granted – for the first time – an Iranian right to enrich uranium, and legitimized a regime that had correctly been an international pariah.The windfall that Obama gave the world’s leading state sponsor of terrorism, and close North Korean collaborator, via the JCPOA is a sunk cost.  This Congress and this president have no excuses to continue sailing the American people into a storm from which they will never recover.Anne Bayefsky is director of the Touro Institute on Human Rights and the Holocaust. Follow her on Twitter @AnneBayefsky."
var article2 =  "\n                                     \n                                Let me see if I have this right: President Trump is a rotten, dirty hater for throwing the “Dreamers” to the wolves by ending the program with plenty of time for Congress to find a solution. To judge from the overheated reaction, left, right and Barack Obama agree on this. Color me curious.Once upon a time, we had a government where Congress fulfilled its part in the checks-and-balances system. But gradually, and almost totally on many issues, lawmakers became expert only at ducking and kicking everything to the White House.Because of that bipartisan cowardice, the estimated 800,000 dreamers remained an unresolved issue for many years. Obama said repeatedly he couldn’t solve it, only Congress can write the laws.Then, before the 2012 election, Obama changed his mind and, with a stroke of a pen, stopped deportations. But the “D” in DACA meant deferral, and everybody knew it was temporary and probably unconstitutional.The “D” in DACA meant deferral, and everybody knew it was temporary and probably unconstitutional.Congress, especially Republicans, was furious, and said it was their job.So now Trump, after zigs and zags, calls their bluff. It’s your job, he said, now do it.That’s what they wanted, and it’s how our system is supposed to work. So what’s the problem?To continue reading Michael Goodwin's column in the New York Post, click here.Michael Goodwin is a Fox News contributor and New York Post columnist.";

//Hashmap containing all the bigrams found
var hashmap = {};

addToHashMap(article1);
addToHashMap(article2);

function addToHashMap(articleText){
	var oldSplitList = articleText.split(" ");

	var search_term = '\t';
	var search_term2 = '\n';

	var personalHashMap = {};

	//removes special characters
	for (var i=0; i< oldSplitList.length; i++) {
	    if (oldSplitList[i] === search_term) {
	        oldSplitList.splice(i, 1);
	    }
	    else if (oldSplitList[i] === search_term2) {
	        oldSplitList.splice(i, 1);
	    }
	}

	//Removes stop words
	var newSplitList = sw.removeStopwords(oldSplitList);

	//Stems words
	for(var i = 0; i < newSplitList.length; i++){
		var currentWord = newSplitList[i];
		var newStemmedWord = stem(currentWord);
		newSplitList[i] = newStemmedWord;
	}


	//Creates hashmap of bigrams present in article
	for(var i = 0; i< newSplitList.length-1; i++ ){
		var newBigram = newSplitList[i] + ' ' + newSplitList[i+1];
		if( (newBigram.indexOf("\n") == -1) && (newBigram.indexOf("\t") == -1)){

			if((newBigram in hashmap) && !(newBigram in personalHashMap)){
				hashmap[newBigram] = hashmap[newBigram] + 1;
				personalHashMap[newBigram] = 1;
			}
			else if (!(newBigram in hashmap) && !(newBigram in personalHashMap)){
				hashmap[newBigram] = 1;
				personalHashMap[newBigram] = 1;
			}

		}

	}
}

console.log(hashmap);


