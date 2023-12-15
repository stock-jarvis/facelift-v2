import { Flex } from 'antd'
import ListItem from '../../common/basket-item/saved-basket-tem'
import BasketExchange from '../../common/basket-exchange/exchange-selector'
const index = () => {
	return (
		<Flex
			flex="1"
			vertical
			gap="middle"
			className="h-full  p-[10px] overflow-y-hidden"
		>
			<Flex className="bg-[white] justify-center p-[10px]">
				<p className="font-medium p-[10px]">Saved Baskets</p>
			</Flex>
			<div className="border-[2px] ">
				<BasketExchange />
			</div>
			<div className="overflow-hidden h-full shadow-xl p-[10px] border-[2px] border-solid">
				<Flex
					className="w-full  overflow-y-scroll no-scrollbar   scroll-smooth shadow-md h-full"
					vertical
				>
					<div className="flex flex-col gap-[5px] ">
						{/*TODO: Need to fix the scroll Issue */}
						<ListItem />

						<ListItem />
						<ListItem />
						<ListItem />
						<ListItem />
						<ListItem />
						<ListItem />
						<ListItem />
						<ListItem />
						<ListItem />
						<ListItem />
						<ListItem />
						<ListItem />
						<ListItem />
						<ListItem />
						<ListItem />
						<ListItem />
					</div>
				</Flex>
			</div>
		</Flex>
	)
}

export default index
