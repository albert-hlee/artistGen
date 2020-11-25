import React from 'react';
import axios from 'axios';
import PlaylistMenu from './components/PlaylistMenu.jsx';
import ArtistMenu from './components/ArtistMenu.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistResult: {},
      playlistResults: {},
      playlistGenre: '',
      playlistArtist: '',
      playlistMenu: true,
      artistGenre: '',
      musicLike: ''
    }
    this.getArtistInfo = this.getArtistInfo.bind(this);
    this.changeInputs = this.changeInputs.bind(this);
    this.getNewPlaylists = this.getNewPlaylists.bind(this);
    this.changeMenu = this.changeMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  // logIn() {
  //   axios.get("/login")
  //   .then((result) => {
  //     console.log(result.data);
  //   })
  // }
  showMenu() {
    if (this.state.playlistMenu) {
      return (
        <PlaylistMenu changeInputs={this.changeInputs} getNewPlaylists={this.getNewPlaylists}/>
      )
    } else {
      return (
        <ArtistMenu changeInputs={this.changeInputs} getArtistInfo={this.getArtistInfo}/>
      )
    }
  }

  changeMenu(event) {
    event.preventDefault();
    if (event.target.name === "playlist") {
      if (!this.state.playlistMenu) {
        this.setState({
          playlistMenu: true
        })
      }
    } else {
      if (this.state.playlistMenu) {
        this.setState({
          playlistMenu: false
        })
      }
    }
  }

  changeInputs(event) {
    event.preventDefault();
    if (event.target.name === "playlistGenre") {
      this.setState({
        playlistGenre: event.target.value
      })
    } else if (event.target.name === "artistsLike") {
      this.setState({
        playlistArtist: event.target.value
      })
    } else if (event.target.name === "artistGenre") {
      this.setState({
        artistGenre: event.target.value
      })
    } else {
      this.setState({
        musicLike: event.target.value
      })
    }
  }

  getNewPlaylists(event) {
    event.preventDefault();
    axios.post("/playlists", {
      genre: this.state.playlistGenre,
      artistsLike: this.state.playlistArtist
    })
    .then(result => {
      this.setState({
        playlistResults: result.data
      })
    })
  }

  getArtistInfo(event) {
    event.preventDefault();
    axios.post("/artist")
    .then((result) => {
      this.setState({
        artistResult: result.data
      })
    })
  }

  // componentDidMount() {
  //   // this.logIn();
  //   // this.getArtistInfo();
  // }


  render() {
    return (
      <div>
        {/* <button onClick={this.getInformation}>Generate New Playlist</button>
        <a href="/login">Log In To Spotify</a>
        <h3>{this.state.artistResult.name}</h3>
        {this.state.artistResult.images
        ? <img src={this.state.artistResult.images[0].url}></img>
        : <h3>No Image!</h3>
        }
        {this.state.artistResult.genres
        ? <h3>{this.state.artistResult.genres[0].toUpperCase()}</h3>
        : <h3>boo</h3>
      } */}
        <h3>AudiGen</h3>
        <form>
          <button name="playlist" onClick={this.changeMenu}>Playlist Menu</button>
          <button name="artist" onClick={this.changeMenu}>Artist Menu</button>
        </form>
        {this.showMenu()}
      </div>
    )
  }
}

export default App;