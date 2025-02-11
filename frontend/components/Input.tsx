interface InputProps {
  placeholder: string;
  type: string;
  inputValue?: string;
  setInputValue?: (value: string) => void;
}

function Input(props: InputProps) {
  return (
    <>
      <input
        required
        value={props.inputValue}
        onChange={(e) =>
          props.setInputValue && props.setInputValue(e.target.value)
        }
        className="p-2 bg-gray-800 outline-none lg:w-[90%] md:w-[90%] w-[70%] border-[1px] border-gray-700 focus:border-[1px] rounded-md focus:border-blue-500"
        type={props.type}
        placeholder={props.placeholder}
      />
    </>
  );
}

export default Input;
