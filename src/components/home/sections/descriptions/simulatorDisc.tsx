import { Flex, Typography } from 'antd'
import { GoDotFill } from 'react-icons/go'
const { Text } = Typography
const SimulatorDisc = () => {
	return (
		<Flex flex={'1'} vertical gap="middle">
			<Flex vertical>
				<Text className="text-[2.5rem]" strong>
					MULTI
				</Text>
				<Text className="text-[2.5rem]" strong>
					EXCHANGE SIMULATOR
				</Text>
			</Flex>
			<Flex vertical>
				<Flex gap={'middle'} align="center">
					<GoDotFill />
					<Text>
						F&O Data <span className="text-sky-500">From 2018</span>
					</Text>
				</Flex>
				<Flex gap={'middle'} align="center">
					<GoDotFill />
					<Text>
						All instruments from &nbsp;
						<span className="text-sky-500">NSE, MCX & Currency</span>
					</Text>
				</Flex>
				<Flex gap={'middle'} align="center">
					<GoDotFill />
					<Text>
						<span className="text-sky-500"> Secondwise</span> Dataset
					</Text>
				</Flex>
				<Flex gap={'middle'} align="center">
					<GoDotFill />
					<Text>Options simulator</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default SimulatorDisc
