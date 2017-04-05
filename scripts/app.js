$(document).on("ready", function(){
  $.ajax({
    method: 'get',
    url: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC',
    success: onSuccess,
    // data: "limit = 25" - trending already only spits out 25 results
    // data: $('form').serialize()
    error: onError
  });

function onSuccess(responseData) {
  console.log('get request successful');
  for (i = 0; i<responseData.data.length; i++) {
    var json = responseData.data[i].images.fixed_height.url;
    $('.gif-gallery').append("<img src= "+ json + ">");
    // console.log(json); to see results in console
    }
  };

function onError(xhr, status, errorThrown) {
	alert("Sorry, there was a problem!");
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
}

$('#submit').on('click', function(event) {
  $('.gif-gallery').empty();
  // var search = $('input > value')
  event.preventDefault();
  $.ajax({
    method: 'get',
    url: 'http://api.giphy.com/v1/gifs/search',
    success: onSearch,
    data: $('form').serialize(),
    error: onError,
  });

function onSearch(response) {
  console.log('second get request successful');
  for (i = 0; i<response.data.length; i++) {
    var json = response.data[i].images.fixed_height.url;
    $('.gif-gallery').append("<img src= "+ json + ">");
      // console.log(json);
      }
    }
  })


$('#more').on('click', function(event) {
  event.preventDefault();
  var myOffset = 25;
  var myLimit = 50;
  $.ajax({
    method: 'get',
    url: 'http://api.giphy.com/v1/gifs/search',
    success: gimmeMore,
    data: $('form').serialize() + "&offset=" + myOffset + "&limit=" + myLimit,
    error: onError
  });

function gimmeMore(response) {
  console.log('third get request successful');
  console.log(response);
  for (i = 0; i<response.data.length; i++) {
    var json = response.data[i].images.fixed_height.url;
    $('.gif-gallery').append("<img src= "+ json + ">");
  }
}
  myOffset += 25;
  myLimit += 25;
});


// try to consolidate functions






//  for end
});
