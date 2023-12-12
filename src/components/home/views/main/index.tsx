import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Button, Layout, Flex, Image, Typography } from 'antd'
import LightBulb from 'src/assets/images/light-bulb.jpg'

const { Text } = Typography
export default function FirstContainer() {
	const mobileSize = useMediaQuery({
		query: '(min-width: 550px)',
	})
	const tabSize = useMediaQuery({
		query: '(max-width: 820px)',
	})
	useEffect(() => {
		console.log(tabSize)
	}, [tabSize])
	return (
		<Layout className="bg-[white] h-[100vh]">
			<Flex flex={1} align="center" vertical={tabSize && mobileSize}>
				<Flex flex={1} justify="center" align="center">
					<Flex vertical={true} gap="middle">
						<Flex vertical={true}>
							<Text className="text-[1rem] text-slate-500 font-medium">
								- FREE 1 DAY TRIAL
							</Text>
							<Text className="text-[2.5rem] text-[#cf242c]" strong>
								Backtest With
							</Text>
							<Text className="text-[2.5rem]" strong>
								Power of
							</Text>
							<Text className="text-[2.5rem]" strong>
								Tickwise Data
							</Text>
						</Flex>

						<Flex gap="middle" vertical={false}>
							<Text className="text-[2.5rem] text-[#22498e]" strong>
								NSE
							</Text>
							<Text className="text-[2.5rem] text-[#199847]" strong>
								MCX
							</Text>
							<Text className="text-[2.5rem] text-[#cf242c]" strong>
								CURRENCY
							</Text>
						</Flex>
						<Flex gap={'middle'}>
							<Button size="large" className="bg-sky-400 text-white">
								<Text strong>Try for free</Text>
							</Button>
							<Button size="large">
								<Text strong>See how it works</Text>
							</Button>
						</Flex>
					</Flex>
				</Flex>

				<Flex
					flex="1"
					vertical={false}
					justify="center"
					align="center"
					hidden={!mobileSize}
				>
					<Image src={LightBulb} alt="Image" width={250} preview={false} />
				</Flex>
			</Flex>
		</Layout>
	)
}
