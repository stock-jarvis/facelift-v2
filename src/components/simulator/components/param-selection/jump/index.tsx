import { Button } from 'antd'
import { RiShareForwardFill } from 'react-icons/ri'

import JumpModal from './jump-modal'
import { useToggle } from 'src/common/utils/state-utils'

const Jump = () => {
	const [isJumpModalOpen, toggleIsJumpModalOpen] = useToggle(false)

	const handleJumpIconClick = () => {
		// TODO: Implement jump execution
	}

	return (
		<>
			<Button.Group>
				<Button onClick={toggleIsJumpModalOpen}>Jump</Button>
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
