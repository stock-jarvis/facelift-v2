import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import '../styles/verifypage.css'
import image2 from '../assets/images/image2.png'
import { Button, Typography, Row, Col, Card, Flex, notification } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import logo from '../assets/icons/logo1.svg'
import { useNavigate } from 'react-router-dom'
import Gotologin from './Gotologin'
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

const Verifypage = ({ props, phone }) => {
	const [otp, setOtp] = useState('')
	const navigate = useNavigate()
	const [gologin, setGologin] = useState('0')

	const [resendTimer, setResendTimer] = useState(0)

	const handleResend = async (values: NonceFormProps) => {
		setResendTimer(30)
		const interval = setInterval(() => {
			setResendTimer((prevTimer) => prevTimer - 1)
		}, 1000)
		setTimeout(() => clearInterval(interval), 30000)

		const data = {
			nonce: props.noun,
		}
		try {
			const res = await ResendAPI<NonceRes>(data)
			// this needed temporatry as the status needs to be corrected from backend
			if (res.data.Status == 201) {
				notification.success({ message: 'OTP Send Successfully !' })
				// changeForm('login')
				// setGologin('1')
			} else {
				notification.error({
					message: 'Error in Verification Please try again',
				})
			}
		} catch (error) {
			notification.error({
				message: 'Error in Verification Please try again',
			})
		}
	}

	const ongologin = async (values: NonceFormType) => {
		console.log(otp)
		const data = {
			nonce: props.noun,
			otp: otp,
			Reset: false,
		}
		try {
			const res = await OtpVerifyAPI<NonceRes>(data)
			// this needed temporatry as the status needs to be corrected from backend
			if (res.data.Status == 200) {
				notification.success({ message: 'OTP Verification Success !' })
				// changeForm('login')
				setGologin('1')
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

	return (
		<>
			{gologin == '0' && (
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
												+91 {phone} <EditTwoTone />{' '}
											</span>
										</Typography.Text>
									</div>
									<OtpInput
										value={otp}
										onChange={setOtp}
										numInputs={6}
										renderSeparator={<span>-</span>}
										inputType="number"
										renderInput={(props) => (
											<input
												typeof="isInputNum"
												{...props}
												className="input1"
											/>
										)}
									/>
									<Button
										className="submitbtn"
										style={{ marginTop: '15px' }}
										onClick={ongologin}
									>
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
							<div className="card-div">
								<Card className="image-card">
									<img src={image2} className="img" alt="" />
									<br />
									<div className="txt">
										<Typography.Text className="txt-image">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Donec erat nisl, posuere in ligula ut, tincidunt elementum
											quam.
										</Typography.Text>
									</div>
								</Card>
							</div>
						</Col>
					</Row>
				</div>
			)}
			{gologin == '1' && <Gotologin />}
		</>
	)
}

export default Verifypage
