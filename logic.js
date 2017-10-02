


//initialize variables
var address = localStorage.getItem("address");
var city = localStorage.getItem("city");
var state = localStorage.getItem("state");
var zip = localStorage.getItem("zip");
var name = localStorage.getItem("name");
var latitude;
var longitude;
var MeetUpCategories = ["sports-fitness","arts-culture","beliefs","book-clubs","career-business","dancing","parents-family","fashion-beauty","film","food","health-wellness","hobbies-crafts","lgbtq","language","education","movements","music","outdoors-adventure","pets","photography","games-sci-fi","social","tech","writing"];
var exploreCategories = ["restaurants","museums","movies","coffee","fun","nightlife","shopping","hiking","sports","outdoors","gyms"];
var jobCategories = ["developer","marketing","designer","sales","systems+analyst","business+analyst","systems+engineer","ERP"];
var radius = 25;



//NL Run google geocode API to retrieve latitude and longitude from user's address

var geoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + ",+" + city + ",+" + state + "&key=AIzaSyDB3dL-UoNQrilY--0ze7PI_s4bKmnwQZQ";
console.log(geoCodeURL);

$.ajax({
    url: geoCodeURL,
    method: 'GET'
}).done(function(response) {
    console.log(response);
    latitude = response.results[0].geometry.location.lat ;
    longitude = response.results[0].geometry.location.lng ;

    console.log(latitude);
    console.log(longitude);
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);
});

latitude = localStorage.getItem("latitude");
longitude = localStorage.getItem("longitude");


//NL Populate Drop Down menus with categories

for (i = 0; i < MeetUpCategories.length; i++) {

    var newItem = $("<li>");
    newItem.addClass("meetup");
    newItem.attr("value", MeetUpCategories[i]);
    newItem.html("<a href= '#!'>" + MeetUpCategories[i] + "</a>");
    $("#meetUpDropDown").append(newItem);

}


for (i = 0; i < exploreCategories.length; i++) {

    var newItem = $("<li>");
    newItem.addClass("explore");
    newItem.html("<a href= '#!'>" + exploreCategories[i] + "</a>");
    $("#ExploreDropDown").append(newItem);

}

for (i = 0; i < jobCategories.length; i++) {

    var newItem = $("<li>");
    var job = jobCategories[i];
    job = job.split('+').join(' ');
    newItem.addClass("findJob");
    newItem.html("<a href= '#!'>" + job + "</a>");
    $("#jobDropDown").append(newItem);

}
//End drop down menu categories

//EP - Weather Underground API
$.ajax({
    url : "http://api.wunderground.com/api/b2f01d8788315282/geolookup/conditions/q/" + state + "/" + city +".json",
    dataType : "jsonp"
})
    .done(function(response){
        console.log('response: ', response);
        var location = response.location.city;
        console.log('location: ', location);
        var temp_f = response.current_observation.temp_f;
        console.log('temp_f: ', temp_f);


        //make var name=   ; - after grabbing info from the form
        $("#addWeather").append(name);
        $("#addWeather").append("<br>");
        $("#addWeather").append("Current temperature in " + location + " is: " + temp_f +  "F");
        console.log ("Current temperature in " + location + " is: " + temp_f +  "F");
    });


var insertRecommendationsHere = $("#insertRecommendationsHere")

$('.meetup').click(function(){
    var getCategory = $(this).text();

    var meetupURL ="https://api.meetup.com/find/events?&sign=true&photo-host=public&lon=" + longitude + "&text="+ getCategory + "&radius=" + radius + "&lat=" + latitude + "&key=5b3e58166d3244c6e6073631c276059";

    console.log(meetupURL);
    $.ajax({
        url: meetupURL,
        method: 'GET',
        dataType: "jsonp"
    }).done(function(response) {
        console.log(response);
    });


});

$('.explore').click(function(){
//put foursquare api here

    var getCategory = $(this).text();



});
$('.findJob').click(function(){
//put find job api here.
    var getCategory = $(this).text();

    var DiceURL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=" + getCategory + "&city=" + zip ;

    console.log(DiceURL);
    $.ajax({
        url: DiceURL,
        method: 'GET'
    }).done(function(response) {
        console.log(response);


        for (i = 0; i < 10; i++) {
            var results = response.resultItemList[i];
            var url = results.detailUrl;
            var jobTitle = results.jobTitle;
            var location = results.location;
            var company = results.company;
            var postedDate = results.date;

            console.log(url);
            console.log(jobTitle);
            console.log(location);
            console.log(company);
            console.log(postedDate);


            var addHeader = $("<div>");
            var addBody = $("<div>");
            var addLi = $("<li>");
            addHeader.addClass("collapsible-header");
            addBody.addClass("collapsible-body");
            addHeader.text(jobTitle + " - " + location);

             addBody.text("Company: " + company + "&crarr;" + url + "<br> <br /> <br/> </br> Posted:" + postedDate);

            addBody.append(text(url));
            addLi.append(addHeader);
            addLi.append(addBody);

            $("#insertRecommendationsHere").append(addLi);
        }
    })
});




//EP - Flickr APIJ
// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://api.flickr.photos.geo.photosForLocation?api_key=01a6250734c101cde5b535ddafdb34f2&format=json&nojsoncallback=1&text=Atlanta&lat=33.7490&lon=84.3880",
//     "method": "GET",
//     "headers": {}
// }
//
// //    "url": "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=01a6250734c101cde5b535ddafdb34f2&format=json&nojsoncallback=1&text=Atlanta&lat=33.7490&lon=84.3880",
//
// // gallery_id=66911286-72157647277042064&
// //EP - flickr API
// $.ajax(settings).done(function (data) {
//     console.log(data);
//
//     $("#galleryTitle").append(data.photos.photo[0].title + " Gallery");
//     $.each( data.photos.photo, function( i, gp ) {
//
//         var farmId = gp.farm;
//         var serverId = gp.server;
//         var id = gp.id;
//         var secret = gp.secret;
//
//         console.log(farmId + ", " + serverId + ", " + id + ", " + secret);
//
// //  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
//
//         $("#flickr").append('<img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg"/>');
//
//     });
// });



//NL - initialize variables and save input from userform










//CA FourSquare API

// var fourSquareKEY = "KY3TA5KDHJ2GSHB33L24MFU53CL2POJKG1MTTXQGB12BVVQP";
// var fourSquareSecret = "21VI4B3WJIDL2MHIW2EB5IJOQGTGHQK4PQGNRML4RCAZDQZZ";
// var fourSquareURL = "https://api.foursquare.com/v2/venues/search?near=New_York_City&client_id=" + fourSquareKEY+ "&client_secret=" + fourSquareSecret+ "&v=20171015&intent=browse&query=" ;
//
// $.ajax({
//     url: fourSquareURL,
//     method: "GET",
//     dataType: "jsonp"
// }).done(function (response) {
//     console.log(response);
// });






