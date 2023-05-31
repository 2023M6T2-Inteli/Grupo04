import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import {Field} from '@/components/WelcomeBody'
import { Dispatch, SetStateAction, useState } from 'react';
import {ModalInputs} from '@/components/WelcomeBody'
import axios from '@/utils/axios';



interface Props {
  fields: Field;
  onClose: () => void;
  isOpen: boolean;
}

const ModalHome: React.FC<Props> = ({ fields, onClose, isOpen }) => {

  const addRobot = async () => {
    
    const name = fields.inputs[0].value
    const ip = fields.inputs[1].value

    console.log(fields.inputs[0].value, fields.inputs[1].value)

    await axios.post('/register', {
      name: name,
      ip: ip
    })
  }


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="text-center text-lg text-blue-gerdau-end">
          {fields.header}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {fields.inputs.map((input) => (
            <FormControl mt={4}>
              <FormLabel >{input.name}</FormLabel>
              <Input 
                onChange = {(e) => input.setValue(e.target.value)}
                placeholder={input.name} 
              />
            </FormControl>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => addRobot()}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalHome;
