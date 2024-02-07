import './App.css'
import {Webcam} from "react-webcam-ultimate";
import {useState} from "react";
import {
  Button,
  Heading,
  Modal, ModalBody, ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Image,
  useDisclosure
} from '@chakra-ui/react'
import {FaCamera} from "react-icons/fa";
import {GoArrowSwitch} from "react-icons/go";

function App() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [cameraType, setCameraType] = useState('user');
  const [captured, setCaptured] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      <div className='camera__wrapper'>
        {isLoading ? (
          <Spinner
            mt={'30dvh'}
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        ) : (
          <Webcam className='camera__stream' mirrored={false} frontCamera={cameraType === 'user'}
                  mainCamera={cameraType === 'environment'}>
            {({getSnapshot}) => (
              <Stack direction='row' spacing={4}>
                <Button onClick={handleCameraSwitch} colorScheme='white' variant='outline'>
                  <GoArrowSwitch/>
                </Button>
                <Button colorScheme='white' variant='outline' onClick={() => handleCapture(getSnapshot())}>
                  <FaCamera/>
                </Button>
              </Stack>
            )}
          </Webcam>
        )}
      </div>

      {isOpen && (
        <div className='modal__wrapper'>
        <Modal onClose={onClose} size='full' isOpen={isOpen}>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Captured photo</ModalHeader>
            <ModalCloseButton/>
            <ModalBody sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Image
                boxSize='fit-content'
                objectFit='cover'
                src={captured}
                alt='Dan Abramov'
              />
            </ModalBody>
          </ModalContent>
        </Modal>
        </div>
      )}
    </div>
  )
}

export default App
