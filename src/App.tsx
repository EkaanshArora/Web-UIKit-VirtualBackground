import React, { CSSProperties, useState } from 'react'
import { PropsContext, GridVideo, LocalControls, RtcConfigure, TracksConfigure, RtmConfigure, RemoteMutePopUp, LocalUserContext } from 'agora-react-uikit'
import VirtualBackground from './VirtualBackground'
import 'agora-react-uikit/dist/index.css'

const App: React.FunctionComponent = () => {
  const [videocall, setVideocall] = useState(true)

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Agora React Web UI Kit</h1>
      {videocall ? (
        <>
          <PropsContext.Provider value={{
            rtcProps: {
              appId: '<Agora App ID>',
              channel: 'test',
              token: null,
            },
            callbacks: {
              EndCall: () => setVideocall(false),
            }
          }} >
            <TracksConfigure>
              <RtcConfigure>
                <LocalUserContext>
                  <RtmConfigure>
                    <VirtualBackground />
                    <RemoteMutePopUp />
                    <GridVideo />
                    <LocalControls />
                  </RtmConfigure>
                </LocalUserContext>
              </RtcConfigure>
            </TracksConfigure>
          </PropsContext.Provider>
        </>
      ) : (
        <div style={styles.nav}>
          <h3 style={styles.btn} onClick={() => setVideocall(true)}>Start Call</h3>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: { width: '100vw', height: '100vh', display: 'flex', flex: 1, backgroundColor: '#007bff22', flexDirection: 'column' } as CSSProperties,
  heading: { textAlign: 'center' as const, marginBottom: 0 },
  nav: { display: 'flex', justifyContent: 'space-around' },
  btn: { backgroundColor: '#007bff', cursor: 'pointer', borderRadius: 5, padding: 5, color: '#ffffff', fontSize: 20 }
}

export default App