import { Flex, Descriptions, DescriptionsProps, Typography, theme } from 'antd'

import { futureExpiry } from 'src/components/basket/constants/data'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import PositionHolder from './position-holder'
import QuantityInput from '../modal-components/quantity-input'
import ExpirySelector from '../modal-components/expiry-selector'
import { TradeAction } from 'src/common/enums'
import { BasketDataValues } from 'src/components/basket/types/types'
interface BasketProps {
	basketInitialData: BasketDataValues
	baseInstrumentValue: string
	handleAddBasket: (val: string) => void
	handleBaseQuantityChange: (value: number) => void
	handleBaseExpiryChange: (val: string) => void
	handleBaseActionChange: (val: string) => void
}
const FutureBasketSelector: React.FC<BasketProps> = ({
	basketInitialData,
	baseInstrumentValue,
	handleAddBasket,
	handleBaseQuantityChange,
	handleBaseActionChange,
	handleBaseExpiryChange,
}) => {
	const { token } = theme.useToken()
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
					<ActionSelector
						action1={TradeAction.Buy}
						action2={TradeAction.Sell}
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
				<Flex flex={1} justify="center">
					Quantity
				</Flex>
			),
			children: (
				<Flex flex={1} justify="center">
					<QuantityInput
						baseQuantityValue={basketInitialData.quantity}
						handleQantityChange={handleBaseQuantityChange}
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
					<ExpirySelector
						handleExpiryChange={handleBaseExpiryChange}
						expiryValue={basketInitialData.expiry || 'Monthly'}
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
		<PositionHolder onClick={handleAddBasket} basketType="future">
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
