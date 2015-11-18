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

  $('.linespacing_percentage').on("input", function(){
    console.log("HIII");
    $('.editor-container').css('line-height', $(this).val()*100+'%');
  });

  $('.quetion_btn').on("input", function(){
    $('.question').color("black");
  });

  $('#settings_header').click(function(){
    $('#settings_panel').hide("slide", {direction: "right"}, 500, function(){
      $('.settings_button').show();
    });
  });

  $('.settings_button').click(function(){
    $(this).hide();
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
