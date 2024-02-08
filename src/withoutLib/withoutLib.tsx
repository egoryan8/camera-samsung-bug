import {useEffect, useRef} from 'react';
import {Button, Stack} from "@chakra-ui/react";
import {GoArrowSwitch} from "react-icons/go";
import {FaCamera} from "react-icons/fa";


export const WithoutLib = ({setImage, type, switchCamera}: any) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let mediaStream: any;

    const startCamera = async () => {
      try {
        const constraints: MediaStreamConstraints = {
          video: {
            facingMode: type
          },
          audio: false
        };

        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

        if (videoRef.current) {
          videoRef.current!.srcObject = mediaStream;
        }
      } catch (error) {
        console.error(error)
      }
    };

    startCamera();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
          track.stop(); // Остановка всех медиа-треков
        });
      }
    };
  }, [type]);

  const handleCapture = () => {
    if (!videoRef.current) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = videoRef!.current!.videoWidth;
    canvas.height = videoRef!.current!.videoHeight;
    const context = canvas.getContext('2d');
    if (context && videoRef.current) {
      context.drawImage(videoRef.current as unknown as any, 0, 0, canvas.width, canvas.height);
      setImage(canvas.toDataURL('image/jpeg'));
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={'camera__stream'}
      />
      <Stack direction='row' spacing={4}>
        <Button onClick={switchCamera} colorScheme='white' variant='outline'>
          <GoArrowSwitch/>
        </Button>
        <Button colorScheme='white' variant='outline' onClick={handleCapture}>
          <FaCamera/>
        </Button>
      </Stack>
    </>
  );
};
