import { Flex, theme, Segmented, SegmentedProps, Typography } from 'antd'
import { tradeTypeData } from '../../../constants/data'

import { SegmentedValue } from 'antd/es/segmented'
interface StrikeRadioProps {
	tradeOption: string
	setTradeOption: (val: string) => void
}
const StrikeRadioSelector: React.FC<StrikeRadioProps> = ({
	tradeOption,
	setTradeOption,
}) => {
	const { token } = theme.useToken()

	const segmentedItems = tradeTypeData.map((trade) => {
		return {
			label: (
				<Flex style={{ width: '142px' }} align="center" justify="center">
					<Typography.Text
						style={{
							textAlign: 'center',
							fontSize: token.fontSizeHeading5,
							color: trade.value === tradeOption ? token.colorPrimary : '#000',
							fontWeight: token.fontWeightStrong,
						}}
					>
						{trade.label}
					</Typography.Text>
				</Flex>
			),
			value: trade.value,
		}
	})

	const handleSegmentChanges: SegmentedProps['onChange'] = (
		tagVal: SegmentedValue
	) => {
		const val = tagVal.toLocaleString()
		setTradeOption(val)
	}

	return (
		<Segmented
			value={tradeOption}
			options={segmentedItems}
			onChange={handleSegmentChanges}
		/>
	)
}

export default StrikeRadioSelector
