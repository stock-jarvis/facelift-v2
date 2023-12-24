import { Button, ConfigProvider, theme } from 'antd'
import { RiShareForwardFill } from 'react-icons/ri'

import JumpModal from './jump-modal'
import { useToggle } from 'src/common/utils/state-utils'

const Jump = () => {
	const { token } = theme.useToken()

	const [isJumpModalOpen, toggleIsJumpModalOpen] = useToggle(false)

	const handleJumpIconClick = () => {
		// TODO: Implement jump execution
	}

	return (
		<>
			<Button.Group>
				<ConfigProvider
					theme={{
						components: {
							Button: {
								defaultBorderColor: token.colorPrimaryHover,
							},
						},
					}}
				>
					<Button onClick={toggleIsJumpModalOpen}>Jump</Button>
				</ConfigProvider>
				<Button
					icon={<RiShareForwardFill />}
					type="primary"
					onClick={handleJumpIconClick}
				/>
			</Button.Group>

			{isJumpModalOpen && <JumpModal onCancel={toggleIsJumpModalOpen} />}
		</>
	)
}

export default Jump
