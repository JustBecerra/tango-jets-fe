import { useEffect, useState } from "react"
import {
	CCarousel,
	CCarouselCaption,
	CCarouselItem,
	CImage,
} from "@coreui/react"
import "@coreui/coreui/dist/css/coreui.min.css"
import "./Carrousel.css"
import ImageModal from "../modals/ImageModal"

const Carousel = ({ items }: any) => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [showModal, setShowModal] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [clickCount, setClickCount] = useState(0)

	useEffect(() => {
		console.log("Carousel component mounted")
	}, [])

	const handleSlideChange = (e: any) => {
		console.log("Slide change event:", e)
		const newIndex = e
		if (typeof newIndex !== "undefined") {
			setCurrentSlide(newIndex)
			setCurrentIndex(newIndex)
		} else {
			console.error(
				"Slide change event does not contain expected properties"
			)
		}
	}

	const handleImageClick = (index: any) => {
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
			if (items && items.length > 0) {
				alert(
					`Current slide description: ${items[currentIndex].description}`
				)
			}
		}
	}

	return (
		<>
			{/* <CCarousel
				controls
				indicators
				transition="crossfade"
				interval={false}
				className="custom-carousel"
				onSlid={handleSlideChange}
			>
				{items.map(({ item, index }: any) => (
					<CCarouselItem
						key={index}
						onClick={() => handleImageClick(index)}
					>
						<CImage
							className="d-block w-100"
							src={item.src}
							alt={`slide ${index + 1}`}
						/>
						<CCarouselCaption className="d-none d-md-block">
							<h5>{item.title}</h5>
							<p>{item.description}</p>
						</CCarouselCaption>
					</CCarouselItem>
				))}
			</CCarousel> */}

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
				items={items}
				currentIndex={currentIndex}
			/>
		</>
	)
}

export default Carousel
