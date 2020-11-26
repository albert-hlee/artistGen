import React from 'react';

const ArtistResult = (props) => (
    <div>
        <h3>{props.artist.name}</h3>
        <img src={props.artist.images[0].url}></img>
        <h3>{props.artist.genres[0].toUpperCase()}</h3>
        <ul>
            <h3>Top Tracks</h3>
            {props.tracks.map(track =>
            <h5>{track.name}</h5>)}
        </ul>
    </div>
)

export default ArtistResult;