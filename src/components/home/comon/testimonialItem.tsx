import { testinonialsData } from '../constants/data'

import { Flex, Typography } from 'antd'
import { StarFilled } from '@ant-design/icons'

interface ItemProps {
	testimonial: string
	name: string
	designation: string
}
const Stars = () => {
	return (
		<Flex flex="1" justify="center" gap="small">
			<StarFilled style={{ color: 'orange' }} />
			<StarFilled style={{ color: 'orange' }} />
			<StarFilled style={{ color: 'orange' }} />
			<StarFilled style={{ color: 'orange' }} />
			<StarFilled style={{ color: 'orange' }} />
		</Flex>
	)
}

const TestimonialItem = ({ testimonial, name, designation }: ItemProps) => {
	return (
		<Flex vertical gap="large" justify="center" className="p-10">
			<Flex>
				<Typography.Text className="text-center text-[1.2rem]" strong>
					"{testimonial}"
				</Typography.Text>
			</Flex>
			<Flex gap="small" vertical>
				<Stars />
				<Typography.Text className="text-center text-[1.2rem] font-bold">
					{name}
				</Typography.Text>
				<Typography.Text className="text-center text-[1rem] text-[gray]" strong>
					{designation}
				</Typography.Text>
			</Flex>
		</Flex>
	)
}

const TestimonialList = () => {
	return (
		<Flex align="center" flex={1}>
			{testinonialsData.map((data) => (
				<TestimonialItem key={data.id} {...data} />
			))}
		</Flex>
	)
}

export default TestimonialList
