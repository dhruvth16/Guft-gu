import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useRecoilState } from "recoil";
import { roomAtom } from "../store/atoms/roomAtom";
import { nameAtom } from "../store/atoms/nameAtom";

function Popup() {
  const navigate = useNavigate();
  const [room, setRoom] = useRecoilState(roomAtom);
  const [name, setName] = useRecoilState(nameAtom);

  const handleClick = () => {
    if (!(room.length === 0) || !(name === "")) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-black text-white">
        <div className="absolute bg-gray-900 p-4 top-[40%] left-[45%] rounded-md ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center justify-center flex-col gap-4"
          >
            <Input
              inputValue={room}
              setInputValue={setRoom}
              type="text"
              placeholder="Room Id"
            />
            <Input
              inputValue={name}
              setInputValue={setName}
              type="text"
              placeholder="Name"
            />
            <Button
              variant="secondary"
              size="sm"
              text="Enter Room"
              onClick={handleClick}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Popup;
