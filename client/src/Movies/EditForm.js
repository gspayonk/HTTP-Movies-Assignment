import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditForm(props) {

  //props
  const initialItem = {
    id: props.match.params.id,
    title: "",
    director: "",
    metascore: ""
  };

  //setting states
  const [item, setItem] = useState(initialItem);
  const [stars, setStars] = useState([]);

  const id = props.match.params.id;

  const handleTextInput = event => {
    event.preventDefault();
    let value = event.target.value;
    setItem({
      ...item,
      [event.target.name]: value
    });
  };

  const movieInfo = {...item, ...stars}
  console.log(movieInfo)

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieInfo)
      .then(response => {
        console.log(response);
        setItem(initialItem);
        props.history.push('/item-list');
      })
      .catch(error => console.log(error.response));
  };

  const handleAddStars = event => {
    event.preventDefault();
    let value = event.target.value;
    setStars({
      ...stars,
      [event.target.name]: [event.target.value]
    });
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleTextInput}
          placeholder="title"
          value={item.title}
        />
        <div/>

        <input
          type="text"
          name="director"
          onChange={handleTextInput}
          placeholder="director"
          value={item.director}
        />
        <div/>

        <input
          type="text"
          name="metascore"
          onChange={handleTextInput}
          placeholder="metascore"
          value={item.metascore}
        />
        <div/>

        <input
          type="array"
          name="stars"
          onChange={handleAddStars}
          placeholder="stars"
        />
        <button>Update</button>
      </form>
    </div>
  );
}