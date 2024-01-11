import {
	Flex,
	Button,
	Descriptions,
	DescriptionsProps,
	theme,
	Typography,
	Divider,
	FlexProps,
	ButtonProps,
} from 'antd'

const { Text } = Typography
import { useImmer } from 'use-immer'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import Instrument from '../modal-components/instrument'
import ActionSelector, {
	ActionSelectorProps,
} from '../modal-components/action-selector'
import QuantityInput from '../modal-components/quantity-input'
import YeildButton, { YeildButtonProps } from '../modal-components/yeild-button'
import ExpirySelector from '../modal-components/expiry-selector'
import StrikeSelector, {
	StrikeSelectorProps,
} from '../modal-components/strike-selector'
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

	const actionTypeProps: ActionSelectorProps<TradeAction, OptionsKey> = {
		action1: TradeAction.Buy,
		action2: TradeAction.Sell,
		paramType: OptionsKey.ACTION,
		color1: 'green',
		color2: 'red',
		baseActionValue: optionsBasketData.actionValue,
		handleBaseActionChange: handleChangeValue<TradeAction>,
	}

	const optionTypeProps: ActionSelectorProps<OptionType, OptionsKey> = {
		action1: OptionType.CALL,
		action2: OptionType.PUT,
		paramType: OptionsKey.OPTION,
		color1: 'black',
		color2: 'purple',
		baseActionValue: optionsBasketData.optionType!,
		handleBaseActionChange: handleChangeValue<OptionType>,
	}

	const strikeSelectorProps: StrikeSelectorProps<OptionsKey> = {
		paramValue: OptionsKey.TRADEVALUE,
		paramType: OptionsKey.SUBTRADEOPTION,
		tradeOption: optionsBasketData.tradeOption!,
		tradeValue: optionsBasketData.tradeValue!,
		subTradeOption: optionsBasketData.subTradeOption!,
		subTradeOptionList: optionsBasketData.subTradeOptionList!,
		setTradeValue: handleChangeValue,
		setSubTradeOption: handleChangeValue<string>,
		setTradeOption: handleTradeOptionChange,
	}

	const totalProfitProps: YeildButtonProps<OptionsKey> = {
		targetOn: YeildLabel.PROFIT,
		paramType: OptionsKey.PROFITTYPE,
		paramValue: OptionsKey.PROFITVALUE,
		targetType: optionsBasketData.totalProfitType,
		targetValue: optionsBasketData.totalProfitValue,
		handleTargetValueChange: handleChangeValue<number>,
		handleTargetTypeChange: handleChangeValue<string>,
	}

	const stopLossProps: YeildButtonProps<OptionsKey> = {
		targetOn: YeildLabel.LOSS,
		paramType: OptionsKey.LOSSTYPE,
		paramValue: OptionsKey.LOSSVALUE,
		targetType: optionsBasketData.stopLossType,
		targetValue: optionsBasketData.stopLossValue,
		handleTargetTypeChange: handleChangeValue<string>,
		handleTargetValueChange: handleChangeValue<number>,
	}

	const commonFlexProps: FlexProps = {
		flex: '1',
		children: null,
		justify: 'center',
	}

	const typographyStyles = {
		fontSize: token.fontSizeSM,
		fontWeight: token.fontWeightStrong,
	}

	const actionButtonProps: ButtonProps[] = [
		{
			shape: 'circle',
			icon: <CopyOutlined />,
			type: 'text',
			onClick: copyBasket,
		},
		{
			shape: 'circle',
			icon: <DeleteOutlined />,
			type: 'text',
			onClick: deleteBasket,
		},
	]
	const item: DescriptionsProps['items'] = [
		{
			key: 'intruments',
			label: (
				<Flex {...commonFlexProps}>
					<Text style={{ ...typographyStyles }}>Intruments</Text>
				</Flex>
			),
			children: (
				<Flex {...commonFlexProps}>
					<Instrument instrument={baseInstrumentValue} />
				</Flex>
			),
		},
		{
			key: 'actions',
			label: (
				<Flex {...commonFlexProps}>
					<Text style={{ ...typographyStyles }}>Action</Text>
				</Flex>
			),
			children: (
				<Flex {...commonFlexProps}>
					<ActionSelector {...actionTypeProps} />
				</Flex>
			),
		},
		{
			key: 'options',
			label: (
				<Flex {...commonFlexProps}>
					<Text style={{ ...typographyStyles }}>Option</Text>
				</Flex>
			),
			children: (
				<Flex {...commonFlexProps}>
					<ActionSelector {...optionTypeProps} />
				</Flex>
			),
		},
		{
			key: 'quantity',
			label: (
				<Flex {...commonFlexProps}>
					<Text style={{ ...typographyStyles }}>Quantity</Text>
				</Flex>
			),
			children: (
				<Flex {...commonFlexProps}>
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
				<Flex {...commonFlexProps}>
					<Text style={{ ...typographyStyles }}>Operations</Text>
				</Flex>
			),
			children: (
				<Flex {...commonFlexProps}>
					{actionButtonProps.map((action, i) => (
						<Button {...action} key={i} />
					))}
				</Flex>
			),
		},
		{
			key: 'strike',
			label: (
				<Flex {...commonFlexProps}>
					<Text style={{ ...typographyStyles }}>Strike</Text>
				</Flex>
			),
			children: (
				<Flex {...commonFlexProps}>
					<StrikeSelector {...strikeSelectorProps} />
				</Flex>
			),
		},
		{
			key: 'expiry',
			label: (
				<Flex {...commonFlexProps}>
					<Text style={{ ...typographyStyles }}>Expiry</Text>
				</Flex>
			),
			children: (
				<Flex {...commonFlexProps}>
					<ExpirySelector
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
				<Flex {...commonFlexProps}>
					<Text style={{ ...typographyStyles }}>Total Profit</Text>
				</Flex>
			),
			children: (
				<Flex {...commonFlexProps}>
					<YeildButton<OptionsKey> {...totalProfitProps} />
				</Flex>
			),
		},
		{
			key: 'stopLoss',
			label: (
				<Flex {...commonFlexProps}>
					<Text style={{ ...typographyStyles }}>Spot Loss</Text>
				</Flex>
			),
			children: (
				<Flex {...commonFlexProps}>
					<YeildButton {...stopLossProps} />
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

	const descriptionProps: DescriptionsProps = {
		column: 5,
		items: item,
		bordered: true,
		layout: 'vertical',
		style: { backgroundColor: dark ? '#F7FBFD' : 'transparent' },
	}

	return (
		<Flex vertical>
			<Divider>
				<Typography.Text style={{ color: token.colorPrimary }}>
					Options ({`Leg-${individualBasket.count}`})
				</Typography.Text>
			</Divider>
			<Descriptions {...descriptionProps} />
		</Flex>
	)
}

export default OptionBasketDetail
