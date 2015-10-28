/*chrome.browserAction.onClicked.addListener(function (tab){
	//alert('icon clicked');
	console.log("Hello");
	var textarea = document.createElement("textarea");
	$(textarea).wysiwygEditor();
});

$(document).ready(function(){
	console.log("WHAT");
	$('#textEditor').wysiwygEditor();
})*/

// Given a string of text, returns a list of sentences contained in the text.
function getSentences(text) {
    var re = /[\.?!]\s+[A-Z](?!\.)(?=[a-z0-9A-Z\s\W]*[\.?!])/g;
    var myArray;
    var sentenceList = [];
    var lastIndex = 0;
    while ((myArray = re.exec(text)) !== null) {
        var punct = myArray.index;                                              // index of punctuation
        sentenceList.push(text.substring(Math.max(0,lastIndex-1), punct+1))     // add sentence to list
        lastIndex = re.lastIndex;                                               // update last index accounted for
    }
    return sentenceList;
}
