import { Flex } from 'antd'
import ListItem from '../../common/basket-item/runtime-basket-item'
import { useState } from 'react'
import BasketNav from '../basket-nav'
import EmptyBasket from '../../common/empty-basket'
const Index = () => {
	const [isEmpty] = useState(true)
	return (
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
					{!isEmpty ? (
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
					) : (
						<EmptyBasket />
					)}
				</Flex>
			</div>
		</Flex>
	)
}

export default Index
