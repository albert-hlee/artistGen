import React from 'react';

const PlaylistResults = (props) => (
  <div>
    <h3>Check these new playlists out!</h3>
    <div>
      {props.playlists.map(playlist =>
        <Playlist playlist={playlist}/>)}
    </div>
  </div>
)

export default PlaylistResults;