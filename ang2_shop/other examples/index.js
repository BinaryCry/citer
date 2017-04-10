'use strict';

function initMap() {

    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    var geocoder = new google.maps.Geocoder();
    var service = new google.maps.DistanceMatrixService();

    //-------------------------------

    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.4019514, lng: 30.3926091 },
        scrollwheel: false,
        zoom: 5
    });

    //-------------------------------

    var startPoint = { location: 'Киев' };
    var finishPoint = { location: { lat: 49.2348105, lng: 28.4346146 } };

    var wpts = [{
        location: 'Харьков'
    }, {
        location: 'Кривой Рог'
    }, {
        location: { lat: 49.8326679, lng: 23.9421962 }
    }, {
        location: 'Минск'
    }, {
        location: 'Гвардейская улица 4, Мариуполь, Донецкая область, Украина'
    }, {
        location: 'Кишенев'
    },
    { location: 'ул. Ленина 143, Покровское, Днепропетровская область, Украина' }
];

    var calcDist = function calcDist(arr) {
        // вычислить сумму расстояний от точки до точки
        var dist = 0;

        var _loop = function _loop(i, j) {
            new Promise(function (resolve, reject) {
                service.getDistanceMatrix({
                    origins: [arr[i].location],
                    destinations: [arr[j].location],
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false
                }, function (response, status) {
                    if (status !== google.maps.DistanceMatrixStatus.OK) {
                        reject('Error was: ' + status);
                    } else {
                        resolve([response.rows[0].elements[0].distance.value / 1000, j]);
                    }
                });
            }).then(function (res) {
                dist += parseFloat(res);
                if (arr.length == j + 1) {
                    document.getElementById('dist').innerHTML = '&#x2248; ' + parseInt(dist) + ' \u043A\u043C';
                } else {}
            }, function (err) {
                console.log(err);
            });
        };

        for (var i = 0, j = 1; i < arr.length - 1; i++, j++) {
            _loop(i, j);
        }
    };
    var drawWay = function drawWay(arr) {
        var request = {
            origin: new google.maps.LatLng(arr[0].location.lat, arr[0].location.lng), //точка старта
            waypoints: arr.slice(1, arr.length - 1), // slice
            destination: new google.maps.LatLng(arr[arr.length - 1].location.lat, arr[arr.length - 1].location.lng), //точка финиша
            travelMode: google.maps.DirectionsTravelMode.DRIVING, //режим прокладки маршрута
            optimizeWaypoints: true
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
        directionsDisplay.setMap(map);
        calcDist(arr);
    };
    var renderWay = function renderWay(start, finish, arr) {
        var result = [];
        arr.unshift(start);
        arr.push(finish);
        arr.forEach(function (item, i, origin) {
            if (typeof item.location === 'string') {
                new Promise(function (resolve, reject) {
                    geocoder.geocode({ 'address': item.location }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            resolve({ location: { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() } });
                        } else {
                            reject('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                }).then(function (res) {
                    // каждый поток Promise идет сам по себе ассинхронно и может случиться так, что элемент с индексом == количеству элементов массива
                    // придет на проверку раньше, поэтому надо проверить длину входного и выходного массивов
                    result.push(res);
                    if (result.length == origin.length) {
                        drawWay(result);
                    } else {}
                }, function (err) {
                    console.log(err);
                });
            } else {
                result.push(item);
                if (result.length == origin.length) {
                    drawWay(result);
                } else {}
            }
        });
    };
    renderWay(startPoint, finishPoint, wpts);
}

