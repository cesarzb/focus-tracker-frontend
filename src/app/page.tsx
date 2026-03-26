"use client";

import Link from "next/link";
import Hourglass from "@/components/Timer/Hourglass";
import ActionButton from "@/components/ui/ActionButton/ActionButton";
import api from "@/api/client";
import { useEffect } from "react";

function App() {
  // hack to wake up free backend instance in the background
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        api.get("/");
        console.log("Wake-up signal sent to NestJS");
      } catch (e) {}
    };

    wakeUpBackend();
  }, []);

  return (
    <div className="flex flex-col justify-around items-center h-full">
      <Hourglass time={5 * 60} fullPomodoroLength={25 * 60} />

      <div className="flex gap-4 text-white">
        <Link href="/login">
          <ActionButton label="Login" className="w-36" variant="primary" />
        </Link>
      </div>
    </div>
  );
}

export default App;
