import { useEffect, useState } from "react";
import ActionButton from "../ui/ActionButton/ActionButton";
import api from "../../api/client";
import type { Session } from "../../types/session";
import Hourglass from "./Hourglass.tsx";

const Timer = () => {
  const fullPomodoroLength = 25 * 60;
  const [time, setTime] = useState<number>(fullPomodoroLength);
  const [inputValue, setInputValue] = useState<string>("25:00");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [session, setSession] = useState<Session | undefined>();
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

  const createSession = async () => {
    try {
      const response = await api.post("/sessions", { name: "Focus" });
      setSession(response.data);
    } catch (err) {
      console.error("Failed to create session", err);
    }
  };

  const updateSession = async () => {
    try {
      if (session) {
        await api.patch(`/sessions/${session.id}`);
      }
    } catch (err) {
      console.error("Failed to update session", err);
    }
  };

  const handleTimerToggle = () => {
    if (isActive) {
      updateSession();
    } else {
      createSession();
    }

    setIsActive((prev) => !prev);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Hourglass time={time} fullPomodoroLength={fullPomodoroLength} />

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
          onClick={() => handleTimerToggle()}
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

export default Timer;
