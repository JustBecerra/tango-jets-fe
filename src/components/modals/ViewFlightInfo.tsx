import type { Flight } from "../table/TableModal";

interface Props {
  formData: Flight;
  setOpenModal: (open: boolean) => void;
  caseType: string;
}

const ViewFlightInfo = ({ formData, setOpenModal, caseType }: Props) => {
  const handleViewTrip = () => {
    if (caseType === "flight") {
      window.location.href = `/trip/${formData.id}`;
    }
  };

  return (
		<div
			id="viewFlightModal"
			tabIndex={-1}
			aria-hidden="true"
			className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-black/30 backdrop-blur-xl"
		>
			<div className="relative w-full max-w-2xl">
				<div className="relative bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 max-h-[90vh] flex flex-col">
					<div className="flex items-center justify-between p-6 border-b border-zinc-800">
						<h3 className="text-xl font-medium text-zinc-100">
							Flight Information
						</h3>
						<button
							type="button"
							className="rounded-full p-2 text-zinc-400 hover:bg-zinc-800 transition-colors"
							onClick={() => setOpenModal(false)}
						>
							<svg
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>

					<div className="flex-1 px-6 overflow-y-auto scrollbar-hide">
						<div className="py-6 space-y-6">
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								{[
									{ label: "Id", value: formData.id },
									{ label: "To", value: formData.to },
									{ label: "From", value: formData.from },
									{
										label: "Launch Time",
										value: formData.launchtime,
									},
									{
										label: "Lead Passenger",
										value: formData.master_passenger,
									},
									{
										label: "Airship Name",
										value: formData.airship_name,
									},
									{
										label: "Price Cost",
										value: formData.price_cost,
									},
									{
										label: "Price with 20% commission",
										value: formData.price_revenue,
									},
									{
										label: "Created By",
										value: formData.createdby,
									},
									{
										label: "Type Of",
										value: formData.type_of,
									},
									{ label: "Phase", value: formData.phase },
									{
										label: "Associated To",
										value: formData.associated_to,
									},
									{
										label: "Pilot ID",
										value: formData.pilot_id,
									},
								].map((field) => (
									<div
										key={field.label}
										className="bg-zinc-800/50 rounded-xl p-4"
									>
										<label className="block text-sm font-medium text-zinc-400">
											{field.label}
										</label>
										<p className="mt-1 text-sm text-zinc-100">
											{field.value}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>

					{caseType === "flight" && (
						<div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/90 backdrop-blur sticky bottom-0">
							<div className="flex justify-end">
								<button
									type="button"
									className="px-8 py-3 bg-blue-600 text-sm font-medium text-white rounded-full 
                           hover:bg-blue-500 active:bg-blue-700 
                           transition-all duration-200 ease-in-out
                           shadow-lg shadow-blue-600/20
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
									onClick={handleViewTrip}
								>
									View Trip
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
  )
};

export default ViewFlightInfo;
