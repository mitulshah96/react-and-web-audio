import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      audio: null
    }
  }

  toggleMicrophone = () => {
    const { audio } = this.state;
    if (audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  };

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  };

  stopMicrophone() {
    const { audio } = this.state;
    audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  };

  render() {
    const { audio } = this.state;
    return (
      <div className="App">
        <div className="controls">
          <button onClick={this.toggleMicrophone}>
            {audio ? 'Stop microphone' : 'Get microphone input'}
          </button>
        </div>
        {audio ? <AudioAnalyser audio={audio} /> : ''}
      </div>
    );
  }
}

export default App;
