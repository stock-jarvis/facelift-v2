import React, { useState } from 'react'
import { Button, Typography, Row, Col, Card, Flex, notification } from 'antd'
import { Form, Input } from 'antd'
import '../styles/signin.css'
import logo from '../assets/icons/logo1.svg'
import image4 from '../assets/images/image4.png'
import { useNavigate } from 'react-router-dom'
import { LoginAPI } from 'src/api/AuthService'

export type LoginUserType = {
	email?: string
	password?: string
	phone?: number
}

type LoginUserRes = {
	Token: string
	Status: number
}

interface LoginFormProps {
	changeForm: (val: formType) => void
	closeModal: () => void
}

const Signin = () => {
	const navigate = useNavigate()
	const onforgot = () => {
		navigate('/forget')
	}
	const handlesignup = () => {
		navigate('/signup')
	}

	const onFinish = async (values: LoginUserType) => {
		try {
			const res = await LoginAPI<LoginUserRes>(values)
			// this needed temporatry as the status needs to be corrected from backend
			if (res.data.Status == 200) {
				notification.success({ message: 'Logged in Success !' })
				navigate('/basket')
				localStorage.setItem('userData', JSON.stringify(res.data))
			} else {
				notification.error({ message: 'Error While login' })
			}
		} catch (error) {
			console.log('Error While login', error)
			notification.success({ message: 'Error While login' })
		}
	}

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

	const validateMobileOrEmail = (rule, value) => {
		// Regular expression for validating email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		// Regular expression for validating mobile number
		const mobileRegex = /^[0-9]{10}$/

		if (emailRegex.test(value) || mobileRegex.test(value)) {
			return Promise.resolve()
		}
		return Promise.reject('Please enter a valid email or mobile number!')
	}

	return (
		<>
			<div className="main-signup">
				<Row>
					<Col lg={14} xl={12}>
						<Flex className="divflex">
							<img src={logo} alt="" />
							<Typography.Title level={1} className="logo-txt">
								StockJarvis
							</Typography.Title>
						</Flex>
						<div className="div-signin">
							<div className="text-wrapper">
								<Typography.Title level={1} className="signup-txt">
									Sign In
								</Typography.Title>
								<Typography.Text className="text-base">
									Welcome back! Login to your account
								</Typography.Text>
							</div>
							<Form
								layout="vertical"
								onFinish={onFinish}
								{...formItemLayout}
								variant="filled"
								style={{
									maxWidth: '661px',
									marginTop: '20px',
								}}
							>
								<Form.Item
									label="Mobile Number"
									name="phone"
									className="labeltext"
									rules={[
										{
											pattern: new RegExp(/^[0-9\b]+$/),
											message: 'Please Enter Valid Number',
										},
										{
											required: true,
											message: 'Please Enter your phone number!',
										},
									]}
								>
									<Input
										size="large"
										className="siginfeild"
										placeholder="Enter mobile number"
									/>
								</Form.Item>

								<Form.Item
									label="Password"
									name="password"
									className="labeltext"
									rules={[
										{
											required: true,
											message: 'Please Enter password',
										},
									]}
								>
									<Input.Password
										size="large"
										className="siginfeild"
										placeholder="Enter password"
									/>
								</Form.Item>

								<Typography.Text className="forgettxt">
									<a onClick={onforgot}>Forgot Password?</a>
								</Typography.Text>
								<Form.Item>
									<Button htmlType="submit" className="signinbtn">
										Sign In
									</Button>
								</Form.Item>
								<Typography.Text className="">
									Don't have an account?<a onClick={handlesignup}> Sign up</a>
								</Typography.Text>
							</Form>
						</div>
					</Col>
					<Col lg={10} xl={12}>
						<div className="col2-maindiv">
							<Card className="signin-image">
								<img src={image4} className="image4" alt="" />
							</Card>
						</div>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default Signin
