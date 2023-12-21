import { Flex, Typography, theme } from 'antd'

interface NameProps {
	identifier: number
	exchange: string
	name: string
}

const NameSection: React.FC<NameProps> = ({ exchange, name, identifier }) => {
	const { token } = theme.useToken()
	return (
		<Flex flex="1" align="center" justify="space-around">
			<Flex
				style={{
					//backgroundColor: token.colorPrimary,
					padding: token.paddingXS,
					//border: `1px solid ${token.colorPrimary}`,
				}}
				className="select-none"
			>
				<Typography.Text
					style={{
						fontSize: token.fontSizeSM,
						//	color: token.colorBgBase,
						fontWeight: token.fontWeightStrong,
					}}
					color="primary"
				>
					{exchange.toUpperCase()}
				</Typography.Text>
			</Flex>
			<Flex
				style={{
					padding: token.paddingXS,
				}}
				className="border-y-[1px]"
			>
				<Typography.Text
					className="select-none"
					style={{
						color: 'black',
						fontSize: token.fontSizeSM,
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
