import React, { useEffect, useState } from 'react'
import '../styles/verifypage.css'
import OtpInput from 'react-otp-input'
import '../styles/verifypage.css'
import image7 from '../assets/images/image7.png'
import { Button, Typography, Row, Col, Card, Flex, notification } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import logo from '../assets/icons/logo1.svg'
import { useNavigate } from 'react-router-dom'
import Resetpassword from './Resetpassword'
import { OtpVerifyAPI, ResendAPI } from 'src/api/AuthService'

interface NonceFormProps {
	changeForm: (val: formType) => void
	nonce: string
}

export type NonceFormType = {
	otp: number
}

export type NonceType = {
	nonce: string
}

type NonceRes = {
	Token: string
	Status: number
}

const ResetVerifypage = (props) => {
	const navigate = useNavigate()
	const [resetpass, setResetpass] = useState('0')
	const [resendTimer, setResendTimer] = useState(0)

	useEffect(() => {
		return () => {
			console.log(props.noun)
			console.log(props.cnfToken)
		}
	}, [])

	const handleResend = async (values: NonceFormProps) => {
		setResendTimer(30)
		const interval = setInterval(() => {
			setResendTimer((prevTimer) => prevTimer - 1)
		}, 1000)
		setTimeout(() => clearInterval(interval), 30000)

		const data = {
			nonce: props.noun,
			CnfToken: props.cnfTooken,
		}
		try {
			const res = await ResendAPI<NonceRes>(data)
			// this needed temporatry as the status needs to be corrected from backend
			if (res.data.Status == 201) {
				notification.success({ message: 'OTP Send Successfully !' })
				setResetpass('1')
			} else {
				notification.error({
					message: 'Please Enter Correct OTP!',
				})
			}
		} catch (error) {
			notification.error({
				message: 'Error in Verification Please try again',
			})
		}
	}
	const oncodesubmit = async (values: NonceFormType) => {
		console.log(otp)
		const data = {
			nonce: props.noun,
			// cnfToken: props.cnfToken,
			otp: otp,
			Reset: true,
		}
		try {
			const res = await OtpVerifyAPI<NonceRes>(data)
			if (res.data.Status == 200) {
				notification.success({ message: 'OTP Verification Success !' })
				setResetpass('1')
			} else {
				notification.error({
					message: 'Error in Verification Please try again',
				})
			}
		} catch (error) {
			notification.success({
				message: 'Error in Verification Please try again',
			})
		}
	}
	const [otp, setOtp] = useState('')

	const handleEditClick = () => {
		props.openFunction(props.phone)
	}

	return (
		<>
			{resetpass == '0' && (
				<div className="main-verifydiv">
					<Row>
						<Col lg={14} xl={12}>
							<div className="div-form">
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
												+91 {props.phone}{' '}
												<Button onClick={handleEditClick}>
													<EditTwoTone />
												</Button>{' '}
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
									{/* <p className='code'>Resend code in <span className='codespan'>00:30</span></p> */}
									<Button className="submitbtn" onClick={oncodesubmit}>
										Submit
									</Button>
									{resendTimer === 0 ? (
										<Button
											onClick={handleResend}
											style={{
												width: '100px',
												marginTop: '15px',
												marginLeft: '15px',
											}}
										>
											Resend OTP
										</Button>
									) : (
										<p
											className="codespan"
											style={{ fontSize: '20px', color: 'black' }}
										>
											Resend OTP in {resendTimer} seconds
										</p>
									)}
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
			{resetpass == '1' && (
				<Resetpassword cnfToken={props.cnfToken} phone={props.phone} />
			)}
		</>
	)
}

export default ResetVerifypage
