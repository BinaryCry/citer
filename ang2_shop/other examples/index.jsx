function initMap() {

    let directionsDisplay = new google.maps.DirectionsRenderer();
    let directionsService = new google.maps.DirectionsService;
    let geocoder = new google.maps.Geocoder();
    let service = new google.maps.DistanceMatrixService;

    //-------------------------------

    let map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 50.4019514, lng: 30.3926091},
        scrollwheel: false,
        zoom: 5
    });

    //-------------------------------

    let startPoint = { location: 'Киев' };
    let finishPoint = { location: { lat: 49.2348105, lng: 28.4346146 } };

    let wpts = [
        {
            location: 'Харьков'
        },
        {
            location: 'Кривой Рог'
        },
        {
            location: {lat: 49.8326679, lng: 23.9421962}
        },
        {
            location: 'Минск'
        },
        {
            location: 'ул. Гвардейская 4, Мариуполь'
        },
        {
            location: 'Кишенев'
        }
    ];

    let calcDist = (arr) => {
        // console.log(arr)
        service.getDistanceMatrix({
            origins: [arr[0]],
            destinations: arr.slice(1),
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function(response, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
                alert('Error was: ' + status);
            } else {
                console.log(parseInt(response.rows[0].elements[0].distance.value)/1000+' км');
            }
        })
    };
    let drawWay = (arr, it) => {

        // console.log(arr);
        // console.log(it);

        let request = {
            origin: new google.maps.LatLng(arr[0].lat, arr[0].lng), //точка старта
            waypoints: arr.slice(1, arr.lenght-1), // slice
            destination: new google.maps.LatLng(arr[arr.length-1].lat, arr[arr.length-1].lng), //точка финиша
            travelMode: google.maps.DirectionsTravelMode.DRIVING, //режим прокладки маршрута
            optimizeWaypoints: true
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
        directionsDisplay.setMap(map);
        // calcDist(arr);
    };
    let renderWay = (start, finish, arr) => {
        let result = []; let it = 0;
        arr.unshift(start);
        arr.push(finish);

        console.log(arr);

        arr.forEach( function (item, i, origin) {
            if(typeof item.location === 'string') {
                new Promise( function (resolve, reject) {
                    geocoder.geocode({'address': item.location}, function(results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            resolve( { location: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() } } );
                        } else {
                            reject('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                } ).then(
                    function (res) {
                        result.push(res);
                        // console.log(result);
                        it++;
                        console.log(`str ${i} ${origin.length-1}`);
                        console.log(i == origin.length-1);
                        if(i == origin.length-1) {
                            console.log(it+' == str');
                            drawWay(result, it);
                        } else {
                            // console.log('go next string')
                        }
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            } else {
                result.push( item );
                // console.log(result);
                it++;
                console.log(`obj ${i} ${origin.length-1}`);
                console.log(i == origin.length-1);
                if(i == origin.length-1) {
                    // console.log(origin.length-1);
                    // console.log(it+' == obj');
                    drawWay(result, it);
                } else {
                    // console.log('go next object')
                }
            }
        } );
    };
    renderWay(startPoint, finishPoint, wpts);



}