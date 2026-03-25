"use client";

import Link from "next/link";
import Hourglass from "@/components/Timer/Hourglass";
import ActionButton from "../components/ui/ActionButton/ActionButton";

function App() {
  return (
    <div className="flex flex-col justify-around items-center h-full">
      <Hourglass time={5 * 60} fullPomodoroLength={25 * 60} />

      <div className="flex gap-4 text-white">
        <Link href="/login">
          <ActionButton label="Login" className="w-36" variant="primary" />
        </Link>
        <Link href="/register">
          <ActionButton label="Register" className="w-36" variant="secondary" />
        </Link>
      </div>
    </div>
  );
}

export default App;
