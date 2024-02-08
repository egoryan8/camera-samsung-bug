import {Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";

export const ModalWithImage = ({onClose, isOpen, photo}) => {
  return (
    <div className='modal__wrapper'>
      <Modal onClose={onClose} size='full' isOpen={isOpen}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Captured photo</ModalHeader>
          <ModalCloseButton/>
          <ModalBody sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Image
              boxSize='80dvh'
              objectFit='contain'
              src={photo}
              alt='Dan Abramov'
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}