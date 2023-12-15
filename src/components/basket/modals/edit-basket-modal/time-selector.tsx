import { Flex, Select, theme, Typography } from 'antd'
const { Text } = Typography
interface TimeSelectorProps {
	label: string
}
const TimeSelector = ({ label }: TimeSelectorProps) => {
	const { token } = theme.useToken()
	return (
		<Flex flex={1} gap="middle" align="center" justify="center">
			<Text
				style={{
					fontSize: token.fontSizeLG,
					fontWeight: token.fontWeightStrong,
				}}
			>
				{label}
			</Text>
			<Select
				style={{ width: '100px' }}
				options={[
					{ value: 1, label: '1' },
					{ value: 2, label: '2' },
					{ value: 3, label: '3' },
					{ value: 4, label: '4' },
					{ value: 5, label: '5' },
				]}
			/>
			<Text
				style={{
					fontSize: token.fontSizeLG,
					fontWeight: token.fontWeightStrong,
				}}
			>
				{' '}
				:{' '}
			</Text>
			<Select
				style={{ width: '100px' }}
				options={[
					{ value: 1, label: '1' },
					{ value: 2, label: '2' },
					{ value: 3, label: '3' },
					{ value: 4, label: '4' },
					{ value: 5, label: '5' },
				]}
			/>
		</Flex>
	)
}

export default TimeSelector
