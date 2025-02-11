import { useRecoilValue } from "recoil";
import { nameAtom } from "../src/store/atoms/nameAtom";

type Message = {
  text: string;
  sender: string;
};
type BodyProps = {
  messages: Message[];
};

function Body({ messages }: BodyProps) {
  const name = useRecoilValue(nameAtom);
  console.log(messages);

  return (
    <>
      <div className="min-h-[720px] border-[1px] border-gray-300 rounded-md overflow-hidden">
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className="text-black font-semibold flex gap-1 p-2"
            >
              <span className="bg-gray-400 p-1 rounded-sm">{message.text}</span>
              <span className="text-xs text-white flex items-end">
                {" "}
                -&gt; {message.sender === name ? "You" : message.sender}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Body;
