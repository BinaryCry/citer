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

    let calcDist = (arr) => { // вычислить сумму расстояний от точки до точки
        let dist = 0;
        for(let i = 0, j = 1; i < arr.length-1; i++, j++) {
            new Promise( function (resolve, reject) {
                service.getDistanceMatrix({
                    origins: [arr[i].location],
                    destinations: [arr[j].location],
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false
                }, function(response, status) {
                    if (status !== google.maps.DistanceMatrixStatus.OK) {
                        reject('Error was: ' + status);
                    } else {
                        resolve([(response.rows[0].elements[0].distance.value)/1000, j]);
                    }
                })
            } ).then( function (res) {
                dist += parseFloat(res);
                if(arr.length == j+1) {
                    document.getElementById('dist').innerHTML = `&#x2248; ${parseInt(dist)}км`;
                } else {
                }
            }, function (err) {
                console.log(err)
            } )
        }
    };
    let drawWay = (arr) => {
        let request = {
            origin: new google.maps.LatLng(arr[0].location.lat, arr[0].location.lng), //точка старта
            waypoints: arr.slice(1, arr.length-1), // slice
            destination: new google.maps.LatLng(arr[arr.length-1].location.lat, arr[arr.length-1].location.lng), //точка финиша
            travelMode: google.maps.DirectionsTravelMode.DRIVING, //режим прокладки маршрута
            optimizeWaypoints: true
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
        directionsDisplay.setMap(map);
        calcDist(arr);
    };
    let renderWay = (start, finish, arr) => {
        let result = [];
        arr.unshift(start);
        arr.push(finish);
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
                    function (res) { // каждый поток Promise идет сам по себе ассинхронно и может случиться так, что элемент с индексом == количеству элементов массива
                                     // придет на проверку раньше, поэтому надо проверить длину входного и выходного массивов
                        result.push(res);
                        if(result.length == origin.length) {
                            drawWay(result);
                        } else {
                        }
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            } else {
                result.push( item );
                if(result.length == origin.length) {
                    drawWay(result);
                } else {
                }
            }
        } );
    };
    renderWay(startPoint, finishPoint, wpts);
}