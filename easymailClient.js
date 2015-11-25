var words = ["Could","Would","Should","Can you","conclusion", "however"];

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

  $('.editor-container').css('letter-spacing', '2px');

  $('#line-spacing-selector').change(function(){
      $('.editor-container').css('line-height', $('#line-spacing-selector').val());
  });

  $('#character-spacing-selector').change(function(){
      $('.editor-container').css('letter-spacing', $('#character-spacing-selector').val());
  });

//  $('.question_btn').on("input", function(){
//    $('.question').color("black");
//  });
    
    $('#questions_color').change(function() {
        $('.question').css('color', $('#questions_color').val());
    })
    
    $('#findall_color').change(function() {
        $('.containsWord').css('color', $('#findall_color').val());
    })

  $('#settings_header').click(function(){
    $('#settings_panel').hide("slide", {direction: "right"}, 500, function(){
        $('#easymail_main').addClass('fullscreen');
        $('.settings_button').show();
        $('.advanced-wrapper').css('width', '50%');
        $('.submit').css('width', '50%');
    });
  });

  $('.settings_button').click(function(){
    $(this).hide();
    $('#easymail_main').removeClass('fullscreen')
    $('#settings_panel').show("slide", {direction: "right"}, 500);
    $('.advanced-wrapper').css('width', '60%');
    $('.submit').css('width', '60%');
  });

  $('#ql-editor-1').keyup(function(){
    if(advancedEditor.getLength() == 1)  //the quill editor doesn't go down to zero characters
    {
      // console.log("Hi");
      $('#reformat_button').removeAttr('disabled');
    }
  });
    
  $('#reformat_button').click(function() {
      $('#reformat_button').attr('disabled','true');
      var rawText = advancedEditor.getHTML();
      if(rawText.indexOf('class="question"') == -1)
      {
        var sentenceList = getSentences(rawText);
        var sentenceHTML = getSentenceHTML(sentenceList);
        advancedEditor.setHTML(sentenceHTML);
      }
      $('.question').css('color', $('#questions_color').val());
      $('.containsWord').css('color', $('#findall_color').val());
  });
    
  $('#clear').click(function() {
    advancedEditor.setHTML("");
    $('#reformat_button').removeAttr('disabled');
  });
    
    $.each(words, function(index, word) {
        $('#find-all-words')
            .append($("<option></option>")
            .attr("value",word)
            .text(word));
    })
    
    $('#add-word').click(function() {
        var word = $('#new-word').val();
        $('#find-all-words')
             .append($("<option></option>")
             .attr("value",word)
             .text(word));
        words.push(word);
        $('#new-word').val('');
    })
    
    $('#delete-word').click(function() {
        $('#find-all-words :selected').each(function(i, selected){ 
            var word = $(this).text();
            var index = words.indexOf(word);
            if (index > -1) {
                words.splice(index, 1);
            }
            $(this).remove();
        });
    })
})

function endsWith(string, substring) {
    if (substring.length <= string.length) {
        return string.substring(string.length-substring.length) == substring;
    }
    return false;
}

// Given a string of text, returns a list of sentences contained in the text.
function getSentences(text) {
    var re = /[\.?!]\s+[A-Z"#$](?!\.)(?=[a-z0-9A-Z\s\W]*[\.?!])/g;
    var myArray;
    var sentenceList = [];
    var lastIndex = -1;
    while ((myArray = re.exec(text)) !== null) {
        var punct = myArray.index;                                              // index of punctuation
        var sentence = text.substring(Math.max(0,lastIndex-1), punct+1);
        if (!(endsWith(sentence, 'Mr.') || endsWith(sentence, 'Mrs.') || endsWith(sentence, 'Ms.'))) {
            sentenceList.push(sentence);                                        // add sentence to list
            lastIndex = re.lastIndex;                                           // update last index accounted for
        }
    }
    if (re.lastIndex != -1) {
        sentenceList.push(text.substring(punct+1, text.length).trim());                // add last sentence
    }
    return sentenceList;
}

// Returns true if sentence contains a question mark
function isQuestion(sentence) {
    var re = /[?]/;
    return sentence.match(re) != null;
}

function findWords(sentence, words) {
    var indexes = [];
    for(i = 0; i<words.length; i++){
        var currentWord = words[i].toLowerCase();
        var sentenceAllLower = sentence.toLowerCase();
        if(sentenceAllLower.indexOf(currentWord) != -1)
        {
            indexes.push([sentenceAllLower.indexOf(currentWord),currentWord.length]);
//            console.log("found one");
        }
    }
    return indexes
}

function sentenceReconstructor(sentence, startIndex, indexes){ //this is the probably overly complicated way to highlight more than one word per sentence.
    var newHtml = '';
    if(indexes.length == 1)
    {
        newHtml += sentence.substring(startIndex, indexes[0][0]);
        newHtml += '<span class="containsWord">';
        newHtml += sentence.substring(indexes[0][0], indexes[0][0]+indexes[0][1])
        newHtml += '</span>';
        newHtml += sentence.substring(indexes[0][0]+indexes[0][1])
        return newHtml;
    } else{
        newHtml += sentence.substring(startIndex, indexes[0][0]);
        newHtml += '<span class="containsWord">';
        newHtml += sentence.substring(indexes[0][0], indexes[0][0]+indexes[0][1])
        newHtml += '</span>';
    }
    return newHtml + sentenceReconstructor(sentence, indexes[0][0]+indexes[0][1], indexes.slice(1));
}


// Given a list of text sentences, returns a string with sentences separated by <br> tags.
function getSentenceHTML(sentenceList) {
    var html = '';
    while (sentenceList.length > 0) {
        var currentSentence = sentenceList.shift();
        var indexes = findWords(currentSentence, words);
        if (isQuestion(currentSentence)) {
            html += '<span class="question">';
            html += currentSentence;
            html += '</span>';
        } else if(indexes.length > 0){
            indexes.sort(function(a,b){
                return a[0] - b[0];
            })
            // console.log(indexes);
            // console.log(sentenceReconstructor(currentSentence, 0, indexes))
            html += sentenceReconstructor(currentSentence, 0, indexes);
        } else {
            html += currentSentence;
        }
        html += '<br>';
    }
    return html;
}