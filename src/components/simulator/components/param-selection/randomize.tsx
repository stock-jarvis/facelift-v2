import { Button, Tooltip, theme } from 'antd'

import { IconContext } from 'react-icons'
import { PiShuffleAngular } from 'react-icons/pi'

const Randomize = () => {
	const { token } = theme.useToken()

	const handleClickRandomize = () => {
		// TODO: Implement randomize
	}

	return (
		<Tooltip title="Randomize">
			<Button
				icon={
					<IconContext.Provider
						value={{
							size: `${token.sizeLG}px`,
							style: {
								verticalAlign: 'middle',
							},
						}}
					>
						<PiShuffleAngular />
					</IconContext.Provider>
				}
				type="link"
				shape="circle"
				// TODO: Make icon blue and add Tooltip
				onClick={handleClickRandomize}
			/>
		</Tooltip>
	)
}

export default Randomize
