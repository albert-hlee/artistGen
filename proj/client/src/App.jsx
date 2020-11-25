import React from 'react';
import axios from 'axios';
import PlaylistMenu from './components/PlaylistMenu.jsx';
import ArtistMenu from './components/ArtistMenu.jsx';
import ArtistResult from './components/ArtistResult.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistResults: [],
      playlistResults: {},
      playlistGenre: '',
      playlistArtist: '',
      playlistMenu: true,
      artistGenre: '',
      musicLike: '',
      showArtistResults: false,
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
    axios.post("/artist", {
      params: {
        genre: this.state.artistGenre,
        artistsLike: this.state.musicLike.split(/[.\-_,]/)
      }
    })
    .then((result) => {
      this.setState({
        artistResults: result.data,
        showArtistResults: !this.state.showArtistResults
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
        <a href="/login">Log In To Spotify</a>
        <h3>AudiGen</h3>
        <form>
          <button name="playlist" onClick={this.changeMenu}>Playlist Menu</button>
          <button name="artist" onClick={this.changeMenu}>Artist Menu</button>
        </form>
        {this.showMenu()}
        {this.state.showArtistResults
        ? <ArtistResult artist={this.state.artistResults[Math.floor(Math.random() * this.state.artistResults.length)]}/>
        : <h5>Click Find New Artists to find out what you might be interested in!</h5>}
      </div>
    )
  }
}

export default App;