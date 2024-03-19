import React, { useState } from 'react'
import '../styles/verifypage.css'
import OtpInput from 'react-otp-input'
import '../styles/verifypage.css'
import image7 from '../assets/images/image7.png'
import { Button, Typography, Row, Col, Card, Flex } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import logo from '../assets/icons/logo1.svg'
import { useNavigate } from 'react-router-dom'
import Resetpassword from './Resetpassword'

const Verifypage2 = () => {
	const navigate = useNavigate()
	const [resetpass, setResetpass] = useState('0')
	const oncodesubmit = () => {
		// navigate('/resetpassword');
		setResetpass('1')
	}
	const [otp, setOtp] = useState('')

	return (
		<>
			{resetpass == '0' && (
				<div className="main-verifydiv">
					<Row>
						<Col lg={14} xl={12}>
							<div className="div-form" style={{ marginLeft: '124px' }}>
								<Flex>
									<img src={logo} alt="" />
									<Typography.Title level={1} className="logo-txt">
										StockJarvis
									</Typography.Title>
								</Flex>
								<div className="content">
									<div className="text-wrapper">
										<Typography.Title level={1} className="maintxt">
											Please verify your mobile number.
										</Typography.Title>
										<Typography.Text className="subtxt1">
											Please enter the 4-digit code sent to your mobile number{' '}
											<br />
											<span className="spantxt">
												{' '}
												+91 9876543210 <EditTwoTone />{' '}
											</span>
										</Typography.Text>
									</div>

									<OtpInput
										value={otp}
										onChange={setOtp}
										numInputs={6}
										inputType="number"
										renderSeparator={<span></span>}
										renderInput={(props) => (
											<input
												typeof="isInputNum"
												{...props}
												className="input1"
											/>
										)}
									/>
									<p className="code">
										Resend code in <span className="codespan">00:30</span>
									</p>
									<Button className="submitbtn" onClick={oncodesubmit}>
										Submit
									</Button>
								</div>
							</div>
						</Col>

						<Col lg={10} xl={12}>
							<div className="card-div-verifypage2">
								<Card className="image-card-verifypage2">
									<img src={image7} className="image7" alt="" />
								</Card>
							</div>
						</Col>
					</Row>
				</div>
			)}
			{resetpass == '1' && <Resetpassword />}
		</>
	)
}

export default Verifypage2
