
$(document).ready(function() {
    $('.collapsible').collapsible();
    //initialize variables
    var address = localStorage.getItem("address");
    var city = localStorage.getItem("city");
    var state = localStorage.getItem("state");
    var zip = localStorage.getItem("zip");
    var name = localStorage.getItem("name");
    var latitude;
    var longitude;
    var MeetUpCategories = ["sports-fitness", "arts-culture", "beliefs", "book-clubs", "career-business", "dancing", "parents-family", "fashion-beauty", "film", "food", "health-wellness", "hobbies-crafts", "lgbtq", "language", "education", "movements", "music", "outdoors-adventure", "pets", "photography", "games-sci-fi", "social", "tech", "writing"];
    var exploreCategories = ["restaurants", "museums", "movies", "coffee", "fun", "nightlife", "shopping", "hiking", "sports", "outdoors", "gyms"];
    var jobCategories = ["developer", "marketing", "designer", "sales", "systems+analyst", "business+analyst", "systems+engineer", "ERP"];
    var radius = 25;


    //NL Run google geocode API to retrieve latitude and longitude from user's address

    var geoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + ",+" + city + ",+" + state + "&key=AIzaSyDB3dL-UoNQrilY--0ze7PI_s4bKmnwQZQ";
    console.log(geoCodeURL);

    $.ajax({
        url: geoCodeURL,
        method: 'GET'
    }).done(function (response) {
        console.log(response);
        latitude = response.results[0].geometry.location.lat;
        longitude = response.results[0].geometry.location.lng;

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
        url: "http://api.wunderground.com/api/b2f01d8788315282/geolookup/conditions/q/" + state + "/" + city + ".json",
        dataType: "jsonp"
    })
        .done(function (response) {
            console.log('response: ', response);
            var location = response.location.city;
            console.log('location: ', location);
            var temp_f = response.current_observation.temp_f;
            console.log('temp_f: ', temp_f);


            //make var name=   ; - after grabbing info from the form
            $("#addWeather").append(name);
            $("#addWeather").append("<br>");
            $("#addWeather").append("Current temperature in " + location + " is: " + temp_f + "F");
            console.log("Current temperature in " + location + " is: " + temp_f + "F");
        });


    var insertRecommendationsHere = $("#insertRecommendationsHere")

    $('.meetup').click(function () {
        $("#insertRecommendationsHere").empty()
        var getCategory = $(this).text();

        var meetupURL = "https://api.meetup.com/find/events?&sign=true&photo-host=public&lon=" + longitude + "&text=" + getCategory + "&radius=" + radius + "&lat=" + latitude + "&key=5b3e58166d3244c6e6073631c276059";

        console.log(meetupURL);
        $.ajax({
            url: meetupURL,
            method: 'GET',
            dataType: "jsonp"
        }).done(function (response) {
            console.log(response);
        });


    });

    $(".explore").on("click", function () {
        var getCategory = $(this).text();
        var fourSquareKEY = "KY3TA5KDHJ2GSHB33L24MFU53CL2POJKG1MTTXQGB12BVVQP";
        var fourSquareSecret = "21VI4B3WJIDL2MHIW2EB5IJOQGTGHQK4PQGNRML4RCAZDQZZ";
        var fourSquareURL = "https://api.foursquare.com/v2/venues/explore?ll=" + latitude + "," + longitude +"&radius=10000&client_id=" + fourSquareKEY + "&client_secret=" + fourSquareSecret + "&v=20171015&intent=browse&limit=15&query=" + getCategory;

        $.ajax({
            url: fourSquareURL,
            method: "GET",
            dataType: "jsonp"
        }).done(function (data) {
            console.log("Data", data);
            var items = data.response.groups[0].items;
            console.log(items);
            var venue = items.venue;

            for(var i = 0; i < items.length; i++) {
                //JSON.parse(JSON.stringify(venues[i]));

                var addLi = $("<li>");
                var addHeader = $("<div>");
                var addBody = $("<div>");
                addHeader.addClass("collapsible-header");
                addBody.addClass("collapsible-body");
                //addLi.addClass("cyan darken-2")
                addLi.css("text-align", "center");
                addLi.css("padding", "5px");
                //addLi.css("width", "75%");
                addLi.css("display", "block");

                $("#title").append(addLi);
                addLi.append(addHeader);
                addLi.append(addBody);

                $(addLi).prepend("<h5>" + items[i]["venue"].name + "</h5>");

                //$(addBody).append("<a>" + items[i]["venue"].categories[0].icon.prefix.suffix + "</a>");

                $(addBody).append("<h6>" + "Twitter: " + items[i]["venue"].contact.twitter + "</h6>");

                $(addBody).append("<h6>" + "Contact: " + items[i]["venue"].contact.formattedPhone + "</h6>");

                $(addBody).append("<h6>" + items[i]["venue"].location.address + "</h6>");

                $(addBody).append("<h6>" + items[i]["venue"].hours.status + "</h6>");

                $(addBody).append("<h6>" + "Price: " + items[i]["venue"].price.message + "</h6>");

                $(addBody).append("<a>" + items[i]["venue"].url + "</a>");

            }

        });

    });

    $('.findJob').click(function () {
        //put find job api here.
        $("#insertRecommendationsHere").empty()
        var getCategory = $(this).text();

        var DiceURL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=" + getCategory + "&city=" + zip;

        console.log(DiceURL);
        $.ajax({
            url: DiceURL,
            method: 'GET'
        }).done(function (response) {
            console.log(response);

            var addTable = $("<table>");
            addTable.addClass("highlight striped");

            addTable.append("<thead> <tr>" +
                "<th>" + "Job" +
                "<th>" + "Company" +
                "<th>" + "Location" +
                "<th>" + "Posted Date" +
                "<th>" + "Apply"
            )
            addTable.append("<tbody>");
            $("#insertRecommendationsHere").append(addTable);


            for (i = 0; i < 10; i++) {
                var results = response.resultItemList[i];
                var url = results.detailUrl;
                url = '"' + url + '"'
                var jobTitle = results.jobTitle;
                var location = results.location;
                var company = results.company;
                var postedDate = results.date;


                addTable.append(
                    "<tr>" +
                    "<td>" + jobTitle +
                    "<td>" + company +
                    "<td>" + location +
                    "<td>" + postedDate +
                    "<td><a href=" + url + ">Apply!</a>"
                );

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







})



