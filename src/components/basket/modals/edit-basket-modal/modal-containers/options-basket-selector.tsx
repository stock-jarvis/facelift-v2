import { Flex, Descriptions, DescriptionsProps, Typography, theme } from 'antd'
import { BasketDataValues } from '../../../types/types'
import StrikeRadioSelector from '../modal-components/strike-radio-selector'
import PositionHolder from './position-holder'
import StrikeSelector from '../modal-components/strike-selector'
import Instrument from '../modal-components/instrument'
import QuantityInput from '../modal-components/quantity-input'
import ExpirySelector from '../modal-components/expiry-selector'
import ActionSelector from '../modal-components/action-selector'
import { optionExpiry } from '../../../constants/data'
import { TradeAction, OptionType } from 'src/common/enums'
interface BasketProps {
	basketInitialData: BasketDataValues
	handleAddBasket: (val: string) => void
	handleBaseTradeChange: (val: string) => void
	handleBaseActionChange: (val: string) => void
	handleBaseOptionChange: (val: string) => void
	handleBaseExpiryChange: (val: string) => void
	handleBaseSubTradeChange: (val: string) => void
	handleBaseQuantityChange: (value: number) => void
	handleBaseTradeValueChange: (val: number) => void
	baseInstrumentValue: string
}
const OptionsBasketSelector: React.FC<BasketProps> = ({
	basketInitialData,
	handleAddBasket,
	handleBaseQuantityChange,
	handleBaseOptionChange,
	handleBaseActionChange,
	handleBaseExpiryChange,
	handleBaseTradeChange,
	handleBaseSubTradeChange,
	handleBaseTradeValueChange,
	baseInstrumentValue,
}) => {
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
						action1={TradeAction.Buy}
						action2={TradeAction.Sell}
						color1="green"
						color2="red"
						baseActionValue={basketInitialData.action}
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
						action1={OptionType.CALL}
						action2={OptionType.PUT}
						color1="black"
						color2="purple"
						baseActionValue={basketInitialData.option || 'CE'}
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
						tradeOption={basketInitialData.tradeOption}
						tradeValue={basketInitialData.tradeValue || 1}
						setTradeValue={handleBaseTradeValueChange}
						setTradeOption={handleBaseTradeChange}
						subTradeOption={basketInitialData.subTradeOption || ''}
						setSubTradeOption={handleBaseSubTradeChange}
						subTradeOptionList={basketInitialData.subTradeOptionList ?? []}
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
						baseQuantityValue={basketInitialData.quantity}
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
						expiryValue={basketInitialData.expiry || 'Monthly'}
						expiryOptions={optionExpiry}
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
						Options Leg
					</Typography.Text>
				</Flex>
			),

			children: (
				<Flex
					className="w-full"
					align="center"
					justify="space-between"
					vertical
					gap="middle"
				>
					<StrikeRadioSelector
						tradeOption={basketInitialData.tradeOption}
						setSubTradeOption={handleBaseSubTradeChange}
						setTradeOption={handleBaseTradeChange}
					/>
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
