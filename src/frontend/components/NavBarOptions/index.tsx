import { DisplayType } from "@/pages/dashboard/[...id]";
import { Button } from "@chakra-ui/react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

export interface NavBarOption {
  name: string;
  icon: JSX.Element;
  type: DisplayType;
  color: string;
}

interface Props {
  isHover: boolean;
  fields: NavBarOption[];
  setDisplay: Dispatch<SetStateAction<DisplayType>>;
}

export const NavBarOptions: React.FC<Props> = ({
  isHover,
  fields,
  setDisplay,
}) => {
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
      {fields.map((field, key) => (
        <AnimatePresence key={key}>
          {isHover ? (
            <motion.div variants={item}>
              <Button
                _hover={{ bg: field.color }}
                _active={{ bg: field.color }}
                fontFamily={"Montserrat"}
                leftIcon={field.icon}
                bg={field.color}
                color={"white"}
                onClick={() => {
                  setDisplay(field.type);
                }}
              >
                {field.name}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className={`rounded-r-lg px-6 py-1 ${
                field.color === "blue.300" && "bg-blue-300"
              }`}
              variants={item}
            >
              {field.icon}
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </motion.div>
  );
};
