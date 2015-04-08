var app = angular.js.module("MonthControllerApp",[]);

app.service("MonthControllerService", function($http, $q){

	var deferred = $q.defer(); //$q means "I am going to do this later"
	$http.get('http://johnhinkel.com/SenseMaking/api/AylienCalls.php?filename=%221101162433811.txt').then(function(data)
	{
		deferred.resolve(data);
	});
	this.getPlayers = function ()
	{
		return deferred.promise;
	}
})

.controller("MonthController", function($scope, MonthControllerService)
{
	var promise = MonthControllerService.getPlayers();
	promise.then(function(data)
	{
		$scope.organization = data;
		console.log($scope.organization);

	});

})