import { Flex, Tabs, TabsProps, Divider, Typography, theme } from 'antd'
import { useBasketStore } from '../../store/basket-store'
import BasketTable from './basket-table'
import { useEffect } from 'react'
import { Exchange } from 'src/common/enums'
const Index = () => {
	const { token } = theme.useToken()
	const { setExchange } = useBasketStore()
	const handleTabChange: TabsProps['onChange'] = (exchange: string) => {
		setExchange(exchange as Exchange)
	}

	useEffect(() => {
		setExchange(Exchange.NSE)
	}, [setExchange])

	const tabItems: TabsProps['items'] = [
		{
			label: Exchange.NSE,
			key: Exchange.NSE,
			children: <BasketTable />,
		},
		{
			label: Exchange.MCX,
			key: Exchange.MCX,
			children: <BasketTable />,
		},
		{
			label: Exchange.CUR,
			key: Exchange.CUR,
			children: <BasketTable />,
		},
	]

	return (
		<Flex flex="1" vertical>
			<Divider>
				<Typography.Text
					style={{ color: token.colorPrimary, fontSize: token.fontSizeLG }}
				>
					Saved Baskets
				</Typography.Text>
			</Divider>
			<Tabs
				items={tabItems}
				type="card"
				onChange={handleTabChange}
				className="w-full"
				tabBarStyle={{ width: '200px' }}
				style={{ height: '100%' }}
				tabBarGutter={5}
			/>
		</Flex>
	)
}

export default Index
