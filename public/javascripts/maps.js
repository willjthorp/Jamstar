
  var map;
  var markers = [];

  function initMap() {

    var ironhackBCN = {
        lat: 31.3977381,
        lng: 2.190471916
      };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: ironhackBCN
      }
    );

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // Center map with user location
      map.setCenter(user_location);

      // Add a marker for your user location
      var yourPosition = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "You are here"
      });
      markers.push(yourPosition);
              console.log(markers);

    }, function () {
        console.log('Error in the geolocation service.');
      });
    } else {
        console.log('Browser does not support geolocation.');
    }

    // This event listener will call addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function( event ){
      clearMarkers();
      markers = [];
      var marker = new google.maps.Marker({
          position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
          map: map
        });
        markers.push(marker);
          document.getElementById('latitude').value=event.latLng.lat();
          document.getElementById('longitude').value=event.latLng.lng();
    });
  }

  // Adds a marker to the map and push to the array.
  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    clearMarkers();
    markers = [];
    markers.push(marker);
  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }


  function setMarkers(map, markers) {
        for (var i = 0; i < markers.length; i++) {
            var marker = new google.maps.Marker({
                position: {lat: markers[i].location.coordinates[1], lng: markers[i].location.coordinates[0]},
                map: map,
                title: markers[i].name,
                name: markers[i].name
              });
            var contentString = "Some content";
            google.maps.event.addListener(marker, "click", function () {
                infowindow.setContent('<p>' + this.name + '</p>');
                infowindow.open(map, this);
            });
        }
    }



  function showJamMarkers() {
    var ironhackBCN = {
        lat: 31.3977381,
        lng: 2.190471916
      };
    var map = new google.maps.Map(document.getElementById('jam-map'), {
        zoom: 15,
        center: ironhackBCN
      }
    );

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // Center map with user location
      map.setCenter(user_location);

    }, function () {
        console.log('Error in the geolocation service.');
      });
    }

    $.ajax({
      url: 'http://localhost:3000/api/jams',
      method: 'GET',
      success: function(response) {
        var markers = [];
        setMarkers(map, response);
        infowindow = new google.maps.InfoWindow({
              content: "loading..."
          });
      }
    });

    google.maps.event.addListener(map, "click", function(event) {
      infowindow.close();
    });

  }
