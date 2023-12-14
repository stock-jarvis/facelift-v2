import { Button } from 'antd'

import { IconContext } from 'react-icons'
import { PiShuffleAngular } from 'react-icons/pi'

const Randomize = () => {
	const handleClickRandomize = () => {
		// TODO: Implement randomize
	}

	return (
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
			type="primary"
			onClick={handleClickRandomize}
		>
			Randomize
		</Button>
	)
}

export default Randomize
