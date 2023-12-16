import { Button, Tooltip } from 'antd'

import { IconContext } from 'react-icons'
import { PiShuffleAngular } from 'react-icons/pi'

const Randomize = () => {
	const handleClickRandomize = () => {
		// TODO: Implement randomize
	}

	return (
		<Tooltip title="Randomize">
			<Button
				icon={
					<IconContext.Provider
						value={{
							size: '18px',
							style: {
								verticalAlign: 'middle',
							},
						}}
					>
						<PiShuffleAngular />
					</IconContext.Provider>
				}
				type="text"
				shape="circle"
				// TODO: Make icon blue and add Tooltip
				onClick={handleClickRandomize}
			/>
		</Tooltip>
	)
}

export default Randomize
