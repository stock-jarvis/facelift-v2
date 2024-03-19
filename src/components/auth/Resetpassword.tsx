import React, { useState } from 'react'
import { Button, Typography, Row, Col, Card, Flex, notification } from 'antd'
import { Form, Input } from 'antd'
import { MobileFilled } from '@ant-design/icons'
import '../styles/forgot.css'
import logo from '../assets/icons/logo1.svg'
import image6 from '../assets/images/image6.png'
import { useNavigate } from 'react-router-dom'
import Backtologin from '../auth/Backtologin'
import { ResetPassAPI } from 'src/api/AuthService'

const Resetpassword = (props) => {
	const navigate = useNavigate()
	const [backlogin, setBacklogin] = useState('0')

	const handleresetbtn = async (values) => {
		const data = {
			cnfToken: props.cnfToken,
			phone: props.phone,
			newpass: values.password,
		}
		console.log(data)
		try {
			const res = await ResetPassAPI<NonceRes>(data)
			if (res.data == 'Success') {
				notification.success({ message: 'Password Change Successfully' })
				setBacklogin('1')
			} else {
				notification.error({
					message: 'Error in Password Change Please try again!',
				})
			}
		} catch (error) {
			notification.success({
				message: 'Error in Password !',
			})
		}
	}

	const [form] = Form.useForm()
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
			{backlogin == '0' && (
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
											Reset password
										</Typography.Title>
										<Typography.Text className="forgotpage-text">
											Please enter a new & secure password.
										</Typography.Text>
									</div>
									<Form
										layout="vertical"
										form={form}
										name="dependencies"
										onFinish={handleresetbtn}
										{...formItemLayout}
										variant="filled"
										style={{
											maxWidth: '600px',
										}}
									>
										<Form.Item
											label="Password"
											name="password"
											style={{ fontWeight: 600 }}
											rules={[
												{
													pattern: new RegExp(
														'(?=.*?[#?!@$%^&*-])(?=.*[A-Z])(?=.*?[0-9])'
													),
													message: 'please Enter strong password',
												},
												{
													message: 'Please Enter New Password',
												},
											]}
										>
											<Input.Password
												size="large"
												className="siginfeild"
												placeholder="Enter Password"
											/>
										</Form.Item>
										<Form.Item
											label="Confirm Password"
											name="password2"
											dependencies={['password']}
											style={{ fontWeight: 600 }}
											rules={[
												{
													message: 'Please Enter  the same Password',
												},
												({ getFieldValue }) => ({
													validator(_, value) {
														if (!value || getFieldValue('password') === value) {
															return Promise.resolve()
														}
														return Promise.reject(
															new Error(
																'The new password that you entered do not match!'
															)
														)
													},
												}),
											]}
										>
											<Input.Password
												size="large"
												className="siginfeild"
												placeholder="Enter Confirm Password"
											/>
										</Form.Item>

										<Form.Item>
											<Button htmlType="submit" className="verfication-codebtn">
												Reset Password
											</Button>
										</Form.Item>
									</Form>
								</div>
							</div>
						</Col>
						<Col lg={10} xl={12}>
							<div className="forgotpage-imgdiv">
								<Card className="forgotpage-card">
									<img src={image6} className="image5" alt="" />
								</Card>
							</div>
						</Col>
					</Row>
				</div>
			)}
			{backlogin == '1' && <Backtologin />}
		</>
	)
}

export default Resetpassword
