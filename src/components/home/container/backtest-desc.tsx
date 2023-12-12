import { Flex, Typography, Button } from 'antd'
import { GoDotFill } from 'react-icons/go'
const BackTest = () => {
	return (
		<Flex flex={1} vertical gap="middle" className="max-sm:p-[5px] sm:p-[20px]">
			<Flex vertical gap="middle" className=" w-[100%]" flex={'1'}>
				<Flex className="flex-col max-sm:text-center flex-1 w-full ">
					<Typography.Text className="text-3xl" strong>
						ALGO
					</Typography.Text>
					<Typography.Text className="text-3xl" strong>
						BACKTESTING
					</Typography.Text>
				</Flex>
				<Flex className="flex-col max-sm:text-center  flex-1">
					<Flex gap="middle" align="center">
						<GoDotFill className="max-sm:hidden" />
						<Typography.Text>NO-Code solution</Typography.Text>
					</Flex>
					<Flex gap="middle" align="center">
						<GoDotFill className="max-sm:hidden" />
						<Typography.Text>Automatic option backtesting</Typography.Text>
					</Flex>

					<Flex gap="middle" align="center">
						<GoDotFill className="max-sm:hidden" />
						<Typography.Text>No more manual backtesting</Typography.Text>
					</Flex>
					<Flex gap="middle" align="center">
						<GoDotFill className="max-sm:hidden" />
						<Typography.Text>
							Backtest With Shares, Futures & Options
						</Typography.Text>
					</Flex>

					<Flex gap="middle" align="center">
						<GoDotFill className="max-sm:hidden" />
						<Typography.Text>
							Backtest across NSE, MCX and Currency
						</Typography.Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex>
				<Button size="large" className="bg-sky-400 max-sm:w-[100%] ">
					<Typography.Text strong className="text-white">
						Lanching soon
					</Typography.Text>
				</Button>
			</Flex>
		</Flex>
	)
}
export default BackTest
