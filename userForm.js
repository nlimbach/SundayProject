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

        //if you comment the next five lines, the validation is different
        ("#name").empty()
        ("#address").empty()
        ("#city").empty()
        ("#state").empty()
        ("#zip").empty()


        event.preventDefault();
        //when user clicks submit, save values. Month is optional, so only save if value is not null.
        var name;
        var address;
        var validateName = false;
        var validateAddress = false;
        var validateCity = false;
        var validateState= false;
        var validateZip = false;

        //validate Name input
        if ($("#name-input").val() != "") {
           name = $("#name-input").val().trim();
            validateName = true;
            localStorage.setItem("name", name);
        } else{
            $("#name").append("<div class ='red-text'> Name is a required field</div>")
        }

        //validate Address input
        if ($("#address-input").val() != "") {
            address = $("#address-input").val().trim();
            address = address.split(' ').join('+');
            validateAddress = true;
            localStorage.setItem("address", address);

        } else{
            $("#address").append("<div class ='red-text'> Address is a required field</div>")
        }

        //validate city input
        if ($("#city-input").val() != "") {
            city = $("#city-input").val().trim();
            city = city.split(' ').join('+');
            validateCity = true;
            localStorage.setItem("city", city);

        } else{
            $("#city").append("<div class ='red-text'> City is a required field</div>")
        }

        if ($("#state-input").val().length == 2) {
            state = $("#state-input").val().trim();
            state = state.split(' ').join('+');
            validateState = true;
            localStorage.setItem("state", state);

        } else{
            $("#state").append("<div class ='red-text'> A two character state is a required field</div>")
        }

        if ($("#zip-input").val().length == 5 ) {
            zip = $("#zip-input").val().trim();
            validateZip = true;
            localStorage.setItem("zip", zip);


        } else{
            $("#zip").append("<div class ='red-text'>A five digit zip code is required</div>")
        }








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


        if (validateName && validateAddress && validateCity && validateState && validateZip) {
            window.location.replace("home.html");
        }
    })

})