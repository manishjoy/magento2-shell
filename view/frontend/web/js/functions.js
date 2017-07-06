require(["jquery"], function ($) {
	$("input[name=path]").keyup(function(){
		$("#path").text($(this).val());
	});

	$("select[name=command]").change(function(){
		console.log($(this).val());
		$("#command-display").text('php ' + $(this).val());
	});
	$("#reload-btn").click(function(){
		// $("#alert-success").html($(".cloner").html());
		location.reload();
	});
	$("#use-path").click(function(e){
		e.preventDefault();
		$("input[name=path]").val($(this).attr('val'));
		$("#path").text($(this).attr('val'));
	});
});