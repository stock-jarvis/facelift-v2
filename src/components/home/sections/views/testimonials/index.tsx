import TestimonialItem from '../../custom/testimonialItem'
import { Flex, Typography } from 'antd'

const Index = () => {
	return (
		<Flex gap="large" vertical>
			<Flex vertical align="center">
				<Typography.Title level={1}>Testimonials</Typography.Title>
				<Typography.Text strong className="text-[gray]">
					People love what we do and we want to let you know
				</Typography.Text>
			</Flex>
			<Flex>
				<TestimonialItem />
			</Flex>
		</Flex>
	)
}

export default Index
