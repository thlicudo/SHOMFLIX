import "../App.css";

const RatingMeter = ({ rating }) => {
  const color = rating < 50 ? "#FF6961" : rating < 70 ? "#FDFD96" : "#77DD77";

  return (
    <div className="flex items-center gap-1 lg:gap-2">
      <div className="relative">
        <svg
          viewBox="0 0 100 100"
          height="70"
          width="70"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* BACKGROUND CIRCLE */}
          <circle r="45" cx="50" cy="50" fill="#111212" />
          <circle
            height="100"
            width="100"
            r="35"
            cx="50"
            cy="50"
            fill="transparent"
            strokeWidth="7"
            stroke="#444948"
          />
          {/* PROGRESS CIRCLE */}
          <circle
            height="100"
            width="100"
            r="35"
            cx="50"
            cy="50"
            fill="transparent"
            strokeWidth="7"
            strokeLinecap="round"
            stroke={color}
            strokeDasharray="220"
            strokeDashoffset={((100 - rating) / 100) * 220}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <h1 className="flex items-center text-xl font-bold">
            {rating} <span className="text-xs">%</span>
          </h1>
        </div>
      </div>
      <div>
        <h1 className="font-bold leading-none lg:text-lg lg:leading-none">
          User <br /> Score
        </h1>
      </div>
    </div>
  );
};

export default RatingMeter;
