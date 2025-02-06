import { useState } from "react"
import { CCarousel, CCarouselItem, CImage } from "@coreui/react"
import "@coreui/coreui/dist/css/coreui.min.css"
import "./Carousel.css"
import ImageModal from "../modals/ImageModal"
import type { ImagesType } from "./PickAirship"
import type { Airship, Flight } from "../table/TableModal"
import { putCompletePhase } from "../../../lib/actions/flights/actions"

const Carousel = ({
	images,
	storedAirshipData,
	FlightData,
}: {
	images: [ImagesType[]]
	storedAirshipData: Airship[]
	FlightData: Flight
}) => {
	const [showModal, setShowModal] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [currentAirship, setCurrentAirship] = useState<Airship>(
		storedAirshipData[currentIndex]
	)
	const portraitImages = images.map((arrayOfMap) =>
		arrayOfMap.find((image) => image?.dataValues?.typeof === "Portrait")
	)

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
		try {
			await putCompletePhase({
				phase: FlightData.phase + 1,
				id: FlightData.id,
			})
		} catch (error) {
			console.log(error)
		}
		// if (clickCount < 1) {
		// 	alert("Are you sure?")
		// 	setClickCount(clickCount + 1)
		// } else {
		// 	if (images && images.length > 0) {
		// 		alert(
		// 			`Current slide description: {items[currentIndex].description}`
		// 		)
		// 	}
		// }
	}

	return (
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

			{FlightData.phase > 3 ? (
				<div id="Boton">
					<button id="selectButton" className="styled-button">
						Airship Selection Confirmed
					</button>
				</div>
			) : (
				<div id="Boton">
					<button
						id="selectButton"
						className="styled-button"
						onClick={handleButtonClick}
					>
						Confirm Option
					</button>
				</div>
			)}

			<ImageModal
				show={showModal}
				handleClose={handleCloseModal}
				items={currentAirship}
				images={images}
				currentIndex={currentIndex}
			/>
		</>
	)
}

export default Carousel
