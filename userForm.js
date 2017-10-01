$("#letsGo").on("click", function(event) {
    //add buttons for each category in MeetUpCategories

    event.preventDefault();
    //when user clicks submit, save values. Month is optional, so only save if value is not null.

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

    var month;

    if ($("#date-input").val() != "") {
        month = $("#date-input").val().trim();
        localStorage.setItem("month", month);
    } else{
        localStorage.setItem("month", "no month");
    }

    //redirect to homepage.
    window.location.replace("home.html");
})