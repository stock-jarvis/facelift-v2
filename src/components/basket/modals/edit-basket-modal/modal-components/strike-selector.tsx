import { Flex, Select, Input } from 'antd'
import { ChangeEvent } from 'react'
import { tradeTypeData } from '../../../constants/data'
import { InputProps } from 'antd'
import { DefaultOptionType, SelectProps } from 'antd/es/select'

interface StrikeSelectorProps<T> {
	tradeOption: string
	subTradeOption: string
	subTradeOptionList: DefaultOptionType[]
	tradeValue: number
	paramValue: T
	paramType: T
	setTradeOption: (val: string) => void
	setSubTradeOption: (val: string, paramType: T) => void
	setTradeValue: (val: number, paramValue: T) => void
}

const StrikeSelector = <T,>({
	tradeOption,
	subTradeOption,
	subTradeOptionList,
	tradeValue,
	paramValue,
	paramType,
	setTradeOption,
	setSubTradeOption,
	setTradeValue,
}: StrikeSelectorProps<T>) => {
	const handleTradeChange: SelectProps['onChange'] = (value: string) => {
		setTradeOption(value)
	}

	const handleSubTradeChange: SelectProps['onChange'] = (value: string) => {
		setSubTradeOption(value, paramType)
	}

	const handleInputChange: InputProps['onChange'] = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		if (+e.target.value <= 0) {
			setTradeValue(1, paramValue)
		} else {
			if (tradeOption !== 'CP') {
				if (+e.target.value > 100) {
					setTradeValue(100, paramValue)
				} else {
					setTradeValue(+e.target.value, paramValue)
				}
			} else {
				setTradeValue(+e.target.value, paramValue)
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
			{/* tradeOption !== 'ATMP' && */}
			{tradeOption !== 'HighestOI' && (
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
			{/* 
{tradeOption === 'ATMP' && (
    <Select
        style={{ width: '70px' }}
        options={yourDropdownOptions}
        value={selectedDropdownValue}
        onChange={handleDropdownChange}
    />
)} */}
		</Flex>
	)
}

export default StrikeSelector
