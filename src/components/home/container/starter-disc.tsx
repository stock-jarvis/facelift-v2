import { Button, Flex, Typography } from 'antd'
const { Text } = Typography
const SimulatorDisc = () => {
	return (
		<Flex vertical gap="middle" flex="1">
			<Flex vertical>
				<Text className="text-[2.5rem]" strong>
					Get started with
				</Text>
				<Text className="text-[2.5rem]" strong>
					StockJarvis today
				</Text>
			</Flex>
			<Flex vertical>
				<Flex gap={'middle'} align="center">
					<Text>Get you 6 hour free trial now.</Text>
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

export default SimulatorDisc
