import { Flex } from 'antd'
import ListItem from '../../common/basket-item/runtime-basket-item'

import BasketNav from '../basket-nav'
import { useBasketStore } from '../../store/basket-store'
import EmptyBasket from '../../common/empty-basket'
import { generateUniqueId } from '../../common/utils/randomizer'

const Index = () => {
	const {
		runtimeBasketList,
		deleteRuntimeBasket,
		toogleEditModal,
		setEditableBasket,
		addNewRuntimeBasket,
		savedBaskets,
		toogleSaveError,
	} = useBasketStore()

	const onHandleBasketEdit = (id: string) => {
		const basket = runtimeBasketList.find((basket) => basket.id === id)
		if (basket) {
			toogleSaveError(id, false)
		}
		setEditableBasket(id)
		toogleEditModal(true)
	}

	const onHandleBasketDuplicate = (name: string) => {
		const duplicateBasket = runtimeBasketList.filter(
			(basket) => basket.name === name
		)
		if (duplicateBasket[duplicateBasket.length - 1]) {
			addNewRuntimeBasket({
				...duplicateBasket[duplicateBasket.length - 1],
				id: generateUniqueId(),
				identifier: duplicateBasket[duplicateBasket.length - 1].identifier + 1,
			})
		}
	}

	const onHandleBaskeSave = (id: string) => {
		const isBasketSaved = savedBaskets.find((basket) => basket.id === id)
		if (isBasketSaved) {
			//TODO: Tie this up with the api
			console.log('Tie this up with the api')
		} else {
			toogleSaveError(id, true)
		}
	}

	const onHandleBaskeDelete = (id: string) => {
		deleteRuntimeBasket(id)
	}

	const handleActionClick = (id: string, actionType: string, name: string) => {
		actionType === 'edit'
			? onHandleBasketEdit(id)
			: actionType === 'duplicate'
				? onHandleBasketDuplicate(name)
				: actionType === 'save'
					? onHandleBaskeSave(id)
					: onHandleBaskeDelete(id)
	}

	return (
		<>
			{runtimeBasketList.length > 0 ? (
				<Flex
					flex="1"
					vertical
					gap="middle"
					className="h-full  p-[10px] overflow-y-hidden"
				>
					<Flex className="bg-[white]">
						<BasketNav />
					</Flex>

					<div className="overflow-hidden  h-full p-[10px] border-[2px] border-solid">
						<Flex
							className="w-full  overflow-y-scroll no-scrollbar   scroll-smooth  h-full"
							vertical
						>
							<div className="flex flex-col gap-[5px] ">
								{runtimeBasketList.length > 0 &&
									runtimeBasketList.map((basket) => (
										<ListItem
											handleOnClickAction={handleActionClick}
											key={basket.id}
											id={basket.id}
											name={basket.name}
											exchange={basket.exchange}
											identifier={basket.identifier}
										/>
									))}
							</div>
						</Flex>
					</div>
				</Flex>
			) : (
				<Flex className="p-[10px] flex-1">
					<Flex
						flex="1"
						justify="center"
						gap="middle"
						className="h-full  p-[10px] overflow-y-hidden "
					>
						<EmptyBasket />
					</Flex>
				</Flex>
			)}
		</>
	)
}

export default Index
