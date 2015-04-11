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

        $scope.setCurrentMonth = function(month) {
            $scope.currentMonth = month;

            API.getDocNumbers().then(function(response) {
                $scope.keywords = response;
            });
        };
    })

    .controller('ChartCtrl', function ($scope) {
        d3.json("date.json", function(data){ //data in function(data) is data in date.json
            var DateArray = [];
            var MonthArray = [];
            var MonthXAxis = $scope.months;
            var counts = {};
            var CountsArray = [];
            for(var key in data) {
                DateArray.push(data[key]);
                console.log(DateArray);
                //alert (typeof data);
            }

            for(var key in DateArray) {
                var month_temp = DateArray[key][5]+DateArray[key][6];
                MonthArray.push(month_temp);
            }
            console.log(MonthArray);

            for (var i = 0; i< MonthArray.length; i++){
                var num = MonthArray[i];
                counts[num] = counts[num] ? counts[num]+1 : 1;
            }
            console.log(counts);

            //Push month counts into CountsArray
            for (var key in counts){
                CountsArray.push(counts[key]);
                console.log(CountsArray);
            }
            console.log(CountsArray);

            <!--C3 Scatterplot-->
            //var keyData = fetchData('keys.json'); {Jan, feb, mar...}
            //var valueData = fetchData('values.json'); {20,40,50,...}
            //var combinedData = {};
            //for (key in keyData) {
            //for (value in ValueData) {
            //combinedData[key] = value;
            //}
            //}
            var AllDocNumber = ['AllDocCounts'];
            console.log(CountsArray);
            AllDocNumber = AllDocNumber.concat(CountsArray);

            window.Keyword1 = ['Keyword1'];
            window.jsondata = [30, 20, 5, 4, 6, 5, 20, 6, 10, 20, 10, 12];
            window.Testdata = [1,2,3,4,5,6,7,8,9,10,11,12];


            function graphregenerate(){
                Keyword1 = Testdata;
                alert(Keyword1);
            }
            Keyword1 = Keyword1.concat(jsondata);

            var columns = [
                AllDocNumber,
                Keyword1,
                ['Keyword2', 20, 13, 9, 24, 13, 22, 4, 5, 7, 17, 12, 10],
                ['Keyword3', 30, 20, 15, 4, 2, 25, 40, 10, 12, 23, 20, 10],
                ['Keyword4', 20, 13, 9, 24, 13, 22, 10, 23, 50, 10, 45, 30],
                ['Keyword5', 13, 12, 15, 10, 16, 15, 40, 12, 40, 13, 3, 20]
            ];

            window.chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: columns,
                    type: 'bar',
                    types: {
                        Keyword1: 'spline',
                        Keyword2: 'spline',
                        Keyword3 : 'spline',
                        Keyword4 : 'spline',
                        Keyword5 : 'spline',
                    },

                    groups: [
                        ['Keyword1','Keyword2']
                    ]
                },//data
                color: {pattern: ['#FFCC66', '#B8B8B8 ', '#B8B8B8 ', '#B8B8B8 ', '#B8B8B8', '#B8B8B8']},//color
                axis: {
                    x: {
                        type: 'category',
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    }
                },//Axis
                zoom: {enabled: true}
            }); //c3 ends
        }); //d3. ends
    }); //TrendLineCtrl ends
