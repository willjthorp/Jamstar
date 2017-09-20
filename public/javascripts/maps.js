
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
      console.log('THIS:', this);
      infowindow.setContent('<h3>' + this.name + '</h3><p>' + this.venue + '</p><p>' + this.date + '</p><p>' + this.time + `</p><a href="/jams/${this.id}/view">View info</a>`);
      infowindow.open(map, this);
    });
  }

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
}





// WORKING ???
function showVenueMarkers() {
  var ironhackBCN = {
    lat: 41.386799,
    lng: 2.178508
  };
  var map = new google.maps.Map(document.getElementById('jam-venues-map'), {
    zoom: 13,
    center: ironhackBCN
  });

  console.log("hello");
  $.ajax({
    url: 'http://localhost:3000/api/venues',
    method: 'GET',
    success: function(response) {
      console.log(response);
      var markers = [];
      setVenueMarkers(map, response);
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      });
    }
  });

  google.maps.event.addListener(map, "click", function(event) {
    infowindow.close();
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
    url: 'http://localhost:3000/api/jams',
    method: 'GET',
    success: function(response) {
      console.log(response);
      var markers = [];
      setJamMarkers(map, response);
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      });
    }
  });

  google.maps.event.addListener(map, "click", function(event) {
    infowindow.close();
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
    url: 'http://localhost:3000/api/myjams',
    method: 'GET',
    success: function(response) {
      var markers = [];
      setJamMarkers(map, response);
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      });
    }
  });

  google.maps.event.addListener(map, "click", function(event) {
    infowindow.close();
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
    url: 'http://localhost:3000/api/myinvited',
    method: 'GET',
    success: function(response) {
      var markers = [];
      setJamMarkers(map, response);
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      });
    }
  });

  google.maps.event.addListener(map, "click", function(event) {
    infowindow.close();
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
    url: 'http://localhost:3000/api/myattending',
    method: 'GET',
    success: function(response) {
      var markers = [];
      setJamMarkers(map, response);
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      });
    }
  });

  google.maps.event.addListener(map, "click", function(event) {
    infowindow.close();
  });
}
