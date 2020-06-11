import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const deleteMovie = (movie) => {
    axios
        .delete(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then(res => {
        })
        .catch(err => {
          console.log(err)
        })
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${movie.id}`}>
        <button className='edit-button'>Edit</button>
      </Link>
      <button className='delete-button' onClick = {deleteMovie}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
