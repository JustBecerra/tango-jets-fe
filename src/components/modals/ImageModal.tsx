import { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Modal.css"

const ImageModal = ({ show, handleClose, items, currentIndex }: any) => {
	const [isFullscreen, setIsFullscreen] = useState(false)
	const currentItem = items[currentIndex]

	const handleImageClick = () => {
		setIsFullscreen(!isFullscreen)
	}

	return (
		<Modal show={show} onHide={handleClose} size="xl">
			<Modal.Header closeButton>
				<Modal.Title>Más Imágenes</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>
					<img
						src={currentItem.data}
						alt={`slide ${currentIndex + 1}`}
						className={`modal-image ${
							isFullscreen ? "fullscreen" : ""
						}`}
						onClick={handleImageClick}
					/>
					<h5>{currentItem.title}</h5>
					<p>{currentItem.description}</p>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ImageModal
