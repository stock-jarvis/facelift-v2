import { Flex, Button, Space, Radio } from 'antd'
const PositionSelector = () => {
	return (
		<Space>
			<Flex>
				<Radio.Group>
					<Radio>Options</Radio>
					<Radio>Options 2</Radio>
				</Radio.Group>
				<Button>Hello</Button>
			</Flex>
		</Space>
	)
}

export default PositionSelector
