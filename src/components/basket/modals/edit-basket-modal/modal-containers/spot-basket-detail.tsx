import Instrument from '../modal-components/instrument'
import QuantityInput from '../modal-components/quantity-input'
import ActionSelector from '../modal-components/action-selector'
import YeildButton from '../modal-components/yeild-button'
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
} from 'antd'
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
					<ActionSelector<TradeAction, SpotKey>
						action1={TradeAction.Buy}
						action2={TradeAction.Sell}
						paramType={SpotKey.ACTION}
						color1="green"
						color2="red"
						baseActionValue={spotBasketData.actionValue}
						handleBaseActionChange={handleChangeValue<TradeAction>}
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
					<QuantityInput<SpotKey>
						paramType={SpotKey.QUANTITY}
						baseQuantityValue={spotBasketData.quantityValue}
						handleQantityChange={handleChangeValue<number>}
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
					<YeildButton<SpotKey>
						targetOn={YeildLabel.PROFIT}
						targetType={spotBasketData.totalProfitType}
						targetValue={spotBasketData.totalProfitValue}
						paramType={SpotKey.PROFITTYPE}
						paramValue={SpotKey.PROFITVALUE}
						handleTargetValueChange={handleChangeValue<number>}
						handleTargetTypeChange={handleChangeValue<string>}
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
					<YeildButton<SpotKey>
						targetOn={YeildLabel.LOSS}
						targetType={spotBasketData.stopLossType}
						targetValue={spotBasketData.stopLossValue}
						paramType={SpotKey.LOSSTYPE}
						paramValue={SpotKey.LOSSVALUE}
						handleTargetValueChange={handleChangeValue<number>}
						handleTargetTypeChange={handleChangeValue<string>}
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

	return (
		<Flex vertical>
			<Divider>
				<Typography.Text style={{ color: token.colorPrimary }}>
					Spot ({`Leg-${individualBasket.count}`})
				</Typography.Text>
			</Divider>
			<Descriptions
				style={{ backgroundColor: dark ? '#F7FBFD' : 'transparent' }}
				items={item}
				layout="vertical"
				bordered
				className="w-[100%]"
				column={8}
			/>
		</Flex>
	)
}

export default SpotBasketDetail
