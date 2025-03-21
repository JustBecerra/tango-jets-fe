import React from "react";

interface props {
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: ({
    event,
    type,
  }: {
    event: React.DragEvent<HTMLDivElement>;
    type: string;
  }) => void;
  handleFileChange: ({
    event,
    type,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    type: string;
  }) => void;
  genericData: File[];
}

export const GenericImage = ({
  handleDragOver,
  handleDrop,
  handleFileChange,
  genericData,
}: props) => {
  return (
		<div>
			<label
				htmlFor="generic"
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
						{genericData.length > 0 ? (
							genericData.map((data: File, key) => (
								<p
									className="w-full text-center truncate text-white"
									key={key}
								>
									{data.name}
								</p>
							))
						) : (
							<>
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span className="font-semibold">
										Click to upload
									</span>{" "}
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									PNG or JPG
								</p>
							</>
						)}
					</div>
					<input
						id="generic"
						name="generic"
						type="file"
						multiple
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
  )
};
