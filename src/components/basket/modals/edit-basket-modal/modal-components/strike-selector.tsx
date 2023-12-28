import { Flex, Select, Input } from 'antd'
import { ChangeEvent } from 'react'
import { tradeTypeData } from '../../../constants/data'
import { InputProps } from 'antd'
import { SelectProps } from 'antd/es/select'
import { TradeOptions } from '../../../types/types'

interface StrikeSelectorProps {
	tradeOption: string | undefined
	subTradeOption: string | undefined
	subTradeOptionList: TradeOptions[] | undefined
	tradeValue: number | undefined
	setTradeOption: (val: string) => void
	setSubTradeOption: (val: string) => void
	setTradeValue: (val: number) => void
}

const StrikeSelector: React.FC<StrikeSelectorProps> = ({
	tradeOption,
	subTradeOption,
	subTradeOptionList,
	tradeValue,
	setTradeOption,
	setSubTradeOption,
	setTradeValue,
}) => {
	const handleTradeChange: SelectProps['onChange'] = (value: string) => {
		setTradeOption(value)
	}

	const handleSubTradeChange: SelectProps['onChange'] = (value: string) => {
		setSubTradeOption(value)
	}

	const handleInputChange: InputProps['onChange'] = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		if (+e.target.value <= 0) {
			setTradeValue(1)
		} else {
			if (tradeOption !== 'CP') {
				if (+e.target.value > 100) {
					setTradeValue(100)
				} else {
					setTradeValue(+e.target.value)
				}
			} else {
				setTradeValue(+e.target.value)
			}
		}
	}

	return (
		<Flex style={{ width: '100%', height: 'fit-content' }} justify="center">
			<Select
				size="large"
				style={{ width: '150px' }}
				options={tradeTypeData}
				value={tradeOption}
				onChange={handleTradeChange}
			/>
			<Select
				size="large"
				style={{
					width:
						tradeOption !== 'ATMPt' && tradeOption !== 'HIGHOI'
							? '80px'
							: '150px',
				}}
				options={subTradeOptionList}
				value={subTradeOption}
				onChange={handleSubTradeChange}
			/>
			{tradeOption !== 'ATMPt' && tradeOption !== 'HIGHOI' && (
				<Flex style={{ width: '70px', height: '40px' }}>
					<Input
						style={{
							width: '70px',
							textAlign: tradeOption === 'CP' ? 'center' : 'start',
						}}
						type="number"
						value={tradeValue}
						onChange={handleInputChange}
						suffix={tradeOption !== 'CP' ? '%' : null}
					/>
				</Flex>
			)}
		</Flex>
	)
}

export default StrikeSelector
