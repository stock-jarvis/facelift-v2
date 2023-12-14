import { Flex, Typography, theme } from 'antd'

interface NameProps {
	name: string
}

const NameSection = ({ name }: NameProps) => {
	const { token } = theme.useToken()
	return (
		<Flex
			style={{
				boxSizing: 'content-box',
			}}
			flex="1"
			align="center"
		>
			<Flex
				style={{
					backgroundColor: token.colorPrimary,
					padding: token.padding,
					border: `1px solid ${token.colorPrimary}`,
					color: token.colorTextHeading,
				}}
				flex="1"
			>
				<Typography.Text className="text-inherit" color="primary">
					{name.toUpperCase()}
				</Typography.Text>
			</Flex>
			<Flex
				flex="3"
				style={{
					padding: token.padding,
					boxSizing: 'content-box',
					borderColor: token.colorBorder,
					borderTop: '1px solid',
					borderBottom: '1px solid',
				}}
			>
				<Typography.Text style={{ color: 'black' }}>Apple</Typography.Text>
			</Flex>
		</Flex>
	)
}

export default NameSection
