import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getFlightById } from "../../../lib/actions/flights/actions"
import { RouteGuard } from "../../components/routeguard"
import { EditStepperFrame } from "../../components/stepper/EditStepperFrame"
import type { Flight } from "../../components/table/TableModal"

export default function TripPage() {
	const { trip } = useParams<{ trip: string }>()
	const [flight, setFlight] = useState<Flight | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function fetchFlight() {
			try {
				if (trip) {
					const transformedTrip = parseInt(trip)
					const data = await getFlightById(transformedTrip)
					if (!data) {
						throw new Error("Flight not found")
					}
					setFlight(data)
				}
			} catch (err) {
				setError("Flight not found")
			} finally {
				setLoading(false)
			}
		}

		if (trip) {
			fetchFlight()
		}
	}, [trip])

	if (loading) return <div>Loading...</div>
	if (error) return <div>{error}</div>

	return (
		<RouteGuard>
			<EditStepperFrame flightRequested={flight as Flight} />
		</RouteGuard>
	)
}
