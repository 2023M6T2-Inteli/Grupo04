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

export interface Field {
  header: string;
  inputs: string[];
  button: string;
}

interface Props {
  fields: Field;
  onClose: () => void;
  isOpen: boolean;
}

const ModalHome: React.FC<Props> = ({ fields, onClose, isOpen }) => {
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
              <FormLabel>{input}</FormLabel>
              <Input placeholder={input} />
            </FormControl>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalHome;
