import { Tabs, TabsProps } from 'antd'

import './styles/antd-styles-override.css'
import Positions from './positions'

const items: TabsProps['items'] = [
	{
		key: 'positions',
		label: 'Positions',
		children: <Positions />,
	},
	{
		key: 'greeks',
		label: 'Greeks',
		children: <div>Greeks</div>,
	},
	{
		key: 'payoffCharts',
		label: 'Payoff Charts',
		children: <div>Payoff Charts</div>,
	},
	{
		key: 'charts',
		label: 'Charts',
		children: <div>Charts</div>,
	},
]

const RightContent = () => (
	<Tabs
		className="w-full h-full"
		defaultActiveKey="positions"
		size="large"
		items={items}
		tabBarGutter={90}
	/>
)

export default RightContent
