window.onload = function(){
	getAllPlanets();
};
$('body').on('click', 'table>tbody>tr', function(evt){
	var id = $(this).attr('id').toLowerCase();
	getPlanet(id);
 
 	evt.stopPropagation();
	evt.preventDefault();
	$('.add-info').not($('.'+id)).hide();
	$('.'+id).toggle();
	var query = "/planet/"+id;
	history.pushState(null, null, query);
});

window.addEventListener('popstate', function(e) {
	var end = location.pathname.length,
    	query = location.pathname.substring(1, end).substring(7, end);
		getPlanet(query)
		$('.add-info').hide();
		$('.'+query).toggle();
});

function getAllPlanets(){
	$.ajax({
		dataType: "JSONP",
		type: "get",
		url: 'http://localhost:3000/getallplanets',
		callback:'',
		error : function() {
			console.log('Error');
		},
		success : function(data) {
			data = $.parseJSON(JSON.stringify(data));
			console.log(data);
			$('body').append("<table id = \"info\"> <tbody></tbody></table>");
			$.each(data, function(i,val){
				var str = '<tr id = \''+ data[i].toLowerCase() +'\'><td>' + data[i] + '<div class = "add-info '+ data[i].toLowerCase() +'"></div></td></tr>';
				$('tbody').append(str);
			})
		}
	})
}

function getPlanet(q){
	$.ajax({
		dataType: "JSONP",
		type: "get",
		url: 'http://localhost:3000/getplanet/'+q,
		callback:'',
		error : function() {
			console.log('Error');
		},
		success : function(data) {
			console.log(data);	
			var compiled = dust.compile("{add_info}", "outro");
			dust.loadSource(compiled);
			dust.render("outro", data, function(err, out) {
				$('.'+q).empty();
			  	$('.'+q).append(out);
			});
			console.log( $('#'+q));
		}
	})
}