

interface props {
	master_passenger: string

}

export const contractMessage = ({
	master_passenger,
}: props) => {
	return `
    <p>Dear ${master_passenger},</p>

<p>I hope this email finds you well.</p>

<p>Attached, you will find the contract for your upcoming flight with us. Please review the terms and conditions outlined in the document carefully.</p>

<p>To proceed with your booking, kindly sign the contract and return it to us at your earliest convenience. If you have any questions or require any clarification, feel free to reach out to us directly.</p>

<p>We look forward to providing you with an exceptional flying experience. Should you need any assistance in preparing for your flight, don't hesitate to contact us.</p>

<p>Thank you for choosing Tango Jets. We look forward to serving you.</p>

<p>Warm regards,</p>
    `
}
