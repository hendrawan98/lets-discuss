import React, {Component} from 'react'
import { render } from 'react-dom'

import Layout from '@components/common/layout'
import { join, signaling, send } from '@components/pages/conference/room-conference'
import NeatRTC from '@components/pages/conference/room-conference/rtcModul'
import * as serviceWorker from '../serviceworker'

function RoomConference() {
  const [textMessage, setTextMessage] = React.useState('')
  const connected = () => {
    console.log('connected');
  }

  const mediaStreamConnected = () => {
    console.log('stream connected');
  }

  const mediaStreamRemoved = () => {
    console.log('stream removed');
  }
  
  const mediaStreamRemoteRemoved = () => {
    console.log('remote stream removed');
  }

  const datachannelOpen = (channel) => {
    console.log('datachannel open:', channel);
  }

  const datachannelMessage = (channel, message) => {
    console.log('datachannel message:', channel, message);
    setTextMessage(JSON.stringify(message))
  }

  const datachannelError = (channel) => {
    console.log('datachannel error:', channel);
  }

  const datachannelClose = (channel) => {
    console.log('datachannel close:', channel);
  }
  const [config] = React.useState(
    {
      devMode: true,
      videoIdLocal: 'localVideo',
      videoIdRemote: 'remoteVideo',
      videoIdScreen: 'screenVideo',
      connected: connected,
      mediaStreamConnected: mediaStreamConnected,
      mediaStreamRemoved: mediaStreamRemoved,
      mediaStreamRemoteRemoved: mediaStreamRemoteRemoved,
      datachannels: [
        {
          name: 'text',
          callbacks: {
            open: datachannelOpen,
            message: datachannelMessage,
            error: datachannelError,
            close: datachannelClose
          }
        }
      ]
    }
  )
  const [rtc, setRtc] = React.useState(null)
  const [cam, setCam] = React.useState(true)
  const [share, setShare] = React.useState(false)
  const [mute, setMute] = React.useState(false)
  const [client, setClient] = React.useState(1)

  const sendSignalingMessage = (message) => {
    send('signaling', {room: 'testing', message: message});
  }

  const startCamera = () => {
    setCam(!cam)
    rtc.media('start');
  }

  const stopCamera = () => {
    setCam(!cam)
    rtc.media('stop');
  }

  const shareCamera = () => {
    setShare(!share)
    if (share) rtc.media('stopshare')
    else rtc.media('startshare')
  }

  const stopRemoteCamera = () => {
    rtc.media('stopRemote');
    console.log('1')
  }

  const sendText = () => {
    const time = (new Date).toTimeString().slice(0,8);
    rtc.send('text', { time });
  }

  const setMuted = () => {
    setMute(!mute)
    if (mute) rtc.media('start')
    else rtc.media('muted')
  }

  const title = () => {
    const url = window.location.href.split('/')
    const title = url[url.length - 1].split('-').join(' ')
    return title
  }

  React.useEffect(() => {
    setRtc(new NeatRTC(config, sendSignalingMessage))
  }, [])

  React.useEffect(() => {
    if (rtc) {
      // Socket.IO join messages from server
      join('testing', message => {
        const { clientCount } = message;
        setClient(clientCount)
        if (clientCount >= 2) {
          rtc.connect();
        };
      })
      // Socket.IO signaling messages from server
      signaling(message => {
        rtc.handleSignaling(message);
      })
    }
    { rtc && startCamera() }
  }, [rtc])

  React.useEffect(() => {
    if (rtc) {
      if(share) {
        rtc.media('startShare');
      }
    }
  }, [rtc, share])

  return (
    <Layout>
      <h2>{title()}</h2>
      {share ? (<div><video id='screenVideo' width="600" height="350" autoPlay={true} muted></video> <br /></div>) : <div><br /></div>}
      <video id='localVideo' width="300" height="200" autoPlay={true} muted></video>
      <video id="remoteVideo" width="300" height="200" autoPlay={true}></video>
      <br />
      <button onClick={() => shareCamera()}>{share ? 'Stop share screen' : 'Start share screen'}</button>
      {cam ? 
        <button onClick={() => stopCamera()}>Stop camera</button> :
        <button onClick={() => startCamera()}>Start camera</button>
      }
      <button onClick={() => setMuted()}>{mute ? 'Mute' : 'Unmute'}</button>
      <label>Total participant: {client}</label>
      {/* <div className="local-container">
        <h2>Local</h2>
        <video id="localVideo" width="300" height="200" autoPlay={true}></video>
        <button onClick={ () => startCamera() }>Start camera</button>
        <button onClick={ () => stopCamera() }>Stop camera</button>
      </div>
      <div className="remote-container">
        <h2>Remote</h2>
        <video id="remoteVideo" width="300" height="200" autoPlay={true}></video>
        <button onClick={ () => stopRemoteCamera() }>Stop remote stream</button>
      </div> */}
    </Layout>
  )
}

render(
  <RoomConference />, document.getElementById('room-conference')
)