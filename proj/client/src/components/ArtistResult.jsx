import React from 'react';

const ArtistResult = (props) => (
    <div>
        {console.log(props.artist)}
        <h3>{props.artist.name}</h3>
        <img src={props.artist.images[0].url}></img>
        <h3>{props.artist.genres[0].toUpperCase()}</h3>
    </div>
)

export default ArtistResult;