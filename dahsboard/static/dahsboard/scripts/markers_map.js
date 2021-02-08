let linea = document.getElementById("marker_line").getAttribute("value");
linea = parseInt(linea);
let coordenadas; 
if(linea===1){
    coordenadas = [19.60334945,-99.01463685];
}else if(linea===2){
    coordenadas = [19.63041064,-99.10845301];
}else{
    coordenadas = [19.41054403,-98.99578505];
}
let mymap = L.map('mapid').setView(coordenadas, 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFyY28xNzk2IiwiYSI6ImNra2VqeGZjaDAwMjAydnBlM2JoY2N4dWIifQ.fsygHsxcY43JG-HjdHZ94w'
}).addTo(mymap);

function load(num) {
    // Set start and end post numbers, and update counter
    // Get new posts and add posts
    let path = `/get_markers?line=${num}`;
    fetch(path)
    .then(response => response.json())
    .then(addMarkers);
};

function addMarkers(json) {
    let data = json;
    let lineName = data["nombre_linea"];
    let lineNumber = data["num_linea"];
    let filesPath = data["directorio_fichas"];
    let markers = data["marcadores"];
    let min = Math.min(300, markers.length);
    for(let i = 0; i < min; i++) {
        let coord = markers[i]["coord"];
        let ficha = markers[i]["ficha"];
        let marker = L.marker(coord).addTo(mymap);
        marker.bindPopup('<div><h4><b>Línea: '+lineNumber+'</b></h4><b>'+lineName+
            '</b><br><br><a style="color: white;" class="btn btn-primary btn-block" href="'
            +filesPath + ficha+'">Ficha</a></div>');
    }
}

load(linea);