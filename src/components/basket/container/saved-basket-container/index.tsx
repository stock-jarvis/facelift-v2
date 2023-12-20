import { Flex, theme, Typography } from 'antd'
import ListItem from '../../common/basket-item/saved-basket-tem'
import BasketExchange from '../../common/basket-exchange/exchange-selector'
import { useState, useEffect } from 'react'
import { useBasketStore } from '../../store/basket-store'
import EmptySavedBasket from '../../common/empty-saved-basket'
interface EmptyBaskeyProps {
	NSE: boolean
	CUR: boolean
	MCX: boolean
}
type key = 'NSE' | 'CUR' | 'MCX'

const Index = () => {
	const { Text } = Typography
	const { token } = theme.useToken()
	const { storedBaskets } = useBasketStore()
	const [exchange, setExchange] = useState<string>('NSE')
	const [val, setVal] = useState<key>('NSE')
	const [emptyBasketsCheck, setEmptyBasketChecks] = useState<EmptyBaskeyProps>({
		NSE: true,
		CUR: true,
		MCX: true,
	})

	useEffect(() => {
		const baskets = storedBaskets.find((b) => b.exchange === exchange)
		console.log(baskets)
		if (!baskets) {
			setEmptyBasketChecks((prev) => {
				return {
					...prev,
					[exchange]: false,
				}
			})
		} else {
			setEmptyBasketChecks((prev) => {
				return {
					...prev,
					[exchange]: true,
				}
			})
		}
	}, [storedBaskets, exchange])
	useEffect(() => {
		exchange === 'NSE'
			? setVal('NSE')
			: exchange === 'MCX'
				? setVal('MCX')
				: setVal('CUR')
	}, [exchange])
	return (
		<Flex flex="1" vertical gap="middle" style={{ padding: token.paddingSM }}>
			<Flex justify="center" style={{ padding: token.paddingXS }}>
				<Text
					style={{
						padding: token.paddingXS,
						fontSize: token.fontSizeHeading5,
						fontWeight: token.fontWeightStrong,
						color: token.colorPrimary,
						opacity: '0.8',
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
					{storedBaskets.length === 0 ? (
						<EmptySavedBasket />
					) : emptyBasketsCheck[val] ? (
						<Flex vertical style={{ gap: token.paddingXS }}>
							{storedBaskets.map(
								(basket) =>
									basket.exchange === exchange && <ListItem key={basket.id} />
							)}
						</Flex>
					) : (
						<EmptySavedBasket />
					)}
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Index
