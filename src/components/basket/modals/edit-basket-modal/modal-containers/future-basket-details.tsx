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
import { useState } from 'react'
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
import { BasketDataProps } from 'src/components/basket/types/types'
import {
	spotLossOptions,
	totalProfitOptions,
} from 'src/components/basket/constants/data'

interface FututreDetailsProps {
	dark: boolean
	individualBasket: BasketDataProps
	baseInstrumentValue: string
	basket: BasketDataProps[]
	handleDeleteBasket: (val: string) => void
	handleCopyBasket: (val: string) => void
	handleEditBasket: (basket: BasketDataProps[]) => void
}
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
	const [quantityValue, setQuantityValue] = useState<number>(
		individualBasket.entryCondition.quantity
	)
	const [actionValue, setActionValue] = useState<string>(
		individualBasket.entryCondition.actionType
	)
	const [expirtyValue, setExpiryValue] = useState<string>(
		individualBasket.entryCondition.expiry || 'Monthly'
	)
	const [spotLossType, setSpotLossType] = useState<string>(
		individualBasket.exitCondition.stopLoss.type
	)
	const [totalProfitType, setTotalProfitType] = useState<string>(
		individualBasket.exitCondition.totalProfit.type
	)
	const [totalProfitValue, setTotalProfitValue] = useState<number>(
		individualBasket.exitCondition.stopLoss.value
	)
	const [spotLossValue, setSpotLossValue] = useState<number>(
		individualBasket.exitCondition.totalProfit.value
	)

	useValueChange(
		quantityValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'quantity'
	)
	useActionChange(
		actionValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'actionType'
	)
	useTypeChange(
		expirtyValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'expiry'
	)
	useExitValueChange(
		totalProfitValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'totalProfit'
	)
	useExitValueChange(
		spotLossValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'stopLoss'
	)
	useExitTypeChange(
		spotLossType,
		individualBasket.id,
		basket,
		handleEditBasket,
		'stopLoss'
	)
	useExitTypeChange(
		totalProfitType,
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
						baseActionValue={actionValue}
						handleBaseActionChange={setActionValue}
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
						baseQuantityValue={quantityValue}
						handleQantityChange={setQuantityValue}
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
			key: 'quantity',
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
						expiryValue={expirtyValue}
						handleExpiryChange={setExpiryValue}
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
						targetType={totalProfitType}
						targetValue={totalProfitValue}
						handleTargetValueChange={setTotalProfitValue}
						handleTargetTypeChange={setTotalProfitType}
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
						targetType={spotLossType}
						targetValue={spotLossValue}
						handleTargetValueChange={setSpotLossValue}
						handleTargetTypeChange={setSpotLossType}
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
