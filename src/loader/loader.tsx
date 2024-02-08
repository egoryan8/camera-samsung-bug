import {Spinner} from "@chakra-ui/react";

export const Loader = () =>
  <Spinner
    mt={'30dvh'}
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
  />
