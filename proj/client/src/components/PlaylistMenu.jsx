import React from 'react';

const PlaylistMenu = (props) => (
  <div>
    <h3>Playlist Generator</h3>
    <form>
      <label>Genre: </label>
      <input name="playlistGenre" onChange={props.changeInputs} placeholder="EDM, Country, Rock, etc."></input>
      <label>Artists Like: </label>
      <input name="artistsLike" onChange={props.changeInputs} placeholder="Illenium, Bon Jovi, etc."></input>
      <button onClick={props.getNewPlaylists}>Find New Playlists!</button>
    </form>
  </div>
)

export default PlaylistMenu;