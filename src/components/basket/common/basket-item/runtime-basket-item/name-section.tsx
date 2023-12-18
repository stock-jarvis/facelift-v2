import { Flex, Typography, theme } from 'antd'

interface NameProps {
	exchange: string
	name: string
}

const NameSection = ({ exchange, name }: NameProps) => {
	const { token } = theme.useToken()
	return (
		<Flex flex="1" align="center">
			<Flex
				style={{
					backgroundColor: token.colorPrimary,
					padding: token.paddingXS,
					border: `1px solid ${token.colorPrimary}`,
					color: '#fff',
				}}
				flex="1"
				className="select-none"
			>
				<Typography.Text className="text-inherit select-none" color="primary">
					{exchange.toUpperCase()}
				</Typography.Text>
			</Flex>
			<Flex
				flex="3"
				style={{
					padding: token.paddingXS,
				}}
				className="border-y-[1px]"
			>
				<Typography.Text className="select-none" style={{ color: 'black' }}>
					{name}
				</Typography.Text>
			</Flex>
		</Flex>
	)
}

export default NameSection
