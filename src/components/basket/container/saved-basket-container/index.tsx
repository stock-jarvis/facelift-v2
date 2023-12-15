import { Flex, theme, Typography } from 'antd'
import ListItem from '../../common/basket-item/saved-basket-tem'
import BasketExchange from '../../common/basket-exchange/exchange-selector'
const index = () => {
	const { Text } = Typography
	const { token } = theme.useToken()
	return (
		<Flex
			flex="1"
			vertical
			gap="middle"
			className="h-full"
			style={{ padding: token.paddingSM }}
		>
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
			<div className="border-[2px] ">
				<BasketExchange />
			</div>
			<div className="overflow-hidden h-full shadow-xl p-[10px] border-[2px] border-solid">
				<Flex
					className="w-full  overflow-y-scroll no-scrollbar   scroll-smooth shadow-md h-full"
					vertical
				>
					<div className="flex flex-col gap-[5px] ">
						{/*TODO: Lazy Load the baskets here */}
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
				</Flex>
			</div>
		</Flex>
	)
}

export default index
