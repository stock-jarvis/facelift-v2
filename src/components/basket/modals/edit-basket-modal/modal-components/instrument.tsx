import { Tag, Typography, theme } from 'antd'
interface InstrumentProps {
	instrument: string
}
const Instrument: React.FC<InstrumentProps> = ({ instrument }) => {
	const { token } = theme.useToken()
	return (
		<Tag color="blue" style={{ padding: token.paddingXS }}>
			<Typography.Text
				style={{
					fontSize: token.fontSizeLG,
					color: token.colorBgSpotlight,
				}}
			>
				{instrument}
			</Typography.Text>
		</Tag>
	)
}

export default Instrument
