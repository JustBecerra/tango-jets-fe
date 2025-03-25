import React from "react";

type TripSummaryProps = {
  launchtime?: string;
  from?: string;
  to?: string;
};

const TripSummary: React.FC<TripSummaryProps> = ({ launchtime, from, to }) => {
  return (
    <div className="w-full h-[30%] flex flex-col justify-evenly p-4 border-2 rounded border-solid bg-white border-gray-300">
      <div className="flex justify-center sm:justify-between w-full border-b-2 border-gray-300 border-solid">
        <p className="text-2xl mb-2">Trip Summary</p>
      </div>
      <div className="w-full flex items-center justify-center sm:justify-around">
        <div className="flex flex-col w-[45%] mt-8">
          <div className="w-full flex justify-center border-b-2 border-gray-300 border-solid">
            <p className="text-sm">DEPART</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-around mt-4">
            <div className="flex flex-col justify-center items-center">
              <p className="text-nowrap">
                {launchtime
                  ? new Date(launchtime).toLocaleString("en-US", {
                      month: "2-digit",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      year: "numeric",
                      hour12: false,
                    })
                  : ""}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>{from || ""}</p>
            </div>
          </div>
        </div>
        <div className="w-[10%] flex justify-center">
          <svg
            className="w-6 h-6 text-gray-500 rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col w-[45%] mt-8">
          <div className="w-full flex justify-center border-b-2 border-gray-300 border-solid">
            <p className="text-sm">ARRIVE</p>
          </div>
          <div className="flex justify-around mt-4 flex-col sm:flex-row">
            <div className="flex flex-col justify-center items-center">
              <p>TBD</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>{to || ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;