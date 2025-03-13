import LoaderSpinner from "../Loaders/LoaderSpinner";
import type { DataType } from "../table/TableModal"

interface Props {
	loading: boolean
	currentItems: DataType[]
	searchTerm: string
}

export const EmptyTableCard = ({
	loading,
	currentItems,
	searchTerm,
}: Props) => {
	return (
		<>
			{searchTerm === "" ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xl">
					<LoaderSpinner />
				</div>
			) : (
				<div className="flex flex-col items-center justify-center min-h-[400px]">
					<img src="/rafa.JPG" alt="Rafa" className="mb-4" />
					<p className="text-zinc-400 text-lg">
						The Trip you’re looking for can’t be found.
					</p>
				</div>
			)}
		</>
	)
}
