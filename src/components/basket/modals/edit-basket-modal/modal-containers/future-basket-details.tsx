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
} from 'antd'

import { useImmer } from 'use-immer'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import QuantityInput from '../modal-components/quantity-input'
import YeildButton from '../modal-components/yeild-button'
import ExpirySelector from '../modal-components/expiry-selector'
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
		expiry: individualBasket.entryCondition.expiry,
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
	useActionChange<string | undefined>(
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
					<ActionSelector<TradeAction, FutureKey>
						action1={TradeAction.Buy}
						action2={TradeAction.Sell}
						color1="green"
						color2="red"
						paramType={FutureKey.ACTION}
						baseActionValue={futureBasketData.actionValue}
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
					<QuantityInput<FutureKey>
						paramType={FutureKey.QUANTITY}
						baseQuantityValue={futureBasketData.quantityValue}
						handleQantityChange={handleChangeValue<number>}
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
					<ExpirySelector<FutureKey>
						expiryOptions={futureExpiry}
						expiryValue={futureBasketData.expiry!}
						handleExpiryChange={handleChangeValue<string>}
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
					<YeildButton<FutureKey>
						targetOn={YeildLabel.PROFIT}
						paramType={FutureKey.PROFITTYPE}
						paramValue={FutureKey.PROFITVALUE}
						targetType={futureBasketData.totalProfitType}
						targetValue={futureBasketData.totalProfitValue}
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
					<YeildButton<FutureKey>
						targetOn={YeildLabel.LOSS}
						paramType={FutureKey.LOSSTYPE}
						paramValue={FutureKey.LOSSVALUE}
						targetType={futureBasketData.stopLossType}
						targetValue={futureBasketData.stopLossValue}
						handleTargetValueChange={handleChangeValue<number>}
						handleTargetTypeChange={handleChangeValue<string>}
					/>
				</Flex>
			),
		},
	]
	return (
		<Flex vertical>
			<Divider>
				<Typography.Text style={{ color: token.colorPrimary }}>
					Future ({`Leg-${individualBasket.count}`})
				</Typography.Text>
			</Divider>
			<Descriptions
				style={{ backgroundColor: dark ? '#F7FBFD' : 'transparent' }}
				items={item}
				layout="vertical"
				bordered
				column={4}
				className="w-[100%]"
			/>
		</Flex>
	)
}

export default FutureBasketDetails
