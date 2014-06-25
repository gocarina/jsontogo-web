package main

import (
	"bytes"
	"github.com/gocarina/jsontogo"
	"github.com/pikanezi/http"
	"log"
)

const (
	domainCORS = "http://localhost:63337"
)

type GoStruct struct {
	Type string `json:"goType"`
}

type ObjectReceived struct {
	JSON     string   `json:"json"`
	TypeName string   `json:"typeName"`
	Tags     []string `json:"tags"`
}

func jsonToGoHandler(w http.ResponseWriter, r *http.Request) *http.Error {
	object := &ObjectReceived{}
	if err := r.GetJSONObject(&object); err != nil {
		return http.NewError(err, 0, 400)
	}
	stringWriter := &bytes.Buffer{}
	enc := jsontogo.NewEncoderWithNameAndTags(stringWriter, object.TypeName, object.Tags)
	if err := enc.Encode([]byte(object.JSON)); err != nil {
		return http.NewError(err, 0, 400)
	}
	w.WriteJSON(&GoStruct{stringWriter.String()})
	return nil
}

func main() {
	r := http.NewRouter()
	r.SetCustomHeader(http.Header{
		"Access-Control-Allow-Origin":      domainCORS,
		"Access-Control-Allow-Methods":     "POST, GET, OPTIONS, PUT, DELETE",
		"Access-Control-Allow-Headers":     "Content-Type, Authorization, Accept, x-api-key",
		"Access-Control-Allow-Max-Age":     "604800",
		"Access-Control-Allow-Credentials": "true",
	})

	r.Post("/json", jsonToGoHandler)

	log.Fatal(http.ListenAndServe(":5432", r))
}
