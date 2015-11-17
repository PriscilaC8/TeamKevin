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
