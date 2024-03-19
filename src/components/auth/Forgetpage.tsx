import React, { useEffect, useState } from 'react'
import { Button, Typography, Row, Col, Card, Flex, notification } from 'antd'
import { Form, Input } from 'antd'
import { MobileFilled } from '@ant-design/icons'
import '../styles/forgot.css'
import logo from '../assets/icons/logo1.svg'
import image5 from '../assets/images/image5.png'
import { useNavigate } from 'react-router-dom'
import ResetVerifypage from './ResetVerifypage'
import { ForgetAPI } from 'src/api/AuthService'

const Forgetpage = () => {
	const navigate = useNavigate()

	const [cnfToken, setCnfToken] = useState('')
	const [nonce, setNonce] = useState('')
	const [phone, setPhone] = useState('')

	const handleforgot = async (values) => {
		try {
			const res = await ForgetAPI<NonceRes>(values)
			// this needed temporatry as the status needs to be corrected from backend
			if (res.status == 200) {
				notification.success({ message: 'OTP Send Successfully!' })
				setForget('1')
				setCnfToken(res.data.CnfToken)
				setNonce(res.data.nonce)
				setPhone(values.phone)
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

	const openFunction = (data) => {
		setForget('0')
		setPhone(data)
	}

	const onhandlelogin = () => {
		navigate('/login')
	}
	const [forget, setForget] = useState('0')

	const formItemLayout = {
		labelCol: {
			xs: {
				span: 24,
			},
			sm: {
				span: 6,
			},
		},
		wrapperCol: {
			xs: {
				span: 24,
			},
			sm: {
				span: 14,
			},
		},
	}
	return (
		<>
			{forget == '0' && (
				<div className="main-forgot">
					<Row>
						<Col md={24} lg={14} xl={12}>
							<Flex className="divflex1-forgotpage">
								<img src={logo} alt="" />
								<Typography.Title level={1} className="logo-txt">
									StockJarvis
								</Typography.Title>
							</Flex>
							<div className="main-forgot2">
								<div>
									<div className="text-wrapper">
										<Typography.Title level={1} className="signup-txt">
											Forgot password
										</Typography.Title>
										<Typography.Text className="forgotpage-text">
											Please enter your registered mobile number for reset
											password.
										</Typography.Text>
									</div>
									<Form
										layout="vertical"
										{...formItemLayout}
										onFinish={handleforgot}
										variant="filled"
										style={{
											maxWidth: '600px',
										}}
									>
										<Form.Item
											label="Mobile Number"
											name="phone"
											rules={[
												{
													pattern: new RegExp(/^[0-9\b]+$/),
													message: 'String is not Allowed',
												},
												{
													required: true,
													message: 'Please Enter Mobile Number',
												},
											]}
										>
											<Input
												prefix={<MobileFilled />}
												size="large"
												className="siginfeild"
												maxLength={10}
												placeholder="Enter mobile number"
												defaultValue={phone}
											/>
										</Form.Item>

										<Form.Item>
											<Button htmlType="submit" className="verfication-codebtn">
												Send Verification Code
											</Button>
										</Form.Item>
										<Typography.Text className="subtext-forgotpage">
											Back to{' '}
											<span className="span-subtext" onClick={onhandlelogin}>
												<u> Sign In </u>
											</span>
										</Typography.Text>
									</Form>
								</div>
							</div>
						</Col>
						<Col lg={10} xl={12}>
							<div className="forgotpage-imgdiv">
								<Card className="forgotpage-card">
									<img src={image5} className="image5" alt="" />
								</Card>
							</div>
						</Col>
					</Row>
				</div>
			)}
			{forget == '1' && (
				<ResetVerifypage
					noun={nonce}
					cnfToken={cnfToken}
					phone={phone}
					openFunction={openFunction}
				/>
			)}
		</>
	)
}

export default Forgetpage
