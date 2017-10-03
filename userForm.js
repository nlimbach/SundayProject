$(document).ready(function() {
    $('.slider').slider();


    $("#form").validate({
        rules: {
            fname: "required",
            city: "required",
            address: "required",
            state: {
                required: true,
                minlength: 2
            },
            zip: {
                required: true,
                minlength: 5
            },

            messages: {
                fname: "Please enter your first name",
                city: "Please enter your city",
                address: "Please enter your address",
                state: {
                    required: "Please provide your state",
                    minlength: "Your state must be 2 characters"
                },
                zip: {
                    required: "Please provide your zipcode",
                    minlength: "Your zipcode must be 5 digits"
                }
            }
        }

    });



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
            city: city
        }

        database.ref("cities").push(newEntry);



        database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
            // storing the snapshot.val() in a variable for convenience
            var sv = snapshot.val();

            var getCity = sv.city;

            if(getCity === city){
                clickCounter++;

            }






            // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });


        localStorage.setItem("TotalCount", clickCounter);
        console.log(clickCounter);
        //redirect to homepage.
        window.location.replace("home.html");

    })

})