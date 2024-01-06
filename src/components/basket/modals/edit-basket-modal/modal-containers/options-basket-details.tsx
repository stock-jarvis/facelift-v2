import {
	Flex,
	Button,
	Descriptions,
	DescriptionsProps,
	theme,
	Typography,
	Divider,
} from 'antd'
import { useImmer } from 'use-immer'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import QuantityInput from '../modal-components/quantity-input'
import YeildButton from '../modal-components/yeild-button'
import ExpirySelector from '../modal-components/expiry-selector'
import StrikeSelector from '../modal-components/strike-selector'
import { useActionChange } from '../modal-hooks/useActionChange'
import { useExitTypeChange } from '../modal-hooks/useExitTypeChange'
import { TradeAction, OptionType } from 'src/common/enums'
import {
	OptionDetailsProps,
	OptionsBasketData,
	optionsStrKeys,
	optionNumberedKeys,
} from 'src/components/basket/types/types'
import { optionExpiry } from 'src/components/basket/constants/data'
import {
	spotLossOptions,
	totalProfitOptions,
	tradeTypeData,
} from 'src/components/basket/constants/data'

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

	const [optionsBasketData, setOptionsBasketData] = useImmer<OptionsBasketData>(
		{
			quantityValue: individualBasket.entryCondition.quantity,
			actionValue: individualBasket.entryCondition.actionType,
			optionType: individualBasket.entryCondition.optionType ?? OptionType.CALL,
			expiry: individualBasket.entryCondition.expiry,
			stopLossType: individualBasket.exitCondition.stopLoss.type,
			stopLossValue: individualBasket.exitCondition.stopLoss.value,
			totalProfitType: individualBasket.exitCondition.totalProfit.type,
			totalProfitValue: individualBasket.exitCondition.totalProfit.value,
			tradeOption: individualBasket.entryCondition.tradeType,
			subTradeOption: individualBasket.entryCondition.tradeTypeParams,
			tradeValue: individualBasket.entryCondition.tradeTypeValue,
			subTradeOptionList: tradeTypeData.find(
				(trade) => individualBasket.entryCondition.tradeType === trade.value
			)?.children,
		}
	)

	const handleChangeNumberValue = (val: number, key: optionNumberedKeys) => {
		setOptionsBasketData({ ...optionsBasketData, [key]: val })
	}
	const handleChangeStrValue = (val: string, key: optionsStrKeys) => {
		setOptionsBasketData({ ...optionsBasketData, [key]: val })
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
					<Typography.Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Intruments
					</Typography.Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<Instrument instrument={baseInstrumentValue} />
				</Flex>
			),
		},
		{
			key: 'actions',
			label: (
				<Flex flex="1" justify="center">
					<Typography.Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Action
					</Typography.Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<ActionSelector
						action1={TradeAction.Buy}
						action2={TradeAction.Sell}
						color1="green"
						color2="red"
						baseActionValue={optionsBasketData.actionValue}
						handleBaseActionChange={(val) =>
							handleChangeStrValue(val, 'actionValue')
						}
					/>
				</Flex>
			),
		},
		{
			key: 'options',
			label: (
				<Flex flex="1" justify="center">
					<Typography.Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Option
					</Typography.Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<ActionSelector
						action1={OptionType.CALL}
						action2={OptionType.PUT}
						color1="black"
						color2="purple"
						baseActionValue={optionsBasketData.optionType}
						handleBaseActionChange={(val) =>
							handleChangeStrValue(val, 'optionType')
						}
					/>
				</Flex>
			),
		},
		{
			key: 'quantity',
			label: (
				<Flex flex="1" justify="center">
					<Typography.Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Quantity
					</Typography.Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<QuantityInput
						baseQuantityValue={optionsBasketData.quantityValue}
						handleQantityChange={(val) =>
							handleChangeNumberValue(val, 'quantityValue')
						}
					/>
				</Flex>
			),
		},
		{
			key: 'operations',
			label: (
				<Flex flex="1" justify="center">
					<Typography.Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Operations
					</Typography.Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<Button
						shape="circle"
						icon={<CopyOutlined />}
						type="text"
						onClick={() => handleCopyBasket(individualBasket.id)}
					/>
					<Button
						shape="circle"
						icon={<DeleteOutlined />}
						type="text"
						onClick={() => handleDeleteBasket(individualBasket.id)}
					/>
				</Flex>
			),
		},
		{
			key: 'strike',
			label: (
				<Flex flex="1" justify="center">
					<Typography.Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Strike
					</Typography.Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<StrikeSelector
						tradeOption={optionsBasketData.tradeOption}
						tradeValue={optionsBasketData.tradeValue}
						setTradeValue={(val) => handleChangeNumberValue(val, 'tradeValue')}
						setTradeOption={handleTradeOptionChange}
						subTradeOption={optionsBasketData.subTradeOption}
						setSubTradeOption={(val) =>
							handleChangeStrValue(val, 'subTradeOption')
						}
						subTradeOptionList={optionsBasketData.subTradeOptionList}
					/>
				</Flex>
			),
		},
		{
			key: 'expiry',
			label: (
				<Flex flex="1" justify="center">
					<Typography.Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Expiry
					</Typography.Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<ExpirySelector
						expiryValue={optionsBasketData.expiry}
						handleExpiryChange={(val) => handleChangeStrValue(val, 'expiry')}
						expiryOptions={optionExpiry}
					/>
				</Flex>
			),
		},
		{
			key: 'totalprofit',
			label: (
				<Flex flex="1" justify="center">
					<Typography.Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Total Profit
					</Typography.Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<YeildButton
						options={totalProfitOptions}
						targetType={optionsBasketData.totalProfitType}
						targetValue={optionsBasketData.totalProfitValue}
						handleTargetValueChange={(val) =>
							handleChangeNumberValue(val, 'totalProfitValue')
						}
						handleTargetTypeChange={(val) =>
							handleChangeStrValue(val, 'totalProfitType')
						}
					/>
				</Flex>
			),
		},
		{
			key: 'stopLoss',
			label: (
				<Flex flex="1" justify="center">
					<Typography.Text
						style={{
							fontSize: token.fontSizeSM,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Spot Loss
					</Typography.Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<YeildButton
						options={spotLossOptions}
						targetType={optionsBasketData.stopLossType}
						targetValue={optionsBasketData.stopLossValue}
						handleTargetValueChange={(val) =>
							handleChangeNumberValue(val, 'stopLossValue')
						}
						handleTargetTypeChange={(val) =>
							handleChangeStrValue(val, 'stopLossType')
						}
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
	useActionChange<string | undefined>(
		optionsBasketData.tradeOption,
		individualBasket.id,
		basket,
		handleEditBasket,
		'entryCondition',
		'tradeType'
	)

	useActionChange<string | undefined>(
		optionsBasketData.expiry,
		individualBasket.id,
		basket,
		handleEditBasket,
		'entryCondition',
		'expiry'
	)
	useActionChange<string | undefined>(
		optionsBasketData.subTradeOption,
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
				style={{ backgroundColor: dark ? '#F7FBFD' : 'transparent' }}
				items={item}
				column={5}
				layout="vertical"
				bordered
				className="w-[100%]"
			/>
		</Flex>
	)
}

export default OptionBasketDetail
