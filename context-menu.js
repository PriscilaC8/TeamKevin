chrome.browserAction.onClicked.addListener(function(tab) {
    var newURL = "http://www.youtube.com/watch?v=oHg5SJYRHA0";
    chrome.tabs.create({ url: newURL });
});

chrome.runtime.onInstalled.addListener(function(){
	id = chrome.contextMenus.create({
		"title": "View in Lightbox", 
		"contexts":["page"],
		"id"= "viewInPopup"
	});
});

function contextClicked(info, tab){
	if (info.menuItemId == "viewInPopup"){
		chrome.tabs.query({
			active: true,
			currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {"action" : "startPopup"});
});
	}
}

chrome.contextMenus.onClicked.addListener(contextClicked);

