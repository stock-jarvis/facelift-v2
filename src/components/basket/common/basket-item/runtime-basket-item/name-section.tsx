import { Flex, Typography, theme } from 'antd'

interface NameProps {
	identifier: number
	exchange: string
	name: string
}

const NameSection = ({ exchange, name, identifier }: NameProps) => {
	const { token } = theme.useToken()
	return (
		<Flex flex="1" align="center">
			<Flex
				style={{
					backgroundColor: token.colorPrimary,
					padding: token.paddingXS,
					border: `1px solid ${token.colorPrimary}`,
				}}
				flex="1"
				className="select-none"
			>
				<Typography.Text
					style={{
						fontSize: token.fontSizeLG,
						color: token.colorBgBase,
						fontWeight: token.fontWeightStrong,
					}}
					color="primary"
				>
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
				<Typography.Text
					className="select-none"
					style={{
						color: 'black',
						fontSize: token.fontSizeLG,
						fontWeight: token.fontWeightStrong,
					}}
				>
					{name}
					{identifier > 0 ? ` - ${identifier}` : ''}
				</Typography.Text>
			</Flex>
		</Flex>
	)
}

export default NameSection
