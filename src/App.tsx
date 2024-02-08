import {useState} from "react";
import {
  Heading,
  useDisclosure, Switch, Center
} from '@chakra-ui/react'
import {ModalWithImage} from "./modalWithImage/modalWithImage";
import {WithLib} from "./withLib/withLib";
import {Loader} from "./loader/loader";
import './App.css'
import {WithoutLib} from "./withoutLib/withoutLib";

function App() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [cameraType, setCameraType] = useState('user');
  const [captured, setCaptured] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [wthLib, setWithLib] = useState(false);

  const handleCameraSwitch = () => {
    setCameraType(prevState => prevState === 'user' ? 'environment' : 'user');
  }

  const handleCapture = (photo?: string) => {
    if (!photo) return;
    setIsLoading(true);
    setTimeout(() => {
      setCaptured(photo);
      onOpen();
      setIsLoading(false)
    }, 1000)
  }


  return (
    <div className='wrapper'>
      <Heading as='h1'>
        Try to fix Samsung camera bug...
      </Heading>
      <Center gap='10px'>
        <p>
          Without package
        </p>
        <Switch id='withLib' isChecked={wthLib} onChange={e => setWithLib(e.target.checked)}/>
        <p>
          With package
        </p>
      </Center>
      <div className='camera__wrapper'>
        {isLoading
          ? <Loader/>
          : wthLib
            ? <WithLib type={cameraType} handleCapture={handleCapture} switchCamera={handleCameraSwitch}/>
            : <WithoutLib type={cameraType} setImage={setCaptured} switchCamera={handleCameraSwitch} />
        }
      </div>
      {isOpen && <ModalWithImage isOpen={isOpen} onClose={onClose} photo={captured}/>}
    </div>
  )
}

export default App
