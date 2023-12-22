import { Flex, theme } from 'antd'
import ListItem from '../../common/basket-item/saved-basket-tem'
import { useState, useEffect } from 'react'
import { useBasketStore } from '../../store/basket-store'

import EmptySavedBasket from '../../common/empty-saved-basket'
import { generateUniqueId } from '../../common/utils/randomizer'

interface EmptyBaskeyProps {
	NSE: boolean
	CUR: boolean
	MCX: boolean
}
type key = 'NSE' | 'CUR' | 'MCX'

const Index = () => {
	//const { Text } = Typography
	const { token } = theme.useToken()
	const { storedBaskets, addToStoredBaskets, deleteStoredBasket, exchange } =
		useBasketStore()

	const [val, setVal] = useState<key>('NSE')
	const [emptyBasketsCheck, setEmptyBasketChecks] = useState<EmptyBaskeyProps>({
		NSE: true,
		CUR: true,
		MCX: true,
	})

	useEffect(() => {
		const baskets = storedBaskets.find((b) => b.exchange === exchange)
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

	const onHandleBaskeDelete = (id: string) => {
		deleteStoredBasket(id)
	}
	const onHandleBasketEdit = (id: string) => {
		console.log(id)
	}
	const onHandleBasketDuplicate = (id: string) => {
		const existingBasket = storedBaskets.find((basket) => basket.id === id)
		existingBasket &&
			addToStoredBaskets({ ...existingBasket, id: generateUniqueId() })
	}
	const onHandleBaskeMove = (id: string) => {
		console.log(id)
	}
	const handleActionClicked = (actionType: string, id: string) => {
		actionType === 'edit'
			? onHandleBasketEdit(id)
			: actionType === 'duplicate'
				? onHandleBasketDuplicate(id)
				: actionType === 'delete'
					? onHandleBaskeDelete(id)
					: onHandleBaskeMove(id)
	}

	return (
		<Flex flex="1" vertical>
			<Flex
				style={{
					overflow: 'hidden',
					height: '100%',
					paddingBottom: token.paddingXS,
					//border: '0.5px solid #D3D3D3',
				}}
			>
				<Flex
					flex="1"
					style={{
						overflowY: 'auto',
						height: '100%',
						padding: token.paddingXS,
						scrollBehavior: 'smooth',
					}}
					vertical
				>
					{storedBaskets.length === 0 ? (
						<EmptySavedBasket />
					) : emptyBasketsCheck[val] ? (
						<Flex vertical style={{ gap: token.paddingXS }}>
							{storedBaskets.map(
								(basket, i) =>
									basket.exchange === exchange && (
										<Flex key={i}>
											<ListItem
												handleOnClick={handleActionClicked}
												id={basket.id}
												name={basket.name || ''}
												identifier={basket.identifier || 0}
											/>
										</Flex>
									)
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
