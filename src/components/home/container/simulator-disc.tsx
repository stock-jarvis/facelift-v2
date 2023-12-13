import { Flex, Typography } from 'antd'
import { GoDotFill } from 'react-icons/go'
const { Text } = Typography
const SimulatorDisc = () => {
	return (
		<Flex flex={'1'} vertical gap="middle">
			<Flex className="flex-col max-sm:items-center">
				<Text className="text-3xl" strong>
					MULTI
				</Text>
				<Text className="text-3xl max-sm:text-center" strong>
					EXCHANGE SIMULATOR
				</Text>
			</Flex>
			<Flex vertical>
				<Flex gap={'middle'} align="center">
					<GoDotFill className="max-sm:hidden" />
					<Text>
						F&O Data <span className="text-sky-500">From 2018</span>
					</Text>
				</Flex>
				<Flex gap={'middle'} align="center">
					<GoDotFill className="max-sm:hidden" />
					<Text>
						All instruments from &nbsp;
						<span className="text-sky-500">NSE, MCX & Currency</span>
					</Text>
				</Flex>
				<Flex gap={'middle'} align="center">
					<GoDotFill className="max-sm:hidden" />
					<Text>
						<span className="text-sky-500"> Secondwise</span> Dataset
					</Text>
				</Flex>
				<Flex gap={'middle'} align="center">
					<GoDotFill className="max-sm:hidden" />
					<Text>Options simulator</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default SimulatorDisc
