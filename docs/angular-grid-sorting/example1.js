
var module = angular.module("example", ["angularGrid"]);

module.controller("exampleCtrl", function($scope, $http) {

    var columnDefs = [
        {displayName: "Athlete", field: "athlete", width: 150},
        {displayName: "Age", field: "age", width: 90},
        {displayName: "Country", field: "country", width: 120},
        {displayName: "Year", field: "year", width: 90},
        {displayName: "Date", field: "date", width: 110, comparator: dateComparator},
        {displayName: "Sport", field: "sport", width: 110},
        {displayName: "Gold", field: "gold", width: 100},
        {displayName: "Silver", field: "silver", width: 100},
        {displayName: "Bronze", field: "bronze", width: 100},
        {displayName: "Total", field: "total", width: 100}
    ];

    function dateComparator(date1, date2) {
        var date1Number = monthToComparableNumber(date1);
        var date2Number = monthToComparableNumber(date2);

        if (date1Number===null && date2Number===null) {
            return 0;
        }
        if (date1Number===null) {
            return -1;
        }
        if (date2Number===null) {
            return 1;
        }

        return date1Number - date2Number;
    }

    // eg 29/08/2004 gets converted to 20040829
    function monthToComparableNumber(date) {
        if (date === undefined || date === null || date.length !== 10) {
            return null;
        }

        var yearNumber = date.substring(6,10);
        var monthNumber = date.substring(3,5);
        var dayNumber = date.substring(0,2);

        var result = (yearNumber*10000) + (monthNumber*100) + dayNumber;
        return result;
    }

    $scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: null,
        enableSorting: true
    };

    $http.get("../olympicWinners.json")
        .then(function(res){
            $scope.gridOptions.rowData = res.data;
            $scope.gridOptions.api.onNewRows();
        });
});
