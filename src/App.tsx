import "./App.css";
// import hourglass from "./assets/hourglass.png";

function App() {
  return (
    <div className="flex flex-col justify-around h-full">
      <div className="text-5xl font-bold text-white">
        Welcome to Focus Tracker
      </div>
      {/* <img src={hourglass} alt="Hourglass" /> */}

      <div className="flex flex-row justify-center gap-10 text-white">
        <div className="cursor-pointer">Login</div>
        <div className="cursor-pointer">Register</div>
      </div>
    </div>
  );
}

export default App;
