import React from 'react'
import '../styles/signup.css'
import { MdEmail } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { IoMdLock } from 'react-icons/io'
import {
	Button,
	Typography,
	Row,
	Col,
	Card,
	Flex,
	Select,
	Checkbox,
	notification,
	Form,
	Input,
} from 'antd'
import logo from '../assets/icons/logo1.svg'
import poem from '../assets/images/poem.png'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import Verifypage from './Verifypage'
// import Signin from './Signin';
import Gotologin from './Gotologin'
import { SignUpAPI } from 'src/api/AuthService'

const { Option } = Select

export type SignUpUserType = {
	name?: string
	email?: string
	phone?: number
	password?: string
}

type SignUPUserRes = {
	nonce: string
	status: number
}

interface SignUpFormProps {
	changeForm: (val: formType) => void
	setNonce: (val: string) => void
}

const prefixSelector = (
	<Form.Item name="prefix" noStyle>
		<Select
			style={{
				width: '70px',
				height: '65px',
			}}
			defaultValue="+91"
		>
			<Option value="86">+86</Option>
			<Option value="87">+87</Option>
		</Select>
	</Form.Item>
)

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
const SignupPage = () => {
	const [verifypage, setVerifypage] = useState('0')
	const [Noun, setNoun] = useState('')
	const [phone, setPhone] = useState('')

	const onFinish = async (values: SignUpUserType) => {
		const { agreement, prefix, confirm, ...newValues } = values as {
			agreement: any
			[key: string]: any
		}
		console.log(newValues)
		try {
			const res = await SignUpAPI<SignUPUserRes>(newValues)
			if (res.data.status == 201) {
				notification.success({ message: 'User created!' })
				setVerifypage('1')
				setNoun(res.data.nonce)
				setPhone(newValues.phone)
			} else {
				notification.error({ message: 'Error While creating user' })
			}
		} catch (error) {
			notification.error({ message: 'Error While creating user' })
		}
	}

	// const onFinish = (values) => {

	//   console.log('Received values of form: ', values);
	//   // onsignup();
	// };

	const [form] = Form.useForm()
	const handleclicksign = () => {
		navigate('/login')
	}

	const navigate = useNavigate()

	return (
		<>
			{verifypage == '0' && (
				<div className="main-signup">
					<Row>
						<Col lg={14} xl={12}>
							<div className="div-form">
								<Flex>
									<img src={logo} alt="" />
									<Typography.Title level={1} className="logo-txt">
										StockJarvis
									</Typography.Title>
								</Flex>
								<div className="text-wrapper">
									<Typography.Title level={1} className="signup-txt">
										Sign up
									</Typography.Title>
									<Typography.Text>
										Join Our Community and Access Exclusive Features by Signing
										Up Today!
									</Typography.Text>
								</div>
								<Form
									layout="vertical"
									{...formItemLayout}
									onFinish={onFinish}
									variant="filled"
									style={{
										maxWidth: 600,
									}}
								>
									<Form.Item
										label="Full Name"
										name="name"
										className="labeltext"
										rules={[
											{
												pattern: new RegExp(/^[a-zA-Z]*$/),
												message: 'No Numbers Allowed',
											},
											{
												required: true,
												message: 'Please Enter Full Name!',
											},
										]}
									>
										<Input
											prefix={<FaUser />}
											size="large"
											className="inputfield"
										/>
									</Form.Item>
									<Form.Item
										label="Email Address"
										name="email"
										className="labeltext"
										rules={[
											{
												required: true,
												type: 'email',
												message: 'Please valid email',
											},
										]}
									>
										<Input
											prefix={<MdEmail />}
											size="large"
											className="inputfield"
										/>
									</Form.Item>

									<Form.Item
										name="phone"
										label="Phone"
										className="labeltext"
										rules={[
											{
												pattern: new RegExp(/^[0-9\b]+$/),
												message: 'String is not Allowed',
											},
											{
												required: true,
												message: 'Please Enter your phone number!',
											},
										]}
									>
										<Input
											size="large"
											className="inputfield"
											id="phone1"
											addonBefore={prefixSelector}
											maxLength={10}
										/>
									</Form.Item>

									<Form.Item
										name="password"
										label="Password"
										className="labeltext"
										rules={[
											{
												pattern: new RegExp(
													'(?=.*?[#?!@$%^&*-])(?=.*[A-Z])(?=.*?[0-9])'
												),
												message: 'please Enter strong password',
											},
											{
												required: true,
												message: 'Please Enter your password!',
											},
										]}
										hasFeedback
									>
										<Input.Password
											className="inputfield"
											prefix={<IoMdLock />}
											size="large"
										/>
									</Form.Item>

									<Form.Item
										name="confirm"
										label="Confirm Password"
										dependencies={['password']}
										className="labeltext"
										hasFeedback
										rules={[
											{
												required: true,
												message: 'Please confirm your password!',
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
											className="inputfield"
											prefix={<IoMdLock />}
											size="large"
										/>
									</Form.Item>
									<Form.Item
										name="agreement"
										valuePropName="checked"
										rules={[
											{
												validator: (_, value) =>
													value
														? Promise.resolve()
														: Promise.reject(
																new Error('Should accept agreement')
															),
											},
										]}
									>
										<Checkbox>
											{' '}
											I agree to all <b>Terms & condition</b>
										</Checkbox>
									</Form.Item>
									<Form.Item>
										<Button htmlType="submit" className="signupbtn">
											Submit
										</Button>
									</Form.Item>
									<Typography.Text>
										Already have an account?{' '}
										<a onClick={handleclicksign}> Sign In</a>
									</Typography.Text>
								</Form>
							</div>
						</Col>
						<Col lg={10} xl={12}>
							<div className="card-div">
								<Card className="poem-card">
									<img src={poem} className="poem-img" alt="" />
								</Card>
							</div>
						</Col>
					</Row>
				</div>
			)}

			{/* {verifypage == '1' && <Verifypage props={Noun}  />} */}
			{verifypage == '1' && (
				<Verifypage props={{ noun: Noun, phone: phone }} phone={phone} />
			)}
			{verifypage == '2' && <Gotologin />}
		</>
	)
}
export default SignupPage
