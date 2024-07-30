$(document).ready(function(){
	document.querySelectorAll('[data-bs-toggle="tooltip"]')
	.forEach(tooltip => {
	  new bootstrap.Tooltip(tooltip)
	});
	loadLiveStatus();
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
			// var table = $('<div></div>').addClass('').css("border-collapse", "collapse").css("margin", "3px").attr('id', 'statsTable');
			var th = $( '<tr><th>SNO</th><th>Train No</th><th>From</th><th>To</th><th>Last Location</th><th>SD</th><th>AD</th>' ).appendTo(table);
			// var th = $('<tr><th>SNO</th><th>Train No</th><th>From</th><th>To</th><th>Last Location</th><th>SD</th><th>AD</th>').addClass("divrow nodoubt");
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
						$('<td width="1%">' + sno + '</td>').appendTo(tr);
						$('<td width="7%">' + train_no + '</td>').appendTo(tr);
						$('<td width="10%">' + start + '</td>').appendTo(tr);
						$('<td width="10%">' + to + '</td>').appendTo(tr);
						$('<td width="20%">' + last_stn + '</td>').appendTo(tr);

						// tr = $('<div></div>').addClass("divrow nodoubt");
						// var colnum = $('<div>' + sno + '</div>').addClass("title col-num").appendTo(tr);
						// var col_trainno = $('<div>' + train_no + '</div>').addClass("title col-num").appendTo(tr);
						// var colsrc = $('<div>' + start + '</div>').addClass("title srcdiv").appendTo(tr);
						// var coltgt = $('<div>' + to + '</div>').addClass("title tgtdiv").appendTo(tr);
						// var col_last_stn = $('<div>' + last_stn + '</div>').addClass("title srcdiv").appendTo(tr);

						
						var sd = '';
						var ed = '';
						if("StopsNumber" in data[train_no]["details"]) {
							var no_of_stop = data[train_no]["details"]["StopsNumber"];
							console.log(no_of_stop);
							sd = data[train_no]["routes"][no_of_stop]["DT"];
							ed = data[train_no]["routes"][no_of_stop]["EDT"];
						} else {
							sd = '-';
							ed = '-';
						}
						$('<td width="5%">' + sd + '</td>').appendTo(tr);
						$('<td width="5%">' + ed + '</td>').appendTo(tr);
						// var coltgt = $('<div>' + sd + '</div>').addClass("title tgtdiv").appendTo(tr);
						// var col_last_stn = $('<div>' + ed + '</div>').addClass("title savetitle").appendTo(tr);
						// table.append(tr);
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