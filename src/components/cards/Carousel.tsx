import { useState } from "react"
import { CCarousel, CCarouselItem, CImage } from "@coreui/react"
import "@coreui/coreui/dist/css/coreui.min.css"
import "./Carousel.css"
import ImageModal from "../modals/ImageModal"
import type { ImagesType } from "./PickAirship"
import type { Airship, Flight } from "../table/TableModal"
import {
	getFlightById,
	putCompletePhase,
	putQuoteConfirmation,
} from "../../../lib/actions/flights/actions"
import LoaderSpinner from "../Loaders/LoaderSpinner"

const Carousel = ({
	images,
	storedAirshipData,
	FlightData,
	airshipObjects,
}: {
	images: [ImagesType[]]
	storedAirshipData: Airship[]
	FlightData: Flight
	airshipObjects: {
		airshipID: number
		revenue: number
		cost: number
	}[]
}) => {
	const [showModal, setShowModal] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [currentAirship, setCurrentAirship] = useState<Airship>(
		storedAirshipData[currentIndex]
	)
	const [loading, setLoading] = useState(false)
	const portraitImages = images.map((arrayOfMap) =>
		arrayOfMap.find((image) => image?.dataValues?.typeof === "Portrait")
	)
	const [reFetchedFlight, setReFetchedFlight] = useState<Flight>(FlightData)

	const handleSlideChange = (e: any) => {
		const newIndex = e
		if (typeof newIndex !== "undefined") {
			setCurrentIndex(newIndex)
			setCurrentAirship(storedAirshipData[newIndex])
		} else {
			console.error(
				"Slide change event does not contain expected properties"
			)
		}
	}

	const handleImageClick = (index: number) => {
		setCurrentIndex(index)
		setShowModal(true)
	}

	const handleCloseModal = () => {
		setShowModal(false)
	}

	const handleButtonClick = async () => {
		setLoading(true)
		try {
			await putCompletePhase({
				phase: FlightData.phase + 1,
				id: FlightData.id,
			})
			const confirmedQuoteData = {
				airship_id: currentAirship.id,
				price_revenue: airshipObjects.find(
					(element) => element.airshipID === currentAirship.id
				)?.revenue as number,
				price_cost: airshipObjects.find(
					(element) => element.airshipID === currentAirship.id
				)?.cost as number,
				flight_id: FlightData.id,
			}
			await putQuoteConfirmation(confirmedQuoteData)
			const updatedFlight = await getFlightById(FlightData.id)
			setReFetchedFlight({ ...updatedFlight })
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			{FlightData.phase > 3 || reFetchedFlight.phase > 3 ? (
				<p>Airship selection confirmed</p>
			) : (
				<>
					<CCarousel
						controls
						indicators
						transition="crossfade"
						interval={false}
						className="custom-carousel"
						onSlid={handleSlideChange}
					>
						{portraitImages ? (
							portraitImages.map((item, index) => (
								<CCarouselItem
									key={index}
									onClick={() => handleImageClick(index)}
								>
									<CImage
										className="d-block w-full h-[300px]"
										src={item?.dataValues.image}
										alt={`slide ${index + 1}`}
									/>
								</CCarouselItem>
							))
						) : (
							<>Loading...</>
						)}
					</CCarousel>

					<div id="Boton">
						<button
							id="selectButton"
							className="styled-button"
							onClick={handleButtonClick}
						>
							Confirm Option
						</button>
					</div>

					{loading === true && (
						<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
							<LoaderSpinner />
						</div>
					)}

					<ImageModal
						show={showModal}
						handleClose={handleCloseModal}
						items={currentAirship}
						images={images}
						currentIndex={currentIndex}
						revenue={
							airshipObjects.find(
								(element) =>
									element.airshipID === currentAirship.id
							)?.revenue as number
						}
					/>
				</>
			)}
		</>
	)
}

export default Carousel
