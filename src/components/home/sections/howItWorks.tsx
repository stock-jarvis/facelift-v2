import { Flex, Typography, Image } from 'antd'
import { GoDotFill } from 'react-icons/go'
import Simulator from '../../../assets/images/simulator.png'
const { Text } = Typography
const HowItWorks = () => {
	return (
		<Flex
			flex={'1'}
			vertical={false}
			align="center"
			className="shadow-[0_0px_25px_10px_rgba(0,0,0,0.1)] rounded-xl p-10"
		>
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
			<Flex flex={'1'} justify="center">
				<Image src={Simulator} alt="Image" preview={false} />
			</Flex>
		</Flex>
	)
}

export default HowItWorks
