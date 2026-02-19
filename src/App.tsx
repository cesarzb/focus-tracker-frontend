import { Link } from "react-router-dom";
// import hourglass from "./assets/hourglass.png";

function App() {
  return (
    <div className="flex flex-col justify-around h-full">
      <div className="text-5xl font-bold text-white">
        Welcome to Focus Tracker
      </div>
      {/* <img src={hourglass} alt="Hourglass" /> */}

      <div className="flex flex-row justify-center gap-10 text-white">
        <Link to="/login" className="cursor-pointer">
          Login
        </Link>
        <Link to="/register" className="cursor-pointer">
          Register
        </Link>
      </div>
    </div>
  );
}

export default App;
