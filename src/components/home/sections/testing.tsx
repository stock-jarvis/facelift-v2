//import React from 'react'
// import Image from 'next/image'
//import algoBacktesting from '../../../../public/images/algo-backtest.png'
//import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import Backtest from 'src/assets/images/backtest.png'
import { Button, Flex, Typography, Image } from 'antd'
import { GoDotFill } from 'react-icons/go'
export default function ThirdContainer() {
	//const bulletStyle = { fontSize: '8px', color: 'black', marginRight: '8px' }
	return (
		<Flex className="shadow-[0_0px_25px_10px_rgba(0,0,0,0.1)] rounded-xl p-10">
			<Flex flex={1} className="p-[20px]">
				<Image src={Backtest} alt="Image" preview={false} />
			</Flex>
			<Flex flex={1} vertical justify="space-between" className="p-[20px]">
				<Flex vertical gap="middle">
					<Flex vertical>
						<Typography.Text className="text-[2.5rem]" strong>
							ALGO
						</Typography.Text>
						<Typography.Text className="text-[2.5rem]" strong>
							BACKTESTING
						</Typography.Text>
					</Flex>
					<Flex vertical>
						<Flex gap="middle">
							<GoDotFill />
							<Typography.Text>NO-Code solution</Typography.Text>
						</Flex>
						<Flex gap="middle">
							<GoDotFill />
							<Typography.Text>Automatic option backtesting</Typography.Text>
						</Flex>

						<Flex gap="middle">
							<GoDotFill />
							<Typography.Text>No more manual backtesting</Typography.Text>
						</Flex>
						<Flex gap="middle">
							<GoDotFill />
							<Typography.Text>
								Backtest With Shares, Futures &{' '}
								<span className="ml-[1.3rem] block md:ml-0 md:inline lg:ml-0 lg:inline">
									Options
								</span>
							</Typography.Text>
						</Flex>

						<Flex gap="middle">
							<GoDotFill />
							<Typography.Text>
								Backtest across NSE, MCX and{' '}
								<span className="ml-[1.3rem] block md:ml-0 md:inline lg:ml-0 lg:inline">
									Currency
								</span>
							</Typography.Text>
						</Flex>
					</Flex>
				</Flex>
				<Flex>
					<Button size="large" className="bg-sky-400">
						<Typography.Text strong className="text-white">
							Lanching soon
						</Typography.Text>
					</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}
