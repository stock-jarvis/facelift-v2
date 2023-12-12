import { Flex, Button } from 'antd'
import { GoDotFill } from 'react-icons/go'
import { pricingData } from '../constants/data'

interface PriceProps {
	time: number
	access: string[]
	day: number
	basketCredit: number
	worth: number
	price: number
}
const PricingCard = ({
	time,
	access,
	day,
	basketCredit,
	worth,
	price,
}: PriceProps) => {
	return (
		<Flex
			flex={1}
			vertical
			className=" bg-white p-[20px] shadow-[0_0px_25px_10px_rgba(0,0,0,0.1)] rounded-xl hover:shadow-[0_0px_20px_3px_rgba(44,154,255,0.35)] cursor-pointer select-none"
		>
			<Flex
				flex="1"
				justify="center"
				className="p-[15px] border-b-[1px] border-[gray]"
			>
				<p className="text-2xl font-bold">
					<span className="text-sky-400">{time}</span> Month
				</p>
			</Flex>
			<Flex
				vertical
				className="p-[15px] border-solid border-[gray] border-b-[1px] pb-[20px]"
			>
				<Flex gap="middle" align="center">
					<GoDotFill />
					<p className="text-xl font-normal">{day} day access to </p>
				</Flex>
				<Flex className="p-[20px]" vertical>
					{access.map((access, i) => (
						<Flex align="center" gap="middle" key={i}>
							<GoDotFill />
							<p className="text-xl font-normal">{access} </p>
						</Flex>
					))}
				</Flex>
				<Flex gap="middle" align="center">
					<GoDotFill />
					<p className="text-xl font-normal">
						{basketCredit} baskets credit worth ₹ {worth}
						/-
					</p>
				</Flex>
			</Flex>
			<Flex className="p-[15px]" vertical gap="middle">
				<Flex flex={1} justify="center" align="flex-end">
					<p className="text-2xl font-bold">₹ {price}</p>
					<p className="text-xs font-light">(incl. of Gst)</p>
				</Flex>
				<Flex flex={1} justify="center">
					<Button size="large" className=" bg-sky-400 text-[white]">
						<p>Buy Now</p>
					</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}

const PricingList = () => {
	return (
		<Flex flex="1" gap="middle">
			{pricingData.map((prices) => (
				<PricingCard key={prices.time} {...prices} />
			))}
		</Flex>
	)
}
export default PricingList
