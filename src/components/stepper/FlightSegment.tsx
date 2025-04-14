

export default function FlightSegmentsPage() {
  return (
		<div className="w-[80%] mx-auto py-6">
			<div className="bg-white rounded-lg border shadow-sm">
				<div className="px-6 py-4 border-b">
					<h3 className="text-lg font-medium flex items-center gap-2">
						<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="text-gray-700"
							>
								<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
							</svg>
						</span>
						Flight segments
					</h3>
				</div>
				<div className="p-6">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="border-b">
								<tr className="text-left text-xs text-gray-500">
									<th className="pb-3 font-normal"></th>
									<th className="pb-3 font-normal"></th>
									<th className="pb-3 font-normal"></th>
									<th className="pb-3 font-normal"></th>
									<th className="pb-3 font-normal"></th>
									<th className="pb-3 font-normal text-right">
										DIST (NM)
									</th>
									<th className="pb-3 font-normal text-right">
										ETR
									</th>
									<th className="pb-3 font-normal"></th>
								</tr>
							</thead>
							<tbody>
								<FlightSegment
									status="pos"
									departureTime="09:12am EDT"
									departureDate="06/14/25"
									departureAirport="FXE"
									departureCity="Fort Lauderdale, FL"
									departureNote="SUBJET CHARTER"
									arrivalTime="11:00am CDT"
									arrivalAirport="MKC"
									arrivalCity="Kansas City, MO"
									arrivalNote="Signature Aviation"
									distance="1061"
									etr="2:48"
								/>

								<FlightSegment
									status="live"
									departureTime="12:00pm CDT"
									departureDate="06/14/25"
									departureAirport="MKC"
									departureCity="Kansas City, MO"
									departureNote="Signature Aviation"
									arrivalTime="03:42pm EST"
									arrivalAirport="MKJS"
									arrivalCity="Montego Bay, Jamaica"
									arrivalNote="Iam Jet Centre"
									distance="1511"
									etr="3:42"
									note="Sun 40 mins"
								/>

								<FlightSegment
									status="pos"
									departureTime="04:42pm EST"
									departureDate="06/14/25"
									departureAirport="MKJS"
									departureCity="Montego Bay, Jamaica"
									departureNote="Iam Jet Centre"
									arrivalTime="07:12pm EDT"
									arrivalAirport="FXE"
									arrivalCity="Fort Lauderdale, FL"
									arrivalNote="SUBJET CHARTER"
									distance="478"
									etr="1:30"
								/>

								<FlightSegment
									status="pos"
									departureTime="10:30am EDT"
									departureDate="06/21/25"
									departureAirport="FXE"
									departureCity="Fort Lauderdale, FL"
									departureNote="SUBJET CHARTER"
									arrivalTime="11:00am EST"
									arrivalAirport="MKJS"
									arrivalCity="Montego Bay, Jamaica"
									arrivalNote="Iam Jet Centre"
									distance="478"
									etr="1:30"
									note="Sun 7 days"
								/>

								<FlightSegment
									status="live"
									departureTime="12:00pm EST"
									departureDate="06/21/25"
									departureAirport="MKJS"
									departureCity="Montego Bay, Jamaica"
									departureNote="Iam Jet Centre"
									arrivalTime="03:54pm CDT"
									arrivalAirport="MKC"
									arrivalCity="Kansas City, MO"
									arrivalNote="Signature Aviation"
									distance="1511"
									etr="3:54"
									note="Sun 40 mins"
								/>

								<FlightSegment
									status="pos"
									departureTime="04:54pm CDT"
									departureDate="06/21/25"
									departureAirport="MKC"
									departureCity="Kansas City, MO"
									departureNote="Signature Aviation"
									arrivalTime="06:06pm PDT"
									arrivalAirport="VNY"
									arrivalCity="Van Nuys, CA"
									arrivalNote="Castle & Cooke Aviation"
									distance="1184"
									etr="3:12"
									hasInfo={true}
								/>
							</tbody>
						</table>

						<div className="mt-8 border-t pt-4">
							<div className="grid grid-cols-3 text-sm">
								<div className="text-center">
									<div className="font-medium">
										Positioning
									</div>
									<div className="text-cyan-500 font-medium mt-1">
										8:12 (8.2 hrs)
									</div>
									<div className="text-cyan-500 font-medium">
										9:30 (9.0 hrs)
									</div>
								</div>
								<div className="text-center">
									<div className="font-medium">Live</div>
									<div className="text-cyan-500 font-medium mt-1">
										7:12 (7.2 hrs)
									</div>
									<div className="text-cyan-500 font-medium">
										7:36 (7.6 hrs)
									</div>
								</div>
								<div className="text-center">
									<div className="font-medium">Total</div>
									<div className="text-cyan-500 font-medium mt-1">
										15:24 (15.4 hrs)
									</div>
									<div className="text-cyan-500 font-medium">
										16:36 (16.6 hrs)
									</div>
								</div>
							</div>
							<div className="grid grid-cols-3 text-xs text-gray-500 mt-1">
								<div className="text-center">Flight time</div>
								<div className="text-center"></div>
								<div className="text-center"></div>
							</div>
							<div className="grid grid-cols-3 text-xs text-gray-500">
								<div className="text-center">Block time</div>
								<div className="text-center"></div>
								<div className="text-center"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

interface FlightSegmentProps {
  status: "pos" | "live"
  departureTime: string
  departureDate: string
  departureAirport: string
  departureCity: string
  departureNote: string
  arrivalTime: string
  arrivalAirport: string
  arrivalCity: string
  arrivalNote: string
  distance: string
  etr: string
  note?: string
  hasInfo?: boolean
}

function FlightSegment({
  status,
  departureTime,
  departureDate,
  departureAirport,
  departureCity,
  departureNote,
  arrivalTime,
  arrivalAirport,
  arrivalCity,
  arrivalNote,
  distance,
  etr,
  note,
  hasInfo,
}: FlightSegmentProps) {
  return (
    <tr className="border-b">
      <td className="py-4 pr-2">
        {/* <ChevronRight className="h-4 w-4 text-cyan-500" /> */}
        asdasd
      </td>
      <td className="py-4 pr-6">
        <div className={`text-sm font-medium ${status === "live" ? "text-red-500" : "text-cyan-500"}`}>{status}</div>
      </td>
      <td className="py-4 pr-6">
        <div className="text-sm font-medium">{departureTime}</div>
        <div className="text-xs text-gray-500">{departureDate}</div>
        {note && <div className="text-xs text-gray-500">{note}</div>}
      </td>
      <td className="py-4 pr-6">
        <div className="text-sm font-medium text-cyan-500">{departureAirport}</div>
        <div className="text-xs text-gray-500">{departureCity}</div>
        <div className="text-xs text-cyan-500">{departureNote}</div>
      </td>
      <td className="py-4 pr-6">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
          </svg>
        </div>
      </td>
      <td className="py-4 pr-6">
        <div className="text-sm font-medium text-cyan-500">{arrivalAirport}</div>
        <div className="text-xs text-gray-500">{arrivalCity}</div>
        <div className="text-xs text-cyan-500">{arrivalNote}</div>
        {/* {hasInfo && (
          <div className="flex items-center mt-1">
            <Info className="h-4 w-4 text-cyan-500 fill-cyan-500" />
          </div>
        )} */}
      </td>
      <td className="py-4 pr-6 text-right">
        <div className="text-sm font-medium">{distance}</div>
      </td>
      <td className="py-4 pr-6 text-right">
        <div className="text-sm font-medium">{etr}</div>
      </td>
      <td className="py-4">
        <div className="flex gap-2 justify-end">
          <button className="text-cyan-500 hover:text-cyan-600">
            {/* <Pencil className="h-4 w-4" /> */}Pencil
          </button>
          <button className="text-red-500 hover:text-red-600">
            {/* <Trash2 className="h-4 w-4" /> */}Trash
          </button>
        </div>
      </td>
    </tr>
  )
}
