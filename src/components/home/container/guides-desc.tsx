import { Button, Flex, Typography } from 'antd'
const { Text } = Typography
const GuidesDesc = () => {
	return (
		<Flex vertical gap="middle" flex="1">
			<Flex vertical className="max-sm:text-center">
				<Text className="text-3xl" strong>
					How To Backtest in
				</Text>
				<Text className="text-3xl" strong>
					simulator
				</Text>
			</Flex>
			<Flex vertical className="max-sm:text-center">
				<Flex align="center">
					<Text>Just 3 simple steps to optimize your</Text>
				</Flex>
				<Flex align="center" className="max-sm:justify-center">
					<Text>backtesting experience.</Text>
				</Flex>
			</Flex>
			<Flex>
				<Button size="large" className="bg-sky-400 max-sm:w-full">
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
