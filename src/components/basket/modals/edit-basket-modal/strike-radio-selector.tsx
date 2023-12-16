import { Flex, Radio, theme } from 'antd'
import { tradeTypeData } from '../../constants/data'
import { RadioProps } from 'antd'
import { TradeOptions } from '../../types/types'
interface StrikeRadioProps {
	tradeOption: string
	setTradeOption: (val: string) => void
	setSubTradeOptionList: (val: TradeOptions[]) => void
	setSubTradeOption: (val: string) => void
}
const StrikeRadioSelector = ({
	tradeOption,
	setTradeOption,
	setSubTradeOptionList,
	setSubTradeOption,
}: StrikeRadioProps) => {
	const { token } = theme.useToken()
	const handleRadioChange: RadioProps['onChange'] = (event) => {
		setTradeOption(event.target.value)

		const subTradeData =
			tradeTypeData.find((data) => data.value === event.target.value)
				?.children || []

		setSubTradeOptionList(subTradeData)
		setSubTradeOption(subTradeData[0]?.value || '')

		//setSubTradeOptionList
	}
	return (
		<Flex
			gap="middle"
			style={{
				padding: token.paddingXS,
			}}
		>
			<Radio.Group
				className="flex flex-row flex-1 justify-around"
				onChange={handleRadioChange}
				value={tradeOption}
			>
				{tradeTypeData.map((tradeType) => (
					<Radio
						key={tradeType.id}
						value={tradeType.value}
						style={{
							fontSize: token.fontSizeLG,
							fontWeight: token.fontWeightStrong,
						}}
					>
						{tradeType.label}
					</Radio>
				))}
			</Radio.Group>
		</Flex>
	)
}

export default StrikeRadioSelector
