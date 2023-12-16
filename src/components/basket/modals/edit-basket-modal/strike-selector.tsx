import { Flex, Select, Input } from 'antd'

import { tradeTypeData } from '../../constants/data'

import { SelectProps } from 'antd/es/select'
import { TradeOptions } from '../../types/types'

interface StrikeSelectorProps {
	tradeOption: string
	setTradeOption: (val: string) => void
	subTradeOption: string
	setSubTradeOption: (val: string) => void
	subTradeOptionList: TradeOptions[]
	setSubTradeOptionList: (val: TradeOptions[]) => void
}

const StrikeSelector = ({
	tradeOption,
	setTradeOption,
	subTradeOption,
	setSubTradeOption,
	subTradeOptionList,
	setSubTradeOptionList,
}: StrikeSelectorProps) => {
	// give initial value for the state variable

	// change runtime value of the parent trade type
	const handleTradeChange: SelectProps['onChange'] = (value: string) => {
		///props over change
		const subTradeData =
			tradeTypeData.find((data) => data.value === value)?.children || []
		setTradeOption(value)
		setSubTradeOptionList(subTradeData)
		setSubTradeOption(subTradeData[0]?.value || '')
	}

	// change runtime value of the subtrade type
	const handleSubTradeChange: SelectProps['onChange'] = (value: string) => {
		// prop value
		setSubTradeOption(value)
	}

	return (
		<Flex style={{ width: '300px' }}>
			<Select
				size="large"
				style={{ width: '100%' }}
				options={tradeTypeData}
				value={tradeOption}
				onChange={handleTradeChange}
			/>
			<Select
				size="large"
				style={{ width: '100%' }}
				options={subTradeOptionList}
				value={subTradeOption}
				onChange={handleSubTradeChange}
			/>
			{tradeOption !== 'ATMPt' && tradeOption !== 'HIGHOI' && (
				<Flex style={{ width: '90px' }}>
					<Input style={{ width: '80px' }} />
					{tradeOption !== 'CP' && (
						<p className="flex self-center pl-[3px]">%</p>
					)}
				</Flex>
			)}
		</Flex>
	)
}

export default StrikeSelector
