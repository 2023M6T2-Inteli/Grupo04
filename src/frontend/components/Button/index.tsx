import Link from "next/link";

export enum ButtonType {
  Home,
}

interface Props {
  type: ButtonType;
  link: string;
}

const Button: React.FC<Props> = ({ link, type }) => {
  switch (type) {
    case ButtonType.Home:
      return (
        <Link href={link} className="mx-auto w-full">
          <button className="bg-blue-zero w-full py-2 text-white text-2xl font-mont font-bold rounded-full">
            Start
          </button>
        </Link>
      );

    default:
      return <></>;
  }
};

export default Button;
