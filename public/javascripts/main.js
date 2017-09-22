$(document).ready(function(){

    $(window).scroll(function(){
  		if ($(this).scrollTop() > 1000) {
  			$('#back-to-top').fadeIn(600);
  		} else {
  			$('#back-to-top').fadeOut(600);
  		}
  	});

  	//Click event to scroll to top
  	$('#back-to-top').click(function(){
  		$('html, body').animate( {scrollTop : 0}, 800);
  		return false;
  	});



    $('ul.tabs').tabs();

    $(".button-collapse").sideNav({
      edge: 'right',
    });

    $(".dropdown-button").dropdown({
      belowOrigin: true,
      // hover: true
    });

    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false, // Close upon selecting a date,
    min: Date.now()
  });

  $('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){
      console.log("hello!");
    } //Function for after opening timepicker
  });

   $('select').material_select();

   var genreinput = $('#genrefilter').val();
   var input = $('#instfilter').val();

   if (input) {
   $('.instruments-list-text').each(function() {
     if ($(this).text().indexOf(input) >= 0 && (genreinput === null || $(this).siblings('.genre-list').text().indexOf(genreinput) >= 0)) {
         $(this).parents().eq(2).show();
     } else {
         $(this).parents().eq(2).hide();
     }
   });
  }

  if (genreinput) {
   $('.genre-list').each(function() {
     if ($(this).text().indexOf(genreinput) >= 0 && (input === null || $(this).siblings('.instruments-list-text').text().indexOf(input) >= 0)) {
         $(this).parents().eq(2).show();
     } else {
         $(this).parents().eq(2).hide();
     }
   });
 }

 $(".jamgenre input").val("Hi");

 $('#jamgenre option').each(function(i) {
   console.log($(this).text());
   console.log($(this).parent().attr('value'));
   if ($(this).text() === $(this).parent().attr('value')) {
     $(this).attr('selected', 'selected');
   }
 });
 var currentGenre = $("#jamgenre option[selected='selected']").text();
 $(".jamgenre input").val(currentGenre);

});


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
 document.body.scrollTop = 0;
 document.documentElement.scrollTop = 0;
}



$('#jam-tab').on('click', function() {
  $.ajax({
    url: 'http://localhost:3000/api/jams',
    method: 'GET',
    success: function(response) {
      if ($('.jams-info').length === 1) {
        for (let i=1; i < response.length; i++) {
          $('.jams-container').append($('.jams-info').eq(0).clone());
        }
      }
      $('.jam-name').each(function(index) {
        $(this).text(response[index].name);
      });
    }
  });
});


function goBack() {
    window.history.back();
}

$('#instfilter').on('change', function () {
    var genreinput = $('#genrefilter').val();
    var input = $('#instfilter').val();
    $('.instruments-list-text').each(function(index) {
      if ($(this).text().indexOf(input) >= 0 && (genreinput === null || $(this).siblings('.genre-list').text().indexOf(genreinput) >= 0)) {
          $(this).parents().eq(2).show();
      } else {
          $(this).parents().eq(2).hide();
      }
    });
});


$('#genreinput').on('change', function () {
  var genreinput = $('#genrefilter').val();
  var input = $('#instfilter').val();
  $('.genre-list').each(function(index) {
    if ($(this).text().indexOf(genreinput) >= 0 && (input === null || $(this).siblings('.instruments-list-text').text().indexOf(input) >= 0)) {
        $(this).parents().eq(2).show();
    } else {
        $(this).parents().eq(2).hide();
    }
  });
});

var select = $('select');

$('.filter-btn').on('click', function (e) {
    e.preventDefault();
    $('.card').show();
    $("form input").val("Choose your option");
    select.prop('selectedIndex', 0); //Sets the first option as selected
    select.material_select();
    $('#genrefilter').val(null);
    $('#instfilter').val(null);
});

$('.venue, .musician').on('click', function() {
  window.location = $(this).find('a').attr('href');
});
