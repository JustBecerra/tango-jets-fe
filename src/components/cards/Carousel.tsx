import { useState } from "react"
import {
	CCarousel,
	CCarouselCaption,
	CCarouselItem,
	CImage,
} from "@coreui/react"
import "@coreui/coreui/dist/css/coreui.min.css"
import "./Carousel.css"
import ImageModal from "../modals/ImageModal"
import type { ImagesType } from "./PickAirship"
import type { Airship } from "../table/TableModal"

const Carousel = ({
	images,
	storedAirshipData,
}: {
	images: [ImagesType[]]

	storedAirshipData: Airship[]
}) => {
	const [showModal, setShowModal] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [clickCount, setClickCount] = useState(0)
	const [currentAirship, setCurrentAirship] = useState<Airship>(
		storedAirshipData[currentIndex]
	)
	const portraitImages = images[currentIndex].filter(
		(image) => image?.dataValues?.typeof === "Portrait"
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

	const handleButtonClick = () => {
		if (clickCount < 1) {
			alert("Are you sure?")
			setClickCount(clickCount + 1)
		} else {
			if (images && images.length > 0) {
				alert(
					`Current slide description: {items[currentIndex].description}`
				)
			}
		}
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
								className="d-block w-[400px] h-[300px]"
								src={item.dataValues.image}
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
					Select this Option
				</button>
			</div>

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
