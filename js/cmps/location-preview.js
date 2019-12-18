class LocationPreview{
    constructor(data){
        this.data = data;
    }

    onDeleteLocation = () => {
        let marker = getMarkerByDataId(this.data);
        let idx = getLocIdxById(this.data.id);
        deleteMarker(marker);
        deleteData(idx);
        renderTable();
    }

    render(){
        const { data } = this;

        const elTr = document.createElement('tr');
        elTr.innerHTML = `<tr class="marker" data-id="${data.id}">\n
        <td>${data.id}</td>
        <td class="address${data.id}>${getGeocodeLatLng(data.id, data.latLng)}</td>
        <td>Weather here</td>
        <td><button class="btn-delete" onclick="onDeleteBtn(${data.id})">Delete</button>
        <button class="btn-update" onclick="onUpdateBtn(${data.id})">Update</button></td>
        </tr>`

        elTr.querySelector('.btn-delete').onclick = this.onDeleteLocation;
        // elTr.querySelector('.btn-update').onclick = this.onUpdateLocation;

        return elTr;
    }
}


   
