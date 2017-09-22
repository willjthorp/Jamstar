
function setMap(map) {
  function newLocation(newLat, newLng) {
    map.panTo({
      lat: newLat,
      lng: newLng
    });
  }
  $('.card').each(function(index) {
    $(this).on("mouseenter", function() {
      newLocation(parseFloat($(this).children(0).eq(0).text()), parseFloat($(this).children(0).eq(1).text()));
    });
  });
  google.maps.event.addListener(map, "click", function(event) {
    infowindow.close();
  });
}


function setJamMarkers(map, markers) {
  console.log(markers);
  for (var i = 0; i < markers.length; i++) {
    var marker = new google.maps.Marker({
      position: {
        lat: markers[i].venue.location.coordinates[0],
        lng: markers[i].venue.location.coordinates[1]
      },
      map: map,
      title: markers[i].name,
      name: markers[i].name,
      venue: markers[i].venue.name,
      date: markers[i].date,
      time: markers[i].time,
      id: markers[i]._id
    });
    var contentString = "Some content";
    google.maps.event.addListener(marker, "click", function() {
      infowindow.setContent(`<h3>${this.venue}</h3><p>${this.venue}</p><p>${this.date}</p><p>${this.time}</p><a href="/jams/${this.id}/view">View info</a>`);
      infowindow.open(map, this);
    });
  }
  setMap(map);
}




function setVenueMarkers(map, markers) {
  for (var i = 0; i < markers.length; i++) {
    var marker = new google.maps.Marker({
      position: {
        lat: markers[i].location.coordinates[0],
        lng: markers[i].location.coordinates[1]
      },
      map: map,
      title: markers[i].name,
      name: markers[i].name,
      address: markers[i].address,
      website: markers[i].website,
      id: markers[i]._id
    });
    var contentString = "Some content";
    google.maps.event.addListener(marker, "click", function() {
      infowindow.setContent(`<h3>${this.name}</h3><p>${this.address}</p><a href="http://${this.website}" target="_blank">${this.website}</a>`);
      infowindow.open(map, this);
    });
  }
  setMap(map);
}


function showVenueMarkers() {
  var ironhackBCN = {
    lat: 41.386799,
    lng: 2.178508
  };
  var map = new google.maps.Map(document.getElementById('jam-venues-map'), {
    zoom: 13,
    center: ironhackBCN
  });
  $.ajax({
    url: 'http://jamstar.herokuapp.com/api/venues',
    method: 'GET',
    success: function(response) {
      var markers = [];
      setVenueMarkers(map, response);
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      });
    }
  });
}


function showAllJamMarkers() {
  var ironhackBCN = {
    lat: 41.386799,
    lng: 2.178508
  };
  var map = new google.maps.Map(document.getElementById('jam-map'), {
    zoom: 13,
    center: ironhackBCN
  });

  $.ajax({
    url: 'http://jamstar.herokuapp.com/api/jams',
    method: 'GET',
    success: function(response) {
      var markers = [];
      setJamMarkers(map, response);
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      });
    }
  });
}


function showMyJamMarkers() {
  var ironhackBCN = {
    lat: 41.386799,
    lng: 2.178508
  };
  var map = new google.maps.Map(document.getElementById('jam-map'), {
    zoom: 13,
    center: ironhackBCN
  });
  $.ajax({
    url: 'http://jamstar.herokuapp.com/api/myjams',
    method: 'GET',
    success: function(response) {
      var markers = [];
      setJamMarkers(map, response);
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      });
    }
  });
}


function showInvitedMarkers() {
  var ironhackBCN = {
    lat: 41.386799,
    lng: 2.178508
  };
  var map = new google.maps.Map(document.getElementById('jam-map'), {
    zoom: 13,
    center: ironhackBCN
  });
  $.ajax({
    url: 'http://jamstar.herokuapp.com/api/myinvited',
    method: 'GET',
    success: function(response) {
      var markers = [];
      setJamMarkers(map, response);
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      });
    }
  });
}


function showAttendingMarkers() {
  var ironhackBCN = {
    lat: 41.386799,
    lng: 2.178508
  };
  var map = new google.maps.Map(document.getElementById('jam-map'), {
    zoom: 13,
    center: ironhackBCN
  });
  $.ajax({
    url: 'http://jamstar.herokuapp.com/api/myattending',
    method: 'GET',
    success: function(response) {
      var markers = [];
      setJamMarkers(map, response);
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      });
    }
  });
}
