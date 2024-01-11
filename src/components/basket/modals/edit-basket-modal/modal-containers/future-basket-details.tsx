import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import {
	Flex,
	Button,
	Typography,
	Divider,
	theme,
	Descriptions,
	DescriptionsProps,
	ButtonProps,
	FlexProps,
} from 'antd'
const { Text } = Typography
import { useImmer } from 'use-immer'
import Instrument from '../modal-components/instrument'
import ActionSelector, {
	ActionSelectorProps,
} from '../modal-components/action-selector'
import QuantityInput, {
	QuantityProps,
} from '../modal-components/quantity-input'
import YeildButton, { YeildButtonProps } from '../modal-components/yeild-button'
import ExpirySelector, {
	ExpirySelectorProps,
} from '../modal-components/expiry-selector'
import { useActionChange } from '../modal-hooks/useActionChange'
import { useExitTypeChange } from '../modal-hooks/useExitTypeChange'
import { futureExpiry } from 'src/components/basket/constants/data'
import {
	BasketDataProps,
	FutureBasketData,
	FutureKey,
	YeildLabel,
} from 'src/components/basket/types/types'

import { TradeAction } from 'src/common/enums'
interface FutureDetailsProps {
	dark: boolean
	individualBasket: BasketDataProps
	baseInstrumentValue: string
	basket: BasketDataProps[]
	handleDeleteBasket: (id: string) => void
	handleCopyBasket: (id: string) => void
	handleEditBasket: (basket: BasketDataProps[]) => void
}
const FutureBasketDetails: React.FC<FutureDetailsProps> = ({
	dark,
	basket,
	individualBasket,
	baseInstrumentValue,
	handleCopyBasket,
	handleEditBasket,
	handleDeleteBasket,
}) => {
	const { token } = theme.useToken()

	const [futureBasketData, setFutureBasketData] = useImmer<FutureBasketData>({
		quantityValue: individualBasket.entryCondition.quantity,
		actionValue: individualBasket.entryCondition.actionType,
		expiry: individualBasket.entryCondition.expiry!,
		stopLossType: individualBasket.exitCondition.stopLoss.type,
		stopLossValue: individualBasket.exitCondition.stopLoss.value,
		totalProfitType: individualBasket.exitCondition.totalProfit.type,
		totalProfitValue: individualBasket.exitCondition.totalProfit.value,
	})

	const handleChangeValue = <T,>(val: T, key: FutureKey) => {
		setFutureBasketData({ ...futureBasketData, [key]: val })
	}

	const copyBasket: ButtonProps['onClick'] = () => {
		handleCopyBasket(individualBasket.id)
	}
	const deleteBasket: ButtonProps['onClick'] = () => {
		handleDeleteBasket(individualBasket.id)
	}

	useActionChange<number>(
		futureBasketData.quantityValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'entryCondition',
		'quantity'
	)
	useActionChange<TradeAction>(
		futureBasketData.actionValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'entryCondition',
		'actionType'
	)
	useActionChange<string>(
		futureBasketData.expiry,
		individualBasket.id,
		basket,
		handleEditBasket,
		'entryCondition',
		'expiry'
	)

	useExitTypeChange<number>(
		futureBasketData.totalProfitValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'totalProfit',
		'value'
	)
	useExitTypeChange<number>(
		futureBasketData.stopLossValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'stopLoss',
		'value'
	)
	useExitTypeChange<string>(
		futureBasketData.stopLossType,
		individualBasket.id,
		basket,
		handleEditBasket,
		'stopLoss',
		'type'
	)
	useExitTypeChange<string>(
		futureBasketData.totalProfitType,
		individualBasket.id,
		basket,
		handleEditBasket,
		'totalProfit',
		'type'
	)

	const actionTypeProps: ActionSelectorProps<TradeAction, FutureKey> = {
		action1: TradeAction.Buy,
		action2: TradeAction.Sell,
		paramType: FutureKey.ACTION,
		color1: 'green',
		color2: 'red',
		baseActionValue: futureBasketData.actionValue,
		handleBaseActionChange: handleChangeValue<TradeAction>,
	}

	const totalProfitProps: YeildButtonProps<FutureKey> = {
		targetOn: YeildLabel.PROFIT,
		paramType: FutureKey.PROFITTYPE,
		paramValue: FutureKey.PROFITVALUE,
		targetType: futureBasketData.totalProfitType,
		targetValue: futureBasketData.totalProfitValue,
		handleTargetValueChange: handleChangeValue<number>,
		handleTargetTypeChange: handleChangeValue<string>,
	}

	const stopLossProps: YeildButtonProps<FutureKey> = {
		targetOn: YeildLabel.LOSS,
		paramType: FutureKey.LOSSTYPE,
		paramValue: FutureKey.LOSSVALUE,
		targetType: futureBasketData.stopLossType,
		targetValue: futureBasketData.stopLossValue,
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

	const quantityProps: QuantityProps<FutureKey> = {
		paramType: FutureKey.QUANTITY,
		baseQuantityValue: futureBasketData.quantityValue,
		handleQantityChange: handleChangeValue<number>,
	}

	const expiryProps: ExpirySelectorProps<FutureKey> = {
		expiryOptions: futureExpiry,
		expiryValue: futureBasketData.expiry!,
		handleExpiryChange: handleChangeValue<string>,
	}

	const items: DescriptionsProps['items'] = [
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
			key: 'quantity',
			label: (
				<Flex {...commonFlexProps}>
					<Text style={{ ...typographyStyles }}>Quantity</Text>
				</Flex>
			),
			children: (
				<Flex {...commonFlexProps}>
					<QuantityInput {...quantityProps} />
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
			key: 'expiry',
			label: (
				<Flex {...commonFlexProps}>
					<Text style={{ ...typographyStyles }}>Expiry</Text>
				</Flex>
			),
			children: (
				<Flex {...commonFlexProps}>
					<ExpirySelector {...expiryProps} />
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
					<YeildButton {...totalProfitProps} />
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

	const descriptionProps: DescriptionsProps = {
		items,
		column: 4,
		bordered: true,
		layout: 'vertical',
		className: 'w-[100%]',
		style: { backgroundColor: dark ? '#F7FBFD' : 'transparent' },
	}

	return (
		<Flex vertical>
			<Divider>
				<Text style={{ color: token.colorPrimary }}>
					Future ({`Leg-${individualBasket.count}`})
				</Text>
			</Divider>
			<Descriptions {...descriptionProps} />
		</Flex>
	)
}

export default FutureBasketDetails
