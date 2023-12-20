import { Flex, Typography, theme } from 'antd'
interface TradeTypeItemProps {
	type: string
	id: number
	exchangeValue: string
	onClick: (data: number) => void
}

const TradeTypeItem = ({
	exchangeValue,
	id,
	type,
	onClick,
}: TradeTypeItemProps) => {
	const { token } = theme.useToken()
	return (
		<Flex
			flex="1"
			justify="center"
			align="center"
			style={{
				cursor: 'pointer',
				border: '0.5px solid #D3D3D3',

				backgroundColor: type === exchangeValue ? token.colorPrimary : '#ffff',
			}}
			onClick={() => onClick(id)}
		>
			<Typography.Text
				style={{
					fontSize: token.fontSizeLG,
					padding: '1px',
					fontWeight: token.fontWeightStrong,

					color: type === exchangeValue ? '#ffff' : '#000000',
				}}
			>
				{type}
			</Typography.Text>
		</Flex>
	)
}

export default TradeTypeItem
