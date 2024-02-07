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
    <div>
      <h1>Try to fix Samsung camera bug</h1>
      <div className='camera__wrapper'>
        <Webcam mirrored={false} frontCamera={cameraType === 'user'} mainCamera={cameraType === 'environment'}>
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
    </div>
  )
}

export default App
