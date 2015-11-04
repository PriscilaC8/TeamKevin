// Given a string of text, returns a list of sentences contained in the text.
function getSentences(text) {
    var re = /[\.?!]\s+[A-Z](?!\.)(?=[a-z0-9A-Z\s\W]*[\.?!])/g;
    var myArray;
    var sentenceList = [];
    var lastIndex = -1;
    while ((myArray = re.exec(text)) !== null) {
        var punct = myArray.index;                                              // index of punctuation
        sentenceList.push(text.substring(Math.max(0,lastIndex-1), punct+1))     // add sentence to list
        lastIndex = re.lastIndex;                                               // update last index accounted for
    }
    if (re.lastIndex != -1) {
        sentenceList.push(text.substring(punct+1, text.length));                // add last sentence
    }
    return sentenceList;
}

// Returns true if sentence contains a question mark
function isQuestion(sentence) {
    var re = /[?]/;
    return sentence.match(re) != null;
}

// Given a list of text sentences, returns a string with sentences separated by <br> tags.
function getSentenceHTML(sentenceList) {
    var html = '';
    while (sentenceList.length > 0) {
        var currentSentence = sentenceList.shift();
        if (isQuestion(currentSentence)) {
            html += '<span class="question">';
            html += currentSentence;
            html += '</span>'
        } else {
            html += currentSentence;
        }
        html += '<br>';
    }
    return html;
}

$(document).ready(function() {
    $('#reformat_button').click(function() {
        var rawText = $('#raw_text').val();
        var sentenceList = getSentences(rawText);
        var sentenceHTML = getSentenceHTML(sentenceList);
        $('#reformatted_text').html(sentenceHTML);
    });
    
    // Initialize editor with custom theme and modules
    var fullEditor = new Quill('#full-editor', {
      modules: {
        'authorship': { authorId: 'galadriel', enabled: true },
        'multi-cursor': true,
        'toolbar': { container: '#full-toolbar' },
        'link-tooltip': true
      },
      theme: 'snow'
    });

    // Add basic editor's author
    var authorship = fullEditor.getModule('authorship');
    authorship.addAuthor('gandalf', 'rgba(255,153,51,0.4)');

    // Add a cursor to represent basic editor's cursor
    var cursorManager = fullEditor.getModule('multi-cursor');
    cursorManager.setCursor('gandalf', fullEditor.getLength()-1, 'Gandalf', 'rgba(255,153,51,0.9)');

    // Sync basic editor's cursor location
    basicEditor.on('selection-change', function(range) {
      if (range) {
        cursorManager.moveCursor('gandalf', range.end);
      }
    });

    // Update basic editor's content with ours
    fullEditor.on('text-change', function(delta, source) {
      if (source === 'user') {
        basicEditor.updateContents(delta);
      }
    });

    // basicEditor needs authorship module to accept changes from fullEditor's authorship module
    basicEditor.addModule('authorship', {
      authorId: 'gandalf',
      color: 'rgba(255,153,51,0.4)'
    });

    // Update our content with basic editor's
    basicEditor.on('text-change', function(delta, source) {
      if (source === 'user') {
        fullEditor.updateContents(delta);
      }
    });
});
