$(document).ready(function(){
  var advancedEditor, authorship, cursorManager, _;

  _ = Quill.require('lodash');

  advancedEditor = new Quill('.advanced-wrapper .editor-container', {
    modules: {
      'authorship': {
        authorId: 'advanced',
        enabled: true
      },
      'toolbar': {
        container: '.advanced-wrapper .toolbar-container'
      },
      'link-tooltip': true,
      'image-tooltip': true,
    },
    styles: false,
    theme: 'snow'
  });

  $('.editor-container').css('line-height', $('.linespacing_percentage').val()*100+"%");

  $('#line-spacing-selector').change(function(){
      $('.editor-container').css('line-height', $('#line-spacing-selector').val());
  });

  $('.question_btn').on("input", function(){
    $('.question').color("black");
  });

  $('#settings_header').click(function(){
    $('#settings_panel').hide("slide", {direction: "right"}, 500, function(){
        $('#easymail_main').addClass('fullscreen');
        $('.settings_button').show();
    });
  });

  $('.settings_button').click(function(){
    $(this).hide();
    $('#easymail_main').removeClass('fullscreen')
    $('#settings_panel').show("slide", {direction: "right"}, 500);
  });

    
  $('#reformat_button').click(function() {
      var rawText = advancedEditor.getHTML();
      console.log(rawText);
      if(rawText.indexOf('class="question"') == -1)
      {
        var sentenceList = getSentences(rawText);
        var sentenceHTML = getSentenceHTML(sentenceList);
        advancedEditor.setHTML(sentenceHTML);
      }        
  });
    
  $('#clear').click(function() {
    advancedEditor.setHTML("");
  })
})

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

//// CURRENTLY NOT WORKING
//function getSentences2(sentenceList) {
//    var newSentenceList = [];
//    for (i = 0; i < sentenceList.length; i++) {    
//        oldSentence = sentenceList[i];
//        sentences = oldSentence.split(/<div>/g);
//        for (j = 0; j < sentences.length; j++) {
//            sentences[j] = '<div>' + sentences[j];
//        }
//        newSentenceList = newSentenceList.concat(sentences);
//    }
//    return newSentenceList;
//}

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