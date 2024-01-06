import { Form, FormProps, Button, Input, Flex, Alert, Space, theme } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useVerifyMutation } from 'src/api/auth'
import { useResendOTPMutation } from 'src/api/auth/auth'
import Loader from 'src/common/components/loader'

type VerifyProps = {
	nonce: string
}

type VerifyFormFields = {
	otp: string
}

type VerifyFormProps = FormProps<VerifyFormFields>

const FormItem = Form.Item<VerifyFormFields>

const Verify: React.FC<VerifyProps> = ({ nonce }) => {
	const { token } = theme.useToken()

	const navigate = useNavigate()

	const verifyMutation = useVerifyMutation()

	const resendOtpMutation = useResendOTPMutation()

	// TODO: Implement countdown
	const handleResendOTP = () =>
		resendOtpMutation.mutate({
			nonce,
		})

	const handleFinish: VerifyFormProps['onFinish'] = (formData) =>
		verifyMutation.mutate({
			nonce,
			otp: formData.otp,
		})

	const handleRedirectToLogin = () => navigate('/login')

	return (
		<Loader spinning={verifyMutation.isLoading}>
			{verifyMutation.isSuccess ? (
				<Flex
					style={{ padding: token.paddingXL, gap: token.marginLG }}
					align="center"
					justify="center"
					vertical
				>
					<Alert
						type="success"
						message="Sign Up Successful. Welcome to System Trade."
						showIcon
					/>
					<Button type="link" onClick={handleRedirectToLogin}>
						Login to access System Trade
					</Button>
				</Flex>
			) : (
				<Space direction="vertical" size="large">
					{verifyMutation.isError && (
						<Alert type="error" message="Unable to verify OTP" showIcon />
					)}
					{resendOtpMutation.isError && (
						<Alert type="error" message="Unable to resend OTP." showIcon />
					)}
					<Form
						name="verify"
						colon={false}
						autoComplete="off"
						labelCol={{ span: 9 }}
						onFinish={handleFinish}
					>
						<FormItem
							name="otp"
							label="One Time Password"
							help="Enter the One Time Password received on you mobile"
							rules={[
								{
									required: true,
									message: 'One Time Password is mandatory',
								},
							]}
						>
							<Input type="number" />
						</FormItem>
						<FormItem label=" ">
							<Button
								disabled={resendOtpMutation.isLoading}
								style={{ padding: 0 }}
								type="link"
								onClick={handleResendOTP}
							>
								Resend OTP
							</Button>
						</FormItem>
						<FormItem>
							<Button className="w-full" type="primary" htmlType="submit">
								Verify OTP
							</Button>
						</FormItem>
					</Form>
				</Space>
			)}
		</Loader>
	)
}

export default Verify
