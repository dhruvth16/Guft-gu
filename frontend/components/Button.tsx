interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  const color =
    props.variant === "primary"
      ? "bg-gray-100 text-black p-2"
      : "bg-blue-500 text-white py-1 px-2 ";
  const primarydefault = "lg:w-[8%] md:w-[8%] w-30%";

  return (
    <>
      <div
        className={`flex justify-center items-center  w-30% cursor-pointer ${
          props.variant === "primary" ? primarydefault : "w-20%"
        } `}
      >
        <button
          onClick={props.onClick}
          className={`${color} text-${props.size} w-full rounded-md font-semibold`}
        >
          {props.text}
        </button>
      </div>
    </>
  );
}

export default Button;
