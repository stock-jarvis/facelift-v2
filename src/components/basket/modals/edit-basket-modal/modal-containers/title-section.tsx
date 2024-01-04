import { Flex, Typography, Tag, theme } from 'antd'
interface TitleProps {
	exchange: string
	ticker: string
	atm: string
	type: string
}
const Title: React.FC<TitleProps> = ({ exchange, ticker, atm, type }) => {
	const { token } = theme.useToken()
	return (
		<Flex gap="middle" style={{ padding: token.paddingXS }}>
			<Tag color="blue">
				<Typography.Text>{exchange}</Typography.Text>
			</Tag>
			<Typography.Text>
				<Tag color="blue">
					<Typography.Text>{ticker}</Typography.Text>
				</Tag>
			</Typography.Text>
			<Typography.Text>
				<Tag color="blue">
					<Typography.Text>{atm.toLocaleUpperCase()}</Typography.Text>
				</Tag>
			</Typography.Text>
			<Typography.Text>
				<Tag color="blue">
					<Typography.Text>{type.toLocaleUpperCase()}</Typography.Text>
				</Tag>
			</Typography.Text>
		</Flex>
	)
}

export default Title
