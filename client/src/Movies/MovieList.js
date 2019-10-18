import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(response => this.setState({ movies: response.data }))
      .catch(error => console.log(error.response));

      this.setState({movies: []});
  }

  //updates - passes two states - can collect input data from user to use Ajax to upload to database
  componentDidUpdate() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(response => this.setState({ movies: response.data }))
      .catch(error => console.log(error.response));
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
