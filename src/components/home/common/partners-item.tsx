import { Flex, Image, Typography } from 'antd'
import { PartnersData } from '../constants/data'

interface ItemProps {
	image: string
	data: string
}
const PartnersItem = ({ image, data }: ItemProps) => {
	return (
		<Flex
			vertical
			flex={1}
			gap="large"
			className="max-sm:shadow-[0_0px_25px_10px_rgba(0,0,0,0.1)] max-sm:p-10 max-sm:rounded-lg"
		>
			<Flex className="max-sm:justify-center">
				<div className="w-[80%] h-[100px]">
					<Image src={image} alt="Image" preview={false} />
				</div>
			</Flex>
			<Flex className="p-[10px]">
				<Typography.Text className="text-lg font-medium text-center">
					{data}
				</Typography.Text>
			</Flex>
		</Flex>
	)
}

const PartnesList = () => {
	return (
		<Flex
			flex="1"
			justify="space-between"
			className="flex-row max-sm:flex-col max-sm:gap-10"
			gap="middle"
		>
			{PartnersData.map((partner) => (
				<PartnersItem {...partner} key={partner.id} />
			))}
		</Flex>
	)
}
export default PartnesList
