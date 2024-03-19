import axios from "axios"


const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjQ2Mjc5OWZhYjU3NDcwMmZmM2U4NDY0NzczNzIzZiIsInN1YiI6IjY1ZjI3ZGRmNWE3ODg0MDE2M2Q3MzZiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3esTOngfbA_nVzuwsXi0SlJS2g-a5PMnrMyXCJtS3X0",
  },
});

export default instance