import { Flex, Image, Typography } from 'antd'
import { PartnersData } from '../constants/data'

interface ItemProps {
	image: string
	data: string
}
const PartnersItem = ({ image, data }: ItemProps) => {
	return (
		<Flex vertical flex={1} gap="large">
			<Flex>
				<div className="w-[80%] h-[100px]">
					<Image src={image} alt="Image" preview={false} />
				</div>
			</Flex>
			<Flex className="p-[10px]" align="center" justify="center">
				<Typography.Text className="text-lg font-medium">
					{data}
				</Typography.Text>
			</Flex>
		</Flex>
	)
}

const PartnesList = () => {
	return (
		<Flex flex="1" justify="space-between" gap="middle">
			{PartnersData.map((partner) => (
				<PartnersItem {...partner} key={partner.id} />
			))}
		</Flex>
	)
}
export default PartnesList
