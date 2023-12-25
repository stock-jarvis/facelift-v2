import Instrument from '../modal-components/instrument'
import QuantityInput from '../modal-components/quantity-input'
import ActionSelector from '../modal-components/action-selector'
import YeildButton from '../modal-components/yeild-button'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import {
	Flex,
	theme,
	Descriptions,
	DescriptionsProps,
	Button,
	Divider,
	Typography,
} from 'antd'
import { useState } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'
import {
	spotLossOptions,
	totalProfitOptions,
} from 'src/components/basket/constants/data'
import { useValueChange } from '../modal-hooks/useValueChange'
import { useActionChange } from '../modal-hooks/useActionChange'
import { useExitValueChange } from '../modal-hooks/useExitValueChange'
import { useExitTypeChange } from '../modal-hooks/useExitTypeChange'
interface SpotDetailsProps {
	handleDeleteBasket: (val: string) => void
	handleCopyBasket: (val: string) => void
	handleEditBasket: (basket: BasketDataProps[]) => void
	id: string
	dark: boolean
	count: number
	basket: BasketDataProps[]
	baseSpotLossValue: number
	baseTotalProfitValue: number
	baseInstrumentValue: string
	baseQuanity: number
	baseActionValue: string
	baseSpotLossOption: string
	baseTotalProfitOption: string
}

const SpotBasketDetail = ({
	handleDeleteBasket,
	handleCopyBasket,
	handleEditBasket,
	id,
	dark,
	count,
	basket,
	baseQuanity,
	baseActionValue,
	baseInstrumentValue,
	baseSpotLossValue,
	baseTotalProfitValue,
	baseSpotLossOption,
	baseTotalProfitOption,
}: SpotDetailsProps) => {
	const { token } = theme.useToken()
	const [quantityValue, setQuantityValue] = useState<number>(baseQuanity)
	const [actionValue, setActionValue] = useState<string>(baseActionValue)
	const [spotLossType, setSpotLossType] = useState<string>(baseSpotLossOption)
	const [totalProfitType, setTotalProfitType] = useState<string>(
		baseTotalProfitOption
	)
	const [totalProfitValue, setTotalProfitValue] =
		useState<number>(baseTotalProfitValue)
	const [spotLossValue, setSpotLossValue] = useState<number>(baseSpotLossValue)

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
						onClick={() => handleCopyBasket(id)}
					/>
					<Button
						shape="circle"
						icon={<DeleteOutlined />}
						type="text"
						onClick={() => handleDeleteBasket(id)}
					/>
				</Flex>
			),
		},
	]

	useValueChange(quantityValue, id, basket, handleEditBasket, 'quantity')
	useActionChange(actionValue, id, basket, handleEditBasket, 'actionType')
	useExitValueChange(
		totalProfitValue,
		id,
		basket,
		handleEditBasket,
		'totalProfit'
	)
	useExitValueChange(spotLossValue, id, basket, handleEditBasket, 'stopLoss')
	useExitTypeChange(spotLossType, id, basket, handleEditBasket, 'stopLoss')
	useExitTypeChange(
		totalProfitType,
		id,
		basket,
		handleEditBasket,
		'totalProfit'
	)

	return (
		<Flex vertical>
			<Divider>
				<Typography.Text style={{ color: token.colorPrimary }}>
					Spot ({`Leg-${count}`})
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
