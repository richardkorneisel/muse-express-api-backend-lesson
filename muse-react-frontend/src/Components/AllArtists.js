import React, { Component } from 'react';
// import AllArtists from "./AllArtists";
// import ArtistDetail from "./ArtistDetail";
import { Route, Link } from "react-router-dom";

export default class AllArtists extends Component {
    render() {
        const artists = this.props
        console.log("This is render in AllArtists", artists)
        return (
            <h1>Hello</h1>
        )
    }
}