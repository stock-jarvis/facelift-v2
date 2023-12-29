import TimeSelector from '../modal-components/time-selector'
import { Flex, theme } from 'antd'

interface EntryExitProps {}
const EntryExit: React.FC<EntryExitProps> = () => {
	const { token } = theme.useToken()
	return (
		<Flex flex={1} justify="center">
			<Flex
				style={{
					width: '90%',
					padding: token.paddingLG,
					borderRadius: token.borderRadiusLG,
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
