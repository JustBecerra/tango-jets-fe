import LoaderSpinner from "../Loaders/LoaderSpinner"

interface Props {
	loading: boolean
}

export const EmptyTableCard = ({ loading }: Props) => {
	if (loading) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xl">
				<LoaderSpinner />
			</div>
		)
	} else
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px]">
				<img src="/rafa.JPG" alt="Rafa" className="mb-4" />
				<p className="text-zinc-400 text-lg">
					The Trip you’re looking for can’t be found.
				</p>
			</div>
		)
}
