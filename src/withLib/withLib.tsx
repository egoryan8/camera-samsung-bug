import {Button, Stack} from "@chakra-ui/react";
import {GoArrowSwitch} from "react-icons/go";
import {FaCamera} from "react-icons/fa";
import {Webcam} from "react-webcam-ultimate";

export const WithLib = ({switchCamera, type, handleCapture}: any) => {
  return (
    <Webcam className='camera__stream' mirrored={false} frontCamera={type === 'user'}
            mainCamera={type === 'environment'}>
      {({getSnapshot}) => (
        <Stack direction='row' spacing={4}>
          <Button onClick={switchCamera} colorScheme='white' variant='outline'>
            <GoArrowSwitch/>
          </Button>
          <Button colorScheme='white' variant='outline' onClick={() => handleCapture(getSnapshot())}>
            <FaCamera/>
          </Button>
        </Stack>
      )}
    </Webcam>
  )
}