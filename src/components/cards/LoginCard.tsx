import { useState } from "react"
import { loginScheduler } from "../../../lib/actions/login/actions"
import { Bounce, toast } from "react-toastify"
import LoaderSpinner from "../Loaders/LoaderSpinner"

export const LoginCard = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (email && password) {
			setLoading(true)
			try {
				const login = await loginScheduler({
					username: email,
					password,
				})

				if (login.message === "Logged in successfully!") {
					window.location.href = `/Home`
				} else {
					toast.error("Credentials are not valid.", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "dark",
						transition: Bounce,
					})
				}
			} catch (error) {
				console.error("Login error:", error)
				toast.error("An error occurred during login.", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
					transition: Bounce,
				})
			} finally {
				setLoading(false)
			}
		} else {
			toast.error("Please fill in both fields", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Bounce,
			})
		}
	}
	// </ACA>
	return (
		<div className="flex flex-col w-full items-center">
			<h1 className="text-4xl font-bold mb-6 text-white">Welcome!</h1>
			<form onSubmit={handleLogin} className="w-full">
				<div className="flex flex-col gap-4 w-full">
					<div className="flex flex-col items-start w-full">
						<input
							className="w-full rounded-full px-4 py-2 text-black"
							placeholder="Enter Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex flex-col items-start">
						<div className="flex w-full">
							<input
								className="w-full rounded-full px-4 py-2 text-black pr-10"
								type={showPassword ? "text" : "password"}
								placeholder="Enter Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								type="button"
								id="togglePassword"
								className="focus:outline-none -ml-8"
								onClick={() => setShowPassword((prev) => !prev)}
							>
								{showPassword ? (
									<svg
										className="w-6 h-6 text-black"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											strokeWidth="2"
											d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
										/>
										<path
											stroke="currentColor"
											strokeWidth="2"
											d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
									</svg>
								) : (
									<svg
										className="w-6 h-6 text-black"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											fillRule="evenodd"
											d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
											clipRule="evenodd"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>
				<button
					type="submit"
					className="mt-6 border-2 text-white border-gray-200 border-solid w-fit rounded-full px-4 py-2 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-700 hover:border-gray-700"
				>
					{loading ? <LoaderSpinner /> : "Login"}
				</button>
			</form>
		</div>
	)
}
