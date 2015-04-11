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
                        return {"organization":["Alderwood City Council","Alderwood High School","Hospital","United Methodist Church"],"location":["Tacoma","Washington","Centennial Square"],"keyword":["teachers in Alderwood","Alderwood City","City of Alderwood","teachers don t help fix schools","school year","Alderwood","teachers","City","years","great","Panni","programs","schools","people","Blood","units","recreation","life","money","Washington"],"date":["Monday","Election","summer","last year","Saturday","Jan. 4"],"money":["$30,000","$10,000"],"person":["John Sarducci","John Panni","Aiken","Steve Evanswill","Steve Evans","Evans Olivas","Ron Olivas","Christine Gregoire","Rita Blunk","Bob Story","Max","Ella Mae Lochner","Myrtis Lang","Alice Benedetti","Phyllis Morris","Trude Meadowcroft","Letha Grubb","Lu Ann Roach","Nita Coleman","Ruth Stark","Marie Handy"]};
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
