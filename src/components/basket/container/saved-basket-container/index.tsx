import { Flex, Tabs, TabsProps, Divider, Typography, theme } from 'antd'
import { useBasketStore } from '../../store/basket-store'
import BasketTable from './basket-view'
import { useEffect } from 'react'
const Index = () => {
	const { token } = theme.useToken()
	const { setExchange } = useBasketStore()
	const handleTabChange: TabsProps['onChange'] = (val: string) => {
		setExchange(val)
	}

	useEffect(() => {
		setExchange('NSE')
	}, [setExchange])

	const tabItems: TabsProps['items'] = [
		{
			label: 'NSE',
			key: 'NSE',
			children: <BasketTable />,
		},
		{
			label: 'MCX',
			key: 'MCX',
			children: <BasketTable />,
		},
		{
			label: 'CUR',
			key: 'CUR',
			children: <BasketTable />,
		},
	]

	return (
		<Flex flex="1" vertical style={{ padding: token.paddingXS }}>
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
				style={{ height: '100%' }}
				tabBarGutter={5}
			/>
		</Flex>
	)
}

export default Index
