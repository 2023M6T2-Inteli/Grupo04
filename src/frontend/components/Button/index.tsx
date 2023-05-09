import Link from "next/link";

export enum ButtonType {
  Home,
}

interface Props {
  type: ButtonType;
  text: string;
  link: string;
}

const Button: React.FC<Props> = ({ link, text, type }) => {
  switch (type) {
    case ButtonType.Home:
      return (
        <Link href={link} className="mx-auto w-full select-none">
          <button className="bg-blue-zero w-full py-2 text-white text-base lg:text-2xl font-mont font-bold rounded-full">
            {text}
          </button>
        </Link>
      );

    default:
      return <></>;
  }
};

export default Button;
