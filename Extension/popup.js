

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
				document.getElementById("result").innerHTML = respJSON["Answer"];
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
