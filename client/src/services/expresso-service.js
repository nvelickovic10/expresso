'use strict';

angular.module('angApp').service('ExpressoService', function ($http, $q, GeolocationService) {
    var coffeeShops;

    var _httpRequest = function (url, method) {
        var deffered = $q.defer();
        if (!url) {
            deffered.reject({
                status: 400,
                msg: 'url parameter is mandatory'
            });
        }

        $http({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000,
            url: url
        }).then(function successCallback(response) {
            deffered.resolve({
                status: response.status,
                response: response.data
            });
        }, function errorCallback(response) {
            deffered.reject({ status: 500, msg: 'failed connection to server', reason: response });
        });

        return deffered.promise;
    };

    this.getCoffeeShopsData = function (sortByPrice) {
        var deffered = $q.defer();
        GeolocationService.getLocationData().then(function (data) {
            var ll = data.response.coords.latitude + ',' + data.response.coords.longitude;
            _httpRequest('http://127.0.0.:5000/expresso/foursquare/exploreCoffeeShops?ll=' + ll + '&accuracy=' + data.response.coords.accuracy + '&radius=1000&limit=10&offset=0&sortByPrice=' + sortByPrice).then(function (response) {
                deffered.resolve(response);
            }, function (reason) {
                deffered.reject(reason);
            });
        }, function (reason) {
            deffered.reject(reason);
        });

        // deffered.resolve({ status: 200, response: mockData });
        return deffered.promise;
    };

    var mockData = [
        {
            'id': '4f83f5d3e4b0f4019e18c2cc',
            'name': 'Perla',
            'distance': 76,
            'price': {
                'tier': 1,
                'message': 'Cheap',
                'currency': '$'
            },
            'categories': [
                {
                    'id': '4bf58dd8d48988d16d941735',
                    'name': 'Café'
                }
            ],
            'photo': 'https://igx.4sqi.net/img/general/original/57461874_KjKRh4dz19IMx0Wv-d53qQ4FllIoYAoB3MeV5tYll4E.jpg',
            'groupName': 'recommended'
        },
        {
            'id': '4d552507e7f1a1cd8bc2f6a4',
            'name': 'Mio',
            'distance': 473,
            'price': {
                'tier': 1,
                'message': 'Cheap',
                'currency': '$'
            },
            'categories': [
                {
                    'id': '4bf58dd8d48988d16d941735',
                    'name': 'Café'
                }
            ],
            'photo': 'https://igx.4sqi.net/img/general/original/102906574_zsN5mRPMSUEQr9AH5QVhlaFnuAbG1gdc9Z2bVm20CHY.jpg',
            'groupName': 'recommended'
        },
        {
            'id': '4d552507e7f1a1cd8bc2f6a4',
            'name': 'Mio',
            'distance': 473,
            'price': {
                'tier': 4,
                'message': 'Cheap',
                'currency': '$'
            },
            'categories': [
                {
                    'id': '4bf58dd8d48988d16d941735',
                    'name': 'Café'
                }
            ],
            'photo': 'https://igx.4sqi.net/img/general/original/102906574_zsN5mRPMSUEQr9AH5QVhlaFnuAbG1gdc9Z2bVm20CHY.jpg',
            'groupName': 'recommended'
        },
        {
            'id': '4d552507e7f1a1cd8bc2f6a4',
            'name': 'Mio',
            'distance': 473,
            'price': {
                'tier': 1,
                'message': 'Cheap',
                'currency': '$'
            },
            'categories': [
                {
                    'id': '4bf58dd8d48988d16d941735',
                    'name': 'Café'
                }
            ],
            'photo': 'https://igx.4sqi.net/img/general/original/102906574_zsN5mRPMSUEQr9AH5QVhlaFnuAbG1gdc9Z2bVm20CHY.jpg',
            'groupName': 'recommended'
        },
        {
            'id': '4d552507e7f1a1cd8bc2f6a4',
            'name': 'Mio',
            'distance': 473,
            'price': {
                'tier': 1,
                'message': 'Cheap',
                'currency': '$'
            },
            'categories': [
                {
                    'id': '4bf58dd8d48988d16d941735',
                    'name': 'Café'
                }
            ],
            'photo': 'https://igx.4sqi.net/img/general/original/102906574_zsN5mRPMSUEQr9AH5QVhlaFnuAbG1gdc9Z2bVm20CHY.jpg',
            'groupName': 'recommended'
        },
        {
            'id': '4d552507e7f1a1cd8bc2f6a4',
            'name': 'Mio',
            'distance': 473,
            'price': {
                'tier': 1,
                'message': 'Cheap',
                'currency': '$'
            },
            'categories': [
                {
                    'id': '4bf58dd8d48988d16d941735',
                    'name': 'Café'
                }
            ],
            'photo': 'https://igx.4sqi.net/img/general/original/102906574_zsN5mRPMSUEQr9AH5QVhlaFnuAbG1gdc9Z2bVm20CHY.jpg',
            'groupName': 'recommended'
        },
        {
            'id': '4d552507e7f1a1cd8bc2f6a4',
            'name': 'Mio',
            'distance': 473,
            'price': {
                'tier': 1,
                'message': 'Cheap',
                'currency': '$'
            },
            'categories': [
                {
                    'id': '4bf58dd8d48988d16d941735',
                    'name': 'Café'
                }
            ],
            'photo': 'https://igx.4sqi.net/img/general/original/102906574_zsN5mRPMSUEQr9AH5QVhlaFnuAbG1gdc9Z2bVm20CHY.jpg',
            'groupName': 'recommended'
        },
        {
            'id': '4d552507e7f1a1cd8bc2f6a4',
            'name': 'Mio',
            'distance': 473,
            'price': {
                'tier': 1,
                'message': 'Cheap',
                'currency': '$'
            },
            'categories': [
                {
                    'id': '4bf58dd8d48988d16d941735',
                    'name': 'Café'
                }
            ],
            'photo': 'https://igx.4sqi.net/img/general/original/102906574_zsN5mRPMSUEQr9AH5QVhlaFnuAbG1gdc9Z2bVm20CHY.jpg',
            'groupName': 'recommended'
        },
        {
            'id': '4d552507e7f1a1cd8bc2f6a4',
            'name': 'Mio',
            'distance': 473,
            'price': {
                'tier': 3,
                'message': 'Cheap',
                'currency': '$'
            },
            'categories': [
                {
                    'id': '4bf58dd8d48988d16d941735',
                    'name': 'Café'
                }
            ],
            'photo': 'https://igx.4sqi.net/img/general/original/102906574_zsN5mRPMSUEQr9AH5QVhlaFnuAbG1gdc9Z2bVm20CHY.jpg',
            'groupName': 'recommended'
        },
        {
            'id': '4d552507e7f1a1cd8bc2f6a4',
            'name': 'Mio',
            'distance': 473,
            'price': {
                'tier': 2,
                'message': 'Cheap',
                'currency': '$'
            },
            'categories': [
                {
                    'id': '4bf58dd8d48988d16d941735',
                    'name': 'Café'
                }
            ],
            'photo': 'https://igx.4sqi.net/img/general/original/102906574_zsN5mRPMSUEQr9AH5QVhlaFnuAbG1gdc9Z2bVm20CHY.jpg',
            'groupName': 'recommended'
        }];
});