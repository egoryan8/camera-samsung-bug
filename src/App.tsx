import {useState} from "react";
import {
  Heading,
  useDisclosure, Switch, Center, Button
} from '@chakra-ui/react'
import {ModalWithImage} from "./modalWithImage/modalWithImage";
import {WithLib} from "./withLib/withLib";
import {Loader} from "./loader/loader";
import './App.css'
import {WithoutLib} from "./withoutLib/withoutLib";
import ym from "react-yandex-metrika";
import { v4 as uuid } from 'uuid';

function App() {
  const id = uuid();
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [cameraType, setCameraType] = useState('user');
  const [captured, setCaptured] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [wthLib, setWithLib] = useState(false);

  const handleCameraSwitch = () => {
    setCameraType(prevState => prevState === 'user' ? 'environment' : 'user');
  }

  const sendYm = () => {
    ym('reachGoal', 'testIdToMetric', {userId: id})
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
        <Switch id='withLib' size='lg' isChecked={wthLib} onChange={e => setWithLib(e.target.checked)}/>
        <p>
          With package
        </p>
      </Center>
      <Button onClick={sendYm}>Send ym</Button>
      <div className='camera__wrapper'>
        {isLoading
          ? <Loader/>
          : wthLib
            ? <WithLib type={cameraType} handleCapture={handleCapture} switchCamera={handleCameraSwitch}/>
            : <WithoutLib type={cameraType} handleCapture={handleCapture} switchCamera={handleCameraSwitch} />
        }
      </div>
      {isOpen && <ModalWithImage isOpen={isOpen} onClose={onClose} photo={captured}/>}
    </div>
  )
}

export default App
