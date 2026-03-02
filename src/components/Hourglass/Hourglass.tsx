import { useEffect, useState } from "react";
import ActionButton from "../ui/ActionButton/ActionButton.tsx";

const Hourglass = () => {
  const fullPomodoroLength = 25 * 60;
  const [time, setTime] = useState<number>(fullPomodoroLength);
  const [inputValue, setInputValue] = useState<string>("25:00");
  const [isActive, setIsActive] = useState<boolean>(false);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const parseTime = (input: string): number => {
    const parts = input.split(":");
    const mins = parseInt(parts[0]) || 0;
    const secs = parseInt(parts[1]) || 0;
    return mins * 60 + secs;
  };

  useEffect(() => {
    if (!isActive || time < 0) return;

    const timer = setTimeout(() => {
      setTime((prev) => prev - 1);

      setInputValue(formatTime(time));
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, isActive]);

  useEffect(() => {
    document.title = inputValue;
  }, [inputValue]);

  const handleInputChange = (val: string) => {
    setInputValue(val);

    if (/^\d+:\d{2}$/.test(val)) {
      setTime(parseTime(val));
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div
        id="hourglass"
        className="w-100 h-100 flex flex-col items-center justify-center relative"
      >
        <div className="w-50 h-40 rounded-b-full border-8 border-white box-border overflow-hidden flex items-end">
          <div
            className="z-2 w-full bg-orange-500"
            id="top-sand"
            style={{ height: `${(70 * time) / fullPomodoroLength}%` }}
          ></div>
        </div>

        <div className="w-50 h-40 rounded-t-full border-8 border-white box-border overflow-hidden flex items-end">
          <div
            className="z-2 w-full bg-orange-500"
            id="bottom-sand"
            style={{
              height: `${(70 * (fullPomodoroLength - time)) / fullPomodoroLength}%`,
            }}
          ></div>
        </div>

        <div className="absolute w-12 h-4 -mt-2 -ml-6 top-[50%] left-[50%] bg-white">
          <div className="bg-stone-900 w-6 h-8 ml-3 -mt-2"></div>
        </div>
      </div>

      <input
        type="text"
        className="text-stone-50 m-4 text-6xl font-black bg-transparent border-none outline-none focus:ring-0 p-0 text-center w-full"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <div className="flex flex-col gap-4 w-40">
        <ActionButton
          label={isActive ? "Stop" : "Start"}
          variant="primary"
          onClick={() => setIsActive((prev) => !prev)}
        />

        <div className="flex gap-4">
          <ActionButton
            label="5"
            className="w-18"
            onClick={() => handleInputChange("5:00")}
          />
          <ActionButton
            label="25"
            className="w-18"
            onClick={() => handleInputChange("25:00")}
          />
        </div>
      </div>
    </div>
  );
};

export default Hourglass;
