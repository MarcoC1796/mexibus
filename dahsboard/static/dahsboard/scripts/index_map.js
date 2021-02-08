let mymap = L.map('mapid').setView([19.41946724, -99.15023804], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFyY28xNzk2IiwiYSI6ImNra2VqeGZjaDAwMjAydnBlM2JoY2N4dWIifQ.fsygHsxcY43JG-HjdHZ94w'
}).addTo(mymap);

function getColor(d) {
    return d > 0.75 ? '#810f7c' :
           d > 0.5 ? '#8856a7' :
           d > 0.25 ? '#8c96c6' :
           d >= 0 ? '#b3cde3' :
                   '#07FF0F';
}

var geojson;

function style(feature) {
    let color = getColor();
    if(feature.properties.Ip!==undefined) {
        color = getColor(feature.properties.Ip);
    } else {
        color = getColor(feature.properties.IP);
    }
    return {
        color: color,
        weight: 7,
        opacity: 1,
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 20,
        color: '#229954',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }   
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    //info.update();
}

function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function load(num, style) {
    // Set start and end post numbers, and update counter
    // Get new posts and add posts
    let path = `/get_line?line=${num}`;
    fetch(path)
    .then(response => response.json())
    .then(addLine);
};

function addLine(add) {
    geojson = L.geoJSON(add, {
        style: style,   
        onEachFeature: onEachFeature
    }).addTo(mymap);
}

for (let i = 0; i < 6; i++) {
    load(i + 1);
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    let accidentes = -1;
    if(props !== undefined){
        if(props.Accidentes!==undefined) {
            accidentes = props.Accidentes;
        } else {
            accidentes = props.Accindente;
        }
    }
    let Ip = -1;
    if(props !== undefined){
        if(props.Ip!==undefined) {
            Ip = props.Ip;
        } else {
            Ip = props.IP;
        }
    }
    console.log(props);
    this._div.innerHTML = '<h4>Mexibús</h4>' +  (props ?
        '<h5><b>Línea: '+props.linea+'</b></h5><br/>'+
        '<b>' + props.Name + '</b><br><br>' + 'Numero de accidentes: ' + accidentes +
        '<br/>' + 'Índice de Peligrosidad: ' + Ip.toFixed(3) + '<br>'+
        // Primer archivo
        '<br><a style="color: white;" class="btn btn-dark btn-block" href=/static/pdf/linea_'+props.linea+
        '/estudios/ANALISIS_INTERSECCIONES_ESTACIONES_TERMINALES_'+props.linea+'.pdf'+'>Intersecciones</a>'+
         // Segundo archivo
        '<br><a style="color: white;" class="btn btn-primary btn-block" href=/static/pdf/linea_'+props.linea+
        '/estudios/DIAGNOSTICO_VISUAL_SUPERFICIE_DE_RODAMIENTO_'+props.linea+'.pdf'+'>Pavimento</a>'+
        // Tercer archivo
        '<br><a style="color: white;" class="btn btn-dark btn-block" href=/static/pdf/linea_'+props.linea+
        '/estudios/ESTIMACION_DE_COSTOS_DE_RECOMENDACIONES_'+props.linea+'.pdf'+'>Estimación de Costos</a>'+
        // Cuarto archivo
        '<br><a style="color: white;" class="btn btn-primary btn-block" href=/static/pdf/linea_'+props.linea+
        '/estudios/OBSERVACIONES_A_NIVEL_DE_SUELO_'+props.linea+'.pdf'+'>Observaciones Seguridad Vial</a>'+
        // Quinto archivo
        '<br><a style="color: white;" class="btn btn-dark btn-block" href=/static/pdf/linea_'+props.linea+
        '/estudios/PRIORIZACION_'+props.linea+'.pdf'+'>Priorización</a>'+
        // Sexto archivo
        '<br><a style="color: white;" class="btn btn-primary btn-block" href=/static/pdf/linea_'+props.linea+
        '/estudios/RECOMENDACIONES_DE_MEJORA_'+props.linea+'.pdf'+'>Recomendaciones</a>'
        : 'Selecciona una línea<br />Click en línea para zoom');
};

info.addTo(mymap);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 0.25, 0.5, 0.75],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML += '<div><h5>Índice de Peligrosidad</h5></div>'
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 0.01) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '&nbsp&nbsp+');
    }

    return div;
};

legend.addTo(mymap);