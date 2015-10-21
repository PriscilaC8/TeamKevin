$('#pythonBtn').click(function(){
	var postdata = "hello";
	JQuery.ajax({
		type: 'POST',
		url: 'brains.py',
		data: postdata,
		success: function(data,status){alert("status:"+status+", data:"+data)},
		dataType:'html'
	});

})