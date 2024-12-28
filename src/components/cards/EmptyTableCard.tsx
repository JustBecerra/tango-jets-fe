import LoaderSpinner from "../Loaders/LoaderSpinner"
import ModalFlightAdd from "../modals/ModalFlightAdd"

interface props {
	loading: boolean
}

export const EmptyTableCard = ({ loading }: props) => {
	return (
		<>
			{loading ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<LoaderSpinner />
				</div>
			) : (
				<>
					<div className="mb-2">
						<ModalFlightAdd />
					</div>
					<div className="flex justify-center items-center border-2 border-white rounded-lg h-[400px] w-[400px]">
						<h2 className="text-2xl font-bold">
							There is no data to show
						</h2>
					</div>
				</>
			)}
		</>
	)
}
