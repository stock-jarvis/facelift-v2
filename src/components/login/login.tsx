import {
	Button,
	Flex,
	Form,
	FormProps as AntdFormProps,
	theme,
	Input,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from 'src/api/auth/auth'
import Loader from 'src/common/components/loader'
import Logo from 'src/common/components/logo'

type LoginFormFields = {
	phone: string
	password: string
}

type FormProps = AntdFormProps<LoginFormFields>

const FormItem = Form.Item<LoginFormFields>

const Login = () => {
	const { token } = theme.useToken()

	const navigate = useNavigate()

	const { mutate, isLoading } = useLoginMutation()

	const handleLogin: FormProps['onFinish'] = ({ phone, password }) =>
		mutate(
			{
				phone,
				password,
			},
			{
				onSuccess() {
					navigate('/')
				},
			}
		)

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

					<Form
						name="signup"
						colon={false}
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
							<Input type="number" />
						</FormItem>
						<FormItem
							name="password"
							label="Password"
							rules={[{ required: true, message: 'Please enter you password' }]}
						>
							<Input />
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
