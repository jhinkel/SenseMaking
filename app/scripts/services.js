'use strict';

angular.module('SenseMakingApp.services', [])
    .factory('API', function ($http) {
        var api = "http://www.johnhinkel.com/SenseMaking/api/";
        return {
            callAylien: function (docNumber) {
                return sessionStorage.callAylien = $http.get(
                    api + "AylienCalls.php?filename=\"" + docNumber + ".txt\""
                );
            },
            getDocKeywordFrequency: function (docNumber, keyword) {
                return sessionStorage.docKeywordFrequency = $http.get(
                    api + "Frequency.php?filename=\"" + docNumber + ".txt\"&keyword=\"" + keyword + "\""
                );
            },
            getDocDates: function () {
                return sessionStorage.docDates = $http.get(
                    api + "dateParser.php"
                );
            },
            getDocNumbers: function () {
                return sessionStorage.docNumbers = $http.get(
                    api + "DocNumbers.php"
                );
            },
            getDocument: function (docNumber) {
                return sessionStorage.document = $http.get(
                    api + "DocFetcher.php?filename=\"" + docNumber + ".txt\""
                );
            }
        };
    });
