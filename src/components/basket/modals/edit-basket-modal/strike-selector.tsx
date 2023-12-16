import { Flex, Select } from 'antd'

import { tradeTypeData } from '../../constants/data'
import { useState, useEffect } from 'react'
import { SelectProps } from 'antd/es/select'
interface TradeOptions {
	id: number
	label: string
	value: string
}
const StrikeSelector = () => {
	const [tradeOption, setTradeOption] = useState<TradeOptions>()
	const [subTradeOptionList, setSubTradeOptionList] = useState<TradeOptions[]>()
	const [subTradeOption, setSubTradeOption] = useState<TradeOptions>()

	useEffect(() => {
		if (!tradeOption) {
			setTradeOption(tradeTypeData[0])
			setSubTradeOptionList(tradeTypeData[0].children)
			setSubTradeOption(tradeTypeData[0].children[0])
		}
	}, [tradeOption])

	const handleTradeChange: SelectProps['onChange'] = (value: TradeOptions) => {
		console.log(value)
	}

	return (
		<Flex style={{ width: '300px' }}>
			<Select
				style={{ width: '100%' }}
				options={tradeTypeData}
				value={tradeOption}
				onChange={handleTradeChange}
			/>
			<Select
				style={{ width: '100%' }}
				options={subTradeOptionList}
				value={subTradeOption}
			/>
		</Flex>
	)
}

export default StrikeSelector
