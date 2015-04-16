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
        $scope.show_modal = false;

        $scope.setCurrentMonth = function (month) {
            $scope.currentMonth = month;
            $scope.keywords = [];
            $scope.currentDocumentsInfo = {};

            function intersect(a, b) {
                var t;
                var intersect = [];
                if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
                return a.filter(function (e) {
                    if (b.indexOf(e) !== -1) return true;
                });
            }
            function arrayUnique(array) {
                var a = array.concat();
                for(var i=0; i<a.length; ++i) {
                    for(var j=i+1; j<a.length; ++j) {
                        if(a[i] === a[j])
                            a.splice(j--, 1);
                    }
                }
                return a;
            }

            console.log('fetching documents in ' + month);
            API.getDocumentsByMonth(month).then(function (docIdsForMonth) {
                $scope.docIdsForMonth = docIdsForMonth;
                console.log('fetched ' + docIdsForMonth.length + ' documents in ' + month);
                console.log('fetching documents containing \'Obituaries\'');
                API.getDocumentsByKeyword("Obituaries").then(function (obituraryIDs){
                    console.log('fetched ' + obituraryIDs.length + ' containing \'Obituaries\'');
                    $scope.obituraries = [];
                    var obituraryIdsForMonth = intersect(obituraryIDs, docIdsForMonth);
                    angular.forEach(obituraryIdsForMonth, function(obituraryId) {
                        API.getDocument(obituraryId).then(function(obiturary){
                            $scope.obituraries.push({
                                'title': 'Obiturary', //body is the full document body
                                //'author':body.substring(
                                'body': obiturary.substring(0, 80)
                            });
                        });
                    });
                });

                //How the function below flows: find documentId --> find a specific keyword --> find sentiment & title/author
                console.log('analyzing documents...');
                $scope.currentDocumentsInfo = {};
                angular.forEach(docIdsForMonth, function(documentId) {
                    API.callAylien(documentId).then(function(response) {
                        $scope.currentDocumentsInfo[documentId] = response;
                        var keywords = response[0]['keyword'];
                        $scope.keywords = arrayUnique($scope.keywords.concat(keywords));
                    });//API.callAylien(documentId), then
                });//for
            });//API.getDocumentsByMonth
        };//setCurrentMonth

        $scope.setCurrentKeyword = function (keyword) {
            $scope.currentKeyword = keyword;
            $scope.documents = [];

            console.log('fetching documents with keyword \'' + keyword + '\'');
            API.getDocumentsByKeyword(keyword).then(function (docIdsForKeyword) {
                function intersect(a, b) {
                    var t;
                    var intersect = [];
                    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
                    return a.filter(function (e) {
                        if (b.indexOf(e) !== -1) return true;
                    });
                }
                $scope.docIdsForSelection = intersect(docIdsForKeyword, $scope.docIdsForMonth);
                console.log('fetched ' + $scope.docIdsForSelection.length + ' documents for the month with keyword \'' + keyword + '\'');
                angular.forEach($scope.docIdsForSelection, function(documentId) {
                    API.getDocument(documentId).then(function(body) {
                        var polarity = $scope.currentDocumentsInfo[documentId].polarity;
                        var h = ("negative" === polarity) ? '0' : '120';
                        var s = '100%';
                        var confidence = $scope.currentDocumentsInfo[documentId].polarityConfidence;
                        var l = (100 - (confidence * 50)) + '%';
                        $scope.documents.push({
                            'title': body.substring(0, body.indexOf("Date")), //body is the full document body
							//'author':body.substring(
							'date': body.substring(body.indexOf("Web:")+ 4, body.indexOf("2004")+4),
                            'body': body.substring(body.indexOf("2004") + 4, 80),
                            'fullBody': body,
                            'id': documentId,
                            'sentimentCSS':  'background-color: hsl(' + h + ',' + s + ',' + l + ')'
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

        $scope.copyContent = function(event) {
            var thing = event.currentTarget.parentNode;
            var newThing = thing.cloneNode(true);
            document.querySelector('#pinboard').appendChild(newThing);
        };

        $scope.openModal = function(event) {
            var documentId = event.currentTarget.parentNode.parentNode.getAttribute('data-documentId');
            API.getDocument(documentId).then(function(body) {
                $scope.currentDocumentBody = body;
                $scope.show_modal = true;
            });
        };

        $scope.closeModal = function(){
            $scope.show_modal = false;
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
                            position: 'outer-top',

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
