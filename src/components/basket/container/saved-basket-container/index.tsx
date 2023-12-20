import { Flex, theme, Typography } from 'antd'
import ListItem from '../../common/basket-item/saved-basket-tem'
import BasketExchange from '../../common/basket-exchange/exchange-selector'
import { useState } from 'react'
import { useBasketStore } from '../../store/basket-store'
import EmptySavedBasket from '../../common/empty-saved-basket'
const Index = () => {
	const { Text } = Typography
	const { token } = theme.useToken()
	const { savedBaskets } = useBasketStore()
	const [exchange, setExchange] = useState<string>('NSE')
	//const [nseBaskets,setNseBaskets] = useState<string>('NSE') ||
	return (
		<Flex flex="1" vertical gap="middle" style={{ padding: token.paddingSM }}>
			<Flex justify="center" style={{ padding: token.paddingXS }}>
				<Text
					style={{
						padding: token.paddingXS,
						fontSize: token.fontSizeLG,
						fontWeight: token.fontWeightStrong,
					}}
				>
					Saved Baskets
				</Text>
			</Flex>
			<Flex className="border-[2px] ">
				<BasketExchange
					exchangeValue={exchange}
					handleTradeChange={setExchange}
				/>
			</Flex>
			<Flex
				className="border-[2px] border-solid"
				style={{
					overflow: 'hidden',
					height: '100%',
					padding: token.paddingXS,
				}}
			>
				<Flex
					className="no-scrollbar"
					flex="1"
					style={{
						overflowY: 'auto',
						height: '100%',
						scrollBehavior: 'smooth',
					}}
					vertical
				>
					{savedBaskets.length === 0 ? (
						<EmptySavedBasket />
					) : (
						<Flex vertical style={{ gap: token.paddingXS }}>
							{savedBaskets.map(
								(basket) =>
									basket.exchange === exchange && <ListItem key={basket.id} />
							)}
						</Flex>
					)}
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Index
