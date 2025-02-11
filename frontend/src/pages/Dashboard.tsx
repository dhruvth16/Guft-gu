import { useEffect, useRef, useState } from "react";
import Body from "../../components/Body";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import "remixicon/fonts/remixicon.css";
import { useRecoilValue } from "recoil";
import { roomAtom } from "../store/atoms/roomAtom";
import { nameAtom } from "../store/atoms/nameAtom";

type Message = {
  text: string;
  sender: string;
};

function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const room = useRecoilValue(roomAtom);
  const name = useRecoilValue(nameAtom);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to server");
      ws.send(
        JSON.stringify({ type: "join", payload: { room: room, name: name } })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [
        ...prev,
        {
          text: data.message,
          sender: data.sender,
        },
      ]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [room, name]);

  const sendMessage = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: inputValue,
            sender: name,
          },
        })
      );
      setInputValue("");
    } else {
      console.error("WebSocket is not open");
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-black text-white">
        <div>
          <Navbar title={"Guft-gu"} />
        </div>
        <div className="p-4">
          <Body messages={messages} />
        </div>
        <div className="flex items-center p-2 w-full gap-2 justify-center">
          <Input
            type="text"
            placeholder="Message..."
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
          <Button
            variant="primary"
            size="lg"
            text="Send"
            onClick={sendMessage}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
