// EP - start image scroll
$(document).ready(function() {
    $('.slider').slider();


var address = localStorage.getItem("address");
var city = localStorage.getItem("city");
var state = localStorage.getItem("state");
var zip = localStorage.getItem("zip");
var month = localStorage.getItem("month");

console.log(address);
console.log(city);

    var geoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + ",+" + city + ",+" + state + "&key=AIzaSyDB3dL-UoNQrilY--0ze7PI_s4bKmnwQZQ";
    console.log(geoCodeURL);

    $.ajax({
        url: geoCodeURL,
        method: 'GET'
    }).done(function(response) {
        console.log(response);
    })




    
//NL Populate Drop Down menus with categories
var MeetUpCategories = ["sports-fitness","arts-culture","beliefs","book-clubs","career-business","dancing","parents-family","fashion-beauty","film","food","health-wellness","hobbies-crafts","lgbtq","language","education","movements","music","outdoors-adventure","pets","photography","games-sci-fi","social","tech","writing"];
var exploreCategories = ["restaurants","museums","movies","coffee","fun","nightlife","shopping","hiking","sports","outdoors","gyms"];
var jobCategories = ["developer","marketing","designer","sales","systems+analyst","business+analyst","systems+engineer","ERP"];
var radius = 25;
var latitude;
var longitude;

for (i = 0; i < MeetUpCategories.length; i++) {

    var newItem = $("<li>");
    newItem.html("<a href= '#!'>" + MeetUpCategories[i] + "</a>");
    $("#meetUpDropDown").append(newItem);

}


for (i = 0; i < exploreCategories.length; i++) {

    var newItem = $("<li>");
    newItem.html("<a href= '#!'>" + exploreCategories[i] + "</a>");
    $("#ExploreDropDown").append(newItem);

}

for (i = 0; i < jobCategories.length; i++) {

    var newItem = $("<li>");
    newItem.html("<a href= '#!'>" + jobCategories[i] + "</a>");
    $("#jobDropDown").append(newItem);

}

//EP - Weather Underground API
// jQuery(document).ready(function($) {
//     $.ajax({
//         url : "http://api.wunderground.com/api/b2f01d8788315282/geolookup/conditions/q/PA/Sewickley.json",
//         dataType : "jsonp",
//         success : function(parsed_json) {
//             var location = parsed_json['location']['city'];
//             var temp_f = parsed_json['current_observation']['temp_f'];
//             $(".weather").html("Current temperature in " + location + " is: " + temp_f +  "F");
//
//         }
//     });
// });

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


});


function callMeetup(address, city, state) {



    //use google developer API to retreive latitude and longitude coordinates from address input to use to prompt meetup
//"https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDB3dL-UoNQrilY--0ze7PI_s4bKmnwQZQ";




    //         var meetupURL ="https://api.meetup.com/find/events?&sign=true&photo-host=public&lon=" + longitude + "&text="+ category + "&radius=" + radius + "&lat=" + latitude + "&key=5b3e58166d3244c6e6073631c276059";
    //         console.log(meetupURL);
    //         $.ajax({
    //             url: meetupURL,
    //             method: 'GET',
    //             dataType: "jsonp"
    //         }).done(function(response) {
    //              console.log(response);
    //         });
    // });
    //  })
    //

}

