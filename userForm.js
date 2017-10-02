$(document).ready(function() {
    $('.slider').slider();

    var config = {
        apiKey: "AIzaSyCDcC5j0NdM18LWvAaBkkHSQwVtWwYU_-g",
        authDomain: "new-kid-on-the-block-3ba2b.firebaseapp.com",
        databaseURL: "https://new-kid-on-the-block-3ba2b.firebaseio.com",
        projectId: "new-kid-on-the-block-3ba2b",
        storageBucket: "new-kid-on-the-block-3ba2b.appspot.com",
        messagingSenderId: "216603995189"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var clickCounter = 0;


    $("#letsGo").on("click", function (event) {
        //add buttons for each category in MeetUpCategories

        event.preventDefault();
        //when user clicks submit, save values. Month is optional, so only save if value is not null.
        var name = $("#name-input").val().trim();
        localStorage.setItem("name", name);

        var address = $("#address-input").val().trim();
        address = address.split(' ').join('+');
        localStorage.setItem("address", address);

        var city = $("#city-input").val().trim();
        city.split(' ').join('+');
        localStorage.setItem("city", city);

        var state = $("#state-input").val().trim();
        localStorage.setItem("state", state);

        var zip = $("#zip-input").val().trim();
        localStorage.setItem("zip", zip);


        var newEntry = {
            name: name,
            city: city
        };

        database.ref().push(newEntry);
        console.log(newEntry.name);
        console.log(newEntry.city);

        //redirect to homepage.
        window.location.replace("home.html");
    })
});
