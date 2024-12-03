import { LogOut } from "../../utils/LogOut"

export const LogOutButton = () => {
	return (
		<a
			onClick={(e) => {
				e.preventDefault()

				LogOut()

				setTimeout(() => {
					window.location.href = "/"
				}, 1000)
			}}
			className="flex cursor-pointer items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-300 group dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-200"
		>
			<svg
				className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M20 12H8m-4 0 4-4m-4 4 4 4M15 4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
				></path>
			</svg>

			<span className="flex-1 ml-3 text-left whitespace-nowrap">
				Logout
			</span>
		</a>
	)
}
