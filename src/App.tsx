import './App.css'
import {Webcam} from "react-webcam-ultimate";
import {useEffect, useState} from "react";

function App() {
  const [cameraType, setCameraType] = useState('user')

  const handleCameraSwitch = () => {
      setCameraType(prevState => prevState === 'user' ? 'environment' : 'user');
  }

  useEffect(() => {
    console.log('Сейчас включена: ', cameraType);
  }, [cameraType])

  return (
    <>
      <h3>Try to fix Samsung camera bug</h3>
      <div className='camera__wrapper'>
        <Webcam className='camera__stream' mirrored={false} frontCamera={cameraType === 'user'} mainCamera={cameraType === 'environment'}>
          {({ getSnapshot }) => (
            <div className='camera__buttons'>
              <button className='button' onClick={handleCameraSwitch}>
                Switch camera
              </button>
              <button className='button' onClick={() => getSnapshot({ quality: 0.8 })}>
                Make photo
              </button>
            </div>
          )}
        </Webcam>

      </div>
    </>
  )
}

export default App
