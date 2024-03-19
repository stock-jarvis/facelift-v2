import {
	Flex,
	Button,
	Descriptions,
	DescriptionsProps,
	theme,
	Typography,
	Divider,
	ButtonProps,
} from 'antd'

const { Text } = Typography
import { useImmer } from 'use-immer'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import QuantityInput from '../modal-components/quantity-input'
import YeildButton from '../modal-components/yeild-input'
import ExpirySelector from '../modal-components/expiry-selector'
import StrikeSelector from '../modal-components/strike-selector'
import { useActionChange } from '../modal-hooks/useActionChange'
import { useExitTypeChange } from '../modal-hooks/useExitTypeChange'
import { TradeAction, OptionType } from 'src/common/enums'
import {
	BasketDataProps,
	OptionsBasketData,
	OptionsKey,
	YeildLabel,
} from 'src/components/basket/types/types'
import { optionExpiry } from 'src/components/basket/constants/data'
import { tradeTypeData } from 'src/components/basket/constants/data'

interface OptionDetailsProps {
	dark: boolean
	basket: BasketDataProps[]
	baseInstrumentValue: string
	individualBasket: BasketDataProps
	handleDeleteBasket: (id: string) => void
	handleCopyBasket: (id: string) => void
	handleEditBasket: (basket: BasketDataProps[]) => void
}
const OptionBasketDetail: React.FC<OptionDetailsProps> = ({
	dark,
	basket,
	individualBasket,
	baseInstrumentValue,
	handleDeleteBasket,
	handleCopyBasket,
	handleEditBasket,
}) => {
	const { token } = theme.useToken()
	// console.log(individualBasket.entryCondition, "basket here")

	const [optionsBasketData, setOptionsBasketData] = useImmer<OptionsBasketData>(
		{
			quantityValue: individualBasket.entryCondition.quantity,
			actionValue: individualBasket.entryCondition.actionType,
			optionType: individualBasket.entryCondition.optionType ?? OptionType.CALL,
			expiry: individualBasket.entryCondition.expiry!,
			stopLossType: individualBasket.exitCondition.stopLoss.type,
			stopLossValue: individualBasket.exitCondition.stopLoss.value,
			totalProfitType: individualBasket.exitCondition.totalProfit.type,
			totalProfitValue: individualBasket.exitCondition.totalProfit.value,
			tradeOption: individualBasket.entryCondition.tradeType!,
			subTradeOption: individualBasket.entryCondition.tradeTypeParams!,
			tradeValue: individualBasket.entryCondition.tradeTypeValue!,
			subTradeOptionList: tradeTypeData.find(
				(trade) => individualBasket.entryCondition.tradeType === trade.value
			)!.children,
		}
	)

	const handleChangeValue = <T,>(val: T, key: OptionsKey) => {
		setOptionsBasketData({ ...optionsBasketData, [key]: val })
	}
	const copyBasket: ButtonProps['onClick'] = () => {
		handleCopyBasket(individualBasket.id)
	}
	const deleteBasket: ButtonProps['onClick'] = () => {
		handleDeleteBasket(individualBasket.id)
	}

	const handleTargetTypeChange = <T,>(
		type: T,
		key: OptionsKey,
		value: OptionsKey
	) => {
		setOptionsBasketData({ ...optionsBasketData, [key]: type, [value]: 0 })
	}

	const handleTradeOptionChange = (val: string) => {
		const data = tradeTypeData.find((trade) => trade.value === val)
		if (data) {
			setOptionsBasketData({
				...optionsBasketData,
				tradeOption: val,
				subTradeOption: data.children[0].value,
				subTradeOptionList: data.children,
				tradeValue: 1,
			})
		}
	}

	const item: DescriptionsProps['items'] = [
		{
			key: 'intruments',
			label: (
				<Flex flex="1" justify="center">
					<Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Intruments
					</Text>
				</Flex>
			),
			children: (
				<Flex flex="1" justify="center">
					<Instrument instrument={baseInstrumentValue} />
				</Flex>
			),
		},
		{
			key: 'actions',
			label: (
				<Flex flex="1" justify="center">
					<Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Action
					</Text>
				</Flex>
			),
			children: (
				<Flex flex="1" justify="center">
					<ActionSelector<TradeAction, OptionsKey>
						action1={TradeAction.Buy}
						action2={TradeAction.Sell}
						paramType={OptionsKey.ACTION}
						color1="green"
						color2="red"
						baseActionValue={optionsBasketData.actionValue}
						handleBaseActionChange={handleChangeValue<TradeAction>}
					/>
				</Flex>
			),
		},
		{
			key: 'options',
			label: (
				<Flex flex="1" justify="center">
					<Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Option
					</Text>
				</Flex>
			),
			children: (
				<Flex flex="1" justify="center">
					<ActionSelector<OptionType, OptionsKey>
						action1={OptionType.CALL}
						action2={OptionType.PUT}
						paramType={OptionsKey.OPTION}
						color1="black"
						color2="purple"
						baseActionValue={optionsBasketData.optionType!}
						handleBaseActionChange={handleChangeValue<OptionType>}
					/>
				</Flex>
			),
		},
		{
			key: 'quantity',
			label: (
				<Flex flex="1" justify="center">
					<Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Quantity
					</Text>
				</Flex>
			),
			children: (
				<Flex flex="1" justify="center">
					<QuantityInput<OptionsKey>
						baseQuantityValue={optionsBasketData.quantityValue}
						paramType={OptionsKey.QUANTITY}
						handleQantityChange={handleChangeValue<number>}
					/>
				</Flex>
			),
		},
		{
			key: 'operations',
			label: (
				<Flex flex="1" justify="center">
					<Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Operations
					</Text>
				</Flex>
			),
			children: (
				<Flex flex="1" justify="center">
					<Button
						shape="circle"
						icon={<CopyOutlined />}
						type="text"
						onClick={copyBasket}
					/>

					<Button
						shape="circle"
						icon={<DeleteOutlined />}
						type="text"
						onClick={deleteBasket}
					/>
				</Flex>
			),
		},
		{
			key: 'strike',
			label: (
				<Flex flex="1" justify="center">
					<Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Strike
					</Text>
				</Flex>
			),
			children: (
				<Flex flex="1" justify="center">
					<StrikeSelector<OptionsKey>
						paramValue={OptionsKey.TRADEVALUE}
						paramType={OptionsKey.SUBTRADEOPTION}
						tradeOption={optionsBasketData.tradeOption!}
						tradeValue={optionsBasketData.tradeValue!}
						subTradeOption={optionsBasketData.subTradeOption!}
						subTradeOptionList={optionsBasketData.subTradeOptionList!}
						setTradeValue={handleChangeValue}
						setSubTradeOption={handleChangeValue<string>}
						setTradeOption={handleTradeOptionChange}
					/>
				</Flex>
			),
		},
		{
			key: 'expiry',
			label: (
				<Flex flex="1" justify="center">
					<Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Expiry
					</Text>
				</Flex>
			),
			children: (
				<Flex flex="1" justify="center">
					<ExpirySelector<OptionsKey>
						expiryOptions={optionExpiry}
						expiryValue={optionsBasketData.expiry!}
						handleExpiryChange={handleChangeValue<string>}
					/>
				</Flex>
			),
		},
		{
			key: 'totalprofit',
			label: (
				<Flex flex="1" justify="center">
					<Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Total Profit
					</Text>
				</Flex>
			),
			children: (
				<Flex flex="1" justify="center">
					<YeildButton<OptionsKey>
						targetOn={YeildLabel.PROFIT}
						paramType={OptionsKey.PROFITTYPE}
						paramValue={OptionsKey.PROFITVALUE}
						targetType={optionsBasketData.totalProfitType}
						targetValue={optionsBasketData.totalProfitValue}
						handleTargetValueChange={handleChangeValue<number>}
						handleTargetTypeChange={handleTargetTypeChange<string>}
					/>
				</Flex>
			),
		},
		{
			key: 'stopLoss',
			label: (
				<Flex flex="1" justify="center">
					<Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Spot Loss
					</Text>
				</Flex>
			),
			children: (
				<Flex flex="1" justify="center">
					<YeildButton<OptionsKey>
						targetOn={YeildLabel.LOSS}
						paramType={OptionsKey.LOSSTYPE}
						paramValue={OptionsKey.LOSSVALUE}
						targetType={optionsBasketData.stopLossType}
						targetValue={optionsBasketData.stopLossValue}
						handleTargetTypeChange={handleTargetTypeChange<string>}
						handleTargetValueChange={handleChangeValue<number>}
					/>
				</Flex>
			),
		},
	]
	useActionChange<number>(
		optionsBasketData.quantityValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'entryCondition',
		'quantity'
	)
	useActionChange<number | undefined>(
		optionsBasketData.tradeValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'entryCondition',
		'tradeTypeValue'
	)

	useActionChange<TradeAction>(
		optionsBasketData.actionValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'entryCondition',
		'actionType'
	)

	useActionChange<OptionType>(
		optionsBasketData.optionType,
		individualBasket.id,
		basket,
		handleEditBasket,
		'entryCondition',
		'optionType'
	)

	useActionChange<string>(
		optionsBasketData.tradeOption!,
		individualBasket.id,
		basket,
		handleEditBasket,
		'entryCondition',
		'tradeType'
	)

	useActionChange<string>(
		optionsBasketData.expiry!,
		individualBasket.id,
		basket,
		handleEditBasket,
		'entryCondition',
		'expiry'
	)

	useActionChange<string>(
		optionsBasketData.subTradeOption!,
		individualBasket.id,
		basket,
		handleEditBasket,
		'entryCondition',
		'tradeTypeParams'
	)

	useExitTypeChange<number>(
		optionsBasketData.totalProfitValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'totalProfit',
		'value'
	)

	useExitTypeChange<number>(
		optionsBasketData.stopLossValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'stopLoss',
		'value'
	)
	useExitTypeChange<string>(
		optionsBasketData.stopLossType,
		individualBasket.id,
		basket,
		handleEditBasket,
		'stopLoss',
		'type'
	)

	useExitTypeChange<string>(
		optionsBasketData.totalProfitType,
		individualBasket.id,
		basket,
		handleEditBasket,
		'totalProfit',
		'type'
	)

	return (
		<Flex vertical>
			<Divider>
				<Typography.Text style={{ color: token.colorPrimary }}>
					Options ({`Leg-${individualBasket.count}`})
				</Typography.Text>
			</Divider>
			<Descriptions
				column={5}
				items={item}
				bordered={true}
				layout="vertical"
				style={{ backgroundColor: dark ? '#F7FBFD' : 'transparent' }}
			/>
		</Flex>
	)
}

export default OptionBasketDetail
