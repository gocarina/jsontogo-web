/**
 * Created by Vincent on 29/05/2014.
 */
function MainController($scope, $http, growl) {
    $scope.json = "";
    $scope.typeName = "";
    $scope.tags = "json;";

    $scope.generate = function (json, typeName, tags) {
        console.log(typeName);
        if (typeName == "") {
            growl.addErrorMessage("Name of the Go type is required")
            return
        }
        $http.post("http://localhost:5432", {"json": json, "typeName": typeName, "tags": tags.split(";")}).
            success(function (data) {
                $scope.goStruct = data.goType;
            }).
            error(function () {
                growl.addErrorMessage("Server error happened")
            });
    }
}