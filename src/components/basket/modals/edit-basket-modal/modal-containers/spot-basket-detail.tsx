import Instrument from '../modal-components/instrument'
import QuantityInput from '../modal-components/quantity-input'
import ActionSelector from '../modal-components/action-selector'
import YeildButton from '../modal-components/yeild-button'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { useImmer } from 'use-immer'
import {
	Flex,
	theme,
	Descriptions,
	DescriptionsProps,
	Button,
	Divider,
	Typography,
} from 'antd'
import {
	SpotBasketData,
	SpotDetailsProps,
	spotStrKeys,
	spotNumberedKeys,
} from 'src/components/basket/types/types'
import {
	spotLossOptions,
	totalProfitOptions,
} from 'src/components/basket/constants/data'
import { useValueChange } from '../modal-hooks/useValueChange'
import { useActionChange } from '../modal-hooks/useActionChange'
import { useExitValueChange } from '../modal-hooks/useExitValueChange'
import { useExitTypeChange } from '../modal-hooks/useExitTypeChange'

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

	const handleChangeNumberValue = (val: number, key: spotNumberedKeys) => {
		setSpotBasketData({ ...spotBasketData, [key]: val })
	}
	const handleChangeStrValue = (val: string, key: spotStrKeys) => {
		setSpotBasketData({ ...spotBasketData, [key]: val })
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
					<ActionSelector
						action1="B"
						action2="S"
						color1="green"
						color2="red"
						baseActionValue={spotBasketData.actionValue}
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
						baseQuantityValue={spotBasketData.quantityValue}
						handleQantityChange={(val) =>
							handleChangeNumberValue(val, 'quantityValue')
						}
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
						targetType={spotBasketData.totalProfitType}
						targetValue={spotBasketData.totalProfitValue}
						handleTargetValueChange={(val) =>
							handleChangeNumberValue(val, 'totalProfitValue')
						}
						handleTargetTypeChange={(val) =>
							handleChangeStrValue(val, 'totalProfitType')
						}
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
						targetType={spotBasketData.stopLossType}
						targetValue={spotBasketData.stopLossValue}
						handleTargetValueChange={(val) =>
							handleChangeNumberValue(val, 'stopLossValue')
						}
						handleTargetTypeChange={(val) =>
							handleChangeStrValue(val, 'stopLossType')
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
	]

	useValueChange(
		spotBasketData.quantityValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'quantity'
	)
	useActionChange(
		spotBasketData.actionValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'actionType'
	)
	useExitValueChange(
		spotBasketData.totalProfitValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'totalProfit'
	)
	useExitValueChange(
		spotBasketData.stopLossValue,
		individualBasket.id,
		basket,
		handleEditBasket,
		'stopLoss'
	)
	useExitTypeChange(
		spotBasketData.stopLossType,
		individualBasket.id,
		basket,
		handleEditBasket,
		'stopLoss'
	)
	useExitTypeChange(
		spotBasketData.totalProfitType,
		individualBasket.id,
		basket,
		handleEditBasket,
		'totalProfit'
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
