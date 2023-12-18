import { Flex } from 'antd'
import ListItem from '../../common/basket-item/runtime-basket-item'

import BasketNav from '../basket-nav'
import { useBasketStore } from '../../store/basket-store'
import EmptyBasket from '../../common/empty-basket'
const Index = () => {
	const {
		runtimeBasketList,
		deleteRuntimeBasket,
		toogleEditModal,
		setEditableBasket,
	} = useBasketStore()

	const onHandleBasketEdit = (id: string) => {
		setEditableBasket(id)
		toogleEditModal(true)
	}
	const onHandleBasketDuplicate = (id: string) => {
		console.log('duplicate', id)
	}
	const onHandleBaskeSave = (id: string) => {
		console.log('save', id)
	}
	const onHandleBaskeDelete = (id: string) => {
		deleteRuntimeBasket(id)
	}

	const handleActionClick = (id: string, actionType: string) => {
		actionType === 'edit'
			? onHandleBasketEdit(id)
			: actionType === 'duplicate'
				? onHandleBasketDuplicate(id)
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

					<div className="overflow-hidden shadow-xl h-full p-[10px] border-[2px] border-solid">
						<Flex
							className="w-full  overflow-y-scroll no-scrollbar   scroll-smooth shadow-md h-full"
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
						className="h-full  p-[10px] overflow-y-hidden shadow-xl"
					>
						<EmptyBasket />
					</Flex>
				</Flex>
			)}
		</>
	)
}

export default Index
