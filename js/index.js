$(document).ready(function(){
  getCoords();
}); //end of document.ready

//var notClicked=true;
var skycons = new Skycons({"color": "white"});

function getCoords(){
			$.getJSON('https://ipapi.co/json/', function(data){ // getting coords and location through ipapi
				lon = data.longitude;
				lat = data.latitude;
        city= data.city;
        region= data.region;
        country = data.country;
        $("#city").html(city);
         $("#country").html(region + ' (' + country+')');
        getTemp(lon,lat);
        //console.log('ip-api lon: '+lon + '\nip-api lat: ' + lat);
			}); // end of getJSON
} // end of getCoords

function getTemp(lon,lat){
	api = "https://api.darksky.net/forecast/35d8b01829204e471212aa9e6e2ac48d/"+lat+","+lon;
	$.ajax({
  dataType: "jsonp",
  url: api,
  success: function(data){
    farenheit=Math.round(data.currently.temperature);
    celsius= Math.round((farenheit-32)/1.8);
    $('#temperature').html(celsius+'&deg;C');
    description=data.currently.summary;
    icon=data.currently.icon;
    skycons.add("icon",icon);
    skycons.play();
    $('#weather-des').html(description);
    $("#convert").on("click", convertHandler);
  }
});
}

var notClicked=true;
function convertHandler(){
	if(notClicked){
		$("#temperature").html(farenheit+"&deg;F");
		$("#convert").html("&deg;C");
		notClicked=false;
	}else{
		$('#temperature').html(celsius+"&deg;C");
		$("#convert").html("&deg;F");
		notClicked=true;
	}
}
