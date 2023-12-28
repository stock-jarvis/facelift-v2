import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import {
	Flex,
	Button,
	Typography,
	Divider,
	theme,
	Descriptions,
	DescriptionsProps,
} from 'antd'

import { useImmer } from 'use-immer'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import QuantityInput from '../modal-components/quantity-input'
import YeildButton from '../modal-components/yeild-button'
import ExpirySelector from '../modal-components/expiry-selector'
import { useValueChange } from '../modal-hooks/useValueChange'
import { useActionChange } from '../modal-hooks/useActionChange'
import { useTypeChange } from '../modal-hooks/useTypeChange'
import { useExitTypeChange } from '../modal-hooks/useExitTypeChange'
import { useExitValueChange } from '../modal-hooks/useExitValueChange'
import { futureExpiry } from 'src/components/basket/constants/data'
import {
	FututreDetailsProps,
	FutureBasketData,
	futureStrKeys,
	futureNumberedKeys,
} from 'src/components/basket/types/types'
import {
	spotLossOptions,
	totalProfitOptions,
} from 'src/components/basket/constants/data'

const FututeBasketDetails: React.FC<FututreDetailsProps> = ({
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

	const handleChangeNumberValue = (val: number, key: futureNumberedKeys) => {
		setFutureBasketData({ ...futureBasketData, [key]: val })
	}
	const handleChangeStrValue = (val: string, key: futureStrKeys) => {
		setFutureBasketData({ ...futureBasketData, [key]: val })
	}

	useValueChange(
		futureBasketData.quantityValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'quantity'
	)
	useActionChange(
		futureBasketData.actionValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'actionType'
	)
	useTypeChange(
		futureBasketData.expiry,
		individualBasket.id,
		basket,
		handleEditBasket,
		'expiry'
	)
	useExitValueChange(
		futureBasketData.totalProfitValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'totalProfit'
	)
	useExitValueChange(
		futureBasketData.stopLossValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'stopLoss'
	)
	useExitTypeChange(
		futureBasketData.stopLossType,
		individualBasket.id,
		basket,
		handleEditBasket,
		'stopLoss'
	)
	useExitTypeChange(
		futureBasketData.totalProfitType,
		individualBasket.id,
		basket,
		handleEditBasket,
		'totalProfit'
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
					<ActionSelector
						action1="B"
						action2="S"
						color1="green"
						color2="red"
						baseActionValue={futureBasketData.actionValue}
						handleBaseActionChange={(val) =>
							handleChangeStrValue(val, 'actionValue')
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
						baseQuantityValue={futureBasketData.quantityValue}
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
						expiryOptions={futureExpiry}
						expiryValue={futureBasketData.expiry}
						handleExpiryChange={(val) => handleChangeStrValue(val, 'expiry')}
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
						targetType={futureBasketData.totalProfitType}
						targetValue={futureBasketData.totalProfitValue}
						handleTargetValueChange={(val) =>
							handleChangeNumberValue(val, 'totalProfitValue')
						}
						handleTargetTypeChange={(val) => {
							handleChangeStrValue(val, 'totalProfitType')
						}}
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
						targetType={futureBasketData.stopLossType}
						targetValue={futureBasketData.stopLossValue}
						handleTargetValueChange={(val) =>
							handleChangeNumberValue(val, 'stopLossValue')
						}
						handleTargetTypeChange={(val) => {
							handleChangeStrValue(val, 'stopLossType')
						}}
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

export default FututeBasketDetails
