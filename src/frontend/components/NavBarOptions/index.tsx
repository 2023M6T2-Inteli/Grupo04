import { Button } from "@chakra-ui/react";
import { AnimatePresence, Variants, motion } from "framer-motion";

export interface NavBarOption {
  name: string;
  icon: JSX.Element;
}

interface Props {
  isHover: boolean;
  fields: NavBarOption[];
}

export const NavBarOptions: React.FC<Props> = ({ isHover, fields }) => {
  const item: Variants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const container: Variants = {
    hidden: { opacity: 1, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={container}
      className={`flex flex-col justify-center items-center ${
        isHover ? "gap-10" : "gap-6"
      }`}
    >
      {fields.map((field) => (
        <AnimatePresence>
          {isHover ? (
            <motion.div variants={item}>
              <Button
                _hover={{ bg: "blue-gerdau-end" }}
                _active={{ bg: "blue-gerdau-end" }}
                fontFamily={"Montserrat"}
                leftIcon={field.icon}
                bg={"blue-gerdau-mid"}
                color={"white"}
              >
                {field.name}
              </Button>
            </motion.div>
          ) : (
            <motion.div variants={item}>{field.icon}</motion.div>
          )}
        </AnimatePresence>
      ))}
    </motion.div>
  );
};
