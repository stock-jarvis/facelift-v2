import { Tag, Typography, theme, Tooltip } from 'antd'
interface InstrumentProps {
	instrument: string
}
const Instrument: React.FC<InstrumentProps> = ({ instrument }) => {
	const { token } = theme.useToken()
	return (
		<Tag color="blue" style={{ padding: token.paddingXS }}>
			<Tooltip title="Select Instrument from header">
				<Typography.Text
					style={{
						fontSize: token.fontSizeLG,
						color: token.colorBgSpotlight,
					}}
				>
					{instrument}
				</Typography.Text>
			</Tooltip>
		</Tag>
	)
}

export default Instrument
