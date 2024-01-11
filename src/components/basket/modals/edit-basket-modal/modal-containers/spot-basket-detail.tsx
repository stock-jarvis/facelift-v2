import Instrument from '../modal-components/instrument'
import QuantityInput, {
	QuantityProps,
} from '../modal-components/quantity-input'
import ActionSelector, {
	ActionSelectorProps,
} from '../modal-components/action-selector'
import YeildButton, { YeildButtonProps } from '../modal-components/yeild-button'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { TradeAction } from 'src/common/enums'
import { useImmer } from 'use-immer'
import {
	Flex,
	theme,
	Descriptions,
	DescriptionsProps,
	Button,
	Divider,
	Typography,
	ButtonProps,
	FlexProps,
} from 'antd'

const { Text } = Typography
import {
	SpotBasketData,
	BasketDataProps,
	SpotKey,
	YeildLabel,
} from 'src/components/basket/types/types'
import { useActionChange } from '../modal-hooks/useActionChange'
import { useExitTypeChange } from '../modal-hooks/useExitTypeChange'
interface SpotDetailsProps {
	dark: boolean
	basket: BasketDataProps[]
	baseInstrumentValue: string
	individualBasket: BasketDataProps
	handleDeleteBasket: (id: string) => void
	handleCopyBasket: (id: string) => void
	handleEditBasket: (basket: BasketDataProps[]) => void
}
const SpotBasketDetail: React.FC<SpotDetailsProps> = ({
	dark,
	basket,
	individualBasket,
	baseInstrumentValue,
	handleCopyBasket,
	handleEditBasket,
	handleDeleteBasket,
}) => {
	const { token } = theme.useToken()
	const [spotBasketData, setSpotBasketData] = useImmer<SpotBasketData>({
		quantityValue: individualBasket.entryCondition.quantity,
		actionValue: individualBasket.entryCondition.actionType,
		stopLossType: individualBasket.exitCondition.stopLoss.type,
		stopLossValue: individualBasket.exitCondition.stopLoss.value,
		totalProfitType: individualBasket.exitCondition.totalProfit.type,
		totalProfitValue: individualBasket.exitCondition.totalProfit.value,
	})

	const handleChangeValue = <T,>(val: T, key: SpotKey) => {
		setSpotBasketData({ ...spotBasketData, [key]: val })
	}

	const copyBasket: ButtonProps['onClick'] = () => {
		handleCopyBasket(individualBasket.id)
	}

	const deleteBasket: ButtonProps['onClick'] = () => {
		handleDeleteBasket(individualBasket.id)
	}

	const actionTypeProps: ActionSelectorProps<TradeAction, SpotKey> = {
		action1: TradeAction.Buy,
		action2: TradeAction.Sell,
		paramType: SpotKey.ACTION,
		color1: 'green',
		color2: 'red',
		baseActionValue: spotBasketData.actionValue,
		handleBaseActionChange: handleChangeValue<TradeAction>,
	}

	const totalProfitProps: YeildButtonProps<SpotKey> = {
		targetOn: YeildLabel.PROFIT,
		paramType: SpotKey.PROFITTYPE,
		paramValue: SpotKey.PROFITVALUE,
		targetType: spotBasketData.totalProfitType,
		targetValue: spotBasketData.totalProfitValue,
		handleTargetValueChange: handleChangeValue<number>,
		handleTargetTypeChange: handleChangeValue<string>,
	}

	const stopLossProps: YeildButtonProps<SpotKey> = {
		targetOn: YeildLabel.LOSS,
		paramType: SpotKey.LOSSTYPE,
		paramValue: SpotKey.LOSSVALUE,
		targetType: spotBasketData.stopLossType,
		targetValue: spotBasketData.stopLossValue,
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

	const quantityProps: QuantityProps<SpotKey> = {
		paramType: SpotKey.QUANTITY,
		baseQuantityValue: spotBasketData.quantityValue,
		handleQantityChange: handleChangeValue<number>,
	}

	const item: DescriptionsProps['items'] = [
		{
			key: 'intruments',
			label: (
				<Flex {...commonFlexProps}>
					<Text style={{ ...typographyStyles }}>Intruments</Text>
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
				<Flex flex="1" justify="center">
					<Text style={{ ...typographyStyles }}>Spot Loss</Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<YeildButton {...stopLossProps} />
				</Flex>
			),
		},

		{
			key: 'operations',
			label: (
				<Flex flex="1" justify="center">
					<Text style={{ ...typographyStyles }}>Operations</Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					{actionButtonProps.map((action, i) => (
						<Button {...action} key={i} />
					))}
				</Flex>
			),
		},
	]

	useActionChange<number>(
		spotBasketData.quantityValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'entryCondition',
		'quantity'
	)
	useActionChange<TradeAction>(
		spotBasketData.actionValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'entryCondition',
		'actionType'
	)
	useExitTypeChange<number>(
		spotBasketData.totalProfitValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'totalProfit',
		'value'
	)
	useExitTypeChange<number>(
		spotBasketData.stopLossValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'stopLoss',
		'value'
	)
	useExitTypeChange<string>(
		spotBasketData.stopLossType,
		individualBasket.id,
		basket,
		handleEditBasket,
		'stopLoss',
		'type'
	)
	useExitTypeChange<string>(
		spotBasketData.totalProfitType,
		individualBasket.id,
		basket,
		handleEditBasket,
		'totalProfit',
		'type'
	)

	const descriptionProps: DescriptionsProps = {
		column: 8,
		items: item,
		bordered: true,
		layout: 'vertical',
		className: 'w-[100%]',
		style: { backgroundColor: dark ? '#F7FBFD' : 'transparent' },
	}

	return (
		<Flex vertical>
			<Divider>
				<Text style={{ color: token.colorPrimary }}>
					Spot ({`Leg-${individualBasket.count}`})
				</Text>
			</Divider>
			<Descriptions {...descriptionProps} />
		</Flex>
	)
}

export default SpotBasketDetail
