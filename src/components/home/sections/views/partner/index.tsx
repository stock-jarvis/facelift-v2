import { Flex, Typography } from 'antd'
import PartnersItem from '../../custom/partnersItem'
const Index = () => {
	return (
		<div className="pt-40 pb-40">
			<Flex vertical gap="large">
				<Flex flex={1} align="center" vertical className="pt-10 pb-10">
					<Typography.Title level={1} className="text-center">
						Engaging with premier organizations and individuals across the
						globe.
					</Typography.Title>
				</Flex>
				<Flex>
					<PartnersItem />
				</Flex>
			</Flex>
		</div>
	)
}

export default Index
