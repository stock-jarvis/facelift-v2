import { Button, Layout, Flex, Image, Typography } from 'antd'
import LightBulb from 'src/assets/images/light-bulb.jpg'

const { Text } = Typography
export default function FirstContainer() {
	return (
		<Layout className="bg-[white] h-[100vh]">
			<Flex flex={1} align="center">
				<Flex flex={1} justify="center" align="center">
					<Flex vertical={true} gap="large" className="max-sm:text-center">
						<Flex vertical={true}>
							<Text className="text-lg text-slate-500 font-medium">
								- FREE 1 DAY TRIAL
							</Text>
							<Text className="text-3xl text-[#cf242c]" strong>
								Backtest With
							</Text>
							<Text className="text-3xl" strong>
								Power of
							</Text>
							<Text className="text-3xl" strong>
								Tickwise Data
							</Text>
						</Flex>

						<Flex gap="middle" vertical={false} className="max-sm:text-center">
							<Text className="text-3xl text-[#22498e]" strong>
								NSE
							</Text>
							<Text className="text-3xl text-[#199847]" strong>
								MCX
							</Text>
							<Text className="text-3xl text-[#cf242c]" strong>
								CURRENCY
							</Text>
						</Flex>
						<Flex gap={'middle'} className="max-sm:justify-center">
							<Button size="large" className="bg-sky-400 text-white">
								<Text strong className="text-white">
									Try for free
								</Text>
							</Button>
							<Button size="large">
								<Text strong>See how it works</Text>
							</Button>
						</Flex>
					</Flex>
				</Flex>

				<Flex
					className="max-sm:hidden"
					flex="1"
					vertical={false}
					justify="center"
					align="center"
				>
					<Image src={LightBulb} alt="Image" width={250} preview={false} />
				</Flex>
			</Flex>
		</Layout>
	)
}
