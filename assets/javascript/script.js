//Pseudo-code
//Make an array of characters to display as buttons on the html page.
//Get an Giphy API and research documentation to place into a queryURL var.
//When button on html is clicked, it adds buttons to the page.
//When buttons on the page are clicked, it retrieves the gifs from giphy using the API
//At one point, the user input will have to be pushed into the array so likely to use .push() <--Remember

//Array of Characters
var characters = ["Frodo", "Samwise", "Pippin", "Meriadoc"];

//Putting the buttons on the screen
function renderButtons() {
	
	$("#buttons-view").empty();
	//Loop that will append each button
	for (var i=0; i < characters.length; i++) {
		var a = $("<button>");
		a.addClass("character");
		a.attr("data-name", characters[i]);
		a.text(characters[i]);
		$("#buttons-view").append(a);
	};
};

function displayCharacter() {

	var character = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response) {
		var results = response.data;
		for (var i = 0; i < results.length; i++) {
			if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
				var gifDiv = $("<div class='item'>");
				var rating = results[i].rating;
				var p = $("<p>").text("Rating:" + rating);

				var personImage = $("<img>");
				personImage.attr("src",results[i].images.fixed_height_still.url);
				personImage.attr("data-state", "still");
				personImage.attr("data-still", results[i].images.fixed_height_still.url);
				personImage.attr("data-animate", results[i].images.fixed_height.url);
				personImage.addClass("gif");

				gifDiv.append(p);
				gifDiv.append(personImage);

				$("#gif-here").prepend(gifDiv);
			};

		};

		$(".gif").on("click", function() {
			//var state = personImage.attr("data-state");
			//if (state === "still") {
			  //personImage.attr("src", personImage.attr("data-animate"));
			  //personImage.attr("data-state", "animate");
			//} else {
			  //personImage.attr("src", personImage.attr("data-still"));
			  //personImage.attr("data-state", "still");
			//}
			var state = $(this).attr("data-state");
			if (state === "still") {
			  $(this).attr("src", $(this).attr("data-animate"));
			  $(this).attr("data-state", "animate");
			} else {
			  $(this).attr("src", $(this).attr("data-still"));
			  $(this).attr("data-state", "still");
			}
		});
	});

};

$("#add-character").on("click", function(event) {
	event.preventDefault();
	var character = $("#character-input").val().trim();
	characters.push(character);
	renderButtons();
});

$(document).on("click", ".character", displayCharacter)


renderButtons();