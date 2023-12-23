import { Flex, Descriptions, DescriptionsProps, Typography, theme } from 'antd'
import { TradeOptions } from '../../../types/types'
import { OptionObject } from '../../../types/types'

import PositionHolder from './position-holder'
import StrikeSelector from '../modal-components/strike-selector'
import Instrument from '../modal-components/instrument'
import QuantityInput from '../modal-components/quantity-input'
import ExpirySelector from '../modal-components/expiry-selector'
import ActionSelector from '../modal-components/action-selector'
interface BasketProps {
	handleAddBasket: (val: string) => void
	handleBaseTradeChange: (val: string) => void
	handleBaseActionChange: (val: string) => void
	handleBaseOptionChange: (val: string) => void
	handleBaseExpiryChange: (val: string) => void
	handleBaseSubTradeChange: (val: string) => void
	handleBaseQuantityChange: (value: number) => void
	handleBaseTradeValueChange: (val: number) => void
	handleBaseSubTradeListChange: (val: TradeOptions[]) => void
	baseInstrumentValue: string
	baseTradeValue: number
	baseActionValue: string
	baseOptionValue: string
	baseTradeOption: string
	optionExpiryList: OptionObject[]
	baseQuantityValue: number
	baseSubTradeOption: string
	optionExpiryBaseValue: string
	baseSubTradeOptionList: TradeOptions[]
}
const OptionsBasketSelector = ({
	handleAddBasket,
	handleBaseQuantityChange,
	handleBaseOptionChange,
	handleBaseActionChange,
	handleBaseExpiryChange,
	handleBaseTradeChange,
	handleBaseSubTradeChange,
	handleBaseSubTradeListChange,
	handleBaseTradeValueChange,

	baseTradeValue,
	optionExpiryBaseValue,
	baseInstrumentValue,
	baseQuantityValue,
	baseActionValue,
	optionExpiryList,
	baseOptionValue,
	baseTradeOption,
	baseSubTradeOption,
	baseSubTradeOptionList,
}: BasketProps) => {
	const { token } = theme.useToken()
	const items: DescriptionsProps['items'] = [
		{
			key: 'instrument',
			label: (
				<Flex justify="center">
					<Typography.Text>Instruments</Typography.Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center" className="w-full">
					<Instrument instrument={baseInstrumentValue} />
				</Flex>
			),
		},
		{
			key: '2',
			label: (
				<Flex flex={1} justify="center">
					<Typography.Text>Action</Typography.Text>
				</Flex>
			),

			children: (
				<Flex flex={1} justify="center">
					<ActionSelector
						action1="B"
						action2="S"
						color1="green"
						color2="red"
						baseActionValue={baseActionValue}
						handleBaseActionChange={handleBaseActionChange}
					/>
				</Flex>
			),
		},

		{
			key: 'Options',
			label: (
				<Flex flex={1} justify="center">
					<Typography.Text>Option</Typography.Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<ActionSelector
						action1="CE"
						action2="PE"
						color1="black"
						color2="purple"
						baseActionValue={baseOptionValue}
						handleBaseActionChange={handleBaseOptionChange}
					/>
				</Flex>
			),
		},
		{
			key: '5',
			label: (
				<Flex flex={1} justify="center">
					Strike
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<StrikeSelector
						tradeOption={baseTradeOption}
						tradeValue={baseTradeValue}
						setTradeValue={handleBaseTradeValueChange}
						setTradeOption={handleBaseTradeChange}
						subTradeOption={baseSubTradeOption}
						setSubTradeOption={handleBaseSubTradeChange}
						subTradeOptionList={baseSubTradeOptionList}
						setSubTradeOptionList={handleBaseSubTradeListChange}
					/>
				</Flex>
			),
		},
		{
			key: '3',
			label: (
				<Flex flex={1} justify="center">
					Quantity
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<QuantityInput
						baseQuantityValue={baseQuantityValue}
						handleQantityChange={handleBaseQuantityChange}
					/>
				</Flex>
			),
		},
		{
			key: '4',
			label: (
				<Flex flex={1} justify="center">
					Expiry
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<ExpirySelector
						handleExpiryChange={handleBaseExpiryChange}
						expiryValue={optionExpiryBaseValue}
						expiryOptions={optionExpiryList}
					/>
				</Flex>
			),
		},
	]

	const mainItems: DescriptionsProps['items'] = [
		{
			key: 'options',
			label: (
				<Flex justify="center">
					<Typography.Text
						style={{
							fontSize: token.fontSizeLG,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Options Position
					</Typography.Text>
				</Flex>
			),
			children: (
				<Flex className="w-full" align="center" justify="space-between">
					<Descriptions
						className="w-full"
						items={items}
						column={8}
						layout="vertical"
						bordered
					/>
				</Flex>
			),
		},
	]
	return (
		<PositionHolder onClick={handleAddBasket} basketType="options">
			<Descriptions
				className="w-full"
				items={mainItems}
				layout="vertical"
				bordered
			/>
		</PositionHolder>
	)
}

export default OptionsBasketSelector
