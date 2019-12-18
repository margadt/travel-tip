let gMap, infoWindow;

function init() {
  getCurrLocation()
    .then(() => {
      let pos = getCurrPos();
      initMap(pos);
      setInfoWindow();
    });
}

function renderTable() {
  let locations = getLocations();
  let elContainer = document.querySelector('.loc-info-container');
  elContainer.innerHTML = '';

  locations.forEach( (data) => {
      const locationPreview = new LocationPreview(data);
      const elTr = locationPreview.render();
      elContainer.appendChild(elTr);
  });
}


function onEntLocModal() {
  const { value: locName } = Swal.fire({
    title: 'Enter a location name',
    input: 'text',
    inputValue: '',
    inputPlaceholder: 'Location Name',
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write something!'
      }
    }
  })

    .then(res => console.log(res.value));
}


function onGeocodeMapCenter() {
  geocodeMapCenter();
}

function onSaveModal(latLng, map) {
  Swal.fire({
    title: 'Do you want to save it?',
    type: 'question',
    text: '',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, save it!'
  }).then((result) => {
    if (result.value) {
      
      placeMarkerAndPanTo(latLng, map)
    }
  })
}