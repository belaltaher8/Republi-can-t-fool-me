


document.addEventListener('DOMContentLoaded', function() {

	var submitButton = document.getElementById('submitButton');

	submitButton.addEventListener('click', function(){


		var url = document.getElementById('urlBox').value;

		var xhr = new XMLHttpRequest(); 

		xhr.open("POST", "https://murmuring-basin-19452.herokuapp.com/classify", true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); 

		xhr.onload = function (e) { 
			if (xhr.readyState === 4) { 
				if (xhr.status === 200) { 
				var respJSON = JSON.parse(xhr.responseText); 
					console.log(respJSON["Answer"]);
					if(respJSON["Answer"] < 0.4){
						document.getElementById("result").innerHTML = "Republican";
						document.body.style.background = "rgba(255,0,0,0.7)";
					}
					else if(respJSON["Answer"] > 0.6 && respJSON["Answer"] < 1){
						document.getElementById("result").innerHTML = "Democrat";
						document.body.style.backgroundColor = "rgba(0,0,255,0.7)";

					}
					else if(respJSON["Answer"] <= 0.6 && respJSON["Answer"] >= 0.4){
						document.getElementById("result").innerHTML = "Neutral";
						document.body.style.backgroundColor = "rgba(0,0,0,0.7)";
					}
					else{
						document.getElementById("result").innerHTML = "Sorry. Something's wrong with the article!";
					}
				}
				else { 
					document.getElementById("result").innerHTML = "Sorry. Something's wrong with the server!";
				} 
			} 
		}; 

		xhr.onerror = function (e) { 
			console.error(xhr.statusText); 
		}; 

		var myDict = {myUrl : url};
		
		xhr.send(JSON.stringify(myDict));
	});

});
