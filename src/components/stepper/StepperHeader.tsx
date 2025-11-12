import type { Client, Flight } from "../table/TableModal"

interface props {
	currentFlight: Flight
	lead_passenger: Client | string
}

export const StepperHeader = ({ lead_passenger }: props) => {
	const master_fullname =
		typeof lead_passenger === "string"
			? lead_passenger
			: lead_passenger.fullname
	const title = typeof lead_passenger === "string" ? "" : lead_passenger.title
	const nationality =
		typeof lead_passenger === "string"
			? "unknown"
			: lead_passenger.nationality
	const email =
		typeof lead_passenger === "string" ? "unknown" : lead_passenger.email
	const date_of_birth =
		typeof lead_passenger === "string"
			? "unknown"
			: lead_passenger.date_of_birth
	const passport =
		typeof lead_passenger === "string" ? "unknown" : lead_passenger.passport
	return (
		<div className="w-[80%]">
			<div className="bg-gray-200 w-full rounded-t flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 sm:gap-6 py-4 px-4">
				<div className="flex justify-start items-center gap-4">
					<div className="bg-blue-400 h-fit w-fit rounded p-2">
						<svg
							className="w-8 h-10 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								fillRule="evenodd"
								d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div className="flex flex-col">
						<h3>Lead</h3>
						<h2 className="font-bold">
							{title} {master_fullname}
						</h2>
					</div>
				</div>
			</div>
			<div className="flex flex-col md:flex-row bg-white w-full rounded-b gap-6 md:gap-16 justify-start items-start md:items-center py-4 px-4">
				<div className="flex flex-col justify-start">
					<h2>Date of birth</h2>
					<h3 className="font-bold">{date_of_birth}</h3>
				</div>
				<div className="flex flex-col justify-start">
					<h2>Passport</h2>
					<h3 className="font-bold">{passport}</h3>
				</div>
				<div className="flex flex-col justify-start">
					<h2>Nationality</h2>
					<h3 className="font-bold">{nationality}</h3>
				</div>
				<div className="flex flex-col justify-start">
					<h2>Email</h2>
					<h3 className="font-bold">{email}</h3>
				</div>
			</div>
		</div>
	)
}
