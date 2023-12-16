import TimeSelector from '../modal-components/time-selector'
import { Flex, theme } from 'antd'
const EntryExit = () => {
	const { token } = theme.useToken()
	return (
		<Flex flex={1} justify="center">
			<Flex
				style={{
					width: '90%',
					backgroundColor: '#F1F8FF',
					padding: token.paddingLG,
					borderRadius: token.borderRadiusLG,
					boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.25)',
				}}
			>
				<Flex flex={1} justify="center" align="center">
					<TimeSelector label={'Entry Time'} />
				</Flex>
				<Flex flex={1} justify="center" align="center">
					<TimeSelector label={'Exit Time'} />
				</Flex>
			</Flex>
		</Flex>
	)
}

export default EntryExit
