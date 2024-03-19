import { Button, Form, Input, Typography, notification } from 'antd'
import { formType } from '../modals/auth/login-signup-modal'
import { apiPostLogin } from 'src/api/AuthService'
import { LoginUserRes } from 'src/common/types'

export type LoginUserType = {
	email?: string
	password?: string
	phone?: number
}

interface LoginFormProps {
	changeForm: (val: formType) => void
	closeModal: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ changeForm, closeModal }) => {
	const onFinish = async (values: LoginUserType) => {
		try {
			const res = await apiPostLogin<LoginUserRes>(values)
			// this needed temporatry as the status needs to be corrected from backend
			if (res.data.Status == 200) {
				console.log('Logged in Success')
				notification.success({ message: 'Logged in Success !' })
				closeModal()
			} else {
				notification.error({ message: 'Error While login' })
			}
		} catch (error) {
			console.log('Error While login', error)
			notification.success({ message: 'Error While login' })
		}
	}

	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			autoComplete="off"
		>
			<Form.Item<LoginUserType>
				label="Email"
				name="email"
				rules={[{ required: true, message: 'Please input your email!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item<LoginUserType>
				label="Phone"
				name="phone"
				rules={[{ required: true, message: 'Please input your phone!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item<LoginUserType>
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password />
			</Form.Item>

			<div style={{ textAlign: 'end', marginBottom: '10px' }}>
				<Typography.Link onClick={() => changeForm('signup')}>
					Create account?
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

export default LoginForm
