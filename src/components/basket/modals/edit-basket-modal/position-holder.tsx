import { Button, Flex, Typography, theme } from 'antd'
import ActionSelector from './action-selector'
import QuantityInput from './quantity-input'
import Instrument from './instrument'
import ExpirySelector from './expiry-selector'
const PositionHolder = () => {
	const { token } = theme.useToken()
	return (
		<Flex
			vertical
			flex={1}
			gap="middle"
			style={{
				boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.25)',
				padding: token.paddingSM,
				borderRadius: token.borderRadiusLG,
				//	backgroundColor: '#F1F8FF',
			}}
		>
			<Flex flex={1} justify="flex-start" align="center" gap="middle">
				<Typography.Text style={{ fontSize: token.fontSizeLG }}>
					Basket Type:
				</Typography.Text>
				<Typography.Text
					style={{
						fontSize: token.fontSizeLG,
						fontWeight: token.fontWeightStrong,
					}}
				>
					Spot
				</Typography.Text>
			</Flex>
			<Flex justify="center" align="center">
				<Flex className="w-full" justify="space-around">
					<Instrument />
					<ActionSelector />
					<QuantityInput />
					<ExpirySelector />
				</Flex>
			</Flex>
			<Flex justify="center">
				<Button
					size="large"
					style={{
						backgroundColor: token.colorPrimary,
						fontSize: token.fontSizeLG,
						fontWeight: token.fontWeightStrong,
						color: token.colorBgBase,
					}}
				>
					Add Position
				</Button>
			</Flex>
		</Flex>
	)
}

export default PositionHolder
