console.log("i'm here!");

//draw map
var hh = 0
var mm = 0

var days = ['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

mapboxgl.accessToken = 'pk.eyJ1IjoicmM5N250cyIsImEiOiJjazFjcTQ2M3cwMDlmM2hudWl3dXVqdmZpIn0.Pq8YToDAlFHkMZdowA4uvw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    // style: 'mapbox://styles/rc97nts/ck1cq5xlb1m0k1cppa0p5j7nb', // stylesheet location
    style: 'mapbox://styles/rc97nts/ck1lhhakz9s351ck2lwmsu79d',
    attributionControl: false,
    center: [-73.9324, 40.7829], // starting position [lng, lat]
    zoom: 12 // starting zoom
});



map.on('load',function(){
    map.fadeDuration = 3000
})

setInterval(main,2000);


function draw(geojsonFile) {

    var mapLayer = map.getLayer('arrival-heat');
                if(typeof mapLayer !== 'undefined') {
        // Remove map layer & source.
        //             map.setPaintProperty('points', 'circle-opacity', 0)
        map.removeLayer('arrival-heat').removeSource('pointsSource');
    }

    console.log(geojsonFile);
    map.addSource('pointsSource',{
        type:'geojson',
        'data':geojsonFile
    })
    // map.addLayer({
    //     id: 'points',
    //     source: 'pointsSource',
    //     type:'circle',
    //     paint:{
    //         'circle-radius':5,
    //         "circle-opacity": 0,
    //         "circle-opacity-transition": {duration: 2000},
    //         'circle-color':'skyblue'
    //     }
    // })
    //
    // setTimeout(function() {
    //     map.setPaintProperty('points', 'circle-opacity', 1);
    // }, 1)


    map.addLayer({
        id: 'arrival-heat',
        type: 'heatmap',
        source: 'pointsSource',
        maxzoom: 15,
        paint: {
            // increase weight as diameter breast height increases
            'heatmap-weight': {
                property: 'dbh',
                type: 'exponential',
                stops: [
                    [1, 0],
                    [62, 1]
                ]
            },
            // increase intensity as zoom level increases
            'heatmap-intensity': {
                stops: [
                    [11, 1],
                    [15, 3]
                ]
            },
            // assign color values be applied to points depending on their density
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(89,27,12,0)',
                0.2, '#F2380F',
                0.4, '#F27F1B',
                0.6, '#F2AB27',
                0.8, '#F2E63D'
            ],
            // increase radius as zoom increases
            'heatmap-radius': {
                stops: [
                    [11, 15],
                    [15, 20]
                ]
            },
            // decrease opacity to transition into the circle layer
            'heatmap-opacity': {
                default: 1,
                stops: [
                    [14, 1],
                    [15, 0]
                ]
            },
        }
    }, 'waterway-label')

}




function main(){
    var point =[];

    function Point (latitude, longitude) {
        this.latitude = latitude
        this.longitude = longitude
    }

    var geojson = {
        "type":"FeatureCollection",
        "features":[]
    };


    var today = new Date()
    // var hh = today.getHours()
    // var mm = today.getMinutes()
    //
    // var url = ""
    // if(hh < 10 && mm <10){
    //     url = 'https://mtaapi.herokuapp.com/times?hour=0'+ today.getHours() + '&minute=0'+ today.getMinutes();
    // }else if(hh > 10 && mm < 10){
    //     url = 'https://mtaapi.herokuapp.com/times?hour='+ today.getHours() + '&minute=0'+ today.getMinutes();
    // }else if(hh < 10 && mm > 10){
    //     url = 'https://mtaapi.herokuapp.com/times?hour=0'+ today.getHours() + '&minute='+ today.getMinutes();
    // }else if(hh >= 10 && mm >= 10){
    //     url = 'https://mtaapi.herokuapp.com/times?hour='+ today.getHours() + '&minute='+ today.getMinutes();
    // }

    if(hh < today.getHours()){
        if(mm < 50){
            mm += 10
        }else{
            hh += 1
            mm = 0
        }
    }else if (hh >= today.getHours() && mm < today.getMinutes()-10){
        hh = today.getHours()
        mm+=10
    }else if (hh >= today.getHours() && mm >= today.getMinutes()-10){
        hh = today.getHours()
        mm = today.getMinutes()
    }

    console.log(hh + ":" + mm)

    var url = ""
    if(hh < 10 && mm <10){
        url = 'https://mtaapi.herokuapp.com/times?hour=0'+ hh + '&minute=0'+ mm;
    }else if(hh > 10 && mm < 10){
        url = 'https://mtaapi.herokuapp.com/times?hour='+ hh + '&minute=0'+ mm;
    }else if(hh < 10 && mm >= 10){
        url = 'https://mtaapi.herokuapp.com/times?hour=0'+ hh + '&minute='+ mm;
    }else if(hh >= 10 && mm >= 10){
        url = 'https://mtaapi.herokuapp.com/times?hour='+ hh + '&minute='+ mm;
    }

    var dateText = document.getElementById("date");
    dateText.innerHTML = days[today.getDay()];
    var timeText = document.getElementById("time")

    if(hh < 10 && mm <10){
        timeText.innerHTML = "0" + hh + ":0" + mm
    }else if(hh > 10 && mm < 10){
        timeText.innerHTML = hh + ":0" + mm
    }else if(hh < 10 && mm > 10){
        timeText.innerHTML = "0" + hh + ":" + mm
    }else if(hh >= 10 && mm >= 10){
        timeText.innerHTML = hh + ":" + mm
    }


    console.log("url: " + url);

    let myFirstPromise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
        setTimeout(function(){
            resolve("Success!"); // Yay! Everything went well!
        }, 3000);
    }).then((data)=>{
        point = [];
        // console.log(data);
        var response = JSON.parse(data);
        // console.log(response.result);
        response.result.forEach(d=>{
            // var p = new Point(d.lat,d.lon);
            var a = new Array(2);
            a[0] = d.lon
            a[1] = d.lat
            point.push(a);
            var f = {
                "type":"Feature",
                "geometry":{
                    "type":"Point",
                    "coordinates":[]
                },
                "properties":null
            }
            f.geometry.coordinates = [d.lon,d.lat];
            geojson.features.push(f);
            if(point.length == response.result.length){

                // draw();
                console.log("finished!",geojson);
                draw(geojson)
            }
        })
    })
}

