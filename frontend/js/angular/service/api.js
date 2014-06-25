
app.factory('api', function() {
    var apiHost = "http://localhost:5432";
    var jsonToGo = apiHost + "json";
    return {
        jsonToGo: function() {
            return jsonToGo;
        }
    };
});