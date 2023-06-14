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

import { Field, Robot } from "@/components/RobotSelectionBody";
import { axios } from "@/utils/axios";
import { toast } from "react-toastify";

interface Props {
  fields: Field;
  onClose: () => void;
  isOpen: boolean;
  setRobots?: React.Dispatch<React.SetStateAction<Robot[] | undefined>>;
}

const ModalHome: React.FC<Props> = ({ fields, onClose, isOpen, setRobots }) => {
  const addRobot = async () => {
    if (setRobots) {
      const name = fields.inputs[0].value;
      const ip = fields.inputs[1].value;

      const post_res = await axios.post("/robot/register", {
        name: name,
        ip: ip,
      });

      if (post_res.status === 200) {
        toast.success("Robot added successfully!");

        const res = await axios.get("/robot/get_robots");

        onClose();

        setRobots(res.data.robots);
      } else {
        toast.error("Error adding robot!");
      }
    }
  };

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
              <FormLabel>{input.name}</FormLabel>
              <Input
                onChange={(e) => input.setValue(e.target.value)}
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
