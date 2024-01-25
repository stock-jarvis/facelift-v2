import { Flex, Descriptions, DescriptionsProps, Typography, theme } from 'antd'
import { SavedPosition, OptionsKey } from '../../../types/types'
import StrikeRadioSelector from '../modal-components/strike-radio-selector'
import PositionHolder from './position-holder'
import StrikeSelector from '../modal-components/strike-selector'
import Instrument from '../modal-components/instrument'
import QuantityInput from '../modal-components/quantity-input'
import ExpirySelector from '../modal-components/expiry-selector'
import ActionSelector from '../modal-components/action-selector'
import { optionExpiry } from '../../../constants/data'
import { TradeAction, OptionType, BasketLegType } from 'src/common/enums'
import { tradeTypeData } from '../../../constants/data'
interface BasketProps {
	basketInitialData: SavedPosition
	updatedBasketData: (val: SavedPosition) => void
	handleAddBasket: (val: BasketLegType) => void
	baseInstrumentValue: string
}
const OptionsBasketSelector: React.FC<BasketProps> = ({
	basketInitialData,
	baseInstrumentValue,
	handleAddBasket,
	updatedBasketData,
}) => {
	const { token } = theme.useToken()

	const handleTradeChange = (val: string) => {
		const list = tradeTypeData.find((trade) => trade.value === val)?.children
		if (list) {
			updatedBasketData({
				...basketInitialData,
				tradeOption: val,
				subTradeOption: list[0].value,
				tradeValue: 1,
				subTradeOptionList: list,
			})
		}
	}

	const valueChanged = <T,>(val: T, type: OptionsKey) => {
		updatedBasketData({ ...basketInitialData, [type]: val })
	}

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
					<ActionSelector<TradeAction, OptionsKey>
						action1={TradeAction.Buy}
						action2={TradeAction.Sell}
						paramType={OptionsKey.ACTION}
						color1="green"
						color2="red"
						baseActionValue={basketInitialData.actionValue}
						handleBaseActionChange={valueChanged<TradeAction>}
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
					<ActionSelector<OptionType, OptionsKey>
						action1={OptionType.CALL}
						action2={OptionType.PUT}
						paramType={OptionsKey.OPTION}
						color1="black"
						color2="purple"
						baseActionValue={basketInitialData.optionType!}
						handleBaseActionChange={valueChanged<OptionType>}
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
					<StrikeSelector<OptionsKey>
						paramValue={OptionsKey.TRADEVALUE}
						paramType={OptionsKey.SUBTRADEOPTION}
						tradeOption={basketInitialData.tradeOption}
						tradeValue={basketInitialData.tradeValue!}
						setTradeValue={valueChanged<number>}
						setTradeOption={handleTradeChange}
						subTradeOption={basketInitialData.subTradeOption!}
						setSubTradeOption={valueChanged<string>}
						subTradeOptionList={basketInitialData.subTradeOptionList!}
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
					<QuantityInput<OptionsKey>
						paramType={OptionsKey.QUANTITY}
						baseQuantityValue={basketInitialData.quantityValue}
						handleQantityChange={valueChanged<number>}
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
					<ExpirySelector<OptionsKey>
						handleExpiryChange={valueChanged<string>}
						expiryValue={basketInitialData.expiry!}
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
						setTradeOption={handleTradeChange}
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
		<PositionHolder
			handleAddClick={handleAddBasket}
			basketType={BasketLegType.OPTIONS}
		>
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
