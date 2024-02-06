import { CloseOutlined } from '@ant-design/icons'
import { Modal, theme, Typography, Flex } from 'antd'
import LoginForm from '../../forms/login-form'
import SignUpForm from '../../forms/sign-up-form'
import { useState } from 'react'
import { capitalizeFirstLetter } from 'src/common/utils/conversion-utils'
import NonceForm from '../../forms/nonce-form'

export interface LoginSignupModalProps {
	open: boolean
	handleOpen: (val: boolean) => void
}

export type formType = 'login' | 'signup' | 'nonce'

const LoginSignupModal: React.FC<LoginSignupModalProps> = ({
	open,
	handleOpen,
}) => {
	const { token } = theme.useToken()

	const [activeForm, setActiveForm] = useState<formType>('nonce')

	const [nonce, setNonce] = useState<string>('')

	const handleModalState = () => {
		handleOpen(false)
	}

	const LoginComponent = (
		<LoginForm changeForm={setActiveForm} closeModal={handleModalState} />
	)
	const SignUpComponent = (
		<SignUpForm changeForm={setActiveForm} setNonce={setNonce} />
	)
	const NonceComponent = <NonceForm changeForm={setActiveForm} nonce={nonce} />

	const renderFroms = () => {
		let result
		switch (activeForm) {
			case 'login':
				result = LoginComponent
				break
			case 'signup':
				result = SignUpComponent
				break
			case 'nonce':
				result = NonceComponent
				break
			default:
				result = LoginComponent
				break
		}
		return result
	}

	return (
		<Modal
			open={open}
			closeIcon={null}
			onOk={handleModalState}
			destroyOnClose={true}
			okButtonProps={{ type: 'default' }}
			styles={{
				content: { marginTop: '80px', padding: 0 },
				body: { padding: token.paddingSM },
			}}
			title={
				<Flex
					flex="1"
					justify="space-between"
					style={{
						padding: token.paddingXS,
					}}
				>
					<Typography.Text>{capitalizeFirstLetter(activeForm)}</Typography.Text>

					<CloseOutlined
						onClick={handleModalState}
						style={{ paddingInline: token.paddingSM }}
					/>
				</Flex>
			}
			footer={<></>}
		>
			<Flex justify="center" align="center">
				{renderFroms()}
			</Flex>
		</Modal>
	)
}

export default LoginSignupModal
