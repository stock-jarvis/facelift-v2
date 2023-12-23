import { Flex, Descriptions, DescriptionsProps, Typography, theme } from 'antd'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import PositionHolder from './position-holder'
import QuantityInput from '../modal-components/quantity-input'

interface BasketProps {
	handleAddBasket: (val: string) => void
	handleBaseQuantityChange: (value: number) => void
	handleBaseActionChange: (val: string) => void
	baseInstrumentValue: string
	baseQuantityValue: number
	baseActionValue: string
}
const SpotBasketSelector = ({
	handleAddBasket,
	handleBaseQuantityChange,
	handleBaseActionChange,
	baseInstrumentValue,
	baseQuantityValue,
	baseActionValue,
}: BasketProps) => {
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
					<ActionSelector
						action1="B"
						action2="S"
						color1="green"
						color2="red"
						baseActionValue={baseActionValue}
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
					<QuantityInput
						baseQuantityValue={baseQuantityValue}
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
						Spot Poistion
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
		<PositionHolder onClick={handleAddBasket} basketType="spot">
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
