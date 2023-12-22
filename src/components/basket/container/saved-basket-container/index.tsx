import { Flex, Tabs, TabsProps, Divider, Typography, theme } from 'antd'
import { useBasketStore } from '../../store/basket-store'
import BasketTable from './basket-table'
const Index = () => {
	const { token } = theme.useToken()
	const { setExchange } = useBasketStore()
	const handleTabChange: TabsProps['onChange'] = (val: string) => {
		setExchange(val)
	}

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
		<Flex flex="1" vertical>
			<Divider>
				<Typography.Text style={{ color: token.colorPrimary }}>
					Saved Baskets
				</Typography.Text>
			</Divider>
			<Tabs
				items={tabItems}
				type="card"
				onChange={handleTabChange}
				className="w-full"
				style={{ height: '100%' }}
				tabBarGutter={10}
			/>
		</Flex>
	)
}

export default Index
