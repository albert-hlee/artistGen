import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {}
    }
    this.getInformation = this.getInformation.bind(this);
  }

  getInformation() {
    axios.get("/playlists", (res) => {
      this.setState({
        result: res.data
      })
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.getInformation}>Generate New Playlist</button>
      </div>
    )
  }
}

export default App;