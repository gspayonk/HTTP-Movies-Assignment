import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import {NavLink} from 'react-router-dom';
export default class Movie extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => this.setState({ movie: response.data }))
      .catch(error => console.log(error.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteItem = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <NavLink to={`/update-movie/${this.state.movie.id}`}>
          <button className="update-button">
            Update
          </button>
        </NavLink>

          <button onClick={() => this.deleteItem(this.state.movie.id)} className="delete-button">
            Delete
          </button>

        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
      </div>
    );
  }
}
