
// array of strings to start with.
var actors = ["Kevin Hart", "Will Ferrel", "Will Smith", "Mark Wahlberg"];


//  ajax function after onlick of buttons.
function displayGiphy() {
    var person = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height_still.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $(".result-container").prepend(gifDiv);
        }
    });
};

// function to render buttons
function renderButtons() {

    // creating buttons for elements pushed into the array.
    $("#buttons-view").empty();
    for (var i = 0; i < actors.length; i++) {
        var k = $("<button>");
        k.addClass("giphy-btn mx-1 my-1");
        k.attr("data-name", actors[i]);
        k.text(actors[i]);
        $("#buttons-view").append(k);
    }
}

// pushing elements into an array and then calling the renderbutton function.
$("#add-gif").on("click", function (event) {

    event.preventDefault();

    var newActors = $("#topic-input").val();
    if (!newActors) return;
    if (actors.indexOf(newActors) >= 0) return;
    actors.push(newActors);

    renderButtons();
});


$(document).on("click", ".giphy-btn", displayGiphy);
renderButtons();