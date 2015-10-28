chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (request.action == "startPopup"){
		background = document.createElement('div');
		background.id = "popup_background";

		popup = document.createElement('div');
		popup.id = "popup"
		popup.innerHTML = "<textarea></textarea>"

		document.body.appendChild(popup);
		closeScripturePopup = function() {
			lb = document.getElementById('popup_background');
			lb.parentNode.removeChild(lb);
		}

		button = document.createElement('button');
		button.onclick = closeScripturePopup;
		button.textContent = 'Close';
		popup.appendChild(button);

		sendResponse({farewell: "goodbye"});
	}
})