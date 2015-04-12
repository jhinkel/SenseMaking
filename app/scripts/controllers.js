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

            API.getDocumentsByMonth(month).then(function (documentIds) {


				//How the function below flows: find documentId --> find a specific keyword --> find sentiment & title/author
                for (var documentId in documentIds) {
				$scope.documentId = documentId;
                    API.callAylien(documentId).then(function (response) {
                        angular.extend($scope.keywords, response[0]['keyword']);
						var keywords = response[0]['keyword'];

						for (var keyword in keywords){
							API.getDocKeywordFrequency(documentId, keyword).then(
								$scope.SetDocContents = function SetDocContents(frequency){
										var polarity = "positive";
										var sentiment = Math.random();
										var r = Math.ceil (255 * sentiment);
										var g = Math.ceil (255 * sentiment);
										var b = Math.ceil (255 * sentiment);
										window.str = "AHS principal talks about course changes Story by: John Panni Date Published to Web: 4/1/2004"
										window.GetTitleIndex = str.indexOf("Story");
										window.GetAuthorIndex = str.indexOf("Date");
										window.GetPublishDate = str.indexOf("Web:");
										window.GetPublishDateStop = str.indexOf("2004");
										window.title = str.substring(0, GetTitleIndex);
										window.author = str.substring(GetAuthorIndex,GetTitleIndex);
										window.publishDate = str.substring(GetPublishDate + 4, GetPublishDateStop + 4);
										document.getElementById("title1").innerHTML = title;
										document.getElementById("AuthorAndPublishDate1").innerHTML = author + "|" + publishDate;
										if (polarity = "positive"){
											g += 150;
											console.log(sentiment);
											document.getElementById("sentiment").style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
										}//if positive

										else {
											r += 150;
											console.log(polarity);
											document.getElementById("sentiment").style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
											}//else
									}//function SetSentiment


							); //API.getDocKeywordFrequency

						}//for(keyword in keywords)
					});//API.callAylien(documentId), then
				}//for



			});//API.getDocumentsByMonth



		}//setCurrentMonth

        $scope.setCurrentKeyword = function (keyword) {
            $scope.currentKeyword = keyword;

            API.getDocument(keyword).then(function (documents) {
                $scope.documents = documents;
            });

            API.getFrequencyByMonth(keyword).then(function (frequencies) {
                chart.load({
                    columns: [
                        [keyword].concat(frequencies)
                    ],
                    type: 'line'
                });
            });
        };

        API.getDocDates().then(function (data) {
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
