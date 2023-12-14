import { Flex } from 'antd'
import Button from '../../common/basket-button'
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons'

const Index = () => {
	return (
		<Flex flex="1">
			<Flex flex="1">Hello world!</Flex>
			<Flex flex={'1'} gap="middle" justify="flex-end">
				<Button disabled={false}>
					<Flex
						justify="center"
						align="center"
						style={{ fontSize: 20 }}
						gap="middle"
					>
						<PlayCircleOutlined />
						<p>Add me</p>
					</Flex>
				</Button>
				<Button disabled>
					<Flex
						justify="center"
						align="center"
						style={{ fontSize: 20 }}
						gap="middle"
					>
						<PlusOutlined />
						<p>Add me</p>
					</Flex>
				</Button>
			</Flex>
		</Flex>
	)
}

export default Index
