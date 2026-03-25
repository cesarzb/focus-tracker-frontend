import { useNavigate } from "react-router-dom";
import Hourglass from "./components/Timer/Hourglass";
import ActionButton from "./components/ui/ActionButton/ActionButton";

function App() {
  const handleClick = (path: string) => {
    console.log("Navigate to path");
  };

  return (
    <div className="flex flex-col justify-around items-center h-full">
      <Hourglass time={5 * 60} fullPomodoroLength={25 * 60} />

      <div className="flex gap-4 text-white">
        <ActionButton
          label="Login"
          className="w-36"
          variant="primary"
          onClick={() => {
            handleClick("/login");
          }}
        />
        <ActionButton
          label="Register"
          className="w-36"
          variant="secondary"
          onClick={() => {
            handleClick("/register");
          }}
        />
      </div>
    </div>
  );
}

export default App;
