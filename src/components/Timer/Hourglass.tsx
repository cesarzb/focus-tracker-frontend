const Hourglass = ({
  time,
  fullPomodoroLength,
}: {
  time: number;
  fullPomodoroLength: number;
}) => {
  return (
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

      <div className="w-48 h-40 rounded-t-full border-8 border-white box-border overflow-hidden flex items-end">
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
  );
};

export default Hourglass;
