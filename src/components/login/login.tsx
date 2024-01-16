import {
	Button,
	Flex,
	Form,
	FormProps as AntdFormProps,
	theme,
	Input,
	Alert,
	Checkbox,
} from 'antd'
import { LoginResponse, useLoginMutation } from 'src/api/auth/auth'
import useLoginManager from 'src/auth/useLoginManager'
import Loader from 'src/common/components/loader'
import Logo from 'src/common/components/logo'
import { TrialExpiredError } from 'src/common/errors'

type LoginFormFields = {
	phone: string
	password: string
	remember: boolean
}

type FormProps = AntdFormProps<LoginFormFields>

const FormItem = Form.Item<LoginFormFields>

const Login = () => {
	const { token } = theme.useToken()

	const { login } = useLoginManager()

	const { mutate, error, isError, isLoading } = useLoginMutation()

	const handleLoginSuccess = (
		data: LoginResponse | undefined,
		remember: boolean
	) => login(data?.Token ?? '', remember)

	const handleLogin: FormProps['onFinish'] = ({ phone, password, remember }) =>
		mutate(
			{
				phone,
				password,
			},
			{
				onSuccess: (data) => handleLoginSuccess(data, remember),
			}
		)

	return (
		<Flex className="w-full h-full" align="center" justify="center">
			<Loader spinning={isLoading}>
				<Flex
					align="center"
					style={{
						width: '350px',
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

					{isError && (
						<Alert
							className="w-full"
							type="error"
							message={
								error instanceof TrialExpiredError
									? 'Trial has expired.'
									: 'Unable to login, Please try again.'
							}
							showIcon
						/>
					)}

					<Form
						name="signup"
						colon={false}
						layout="vertical"
						autoComplete="off"
						labelCol={{ span: 9 }}
						onFinish={handleLogin}
					>
						<FormItem
							name="phone"
							label="Mobile"
							rules={[
								{ required: true, message: 'Please enter you mobile number' },
							]}
						>
							<Input type="tel" />
						</FormItem>
						<FormItem
							name="password"
							label="Password"
							rules={[{ required: true, message: 'Please enter you password' }]}
						>
							<Input.Password />
						</FormItem>
						<FormItem
							name="remember"
							// label="Remember me"
							valuePropName="checked"
						>
							<Checkbox>Remember me</Checkbox>
						</FormItem>
						<FormItem>
							<Button className="w-full" type="primary" htmlType="submit">
								Login
							</Button>
						</FormItem>
					</Form>
				</Flex>
			</Loader>
		</Flex>
	)
}

export default Login
