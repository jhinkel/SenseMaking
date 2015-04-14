'use strict';

/**
 * @ngdoc function
 * @name senseMakingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the senseMakingApp
 */
angular.module('SenseMakingApp.controllers', [])
    .controller('MainCtrl', function ($scope, $log, API) {
        $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


        $scope.setCurrentMonth = function (month) {
            $scope.currentMonth = month;
            $scope.keywords = {};

            console.log('fetching documents in ' + month);
            API.getDocumentsByMonth(month).then(function (documentIds) {
                console.log('fetched ' + documentIds.length + ' documents in ' + month);
                function intersect(a, b) {
                    var t;
                    var intersect = [];
                    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
                    return a.filter(function (e) {
                        if (b.indexOf(e) !== -1) return true;
                    });
                }
                console.log('fetching documents containing \'Obituaries\'');
                API.getDocumentsByKeyword("Obituaries").then(function (ObituraryIDs){
                    console.log('fetched ' + ObituraryIDs.length + ' containing \'Obituaries\'');
                    $scope.obituraries = [];
                    intersect = intersect(ObituraryIDs, documentIds);
                    angular.forEach(intersect, function(obiturary) {
                        API.getDocument(obiturary).then(function(obiturary){
                            $scope.obituraries.push(obiturary);
                        });
                    });
                });

                //How the function below flows: find documentId --> find a specific keyword --> find sentiment & title/author
                console.log('analyzing documents...');
                angular.forEach(documentIds, function(documentId) {
                    API.callAylien(documentId).then(function(response) {
                        var keywords = response[0]['keyword'];
						alert ('got keywords');
						var AylienCallResponse = {};
						 AylienCallResponse = response;
						console.log('response'); 
                        angular.extend($scope.keywords, keywords);
                    });//API.callAylien(documentId), then
                });//for
            });//API.getDocumentsByMonth
        }//setCurrentMonth

        $scope.setCurrentKeyword = function (keyword) {
            $scope.currentKeyword = keyword;
            $scope.documents = [];

            console.log('fetching documents with keyword \'' + keyword + '\'');
            API.getDocumentsByKeyword(keyword).then(function (documents) {
                console.log('fetched ' + documents.length + ' documents with keyword \'' + keyword + '\'');
                angular.forEach(documents, function(documentId) {
                    API.getDocument(documentId).then(function(body) {
                        var polarity = "positive"; // TO DO: extrac document polarity from http://johnhinkel.com/SenseMaking/api/AylienCalls.php?filename=1101162433811 
                        var sentiment = Math.random();
                        var r = Math.ceil (255 * sentiment);
                        var g = Math.ceil (255 * sentiment);
                        var b = Math.ceil (255 * sentiment);
                        if (polarity = "positive"){
                            g += 150;
                        } else {
                            r += 150;
                        }
                        $scope.documents.push({
                            'byline': body.substring(0, 0),
                            'body': body,
                            'id': documentId,
                            'sentimentCSS':  'background-color: rgb(' + r + ',' + g + ',' + b + ')'
                        });
                    });
                });
            });

            console.log('fetching frequency of keyword \'' + keyword + '\'');
            API.getFrequencyByMonth(keyword).then(function (frequencies) {
                console.log('\'' + keyword + '\' frequency: ' + frequencies);
                chart.load({
                    columns: [
                        [keyword].concat(frequencies)
                    ],
                    type: 'line'
                });
            });
        };

        console.log('fetching document metadata');
        API.getDocDates().then(function (data) {
            console.log('fetched document metadata');
            var DateArray = [];
            var MonthArray = [];
            var MonthXAxis = $scope.months;
            var counts = {};
            var CountsArray = [];
            for (var key in data) {
                DateArray.push(data[key]);
            }

            for (var key in DateArray) {
                var month_temp = DateArray[key][5] + DateArray[key][6];
                MonthArray.push(month_temp);
            }

            for (var i = 0; i < MonthArray.length; i++) {
                var num = MonthArray[i];
                counts[num] = counts[num] ? counts[num] + 1 : 1;
            }

            //Push month counts into CountsArray
            for (var key in counts) {
                CountsArray.push(counts[key]);
            }

            <!--C3 Scatterplot-->
            //var keyData = fetchData('keys.json'); {Jan, feb, mar...}
            //var valueData = fetchData('values.json'); {20,40,50,...}
            //var combinedData = {};
            //for (key in keyData) {
            //for (value in ValueData) {
            //combinedData[key] = value;
            //}

            window.chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        ['AllDocCounts'].concat(CountsArray)
                    ],
                    type: 'bar',
                    axes: {
                        'AllDocCounts': 'y2'
                    }
                },
                color: {
                    pattern: ['#FFCC66', '#B8B8B8 ', '#B8B8B8 ', '#B8B8B8 ', '#B8B8B8', '#B8B8B8']
                },
                axis: {
                    x: {
                        type: 'category',
                        categories: $scope.months
                    },
                    y: {
                        label: {
                            text: 'Number of documents',
                            position: 'outer-middle'
                        }
                    },
                    y2: {
                        show: true,
                        label: {
                            text: 'Frequency of keyword',
                            position: 'outer-middle'
                        }
                    }
                },
                zoom: {
                    enabled: true
                },
                //tooltip
                tooltip: {
                    grouped: false,
                    format: {
                        title: function (d) {
                            return "Frequency";
                        },
                        value: function (value, ratio, id) {
                            var format = id === 'data1' ? d3.format(',') : d3.format("");
                            return format(value);
                        }
                        // =           value: d3.format(',') // apply this format to both y and y2
                    }
                }
            }); //c3 ends
        }); //API.getDocDates ends
    }); //controller ends
