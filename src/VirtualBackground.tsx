import VirtualBackgroundExtension, { IVirtualBackgroundProcessor } from "agora-extension-virtual-background";
import AgoraRTC from 'agora-rtc-sdk-ng';
import { TracksContext } from 'agora-react-uikit';
import { useContext, useEffect, useState, useCallback, useRef } from 'react';

const VirtualBackground = () => {
  const [isStreaming, setStreaming] = useState(false);
  const [isBtnDisabled, setBtnDisabled] = useState(false)
  const { localVideoTrack } = useContext(TracksContext)
  const ext = useRef(new VirtualBackgroundExtension())
  const processor = useRef<IVirtualBackgroundProcessor>();

  useEffect(() => {
    const func = async () => {
      AgoraRTC.registerExtensions([ext.current]);
      processor.current = ext.current.createProcessor()
      await processor.current.init('https://ekaansharora.github.io/test-wasm-host/')
    }
    func()
  }, [])

  const enableBackground = async () => {
    if (processor.current && localVideoTrack) {
      setBtnDisabled(true)
      localVideoTrack.pipe(processor.current).pipe(localVideoTrack.processorDestination);
      processor.current.setOptions({ type: 'color', color: '#ff00ff' });
      await processor.current.enable();
      setStreaming(true)
      setBtnDisabled(false)
    }
  }

  const disableBackground = async () => {
    if (processor.current) {
      setBtnDisabled(true)
      localVideoTrack?.unpipe()
      await processor.current.disable()
      setStreaming(false)
      setBtnDisabled(false)
    }
  }

  return (
    <div style={isBtnDisabled ? disabledBtn : btn} onClick={() => {
      if (!isBtnDisabled) {
        console.log(isStreaming)
        isStreaming ? disableBackground() : enableBackground()
      }
    }}>
      {isBtnDisabled ? 'Working...' : isStreaming ? 'Disable Virtual Background' : 'Enable Virtual Background'}
    </div>
  )
}

const btn = { backgroundColor: '#007bff', cursor: 'pointer', borderRadius: 5, padding: 5, color: '#ffffff', fontSize: 20, margin: 'auto', paddingLeft: 10, paddingRight: 10 }
const disabledBtn = { backgroundColor: '#007bff55', borderRadius: 5, padding: 5, color: '#ffffff', fontSize: 20, margin: 'auto', paddingLeft: 20, paddingRight: 20 }

export default VirtualBackground;
