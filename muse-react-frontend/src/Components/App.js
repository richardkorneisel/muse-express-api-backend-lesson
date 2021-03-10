import React, { Component } from 'react';
import AllArtists from "./AllArtists";
// import ArtistDetail from "./ArtistDetail";
import './App.css';
import { Route, Link } from "react-router-dom";
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      artists: []
    }
  }

  componentDidMount = () => {
    const url = 'http://localhost:3000/api/artists'

    axios.get(url).then(response => {
      //console.log(response.data)
      this.setState({
        artists: response.data.artists
      })
    });
  }

  addArtist = (newArtist) => {
    axios.post('http://localhost:3000/api/artists', {
      body: newArtist
    })
      .then(response => {
        console.log(response.data)
      });
  }

  addSong = (newSong) => {
    axios.post('http://localhost:3000/api/:id/newsong', {
      body: newSong
    })
      .then(response => {
        console.log(response.data)
      });
  }

  render() {
    console.log('This is the render in APP', this.state)
    return (
      <div className="App">
        <Route path='/artists'>
          <AllArtists {...this.state} />
        </Route>
        <AllArtists />
      </div>
    );
  }
}

