import {
	Flex,
	Form,
	FormProps as AntdFormProps,
	FormItemProps as AntdFormItemProps,
	Input,
	Button,
	theme,
} from 'antd'
import { Rule } from 'antd/es/form'
import { useOnboardMutation } from 'src/api/auth/auth'
import Loader from 'src/common/components/loader'

import Logo from 'src/common/components/logo'
import Verify from './verify'

type SignupFormFields = {
	email: string
	phone: string
	password: string
	firstName: string
	confirmPassord: string
	refCode?: string
	lastName?: string
}

type FormProps = AntdFormProps<SignupFormFields>

const FormItem = Form.Item<SignupFormFields>
type FormItemProps = AntdFormItemProps<SignupFormFields>

const confirmPasswordRule: Rule = ({ getFieldValue }) => ({
	validator: (_, confirmPassword) => {
		if (!confirmPassword || getFieldValue('password') === confirmPassword) {
			return Promise.resolve()
		}

		return Promise.reject(
			new Error('The new password that you entered do not match!')
		)
	},
})

const signupFormFields: Array<FormItemProps> = [
	{
		name: 'firstName',
		label: 'First Name',
		children: <Input />,
		// rules: [
		// 	{
		// 		required: true,
		// 		message: 'Please specify your First Name!',
		// 	},
		// ],
	},
	{
		name: 'lastName',
		label: 'Last Name',
		children: <Input />,
	},
	{
		name: 'email',
		label: 'Email',
		children: <Input />,
		// rules: [
		// 	{
		// 		required: true,
		// 		message: 'Please enter a valid email address',
		// 	},
		// ],
	},
	{
		name: 'phone',
		label: 'Phone',
		children: <Input />,
		// rules: [
		// 	{
		// 		required: true,
		// 		message: 'Please enter a valid phone number',
		// 	},
		// ],
	},
	{
		name: 'password',
		label: 'Password',
		children: <Input.Password />,
		// rules: [
		// 	{
		// 		required: true,
		// 		message: 'Please enter a password',
		// 	},
		// ],
	},
	{
		name: 'confirmPassord',
		label: 'Confirm Password',
		children: <Input.Password />,
		// rules: [
		// 	{
		// 		required: true,
		// 		message: 'Please re-enter your password',
		// 	},
		// 	confirmPasswordRule,
		// ],
	},
]

const Signup = () => {
	const { token } = theme.useToken()

	const {
		mutate: signup,
		isLoading,
		data: signUpResponse,
	} = useOnboardMutation()

	const handleFinish: FormProps['onFinish'] = (formData) => {
		const { email, firstName, lastName, phone, password, refCode } = formData

		signup({
			email,
			phone,
			refCode,
			name: `${firstName} ${lastName}`.trim(),
			passwd: password,
		})
	}

	return (
		<Flex className="w-full h-full" align="center" justify="center">
			<Loader spinning={isLoading}>
				<Flex
					align="center"
					style={{
						border: '1px',
						padding: token.paddingXL,
						borderStyle: 'solid',
						borderColor: token.colorBorder,
						borderRadius: token.borderRadiusLG,
					}}
					gap={token.marginLG}
					vertical
				>
					<Logo />
					{signUpResponse?.nonce ? (
						<Verify nonce={signUpResponse.nonce} />
					) : (
						<Form
							name="signup"
							colon={false}
							autoComplete="off"
							labelCol={{ span: 9 }}
							onFinish={handleFinish}
						>
							{signupFormFields.map((field) => (
								<FormItem key={field.name as string} {...field} />
							))}
							<FormItem>
								<Button className="w-full" type="primary" htmlType="submit">
									Signup
								</Button>
							</FormItem>
						</Form>
					)}
				</Flex>
			</Loader>
		</Flex>
	)
}

export default Signup
