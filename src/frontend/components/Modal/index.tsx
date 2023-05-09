import Button, { ButtonType } from "../Button";

export interface Field {
  header: string;
  inputs: string[];
  button: string;
}

interface Props {
  fields: Field;
  onClick: () => void;
}

const Modal: React.FC<Props> = ({ fields, onClick }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClick}>
      <div className="absolute flex flex-col px-32 gap-5 lg:gap-10 place-content-center h-1/2 w-1/2 bg-white rounded-lg p-6">
        <h2 className="text-center text-blue-gerdau-mid text-lg lg:text-3xl font-mont mb-2 lg:mb-4">
          {fields.header}
        </h2>
        <div className="flex flex-col place-content-center ">
          {fields.inputs.map((input) => (
            <input
              className="border-2 py-2 px-2 border-gray-300 rounded-lg mb-4"
              type="text"
              placeholder={input}
            />
          ))}
        </div>
        <button
          onClick={onClick}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-14 lg:px-4 rounded-full"
        >
          {fields.button}
        </button>
      </div>
    </div>
  );
};

export default Modal;
