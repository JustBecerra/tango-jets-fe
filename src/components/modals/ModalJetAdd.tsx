import React, { useState } from "react";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { addAirship } from "../../../lib/actions/airships/actions";
import LoaderSpinner from "../Loaders/LoaderSpinner";

const AddJetModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [portraitData, setPortraitData] = useState<File>(
		new File(["initial content"], "default.txt", { type: "text/plain" })
  )
  const [genericData, setGenericData] = useState<File[]>([])

  const handleToggleModal = () => {
		setIsModalOpen((prev) => !prev)
  }

  const handleDrop = ({
		event,
		type,
  }: {
		event: React.DragEvent<HTMLDivElement>
		type: string
  }) => {
		event.preventDefault()
		event.stopPropagation()
		if (type === "generic") {
			const droppedFiles = Array.from(event.dataTransfer.files)
			setGenericData((prevFiles) => [...prevFiles, ...droppedFiles])
		} else if (type === "portrait") {
			const selectedFile = event.dataTransfer.files[0]
			setPortraitData(selectedFile)
		}
  }

  const handleFileChange = ({
		event,
		type,
  }: {
		event: React.ChangeEvent<HTMLInputElement>
		type: string
  }) => {
		if (type === "generic") {
			const selectedFiles = Array.from(event.target.files || [])
			setGenericData((prevFiles) => [...prevFiles, ...selectedFiles])
		} else if (type === "portrait") {
			if (event.target.files) {
				const selectedFile = event.target.files[0]
				setPortraitData(selectedFile)
			}
		}
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		event.stopPropagation()
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setLoading(true)
		const formElement = event.currentTarget
		const formData = new FormData(formElement)

		formData.set("title", formData.get("title") as string)
		formData.set("status", formData.get("status") as string)
		// formData.set("pricepermile", formData.get("pricepermile") as string)
		formData.set("seats", formData.get("seats") as string)
		formData.set("size", formData.get("size") as string)

		const imagesInput = document.querySelector<HTMLInputElement>(
			'input[name="generic"]'
		)
		if (imagesInput?.files) {
			for (let i = 0; i < imagesInput.files.length - 1; i++) {
				formData.append("generic", imagesInput.files[i])
			}
		}

		const portraitImageInput = document.querySelector<HTMLInputElement>(
			'input[name="portrait"]'
		)

		if (portraitImageInput?.files) {
			formData.append("portrait", portraitImageInput.files[0])
		}

		try {
			const response = await addAirship(formData) // Pass formData here
			console.log("Airship added successfully:", response)

			setShowToast(true)
			setTimeout(() => {
				setShowToast(false)
				setIsModalOpen(false)
			}, 2000)
		} catch (err) {
			console.error("Error adding airship or uploading files:", err)
		} finally {
			setLoading(false)
		}
  }

  return (
		<>
			<button
				id="addJetButton"
				className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
				type="button"
				onClick={handleToggleModal}
			>
				Add Airship
			</button>

			{isModalOpen && (
				<div
					id="addJetModal"
					tabIndex={-1}
					aria-hidden="true"
					className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50"
				>
					<div className="relative w-full max-w-3xl max-h-full">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
							<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
									Add New Airship
								</h3>
								<button
									type="button"
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
									onClick={handleToggleModal}
								>
									<svg
										aria-hidden="true"
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										></path>
									</svg>
									<span className="sr-only">Close modal</span>
								</button>
							</div>
							<div className="p-6 space-y-6">
								<form id="addJetForm" onSubmit={handleSubmit}>
									<div className="h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
										<div>
											<label
												htmlFor="title"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Jet Title
											</label>
											<input
												type="text"
												id="title"
												name="title"
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
										</div>
										<div>
											<label
												htmlFor="status"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Status
											</label>
											<input
												type="text"
												id="status"
												name="status"
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
										</div>
										{/* <div>
											<label
												htmlFor="pricepermile"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Price per Mile
											</label>
											<input
												type="number"
												id="pricepermile"
												name="pricepermile"
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
												required
											/>
										</div> */}
										<div>
											<label
												htmlFor="seats"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Seats
											</label>
											<input
												type="number"
												id="seats"
												name="seats"
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
												required
											/>
										</div>
										<div>
											<label
												htmlFor="size"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Size
											</label>
											<input
												type="text"
												id="size"
												name="size"
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
										</div>
										<div>
											<label
												htmlFor="images"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Portrait Image
											</label>
											<div
												onDragOver={handleDragOver}
												onDrop={(event) =>
													handleDrop({
														event,
														type: "portrait",
													})
												}
												className="flex items-center justify-center w-full mt-1"
											>
												<label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
													<div className="flex flex-col items-center justify-center pt-5 pb-6">
														<svg
															className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 20 16"
														>
															<path
																stroke="currentColor"
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
															/>
														</svg>
														{portraitData.name ? (
															<p className="w-full truncate">
																{
																	portraitData.name
																}
															</p>
														) : (
															<>
																<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
																	<span className="font-semibold">
																		Click to
																		upload
																	</span>{" "}
																	or drag and
																	drop
																</p>
																<p className="text-xs text-gray-500 dark:text-gray-400">
																	SVG, PNG,
																	JPG or GIF
																	(MAX.
																	800x400px)
																</p>
															</>
														)}
													</div>
													<input
														type="file"
														id="portrait"
														name="portrait"
														className="hidden"
														onChange={(event) =>
															handleFileChange({
																event,
																type: "portrait",
															})
														}
														required
													/>
												</label>
											</div>
										</div>
										<div>
											<label
												htmlFor="images"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Generic Images
											</label>
											<div
												onDragOver={handleDragOver}
												onDrop={(event) =>
													handleDrop({
														event,
														type: "generic",
													})
												}
												className="flex items-center justify-center w-full mt-1"
											>
												<label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
													<div className="flex flex-col w-full items-center justify-center pt-5 pb-6">
														<svg
															className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 20 16"
														>
															<path
																stroke="currentColor"
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
															/>
														</svg>
														{genericData.length >
														0 ? (
															genericData.map(
																(
																	data: File,
																	key
																) => (
																	<p
																		className="w-full truncate"
																		key={
																			key
																		}
																	>
																		{
																			data.name
																		}
																	</p>
																)
															)
														) : (
															<>
																<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
																	<span className="font-semibold">
																		Click to
																		upload
																	</span>{" "}
																	or drag and
																	drop
																</p>
																<p className="text-xs text-gray-500 dark:text-gray-400">
																	SVG, PNG,
																	JPG or GIF
																	(MAX.
																	800x400px)
																</p>
															</>
														)}
													</div>
													<input
														id="generic"
														name="generic"
														type="file"
														multiple
														required
														className="hidden"
														onChange={(event) =>
															handleFileChange({
																event,
																type: "generic",
															})
														}
													/>
												</label>
											</div>
										</div>
									</div>
									<div className="flex justify-start items-center py-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
										<button
											id="submitJet"
											type="submit"
											className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											Add Jet
										</button>
										<button
											type="button"
											className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
											onClick={handleToggleModal}
										>
											Cancel
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}

			{loading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<LoaderSpinner />
				</div>
			)}

			{showToast && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2">
					<Toast>
						<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
							<HiCheck className="h-5 w-5" />
						</div>
						<div className="ml-3 text-sm font-normal">
							Jet added successfully.
						</div>
						<Toast.Toggle onClick={() => setShowToast(false)} />
					</Toast>
				</div>
			)}
		</>
  )
};

export default AddJetModal;
