import { Flex, Select } from 'antd'

import { tradeTypeData } from '../../constants/data'
import { useState, useEffect, ChangeEvent } from 'react'
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
			setTradeOption({
				id: tradeTypeData[0].id,
				label: tradeTypeData[0].label,
				value: tradeTypeData[0].value,
			})
			setSubTradeOptionList(tradeTypeData[0].children)
			setSubTradeOption(tradeTypeData[0].children[0])
		}
	}, [tradeOption])

	const handleTradeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(event.target.value)
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
