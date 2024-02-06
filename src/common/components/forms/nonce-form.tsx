import { Button, Form, Input, notification } from 'antd'
import { formType } from '../modals/auth/login-signup-modal'
import { apiPostNonce } from 'src/api/AuthService'

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

const NonceForm: React.FC<NonceFormProps> = ({ changeForm, nonce }) => {
	const onFinish = async (values: NonceFormType) => {
		try {
			const res = await apiPostNonce<NonceRes>({ ...values, nonce })
			// this needed temporatry as the status needs to be corrected from backend
			if (res.data.Status == 200) {
				notification.success({ message: 'OTP Verification Success !' })
				changeForm('login')
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
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			autoComplete="off"
		>
			<Form.Item<NonceFormType>
				label="Otp"
				name="otp"
				rules={[{ required: true, message: 'Please input your Otp!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default NonceForm
