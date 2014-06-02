/**
 * Created by Vincent on 29/05/2014.
 */
function MainController($scope, $http, growl, api) {
    $scope.json = "";
    $scope.typeName = "";
    $scope.tags = "json";

    $scope.generate = function (json, typeName, tags) {
        if (typeName == "") {
            growl.addErrorMessage("Name of the Go type is required.");
            return;
        }
        if (json == "") {
            growl.addErrorMessage("JSON empty.");
            return;
        }
        $http.post(api.jsonToGo(), {"json": json, "typeName": typeName, "tags": tags.split(";")}).
            success(function (data) {
                $scope.goStruct = data.goType;
            }).
            error(function (data) {
                growl.addErrorMessage("Server error happened: " + data.error);
            });
    }
}