import { Flex, Spin, SpinProps } from 'antd'

const Loader: React.FC<SpinProps> = (props) =>
	props.children ? (
		<Spin {...props} />
	) : (
		<Flex className="w-full h-full">
			<Spin {...props} />
		</Flex>
	)

export default Loader
