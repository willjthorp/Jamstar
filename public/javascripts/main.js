$(document).ready(function(){
    $('ul.tabs').tabs();

    $(".button-collapse").sideNav({
      edge: 'right',
    });

    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: true, // Close upon selecting a date,
    min: Date.now()
  });

    $('.timepicker').pickatime({
      default: 'now', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: false, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Clear', // text for clear-button
      canceltext: 'Cancel', // Text for cancel-button
      autoclose: true, // automatic close timepicker
      ampmclickable: true, // make AM PM clickable
      aftershow: function(){} //Function for after opening timepicker
    });

     $('select').material_select();
});


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

$('.input-field').on('change', function () {
    var input = $('#instfilter').val();
    console.log(input);
    $('.instruments-list-text').each(function(index) {
      console.log($(this).parents().eq(2));
      if ($(this).text().indexOf(input) >= 0) {
          $(this).parents().eq(2).show();
      } else {
          $(this).parents().eq(2).hide();
      }
    });
});

$('.filter-btn').on('click', function () {
    $('.card').show();
    Materialize.updateTextFields();
});
