import { Button, Form, Input, Typography, notification } from 'antd'
import { formType } from '../modals/auth/login-signup-modal'
import { apiPostSignUp } from 'src/api/AuthService'

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

const SignUpForm: React.FC<SignUpFormProps> = ({ changeForm, setNonce }) => {
	const onFinish = async (values: SignUpUserType) => {
		try {
			const res = await apiPostSignUp<SignUPUserRes>(values)
			if (res.data.status == 201) {
				notification.success({ message: 'User created!' })
				setNonce(res.data.nonce)
				changeForm('nonce')
			} else {
				notification.error({ message: 'Error While creating user' })
			}
		} catch (error) {
			notification.error({ message: 'Error While creating user' })
		}
	}

	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 400 }}
			onFinish={onFinish}
			autoComplete="off"
		>
			<Form.Item<SignUpUserType>
				label="Name"
				name="name"
				rules={[{ required: true, message: 'Please input your name!' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item<SignUpUserType>
				label="Email"
				name="email"
				rules={[{ required: true, message: 'Please input your email!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item<SignUpUserType>
				label="Phone"
				name="phone"
				rules={[{ required: true, message: 'Please input your phone!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item<SignUpUserType>
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password />
			</Form.Item>

			<div style={{ textAlign: 'end', marginBottom: '10px' }}>
				<Typography.Link onClick={() => changeForm('login')}>
					Already have account?
				</Typography.Link>
			</div>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default SignUpForm
