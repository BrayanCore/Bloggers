package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type Blogger struct {
	ID      int    `json: id`
	Name    string `json: name`
	Website string `json: website`
	Email   string `json: email`
	Friends []int  `json: friends`
	Picture string `json: picture_url`
}

type Bloggers []Blogger

var id int = 3

var bloggers = Bloggers{
	{
		ID:      1,
		Name:    "Juan Perez",
		Website: "juanperez.io",
		Picture: "https://placekitten.com/200/300",
		Email:   "conact@juanperez.io",
		Friends: []int{1},
	},
	{
		ID:      2,
		Name:    "Amano Pikamee",
		Website: "pikamee.io",
		Picture: "https://placekitten.com/200/300",
		Email:   "contact@pikamee.io",
		Friends: []int{11},
	},
	{
		ID:      3,
		Name:    "Tony Stark",
		Website: "tonystark.io",
		Picture: "https://placekitten.com/200/300",
		Email:   "contact@tonystark.io",
		Friends: []int{1, 2},
	},
}

func main() {

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", IndexRoute)
	router.HandleFunc("/bloggers", GetBloggers).Methods("GET")
	router.HandleFunc("/blogger/{id}", GetBlogger).Methods("GET")
	router.HandleFunc("/blogger", CreateBlogger).Methods("POST")
	router.HandleFunc("/blogger/{id}", UpdateBlogger).Methods("PUT")
	log.Fatal(http.ListenAndServe(":3000", router))

}

func IndexRoute(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to my API BLOGG")
}

func GetBloggers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(bloggers)
}

func GetBlogger(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		fmt.Fprintf(w, "ID no valid")
		return
	}

	for _, value := range bloggers {
		if value.ID == id {
			json.NewEncoder(w).Encode(value)
		}
	}

}

func CreateBlogger(w http.ResponseWriter, r *http.Request) {
	var newBlogger Blogger
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Insert valid data")
	}

	json.Unmarshal(reqBody, &newBlogger)
	id = id + 1
	newBlogger.ID = id

	bloggers = append(bloggers, newBlogger)

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newBlogger)

}

func UpdateBlogger(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	var updatedBlogger Blogger

	if err != nil {
		fmt.Fprintf(w, "Invalid ID")
	}

	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Please Enter Valid Data")
	}

	json.Unmarshal(reqBody, &updatedBlogger)

	for index, blogger := range bloggers {
		if blogger.ID == id {
			bloggers = append(bloggers[:index], bloggers[index+1:]...)

			updatedBlogger.ID = blogger.ID
			bloggers = append(bloggers, updatedBlogger)

			fmt.Fprintf(w, "Blogger %v has been updated successfully", blogger.Name)
		}
	}

}
