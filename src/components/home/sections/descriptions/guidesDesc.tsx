import { Button, Flex, Typography } from 'antd'
const { Text } = Typography
const GuidesDesc = () => {
	return (
		<Flex vertical gap="middle" flex="1">
			<Flex vertical>
				<Text className="text-[2.5rem]" strong>
					How To Backtest in
				</Text>
				<Text className="text-[2.5rem]" strong>
					simulator
				</Text>
			</Flex>
			<Flex vertical>
				<Flex align="center">
					<Text>Just 3 simple steps to optimize your</Text>
				</Flex>
				<Flex align="center">
					<Text>backtesting experience.</Text>
				</Flex>
			</Flex>
			<Flex>
				<Button size="large" className="bg-sky-400">
					<Text strong className="text-white">
						{' '}
						Sign up now
					</Text>
				</Button>
			</Flex>
		</Flex>
	)
}

export default GuidesDesc
