import { ConfigProvider, Segmented } from 'antd'
import { TradeAction } from 'src/common/enums'

type Props = {
	tradeAction: TradeAction
	toggle: (tradeAction: TradeAction) => void
}

const tradeActions = [
	{
		label: 'B',
		value: TradeAction.Buy,
	},
	{
		label: 'S',
		value: TradeAction.Sell,
	},
]

const TradeActionToggle: React.FC<Props> = ({ tradeAction, toggle }) => (
	<ConfigProvider
		theme={{
			components: {
				Segmented: {
					// TODO: update colors here
					itemColor: tradeAction === TradeAction.Buy ? 'red' : 'green',
					itemSelectedColor: tradeAction === TradeAction.Buy ? 'green' : 'red',
					itemHoverColor: tradeAction === TradeAction.Buy ? 'red' : 'green',
				},
			},
		}}
	>
		<Segmented
			options={tradeActions}
			value={tradeAction}
			size="small"
			onChange={toggle}
		/>
	</ConfigProvider>
)

export default TradeActionToggle
