$(document).ready(function(){
	document.querySelectorAll('[data-bs-toggle="tooltip"]')
	.forEach(tooltip => {
	  new bootstrap.Tooltip(tooltip)
	});
	var intervalId = window.setInterval(function(){
		// call your function here
		loadLiveStatus();
	  }, 30000);
	
});

function loadLiveStatus(){
	console.log("iam jere");
	$.ajax({
		url: "https://mmts.geektheory.in/config/livetrain.php",
		type: 'GET',
		// data: formData,
		async: false,
		cache: false,
		contentType: false,
		processData: false,
		success: function (data) {
			console.log(data);
			const keys = Object.keys(data);
			var sno = 1;
			var table = $('<table></table>').addClass("sortable table table-striped table-bordered dt-responsive nowrap'").attr("id", "statsTable");
			var th = $( '<tr><th>SNO</th><th>Train No</th><th>From</th><th>To</th><th>Last Location</th>' ).appendTo(table);
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				console.log(key, data[key]);
				var train_no = key;
				if(data[train_no] != null && "details" in  data[train_no] ) {
					var islive = data[train_no]["details"]["islive"];
					console.log(islive);
					
					var last_stn =  data[train_no]["details"]["laststn"];
					var start =  data[train_no]["details"]["startstnname"];
					var to = data[train_no]["details"]["endstnname"];
					console.log(train_no);
					console.log(last_stn);
					
					if(islive == "true") {
						var tr = $( '<tr></tr>' ).appendTo(table);
						$('<td width="10%">' + sno + '</td>').appendTo(tr);
						$('<td width="10%">' + train_no + '</td>').appendTo(tr);
						$('<td width="20%">' + start + '</td>').appendTo(tr);
						$('<td width="20%">' + to + '</td>').appendTo(tr);
						$('<td width="20%">' + last_stn + '</td>').appendTo(tr);
						sno = sno + 1;
					}
				}
			}
			$("#statusTable").html(table);

		}, 
		error:function  (jqXHR, exception) {
			$("#loading").hide();
			var msg = '';
			if (jqXHR.status === 0) {
					msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
					msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
					msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
					msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
					msg = 'Time out error.';
			} else if (exception === 'abort') {
					msg = 'Ajax request aborted.';
			} else {
					msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert("Error in File conversion "+msg);
		}
	});

}
