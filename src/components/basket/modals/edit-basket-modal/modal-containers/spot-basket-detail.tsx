import DetailBasketHolder from './detail-basket-holder'
import Instrument from '../modal-components/instrument'
import QuantityInput from '../modal-components/quantity-input'
import ActionSelector from '../modal-components/action-selector'
import YeildButton from '../modal-components/yeild-button'
import { Flex } from 'antd'
const SpotBasketDetail = () => {
	return (
		<DetailBasketHolder>
			<Flex flex="1" justify="space-around">
				<Flex flex={1} justify="center">
					<Instrument />
				</Flex>
				<Flex flex={1} justify="center">
					<ActionSelector
						label="Action Type"
						action1="B"
						action2="S"
						color1="green"
						color2="red"
					/>
				</Flex>
				<Flex flex={1}>
					<QuantityInput />
				</Flex>
				<Flex flex={1} style={{ marginTop: '23px' }}>
					<YeildButton label="Total Profit" />
				</Flex>
				<Flex flex={1} style={{ marginTop: '23px' }}>
					<YeildButton label="Spot Loss" />
				</Flex>
			</Flex>
		</DetailBasketHolder>
	)
}

export default SpotBasketDetail
