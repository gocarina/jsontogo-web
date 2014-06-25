/**
 * Created by Vincent on 29/05/2014.
 */
function MainController($scope, $http, growl, api) {

    $scope.json = "";
    $scope.typeName = "";
    $scope.tags = "json";

    var constants = {
        jsonLintSuccess: "JSON is valid!",
        jsonLintLabelSuccess: "label-success",
        jsonLintLabelError: "label-danger",
        generateErrorTypeNameEmpty: "Name of the Go type is required.",
        generateErrorJsonEmpty: "JSON empty.",

        generateServerError: function(error) {
            return "Server error happened: " + error;
        }
    };

    /**
     * Ask the server for the go struct generated.
     * @param json
     * @param typeName
     * @param tags
     */
    $scope.generate = function (json, typeName, tags) {
        $scope.formatScopeJson(json);
        if (typeName === "") {
            growl.addErrorMessage(constants.generateErrorTypeNameEmpty);
            return;
        }
        if (json === "") {
            growl.addErrorMessage(constants.generateErrorJsonEmpty);
            return;
        }
        $http.post(api.jsonToGo(), {"json": json, "typeName": typeName, "tags": tags.split(";")}).
            success(function (data) {
                $scope.goStruct = data.goType;
            }).
            error(function (data) {
                growl.addErrorMessage(constants.generateServerError(data.error));
            });
    };

    /**
     * Returns the JSON lint result.
     * @param json
     * @returns {*}
     */
    $scope.getJsonLintResult = function (json) {
        if (json === "") {
            return "";
        }
        try {
            var result = jsonlint.parse(json);
            if (result) {
                return constants.jsonLintSuccess;
            }
        } catch (e) {
            return e.message;
        }
    };

    /**
     * Returns the label class (success or danger).
     * @param json
     * @returns {string}
     */
    $scope.getLabelClassForJsonLint = function(json) {
        if ($scope.getJsonLintResult(json) !== constants.jsonLintSuccess) {
            return constants.jsonLintLabelError;
        } else {
            return constants.jsonLintLabelSuccess;
        }
    };

    /**
     * Format the scope JSON code.
     */
    $scope.formatScopeJson = function (json) {
        $scope.json = JSON.stringify(JSON.parse(json), null, 4);
    }
}