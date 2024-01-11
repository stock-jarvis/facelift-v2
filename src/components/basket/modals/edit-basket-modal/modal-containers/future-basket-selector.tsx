import { Flex, Descriptions, DescriptionsProps, Typography, theme } from 'antd'

import { futureExpiry } from 'src/components/basket/constants/data'
import Instrument from '../modal-components/instrument'
import ActionSelector, {
	ActionSelectorProps,
} from '../modal-components/action-selector'
import PositionHolder from './position-holder'
import QuantityInput from '../modal-components/quantity-input'
import ExpirySelector from '../modal-components/expiry-selector'
import { TradeAction, BasketLegType } from 'src/common/enums'
import { SavedPosition, FutureKey } from 'src/components/basket/types/types'
interface BasketProps {
	basketInitialData: SavedPosition
	baseInstrumentValue: string
	updatedBasketData: (val: SavedPosition) => void
	handleAddBasket: (leg: BasketLegType) => void
}
const FutureBasketSelector: React.FC<BasketProps> = ({
	basketInitialData,
	baseInstrumentValue,
	updatedBasketData,
	handleAddBasket,
}) => {
	const { token } = theme.useToken()

	const valueChanged = <T,>(val: T, type: FutureKey) => {
		updatedBasketData({ ...basketInitialData, [type]: val })
	}

	const actionTypeProps: ActionSelectorProps<TradeAction, FutureKey> = {
		action1: TradeAction.Buy,
		action2: TradeAction.Sell,
		paramType: FutureKey.ACTION,
		color1: 'green',
		color2: 'red',
		baseActionValue: basketInitialData.actionValue,
		handleBaseActionChange: valueChanged<TradeAction>,
	}

	const items: DescriptionsProps['items'] = [
		{
			key: 'instrument',
			label: (
				<Flex justify="center">
					<Typography.Text>Instruments</Typography.Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center" className="w-full">
					<Instrument instrument={baseInstrumentValue} />
				</Flex>
			),
		},
		{
			key: 'actions',
			label: (
				<Flex flex={1} justify="center">
					<Typography.Text>Action</Typography.Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<ActionSelector {...actionTypeProps} />
				</Flex>
			),
		},
		{
			key: '3',
			label: (
				<Flex flex={1} justify="center">
					Quantity
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<QuantityInput<FutureKey>
						paramType={FutureKey.QUANTITY}
						baseQuantityValue={basketInitialData.quantityValue}
						handleQantityChange={valueChanged<number>}
					/>
				</Flex>
			),
		},
		{
			key: '4',
			label: (
				<Flex flex={1} justify="center">
					Expiry
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<ExpirySelector<FutureKey>
						handleExpiryChange={valueChanged<string>}
						expiryValue={basketInitialData.expiry!}
						expiryOptions={futureExpiry}
					/>
				</Flex>
			),
		},
	]

	const mainItems: DescriptionsProps['items'] = [
		{
			key: 'future-basket',
			label: (
				<Flex flex="1" justify="center">
					<Typography.Text
						style={{
							fontSize: token.fontSizeLG,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Future Leg
					</Typography.Text>
				</Flex>
			),
			children: (
				<Flex className="w-full" align="center" justify="space-between">
					<Descriptions
						size="small"
						column={8}
						className="w-full"
						items={items}
						layout="vertical"
						bordered
					/>
				</Flex>
			),
		},
	]

	return (
		<PositionHolder
			handleAddClick={handleAddBasket}
			basketType={BasketLegType.FUTURE}
		>
			<Descriptions
				className="w-full"
				items={mainItems}
				layout="vertical"
				bordered
			/>
		</PositionHolder>
	)
}

export default FutureBasketSelector
