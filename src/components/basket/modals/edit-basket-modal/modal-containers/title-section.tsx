import { Flex, Typography, Tooltip, Tag, theme } from 'antd'
import { BasketAtm, BasketType, Exchange } from 'src/common/enums'
interface TitleProps {
	exchange: Exchange
	ticker: string
	atm: BasketAtm
	type: BasketType
}
const Title: React.FC<TitleProps> = ({ exchange, ticker, atm, type }) => {
	const { token } = theme.useToken()
	return (
		<Flex gap="middle" style={{ padding: token.paddingXS, cursor: 'pointer' }}>
			<Tooltip title="Exchange">
				<Tag color="blue">
					<Typography.Text>{exchange}</Typography.Text>
				</Tag>
			</Tooltip>

			<Tooltip title="Instrument">
				<Tag color="blue">
					<Typography.Text>{ticker}</Typography.Text>
				</Tag>
			</Tooltip>

			<Tooltip title="Atm">
				<Tag color="blue">
					<Typography.Text>{atm.toLocaleUpperCase()}</Typography.Text>
				</Tag>
			</Tooltip>
			<Tooltip title="Type">
				<Tag color="blue">
					<Typography.Text>{type.toLocaleUpperCase()}</Typography.Text>
				</Tag>
			</Tooltip>
		</Flex>
	)
}

export default Title
