import {
	Flex,
	Button,
	Descriptions,
	DescriptionsProps,
	theme,
	Typography,
	Divider,
} from 'antd'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import QuantityInput from '../modal-components/quantity-input'
import YeildButton from '../modal-components/yeild-button'
import ExpirySelector from '../modal-components/expiry-selector'
import StrikeSelector from '../modal-components/strike-selector'
import { useValueChange } from '../modal-hooks/useValueChange'
import { useActionChange } from '../modal-hooks/useActionChange'
import { useTypeChange } from '../modal-hooks/useTypeChange'
import { useExitTypeChange } from '../modal-hooks/useExitTypeChange'
import { useExitValueChange } from '../modal-hooks/useExitValueChange'
import { useState } from 'react'
import {
	OptionObject,
	TradeOptions,
	BasketDataProps,
} from 'src/components/basket/types/types'
import {
	spotLossOptions,
	totalProfitOptions,
} from 'src/components/basket/constants/data'
interface OptionDetailsProps {
	id: string
	dark: boolean
	count: number
	baseQuanity: number
	baseActionValue: string
	baseOptionValue: string
	basket: BasketDataProps[]
	optionExpiryBaseValue: string
	optionExpiryList: OptionObject[]
	baseTradeValue: number
	baseTradeOption: string
	baseSubTradeOption: string
	baseSubTradeOptionList: TradeOptions[]
	baseInstrumentValue: string
	baseSpotLossValue: number
	baseTotalProfitValue: number
	baseSpotLossOption: string
	baseTotalProfitOption: string
	handleDeleteBasket: (val: string) => void
	handleCopyBasket: (val: string) => void
	handleEditBasket: (basket: BasketDataProps[]) => void
}
const OptionBasketDetail = ({
	id,
	dark,
	count,
	basket,
	baseQuanity,
	baseActionValue,
	baseOptionValue,
	optionExpiryList,
	optionExpiryBaseValue,
	baseTradeOption,
	baseSubTradeOption,
	baseSubTradeOptionList,
	baseTradeValue,
	baseInstrumentValue,
	baseSpotLossValue,
	baseTotalProfitValue,
	baseSpotLossOption,
	baseTotalProfitOption,
	handleDeleteBasket,
	handleCopyBasket,
	handleEditBasket,
}: OptionDetailsProps) => {
	const { token } = theme.useToken()

	const [quantityValue, setQuantityValue] = useState<number>(baseQuanity)
	const [actionValue, setActionValue] = useState<string>(baseActionValue)
	const [optionType, setOptionType] = useState<string>(baseOptionValue)
	const [tradeOption, setTradeOption] = useState<string>(baseTradeOption)
	const [tradeValue, setTradeValue] = useState<number>(baseTradeValue)
	const [subTradeOption, setSubTradeOption] =
		useState<string>(baseSubTradeOption)

	const [subTradeOptionList, setSubTradeOptionList] = useState<TradeOptions[]>(
		baseSubTradeOptionList
	)
	const [expiryValue, setExpiryValue] = useState<string>(optionExpiryBaseValue)

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
			//	span: { xs: 0.5, sm: 0.5, md: 0.5, lg: 0.5, xl: 0.5, xxl: 0.5 },
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
			//	span: { xs: 0.5, sm: 0.5, md: 0.5, lg: 0.5, xl: 0.5, xxl: 0.5 },
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
			//	span: { xs: 0.5, sm: 0.5, md: 0.5, lg: 0.5, xl: 0.5, xxl: 0.5 },
			children: (
				<Flex flex={1} justify="center">
					<ActionSelector
						action1="CE"
						action2="PE"
						color1="black"
						color2="purple"
						baseActionValue={optionType}
						handleBaseActionChange={setOptionType}
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
			//	span: { xs: 0.5, sm: 0.5, md: 0.5, lg: 0.5, xl: 0.5, xxl: 0.5 },
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
			//	span: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 },
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
			//	span: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 },
			children: (
				<Flex flex={1} justify="center">
					<StrikeSelector
						tradeOption={tradeOption}
						tradeValue={tradeValue}
						setTradeValue={setTradeValue}
						setTradeOption={setTradeOption}
						subTradeOption={subTradeOption}
						setSubTradeOption={setSubTradeOption}
						subTradeOptionList={subTradeOptionList}
						setSubTradeOptionList={setSubTradeOptionList}
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
			//	span: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 },
			children: (
				<Flex flex={1} justify="center">
					<ExpirySelector
						expiryValue={expiryValue}
						handleExpiryChange={setExpiryValue}
						expiryOptions={optionExpiryList}
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
			//span: { xs: 0.5, sm: 0.5, md: 0.5, lg: 0.5, xl: 0.5, xxl: 0.5 },
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
			//span: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 },
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

	useValueChange(quantityValue, id, basket, handleEditBasket, 'quantity')
	useValueChange(tradeValue, id, basket, handleEditBasket, 'tradeTypeValue')
	useActionChange(actionValue, id, basket, handleEditBasket, 'actionType')
	useActionChange(optionType, id, basket, handleEditBasket, 'optionType')
	useTypeChange(tradeOption, id, basket, handleEditBasket, 'tradeType')
	useTypeChange(expiryValue, id, basket, handleEditBasket, 'expiry')
	useTypeChange(subTradeOption, id, basket, handleEditBasket, 'tradeTypeParams')

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
					Options ({`Leg-${count}`})
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
