import PricingCard from '../../custom/pricingCard'
import { Flex, Typography } from 'antd'
const index = () => {
	return (
		<Flex vertical gap="large" align="center">
			<Flex flex={1} align="center" vertical className="pt-20 pb-20">
				<Typography.Title level={1} className="text-center">
					Subscribe today and unlock a world of endless{' '}
					<span className="text-sky-400">possibilites</span>
				</Typography.Title>
			</Flex>
			<Flex className="w-[80%] pb-20">
				<PricingCard />
			</Flex>
		</Flex>
	)
}

export default index
