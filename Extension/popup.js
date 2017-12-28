


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
					if(respJSON["Answer"] < 0.5){
						document.getElementById("result").innerHTML = "Republican";
						document.body.style.backgroundColor = "red";
					}
					else if(respJSON["Answer"] <= 1){
						document.getElementById("result").innerHTML = "Democrat";
						document.body.style.backgroundColor = "blue";
					}
					else{
						document.getElementById("result").innerHTML = "Sorry. Something went wrong.";
					}
				}
				else { 
				//console.error(xhr.statusText); 
				//handle error status 
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
