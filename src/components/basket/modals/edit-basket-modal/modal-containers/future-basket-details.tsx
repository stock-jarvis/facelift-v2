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

import {
	OptionObject,
	BasketDataProps,
} from 'src/components/basket/types/types'
import {
	spotLossOptions,
	totalProfitOptions,
} from 'src/components/basket/constants/data'

interface FututreDetailsProps {
	id: string
	dark: boolean
	count: number
	baseQuanity: number
	baseActionValue: string
	futureExpiryList: OptionObject[]
	futureExpiryBaseValue: string
	baseInstrumentValue: string
	basket: BasketDataProps[]
	baseSpotLossValue: number
	baseTotalProfitValue: number
	baseSpotLossOption: string
	baseTotalProfitOption: string
	handleDeleteBasket: (val: string) => void
	handleCopyBasket: (val: string) => void
	handleEditBasket: (basket: BasketDataProps[]) => void
}
const FututeBasketDetails = ({
	id,
	dark,
	count,
	basket,
	baseQuanity,
	baseActionValue,
	futureExpiryList,
	baseSpotLossValue,
	baseTotalProfitValue,
	baseSpotLossOption,
	baseTotalProfitOption,
	baseInstrumentValue,
	futureExpiryBaseValue,
	handleCopyBasket,
	handleEditBasket,
	handleDeleteBasket,
}: FututreDetailsProps) => {
	const { token } = theme.useToken()
	const [quantityValue, setQuantityValue] = useState<number>(baseQuanity)
	const [actionValue, setActionValue] = useState<string>(baseActionValue)
	const [expirtyValue, setExpiryValue] = useState<string>(futureExpiryBaseValue)
	const [spotLossType, setSpotLossType] = useState<string>(baseSpotLossOption)
	const [totalProfitType, setTotalProfitType] = useState<string>(
		baseTotalProfitOption
	)
	const [totalProfitValue, setTotalProfitValue] =
		useState<number>(baseTotalProfitValue)
	const [spotLossValue, setSpotLossValue] = useState<number>(baseSpotLossValue)

	useValueChange(quantityValue, id, basket, handleEditBasket, 'quantity')
	useActionChange(actionValue, id, basket, handleEditBasket, 'actionType')
	useTypeChange(expirtyValue, id, basket, handleEditBasket, 'expiry')
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
						expiryOptions={futureExpiryList}
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
	return (
		<Flex vertical>
			<Divider>
				<Typography.Text style={{ color: token.colorPrimary }}>
					Future ({`Leg-${count}`})
				</Typography.Text>
			</Divider>
			<Descriptions
				style={{ backgroundColor: dark ? '#D3D3D3' : 'transparent' }}
				items={item}
				layout="vertical"
				bordered
				column={8}
				className="w-[100%]"
			/>
		</Flex>
	)
}

export default FututeBasketDetails
