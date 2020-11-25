import React from 'react';

const ArtistMenu = (props) => (
  <div>
    <h3>Sending You Artists You Might Like</h3>
    <form>
      <label>Genre: </label>
      <input name="artistGenre" onChange={props.changeInputs} placeholder="EDM, Country, Rock, etc."></input>
      <label>Music Like: </label>
      <input name="musicLike" onChange={props.changeInputs} placeholder="Illenium, Bon Jovi, etc."></input>
      <button onClick={props.getArtistInfo}>Find New Artists!</button>
    </form>
  </div>
)

export default ArtistMenu;