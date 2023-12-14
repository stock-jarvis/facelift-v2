import { Flex } from 'antd'
import ListItem from '../../common/basket-item/runtime-basket-item'

import BasketNav from '../basket-nav'
const index = () => {
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

			<Flex
				className="w-full h-full  overflow-y-scroll no-scrollbar shadow-xl p-[10px] gap-[10px]"
				vertical
			>
				<div className="flex flex-col gap-[10px]">
					<ListItem />
					<ListItem />
					<ListItem />
					<ListItem />

					<ListItem />
					<ListItem />
				</div>
			</Flex>
		</Flex>
	)
}

export default index
