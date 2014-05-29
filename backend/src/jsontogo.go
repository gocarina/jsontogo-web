package main

import (
	"bytes"
	"github.com/gocarina/jsontogo"
	"github.com/pikanezi/http"
	"fmt"
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
	fmt.Println(object)
	stringWriter := &bytes.Buffer{}
	enc := jsontogo.NewEncoderWithNameAndTags(stringWriter, object.TypeName, object.Tags)
	if err := enc.Encode([]byte(object.JSON)); err != nil {
		return http.NewError(err, 0, 400)
	}
	w.WriteJSON(&GoStruct{stringWriter.String()})
	return nil
}

func main() {
	r := http.NewRouter("http://localhost:63342")

	r.Post("/", jsonToGoHandler)

	http.ListenAndServe(":5432", r)
}
