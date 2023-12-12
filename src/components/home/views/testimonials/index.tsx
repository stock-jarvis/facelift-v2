import TestimonialItem from '../../common/testimonial-item'
import { Flex, Typography } from 'antd'

const Index = () => {
	return (
		<div className="pt-40 pb-40">
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
		</div>
	)
}

export default Index
