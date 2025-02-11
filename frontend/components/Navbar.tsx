import ChatIcon from "../icons/ChatIcon";

interface NavbarProps {
  title: string;
}

function Navbar(props: NavbarProps) {
  return (
    <>
      <div className="flex gap-2 items-center p-4">
        <ChatIcon />
        <h1 className="text-2xl font-semibold text-blue-500">{props.title}</h1>
      </div>
    </>
  );
}

export default Navbar;
