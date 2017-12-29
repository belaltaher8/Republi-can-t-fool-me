


document.addEventListener('DOMContentLoaded', function() {

	var submitButton = document.getElementById('submitButton');

	submitButton.addEventListener('click', function(){

		document.getElementById("loader").style.visibility = "visible";
		document.getElementById("result").style.visibility = "visible";

		var url = document.getElementById('urlBox').value;

		var xhr = new XMLHttpRequest(); 

		xhr.open("POST", "https://murmuring-basin-19452.herokuapp.com/classify", true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); 

		document.getElementById

		xhr.onload = function (e) { 
			if (xhr.readyState === 4) { 
				if (xhr.status === 200) { 
				var respJSON = JSON.parse(xhr.responseText); 
				document.getElementById("loader").style.visibility = "hidden";
					console.log(respJSON["Answer"]);
					if(respJSON["Answer"] < 0.4){
						document.getElementById("result").innerHTML = "The article has a Republican bias";
						document.body.style.background = "rgba(255,0,0,0.6)";
					}
					else if(respJSON["Answer"] > 0.6 && respJSON["Answer"] < 1){
						document.getElementById("result").innerHTML = "The article has a Democrat bias";
						document.body.style.backgroundColor = "rgba(0,0,255,0.6)";

					}
					else if(respJSON["Answer"] <= 0.6 && respJSON["Answer"] >= 0.4){
						document.getElementById("result").innerHTML = "It doesn't seem like this article has any bias";
						document.body.style.backgroundColor = "rgba(0,0,0,0.6)";
					}
					else{
						document.getElementById("result").innerHTML = "Sorry. Something's wrong with the article!";
					}
				}
				else { 
					document.getElementById("loader").style.visibility = "hidden";
					document.getElementById("result").style.visibility = "hidden";
					document.getElementById("result").innerHTML = "Sorry. Something's wrong with the server!";
				} 
			} 
		}; 

		xhr.onerror = function (e) { 
			document.getElementById("loader").style.visibility = "hidden";
			document.getElementById("result").style.visibility = "hidden";
			console.error(xhr.statusText); 
		}; 

		var myDict = {myUrl : url};
		
		xhr.send(JSON.stringify(myDict));
	});

});
