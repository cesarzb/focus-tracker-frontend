import React, { useState } from "react";
import ActionButton from "../ui/ActionButton/ActionButton.tsx";

const Hourglass: React.FC = () => {
  const [time, setTime] = useState<string>("25:00");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-stone-950">
      <div
        id="hourglass"
        className="w-100 h-100 flex flex-col items-center justify-center relative"
      >
        <div className="w-50 h-40 rounded-b-full border-8 border-white box-border overflow-hidden flex items-end">
          <div
            className="z-2 w-full bg-orange-500"
            id="top-sand"
            style={{ height: "50%" }}
          ></div>
        </div>

        <div className="w-50 h-40 rounded-t-full border-8 border-white box-border overflow-hidden flex items-end">
          <div
            className="z-2 w-full bg-orange-500"
            id="bottom-sand"
            style={{ height: "20%" }}
          ></div>
        </div>

        <div className="absolute w-12 h-4 -mt-2 -ml-6 top-[50%] left-[50%] bg-white">
          <div className="bg-stone-950 w-6 h-8 ml-3 -mt-2"></div>
        </div>
      </div>

      <input
        type="text"
        className="text-stone-50 m-4 text-6xl font-black bg-transparent border-none outline-none focus:ring-0 p-0 text-center w-full"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <div className="flex flex-col gap-4 w-40">
        <ActionButton
          label="Start"
          variant="primary"
          onClick={() => console.log("Timer Started")}
        />

        <div className="flex gap-4">
          <ActionButton
            label="5"
            className="w-18"
            onClick={() => setTime("05:00")}
          />
          <ActionButton
            label="25"
            className="w-18"
            onClick={() => setTime("25:00")}
          />
        </div>
      </div>
    </div>
  );
};

export default Hourglass;
