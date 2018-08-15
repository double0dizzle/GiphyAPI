var topics = ["Rocky Mountains", "The Himalayas", "Appalachian Mountains", "The Pyrenees", "The Alps", "The Andes", "Ural Mountains", "Balkan Mountains"]

    // function alertMountain() {                       //might have to delete this function. max call stack size exceeded
    //     var mountainName = $(this).attr("data-search");

    //     alertMountain();
    //   } 



    function renderButtons() {

      $("#buttons-div").empty();

      for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");

        a.addClass("mountain");

        a.attr("data-search", topics[i]);

        a.text(topics[i]);

        $("#buttons-div").append(a);

      }
    }


    $("#add-mountain").on("click", function (event) {

      // var state = $(this).attr("data-state");

      //     if (state === "still") {
      //       $(this).attr("src", $(this).attr("data-animate"));
      //       $(this).attr("data-state", "animate");
      //     } else {
      //       $(this).attr("src", $(this).attr("data-still"));
      //       $(this).attr("data-state", "still");
      //     }                                         //might have to delete 69-77

      event.preventDefault();


      var mountain = $("#mountain-input").val().trim();

      topics.push(mountain);


      renderButtons();
    });


    // $(document).on("click", ".mountain", alertMountain); //might have to delete this line

    renderButtons();






    //     for(var i =0; i < topics.length; i++){
    //         var buttons = $("<button data-search='topics'>" + topics[i] + "</button>");
    //             buttons.appendTo("#gif");
    // }
    $(document).on("click", ".mountain", function () {
      var x = $(this).data("search");
      var apiKey = "JSTdpECZZRo5C3jXbtOG1xzNe7gJLDH7"
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=" + apiKey + "&limit=10";
      console.log(queryURL);

      $.ajax({ url: queryURL, method: "GET" })
        .done(function (response) {
          console.log(response);
          // console.log(response.data[0].rating);
          for (var i = 0; i < response.data.length; i++) {
            var newDiv = $("<div class='newDiv'>");
            var gif = $("<img class= 'gif' src= '" + response.data[i].images.fixed_height_still.url + "'>")
            gif.attr("data-still", response.data[i].images.fixed_height_still.url);
            gif.attr("data-animate", response.data[i].images.fixed_height.url);
            gif.attr("data-state", "still");
            newDiv.prepend("<h1>" + response.data[i].rating + "</h1>");
            newDiv.prepend(gif);
            $("#mountains-view").prepend(newDiv);
            



          }


        });
    });


    $(document).on("click", ".gif", function () {


      // $(".gif").on("click", function() {
      var state = $(this).attr("data-state");
      var animate = $(this).attr("data-animate");
      var still = $(this).attr("data-still");
      if (state === "still") {
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
      }
    });