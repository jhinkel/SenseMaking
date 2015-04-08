'use strict';

angular.module('SenseMakingApp.services', [])
    .factory('API', function ($http) {
        var api = "http://www.johnhinkel.com/SenseMaking/api/";
        return {
            callAylien: function (docNumber) {
                return $http.get(api + "AylienCalls.php?filename=\"" + docNumber + ".txt\"").then(
                    function (response) {
                        sessionStorage.setItem('Aylien', JSON.stringify(response));
                        return JSON.parse(sessionStorage.getItem('Aylien'));
                    },
                    function (httpError) {
                        throw httpError.status + " : " + httpError.data;
                    }
                );
            },
            getDocKeywordFrequency: function (docNumber, keyword) {
                return $http.get(api + "Frequency.php?filename=\"" + docNumber + ".txt\"&keyword=\"" + keyword + "\"").then(
                    function (response) {
                        sessionStorage.setItem('docKeywordFrequency', JSON.stringify(response));
                        return JSON.parse(sessionStorage.getItem('docKeywordFrequency'));
                    },
                    function (httpError) {
                        throw httpError.status + " : " + httpError.data;
                    }
                );
            },
            getDocDates: function () {
                return $http.get(api + "dateParser.php").then(
                    function (response) {
                        sessionStorage.setItem('docDates', JSON.stringify(response));
                        return JSON.parse(sessionStorage.getItem('docDates'));;
                    },
                    function (httpError) {
                        throw httpError.status + " : " + httpError.data;
                    }
                );
            },
            getDocNumbers: function () {
                return $http.get(api + "DocNumbers.php").then(
                    function (response) {
                        sessionStorage.setItem('docNumbers', JSON.stringify(response));
                        return JSON.parse(sessionStorage.getItem('docNumbers'));
                    },
                    function (httpError) {
                        throw httpError.status + " : " + httpError.data;
                    }
                );
            },
            getDocument: function (docNumber) {
                return $http.get(api + "DocFetcher.php?filename=\"" + docNumber + ".txt\"").then(
                    function (response) {
                        sessionStorage.setItem('document', JSON.stringify(response));
                        return JSON.parse(sessionStorage.getItem('document'));
                    },
                    function (httpError) {
                        throw httpError.status + " : " + httpError.data;
                    }
                );
            }
        };
    });
