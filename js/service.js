const APIKEY = '';
let gCurrPos = {};
let gLocations = [];
let gMarkers = [];
let gId = 1;
let geocoder;


function setCurrPos(pos) {
    gCurrPos.lat = pos.coords.latitude;
    gCurrPos.lng = pos.coords.longitude;
}

function getCurrPos() {
    return gCurrPos;
}

function initMap(pos) {
    gMap = new google.maps.Map(document.querySelector('.map'), {
        center: pos,
        zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;
    geocoder = new google.maps.Geocoder();

    gMap.addListener('click', (e) => {
        console.log(e);
        
        onSaveModal(e.latLng, gMap);
    })
}


function getCurrLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setCurrPos(position);
                resolve();
            });

        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });

}

function setInfoWindow() {
    let pos = getCurrPos();
    infoWindow.setPosition(pos);
    infoWindow.setContent('My Location');
    infoWindow.open(gMap);
    gMap.setCenter(pos);
}




function placeMarkerAndPanTo(latLng, map, address) {
    let data = {
        id: gId++,
        latLng: latLng,
        address: address
    };
    let marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    gMarkers.push(marker);
    gLocations.push(data);
    // saveMapData();
    map.panTo(latLng);
    renderTable();
    Swal.fire(
        'Saved!',
        'Your location has been saved.',
        'success'
    )
}

function getLocations() {
    return gLocations;
}

function geocodeMapCenter() {
    let address = document.querySelector('.input-loc').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            console.log(results);
            
            placeMarkerAndPanTo(results[0].geometry.location, gMap)
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function getGeocodeLatLng(dataId, latLng) {
    // let latlng = { lat: latLng.lat(), lng: latLng.lng() };
    geocoder.geocode({ 'location': latLng }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
             document.querySelector(`.address${dataId}`).innerText =  result[0].formatted_address;  
            } else {
                Swal.fire(
                    'ERROR',
                    'No Search Result',
                    'error'
                )
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
            Swal.fire(
                'ERROR',
                `Geocoder failed due to: ${status}`,
                'error'
            )
        }
    });
}



function getMarkerByDataId(data) {
    if(data.length)
    return gMarkers.find(function (marker) {
        return (data.latLng.lat() === marker.position.lat() &&
            data.latLng.lng() === marker.position.lng());
    });
}

function getMarkerIdx(getMarker) {
    return gMarkers.findIndex(function (marker) {
        return (getMarker.position.lat() === marker.position.lat() &&
            getMarker.position.lng() === marker.position.lng());
    });
}

function deleteMarker(marker) {
    setMapOnAll(null);
    gMarkers.splice(getMarkerIdx(marker), 1);
    setMapOnAll(gMap);
}


function deleteData(dataIdx){
    gDatas.splice(dataIdx,1);
}

function getLocIdxById(dataId){
    gLocations.findIndex(function(data){
        return data.id === dataId;
    });
}

function setMapOnAll(map) {
    for (var i = 0; i < gMarkers.length; i++) {
        gMarkers[i].setMap(map);
    }
}
