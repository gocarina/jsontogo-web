
app.factory('api', function() {
    var apiHost = "http://jsontogo.com/api/";
    var jsonToGo = apiHost + "json";
    return {
        jsonToGo: function() {
            return jsonToGo;
        }
    };
});