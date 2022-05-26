import React, { useContext, useState } from 'react'
import { PropsContext, GridVideo, layout, LocalControls, PinnedVideo, RtcConfigure, TracksConfigure, RtmConfigure } from 'agora-react-uikit'
import 'agora-react-uikit/dist/index.css'
import VirtualBackground from './VirtualBackground'

const App: React.FunctionComponent = () => {
  const [videocall, setVideocall] = useState(true)

  return (
    <div style={styles.container}>
      <div style={styles.videoContainer}>
        <h1 style={styles.heading}>Agora React Web UI Kit</h1>
        {videocall ? (<>
          <PropsContext.Provider value={{
            rtcProps: {
              appId: '<Agora App ID>',
              channel: 'test',
              token: null,
            },
            styleProps: {
              gridVideoContainer: { 'height': '90%' },
              pinnedVideoContainer: { 'height': '90%' }
            },
            callbacks: {
              EndCall: () => setVideocall(false),
            }
          }} >
            <TracksConfigure>
              <VideocallUI />
            </TracksConfigure>
          </PropsContext.Provider>
        </>
        ) : (
          <div style={styles.nav}>
            <h3 style={styles.btn} onClick={() => setVideocall(true)}>Start Call</h3>
          </div>
        )}
      </div>
    </div>
  )
}

const VideocallUI = () => {
  const { rtcProps } = useContext(PropsContext)
  return (
    <RtcConfigure callActive={rtcProps.callActive}>
      <RtmConfigure>
      <div style={styles.containerInner}>
        <VirtualBackground />
      </div>
      {rtcProps?.layout === layout.grid ? <GridVideo /> : <PinnedVideo />}
      <LocalControls />
      </RtmConfigure>
    </RtcConfigure>
  )
}

const styles = {
  container: { width: '100vw', height: '100vh', display: 'flex', flex: 1, backgroundColor: '#007bff22' },
  heading: { textAlign: 'center' as const, marginBottom: 0 },
  videoContainer: { display: 'flex', flexDirection: 'column', flex: 1 } as React.CSSProperties,
  nav: { display: 'flex', justifyContent: 'space-around' },
  btn: { backgroundColor: '#007bff', cursor: 'pointer', borderRadius: 5, padding: 5, color: '#ffffff', fontSize: 20 },
  containerInner: {display: 'flex', flex: 1, alignContent: 'center', alignItems: 'center', marginBottom: 10}
}

export default App