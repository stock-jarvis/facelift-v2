import { Flex, Descriptions, DescriptionsProps, Typography, theme } from 'antd'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import PositionHolder from './position-holder'
import QuantityInput from '../modal-components/quantity-input'
import { SavedPosition, SpotKey } from 'src/components/basket/types/types'
import { BasketLegType, TradeAction } from 'src/common/enums'
interface BasketProps {
	basketInitialData: SavedPosition
	baseInstrumentValue: string
	handleAddBasket: (val: BasketLegType) => void
	handleBaseQuantityChange: (value: number) => void
	handleBaseActionChange: (val: TradeAction) => void
}
const SpotBasketSelector: React.FC<BasketProps> = ({
	basketInitialData,
	handleAddBasket,
	handleBaseQuantityChange,
	handleBaseActionChange,
	baseInstrumentValue,
}) => {
	const { token } = theme.useToken()

	const items: DescriptionsProps['items'] = [
		{
			key: '1',
			label: (
				<Flex justify="center" className="w-full">
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
			key: '2',
			label: (
				<Flex flex={1} justify="center" className="w-full">
					<Typography.Text>Action</Typography.Text>
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center" className="w-full">
					<ActionSelector<TradeAction, SpotKey>
						action1={TradeAction.Buy}
						action2={TradeAction.Sell}
						paramType={SpotKey.ACTION}
						color1="green"
						color2="red"
						baseActionValue={basketInitialData.action}
						handleBaseActionChange={handleBaseActionChange}
					/>
				</Flex>
			),
		},
		{
			key: '3',
			label: (
				<Flex flex={1} justify="center" className="w-full">
					Quantity
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<QuantityInput<SpotKey>
						paramType={SpotKey.QUANTITY}
						baseQuantityValue={basketInitialData.quantity}
						handleQantityChange={handleBaseQuantityChange}
					/>
				</Flex>
			),
		},
	]
	const mainItem: DescriptionsProps['items'] = [
		{
			key: '11',
			label: (
				<Flex justify="center">
					<Typography.Text
						style={{
							fontSize: token.fontSizeLG,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Spot Leg
					</Typography.Text>
				</Flex>
			),
			children: (
				<Flex className="w-full" align="center" justify="space-between">
					<Descriptions
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
			basketType={BasketLegType.SPOT}
		>
			<Descriptions
				className="w-full"
				items={mainItem}
				layout="vertical"
				bordered
			/>
		</PositionHolder>
	)
}

export default SpotBasketSelector
